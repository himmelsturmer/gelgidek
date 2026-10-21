import { verifyToken } from '../utils/jwt'

const PUBLIC_ADMIN_PATHS = new Set([
    '/api/admin/login',
    '/api/admin/totp-verify',
    '/api/admin/logout',
])

export default defineEventHandler(async (event) => {
    // Genel güvenlik başlıkları (Security Headers)
    setResponseHeaders(event, {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'SAMEORIGIN',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-XSS-Protection': '1; mode=block',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    })

    const path = getRequestURL(event).pathname.replace(/\/+$/, '') || '/'

    // Sadece /api/admin/* rotalarını koru (login, totp-verify ve logout hariç)
    if (path.startsWith('/api/admin') && !PUBLIC_ADMIN_PATHS.has(path)) {
        const authHeader = getHeader(event, 'authorization')
        const cookieToken = getCookie(event, 'admin_token')
        const token = authHeader?.startsWith('Bearer ')
            ? authHeader.slice(7).trim()
            : cookieToken

        if (!token) {
            throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
        }

        const config = useRuntimeConfig()
        try {
            const payload = await verifyToken(token, config.jwtSecret)
            event.context.admin = payload
        } catch {
            deleteCookie(event, 'admin_token', { path: '/' })
            deleteCookie(event, 'admin_session', { path: '/' })
            throw createError({ statusCode: 401, message: 'Geçersiz veya süresi dolmuş oturum' })
        }
    }
})
