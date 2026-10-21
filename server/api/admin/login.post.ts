import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { signToken } from '~/server/utils/jwt'
import { enforceRateLimit } from '~/server/utils/security'

export default defineEventHandler(async (event) => {
    enforceRateLimit(event, 'admin-login', 10, 15 * 60 * 1000)

    const body = await readBody(event)
    const username = typeof body?.username === 'string' ? body.username.trim() : ''
    const password = typeof body?.password === 'string' ? body.password : ''

    if (!username || !password) {
        throw createError({ statusCode: 400, message: 'Kullanıcı adı ve şifre zorunludur' })
    }

    const admin = await prisma.admin.findUnique({ where: { username } })
    if (!admin) {
        throw createError({ statusCode: 401, message: 'Geçersiz kullanıcı adı veya şifre' })
    }

    const valid = await bcrypt.compare(password, admin.passwordHash)
    if (!valid) {
        throw createError({ statusCode: 401, message: 'Geçersiz kullanıcı adı veya şifre' })
    }

    const config = useRuntimeConfig()

    // If 2FA is enabled, issue a short-lived (5 min) temp token and require TOTP
    if (admin.totpSecret) {
        const tempToken = await signToken(
            { adminId: admin.id, username: admin.username, step: 'totp' },
            config.jwtSecret + '-totp',
            '5m'
        )
        return { requireTotp: true, tempToken }
    }

    // No 2FA — issue full session JWT
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
