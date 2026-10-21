import { GoogleGenerativeAI } from "@google/generative-ai";
import { visaKnowledge } from "~/server/utils/visaKnowledge";
import { enforceRateLimit } from "~/server/utils/security";

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, 'ai-chat', 20, 5 * 60 * 1000);

  try {
    const config = useRuntimeConfig();
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: "Yapay zeka servisi şu anda yapılandırılmamış.",
      });
    }

    const body = await readBody(event);
    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];

    if (rawMessages.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Mesaj içeriği gerekli.",
      });
    }

    // Son 16 mesajı al ve her mesajın uzunluğunu sınırla
    const messages = rawMessages
      .slice(-16)
      .filter((m: any) => m && typeof m.text === 'string' && m.text.trim().length > 0)
      .map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text.trim().slice(0, 1500),
      }));

    if (messages.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "Geçerli bir mesaj bulunamadı.",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: visaKnowledge,
    });

    // Gemini API requires the history to start with a 'user' message.
    let validMessages = messages.slice(0, -1);
    const firstUserIndex = validMessages.findIndex((m) => m.role === 'user');
    if (firstUserIndex > 0) {
      validMessages = validMessages.slice(firstUserIndex);
    } else if (firstUserIndex === -1) {
      validMessages = [];
    }

    const history = validMessages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const latestMessage = messages[messages.length - 1].text;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(latestMessage);
    const responseText = result.response.text();

    return {
      message: responseText,
    };
  } catch (error: any) {
    if (error?.statusCode === 400 || error?.statusCode === 429) {
      throw error;
    }
    console.error("Gemini API Error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Yapay zeka danışmanı şu an yanıt veremiyor. Lütfen biraz sonra tekrar deneyin.",
    });
  }
});
