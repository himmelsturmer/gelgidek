import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null;

async function getTransporter() {
  if (transporter) return transporter;
  
  // Şimdilik Ethereal Test Sunucusu oluşturuyoruz
  // İleride kendi cPanel / Google Workspace bilgilerinizi `.env` içerisinden okuyacak şekilde ayarlayabilirsiniz
  const testAccount = await nodemailer.createTestAccount();
  
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  return transporter;
}

export async function sendVisaEmail(to: string, subject: string, htmlContent: string) {
  const mailer = await getTransporter();
  const info = await mailer.sendMail({
    from: '"Gelgidek Vize Operasyon Merkezi" <no-reply@gelgidek.com>',
    to,
    subject,
    html: htmlContent,
  });

  // Ethereal üzerinden test URL'sini loglar
  console.log("E-Posta Test Sunucusuna Gönderildi!");
  console.log("Mailin Görsel Test Linki: %s", nodemailer.getTestMessageUrl(info));
  return info;
}
