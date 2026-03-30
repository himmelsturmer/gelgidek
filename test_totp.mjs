import * as otplib from 'otplib';
const { authenticator } = otplib;
import QRCode from 'qrcode';

(async () => {
    try {
        const secret = authenticator.generateSecret();
        const url = authenticator.keyuri('testuser', 'gelgidek.com', secret);
        const qr = await QRCode.toDataURL(url);
        console.log("Success! QR length:", qr.length);
    } catch(e) {
        console.error("Error:", e);
    }
})();
