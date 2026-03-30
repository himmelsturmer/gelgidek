import { prisma } from '~/server/utils/prisma'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, 'admin_token')
    if (!token) throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
    await verifyToken(token, config.jwtSecret)

    const id = Number(getRouterParam(event, 'id'))
    await prisma.admin.update({ where: { id }, data: { totpSecret: null } })
    return { ok: true }
})
