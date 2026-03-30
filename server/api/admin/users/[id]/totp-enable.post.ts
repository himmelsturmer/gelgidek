import * as OTPAuth from 'otpauth'
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

    const totp = new OTPAuth.TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(secret)
    })
    
    const delta = totp.validate({ token: code, window: 1 })
    const isValid = delta !== null

    if (!isValid) {
        throw createError({ statusCode: 400, message: 'Geçersiz doğrulama kodu. Lütfen tekrar deneyin.' })
    }

    await prisma.admin.update({ where: { id }, data: { totpSecret: secret } })
    return { ok: true }
})
