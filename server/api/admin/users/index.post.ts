import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, 'admin_token')
    if (!token) throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
    await verifyToken(token, config.jwtSecret)

    const { username, password } = await readBody(event)

    if (!username?.trim() || !password?.trim()) {
        throw createError({ statusCode: 400, message: 'Kullanıcı adı ve şifre zorunludur' })
    }
    if (password.length < 6) {
        throw createError({ statusCode: 400, message: 'Şifre en az 6 karakter olmalıdır' })
    }

    const existing = await prisma.admin.findUnique({ where: { username } })
    if (existing) {
        throw createError({ statusCode: 409, message: 'Bu kullanıcı adı zaten kullanılıyor' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const admin = await prisma.admin.create({
        data: { username: username.trim(), passwordHash },
    })

    return { id: admin.id, username: admin.username, createdAt: admin.createdAt, hasTOTP: false }
})
