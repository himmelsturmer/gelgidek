import * as OTPAuth from 'otpauth'
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

    const newSecret = new OTPAuth.Secret({ size: 20 })
    const totp = new OTPAuth.TOTP({
        issuer: 'gelgidek',
        label: admin.username,
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: newSecret
    })

    const secret = newSecret.base32
    const otpauthUrl = totp.toString()
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl)

    return { secret, qrCodeDataUrl }
})
