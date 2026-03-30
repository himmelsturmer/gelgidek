import { authenticator } from 'otplib'
import { prisma } from '~/server/utils/prisma'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, 'admin_token')
    if (!token) throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
    await verifyToken(token, config.jwtSecret)

    const id = Number(getRouterParam(event, 'id'))
    const { secret, code } = await readBody(event)

    if (!secret || !code) {
        throw createError({ statusCode: 400, message: 'Gerekli alanlar eksik' })
    }

    const isValid = authenticator.verify({ token: code, secret })
    if (!isValid) {
        throw createError({ statusCode: 400, message: 'Geçersiz doğrulama kodu. Lütfen tekrar deneyin.' })
    }

    await prisma.admin.update({ where: { id }, data: { totpSecret: secret } })
    return { ok: true }
})
