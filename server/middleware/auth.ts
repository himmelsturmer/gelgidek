import { verifyToken } from '../utils/jwt'

export default defineEventHandler(async (event) => {
    const path = getRequestURL(event).pathname

    // Sadece /api/admin/* rotalarını koru (login hariç)
    if (path.startsWith('/api/admin') && !path.includes('/api/admin/login')) {
        const authHeader = getHeader(event, 'authorization')
        const cookieToken = getCookie(event, 'admin_token')
        const token = authHeader?.replace('Bearer ', '') || cookieToken

        if (!token) {
            throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
        }

        const config = useRuntimeConfig()
        try {
            const payload = await verifyToken(token, config.jwtSecret)
            event.context.admin = payload
        } catch {
            throw createError({ statusCode: 401, message: 'Geçersiz veya süresi dolmuş token' })
        }
    }
})
