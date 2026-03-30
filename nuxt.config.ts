// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Private — server only
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-production-please',
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: process.env.SMTP_PORT || '587',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '',
    smtpFrom: process.env.SMTP_FROM || '',
    // Public — exposed to client
    public: {
      siteName: process.env.SITE_NAME || 'gelgidek.com'
    }
  },

  routeRules: {
    '/admin/**': { ssr: false }
  },

  app: {
    head: {
      title: 'gelgidek.com — Yurt Dışı Tur & Vize Danışmanlığı',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Profesyonel yurt dışı tur planlama ve vize danışmanlığı. Ülkelere göre evrak listesi, başvuru bölgeleri ve büyükelçilik bilgileri.' },
        { name: 'theme-color', content: '#104271' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap' }
      ]
    }
  },

  compatibilityDate: '2024-11-01'
})
