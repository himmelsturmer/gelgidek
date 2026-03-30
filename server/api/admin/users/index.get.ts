import { prisma } from '~/server/utils/prisma'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, 'admin_token')
    if (!token) throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
    await verifyToken(token, config.jwtSecret)

    const admins = await prisma.admin.findMany({
        select: {
            id: true,
            username: true,
            totpSecret: false,
            createdAt: true,
            // expose whether TOTP is enabled
        },
        orderBy: { id: 'asc' },
    })

    // Map to include hasTOTP without exposing secret
    const all = await prisma.admin.findMany({ orderBy: { id: 'asc' } })
    return all.map(a => ({
        id: a.id,
        username: a.username,
        createdAt: a.createdAt,
        hasTOTP: !!a.totpSecret,
    }))
})
