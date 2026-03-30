import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, 'admin_token')
    if (!token) throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
    await verifyToken(token, config.jwtSecret)

    const id = Number(getRouterParam(event, 'id'))
    const { username, password } = await readBody(event)

    const admin = await prisma.admin.findUnique({ where: { id } })
    if (!admin) throw createError({ statusCode: 404, message: 'Kullanıcı bulunamadı' })

    const data: any = {}

    if (username?.trim()) {
        const conflict = await prisma.admin.findFirst({
            where: { username: username.trim(), NOT: { id } },
        })
        if (conflict) throw createError({ statusCode: 409, message: 'Bu kullanıcı adı zaten kullanılıyor' })
        data.username = username.trim()
    }

    if (password?.trim()) {
        if (password.length < 6) {
            throw createError({ statusCode: 400, message: 'Şifre en az 6 karakter olmalıdır' })
        }
        data.passwordHash = await bcrypt.hash(password, 10)
    }

    if (Object.keys(data).length === 0) {
        throw createError({ statusCode: 400, message: 'Güncellenecek alan belirtilmedi' })
    }

    const updated = await prisma.admin.update({ where: { id }, data })
    return { id: updated.id, username: updated.username, hasTOTP: !!updated.totpSecret }
})
