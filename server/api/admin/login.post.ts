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
    const token = await signToken({ adminId: admin.id, username: admin.username }, config.jwtSecret)

    // httpOnly cookie'ye yaz
    setCookie(event, 'admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 gün
        path: '/'
    })

    return { ok: true, token }
})
