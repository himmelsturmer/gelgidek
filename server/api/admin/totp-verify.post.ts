import * as OTPAuth from 'otpauth'
import { prisma } from '~/server/utils/prisma'
import { verifyToken, signToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const { tempToken, code } = await readBody(event)

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

    const admin = await prisma.admin.findUnique({ where: { id: payload.adminId } })
    if (!admin || !admin.totpSecret) {
        throw createError({ statusCode: 401, message: 'Kullanıcı bulunamadı veya 2FA aktif değil' })
    }

    const totp = new OTPAuth.TOTP({
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(admin.totpSecret)
    })
    
    const delta = totp.validate({ token: code, window: 1 })
    const isValid = delta !== null

    if (!isValid) {
        throw createError({ statusCode: 401, message: 'Geçersiz doğrulama kodu' })
    }

    // Issue full session JWT
    const token = await signToken({ adminId: admin.id, username: admin.username }, config.jwtSecret)

    setCookie(event, 'admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })

    return { ok: true }
})
