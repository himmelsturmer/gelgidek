<template>
  <div class="chatbot-container">
    <!-- Chat Window -->
    <div v-show="isOpen" class="chatbot-window">
      <div class="chatbot-header">
        <div class="chatbot-header-text">
          <strong>AI Vize Danışmanı</strong>
          <span class="chatbot-status">Çevrimiçi</span>
        </div>
        <button
          type="button"
          class="chatbot-close"
          aria-label="Sohbeti kapat"
          @click="isOpen = false"
        >
          ✕
        </button>
      </div>
      
      <div class="chatbot-messages" ref="messagesContainer">
        <!-- Initial Notice -->
        <div class="chatbot-message model">
          <div class="message-bubble notice">
            <strong>Yasal Uyarı:</strong> Verdiğim tavsiyeler bilgilendirme amaçlıdır; kesin sonuç garanti etmez. Resmi başvurudan önce gelgidek.com vize danışmanı ile görüşülmesi önerilir.
          </div>
        </div>

        <!-- Chat History -->
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          :class="['chatbot-message', msg.role]"
        >
          <div class="message-bubble" v-html="formatMessage(msg.text)"></div>
        </div>

        <div v-if="isLoading" class="chatbot-message model">
          <div class="message-bubble loading">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Quick Actions (Only show at the beginning) -->
      <div class="chatbot-quick-actions" v-if="messages.length === 1">
        <button type="button" class="btn btn--sm btn--ghost" @click="sendQuickMessage('Hangi ülkeden kolay vize alırım?')">Hangi ülkeden kolay vize alırım?</button>
        <button type="button" class="btn btn--sm btn--ghost" @click="sendQuickMessage('Schengen vizesi için evraklar nelerdir?')">Schengen evrakları nelerdir?</button>
      </div>

      <form @submit.prevent="sendMessage" class="chatbot-input-area">
        <input 
          type="text" 
          v-model="inputMsg" 
          placeholder="Tatil planınızı yazın..." 
          :disabled="isLoading"
          maxlength="1000"
          class="chatbot-input"
        />
        <button type="submit" class="btn btn--primary btn--sm" :disabled="!inputMsg.trim() || isLoading">
          Gönder
        </button>
      </form>
    </div>

    <!-- Chat Icon / Toggle -->
    <button 
      type="button"
      class="chatbot-toggle" 
      @click="isOpen = !isOpen"
      aria-label="Yapay Zeka Vize Danışmanı"
    >
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="chatbot-icon">
        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75a9.715 9.715 0 0 0 4.093-.895l4.316 1.439a.75.75 0 0 0 .947-.947l-1.439-4.316A9.715 9.715 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75ZM8.25 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875-1.125a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Zm4.125 1.125a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="chatbot-icon">
        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const inputMsg = ref('')
const isLoading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

// Initial greeting
const messages = ref([
  { role: 'model', text: 'Merhaba! Ben Gelgidek AI Vize Danışmanı. Pasaport türünüzü (Bordo, Yeşil vb.), mesleğinizi ve seyahat amacınızı paylaşırsanız size en uygun vize seçeneklerini sunabilirim.' }
])

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const escapeHtml = (raw: string) =>
  String(raw || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const formatMessage = (text: string) => {
  // Önce tüm HTML karakterlerini güvenli hale getir (XSS koruması)
  let formatted = escapeHtml(text)
  // Bold markdown-vari text
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Newlines
  formatted = formatted.replace(/\n/g, '<br/>')
  return formatted
}

const sendQuickMessage = (text: string) => {
  inputMsg.value = text
  sendMessage()
}

const sendMessage = async () => {
  if (!inputMsg.value.trim() || isLoading.value) return

  const userMsg = inputMsg.value.trim()
  inputMsg.value = ''
  
  messages.value.push({ role: 'user', text: userMsg })
  isLoading.value = true
  scrollToBottom()

  try {
    const data = await $fetch<{ message?: string }>('/api/chat', {
      method: 'POST',
      body: { messages: messages.value }
    })

    if (data && data.message) {
      messages.value.push({ role: 'model', text: data.message })
    }
  } catch {
    messages.value.push({ role: 'model', text: 'Üzgünüm, şu an bir bağlantı sorunu yaşıyorum. Lütfen biraz sonra tekrar deneyin.' })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 990;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.chatbot-toggle {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: var(--primary);
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(16, 66, 113, 0.32);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background 0.2s;
}

.chatbot-toggle:hover {
  transform: scale(1.05) translateY(-2px);
  background: var(--primary-light);
}

.chatbot-icon {
  width: 28px;
  height: 28px;
}

.chatbot-window {
  width: 360px;
  max-width: calc(100vw - 32px);
  height: 500px;
  max-height: calc(100vh - 110px);
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 16px 48px rgba(16, 66, 113, 0.22);
  border: 1px solid var(--border);
  border-radius: 20px;
}

.chatbot-header {
  background: var(--primary);
  color: #ffffff;
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chatbot-header-text {
  display: flex;
  flex-direction: column;
}

.chatbot-header-text strong {
  font-size: 1rem;
}

.chatbot-close {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.15rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.chatbot-close:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.chatbot-status {
  font-size: 0.78rem;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 6px;
}
.chatbot-status::before {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  background: #25D366;
  border-radius: 50%;
}

.chatbot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--bg);
}

.chatbot-message {
  display: flex;
  max-width: 88%;
}

.chatbot-message.user {
  align-self: flex-end;
}

.chatbot-message.model {
  align-self: flex-start;
}

.message-bubble {
  padding: 11px 14px;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
  word-break: break-word;
}

.chatbot-message.user .message-bubble {
  background: var(--primary);
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.chatbot-message.model .message-bubble {
  background: #ffffff;
  border: 1px solid var(--border);
  color: var(--text);
  border-bottom-left-radius: 4px;
  box-shadow: 0 4px 10px rgba(16, 66, 113, 0.04);
}

.message-bubble.notice {
  background: var(--bg-alt) !important;
  border-color: var(--accent-dark) !important;
  font-size: 0.8rem;
  color: var(--primary);
  box-shadow: none;
}

.chatbot-quick-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0 14px 12px;
  background: var(--bg);
}

.chatbot-quick-actions .btn {
  font-size: 0.76rem;
  padding: 6px 10px;
  white-space: normal;
  text-align: left;
}

.chatbot-input-area {
  display: flex;
  padding: 10px 12px;
  background: #ffffff;
  border-top: 1px solid var(--border);
  gap: 8px;
}

.chatbot-input {
  flex: 1;
  min-width: 0;
  border-radius: 999px;
  padding: 9px 14px;
  border: 1.5px solid var(--border);
  outline: none;
  font-size: 0.9rem;
}

.chatbot-input:focus {
  border-color: var(--primary);
}

.chatbot-input-area .btn {
  border-radius: 999px;
  padding: 9px 16px;
}

.loading {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 8px 14px;
}

.loading .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading .dot:nth-child(1) { animation-delay: -0.32s; }
.loading .dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

@media (max-width: 600px) {
  .chatbot-container {
    bottom: 14px;
    right: 14px;
  }
  .chatbot-toggle {
    width: 50px;
    height: 50px;
  }
  .chatbot-window {
    width: calc(100vw - 28px);
    height: min(460px, calc(100dvh - 96px));
    margin-bottom: 10px;
  }
}
</style>
