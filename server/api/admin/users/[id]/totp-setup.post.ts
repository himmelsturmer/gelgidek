import { authenticator } from 'otplib'
import QRCode from 'qrcode'
import { prisma } from '~/server/utils/prisma'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const token = getCookie(event, 'admin_token')
    if (!token) throw createError({ statusCode: 401, message: 'Yetkisiz erişim' })
    await verifyToken(token, config.jwtSecret)

    const id = Number(getRouterParam(event, 'id'))
    const admin = await prisma.admin.findUnique({ where: { id } })
    if (!admin) throw createError({ statusCode: 404, message: 'Kullanıcı bulunamadı' })

    // Generate a new TOTP secret (not saved to DB yet)
    const secret = authenticator.generateSecret()
    const otpauthUrl = authenticator.keyuri(admin.username, 'gelgidek.com', secret)
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)

    return { secret, qrCodeDataUrl }
})
