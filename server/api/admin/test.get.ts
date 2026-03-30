import { authenticator } from 'otplib'
import QRCode from 'qrcode'

export default defineEventHandler(async () => {
    try {
        const secret = authenticator.generateSecret()
        const url = authenticator.keyuri('test', 'gelgidek', secret)
        const qr = await QRCode.toDataURL(url)
        return { success: true, qr: qr.substring(0, 50) }
    } catch (e: any) {
        return { success: false, error: e.message }
    }
})
