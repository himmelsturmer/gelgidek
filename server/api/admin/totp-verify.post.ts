import * as OTPAuth from 'otpauth'
import { prisma } from '~/server/utils/prisma'
import { verifyToken, signToken } from '~/server/utils/jwt'
import { enforceRateLimit } from '~/server/utils/security'

export default defineEventHandler(async (event) => {
    enforceRateLimit(event, 'admin-totp', 10, 15 * 60 * 1000)

    const body = await readBody(event)
    const tempToken = typeof body?.tempToken === 'string' ? body.tempToken.trim() : ''
    const code = typeof body?.code === 'string' ? body.code.trim() : ''

    if (!tempToken || !code) {
        throw createError({ statusCode: 400, message: 'Gerekli alanlar eksik' })
    }

    const config = useRuntimeConfig()

    // Verify the temp token issued by login step
    let payload: any
    try {
        payload = await verifyToken(tempToken, config.jwtSecret + '-totp')
    } catch {
        throw createError({ statusCode: 401, message: 'Geçersiz veya süresi dolmuş token' })
    }

    if (payload.step !== 'totp') {
        throw createError({ statusCode: 401, message: 'Geçersiz token tipi' })
    }

    const admin = await prisma.admin.findUnique({ where: { id: Number(payload.adminId) } })
    if (!admin || !admin.totpSecret) {
        throw createError({ statusCode: 401, message: 'Kullanıcı bulunamadı veya 2FA aktif değil' })
    }

    const totp = new OTPAuth.TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(admin.totpSecret),
    })

    const delta = totp.validate({ token: code, window: 1 })
    const isValid = delta !== null

    if (!isValid) {
        throw createError({ statusCode: 401, message: 'Geçersiz doğrulama kodu' })
    }

    // Issue full session JWT
    const token = await signToken({ adminId: admin.id, username: admin.username }, config.jwtSecret, '7d')

    const isProd = process.env.NODE_ENV === 'production'
    setCookie(event, 'admin_token', token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })
    setCookie(event, 'admin_session', '1', {
        httpOnly: false,
        secure: isProd,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })

    return { ok: true }
})
