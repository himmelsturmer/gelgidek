import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { signToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)

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

    // If 2FA is enabled, issue a short-lived temp token and require TOTP
    if (admin.totpSecret) {
        const tempToken = await signToken(
            { adminId: admin.id, username: admin.username, step: 'totp' },
            config.jwtSecret + '-totp',
        )
        return { requireTotp: true, tempToken }
    }

    // No 2FA — issue full session JWT
    const token = await signToken({ adminId: admin.id, username: admin.username }, config.jwtSecret)

    setCookie(event, 'admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    })

    return { ok: true }
})
