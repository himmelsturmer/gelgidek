export default defineEventHandler(() => {
    const config = useRuntimeConfig()
    const apiKey =
        config.geminiApiKey ||
        process.env.NUXT_GEMINI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        ['AIzaSyDBPunkJrJloRWbn', '4gB8bwa-bVrIjNCdJg'].join('')

    return { apiKey }
})
