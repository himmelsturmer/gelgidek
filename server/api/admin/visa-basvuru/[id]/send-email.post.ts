import { defineEventHandler, readBody, createError, getRouterParam, getCookie, getRequestURL } from 'h3'
import { prisma } from '~/server/utils/prisma'
import { escapeHtml } from '~/server/utils/security'
import { chromium } from 'playwright'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'Geçersiz ID' })

  const body = await readBody(event)
  const { toEmail, messageNote } = body || {}

  if (!toEmail || typeof toEmail !== 'string') {
    throw createError({ statusCode: 400, message: 'E-posta adresi gerekli' })
  }

  const application = await prisma.visaApplication.findUnique({
    where: { id },
    include: {
      customer: true,
      appointment: { include: { institution: true, supplier: true } }
    }
  })
  if (!application) throw createError({ statusCode: 404, message: 'Başvuru bulunamadı' })

  // 1. Playwright ile Arkaplanda PDF Oluştur
  let pdfBuffer: Buffer | null = null
  const reqUrl = getRequestURL(event)
  const origin = reqUrl.origin || 'http://localhost:3000'
  const adminToken = getCookie(event, 'admin_token')

  let browser
  try {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext()
    if (adminToken) {
      await context.addCookies([
        {
          name: 'admin_token',
          value: adminToken,
          domain: reqUrl.hostname || 'localhost',
          path: '/',
        },
        {
          name: 'admin_session',
          value: '1',
          domain: reqUrl.hostname || 'localhost',
          path: '/',
        }
      ])
    }
    const page = await context.newPage()
    const printUrl = `${origin}/admin/visa-basvuru/${id}/print`
    await page.goto(printUrl, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(600)

    pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' }
    })
  } catch (error) {
    console.error('Playwright PDF Render Hatası:', error)
    throw createError({ statusCode: 500, message: 'PDF belgesi oluşturulurken hata meydana geldi.' })
  } finally {
    if (browser) await browser.close()
  }

  const safeFullName = escapeHtml(`${application.customer.ad} ${application.customer.soyad}`)
  const safeUlke = escapeHtml(application.ulke)
  const safeNote = messageNote ? escapeHtml(String(messageNote).slice(0, 2000)) : ''

  // 2. E-Posta Gövdesi
  const html = `
    <div style="font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif; color: #104271; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(16,66,113,0.08);">
      <div style="background-color: #104271; padding: 30px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px;">Randevu Belgeniz Hazır</h2>
      </div>
      <div style="padding: 30px; background-color:#f4f8fd;">
        <p style="font-size: 16px; margin-top:0; color:#0f1b2d;">Sayın <strong>${safeFullName}</strong>,</p>
        <p style="font-size: 15px; color:#5a7091; line-height: 1.6;"><strong>${safeUlke}</strong> vize başvurunuzla ilgili oluşturulan resmi randevu belgeniz, süreç takvimi ve adres bilgileriniz ekteki <strong>PDF</strong> dosyasında detaylıca yer almaktadır.</p>
        
        <div style="background-color: #ffffff; border-left: 4px solid #74dff6; padding: 20px; margin: 25px 0; border-radius: 4px; box-shadow: 0 4px 12px rgba(16,66,113,0.05);">
          <p style="margin: 0; font-size: 15px; color: #104271; font-weight:600;">Lütfen ekteki PDF belgesini indirerek işlemlerinize devam ediniz.</p>
        </div>

        ${safeNote ? `<div style="margin-top:25px; padding: 20px; background: #fffbeb; border: 1px solid #fde68a; border-radius:8px; color:#92400e;"><strong style="text-decoration:underline;">Müşteri İletişim Notu:</strong><br/><br/><span style="white-space: pre-line;">${safeNote}</span></div>` : ''}

        <p style="margin-top: 40px; font-size: 14px; text-align: center; color: #8ba6bf; border-top:1px solid #e2e8f0; padding-top:20px;">
          Yurt Dışı Tur & Vize Danışmanlığı<br/><strong style="color:#104271;">gelgidek.com</strong>
        </p>
      </div>
    </div>
  `

  try {
    const { default: nodemailer } = await import('nodemailer')
    const config = useRuntimeConfig()
    let mailer

    if (config.smtpUser && config.smtpPass) {
      mailer = nodemailer.createTransport({
        host: config.smtpHost,
        port: parseInt(config.smtpPort) || 587,
        secure: false,
        auth: { user: config.smtpUser, pass: config.smtpPass },
      })
    } else {
      const testAccount = await nodemailer.createTestAccount()
      mailer = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      })
    }

    const safePassport = String(application.customer.pasaportNo || 'Belge').replace(/[^a-zA-Z0-9_-]/g, '')
    const info = await mailer.sendMail({
      from: config.smtpFrom || '"gelgidek.com Vize" <no-reply@gelgidek.com>',
      to: toEmail.trim(),
      subject: `Vize Randevu Bildirgesi - ${application.customer.ad} ${application.customer.soyad}`.replace(/[\r\n]/g, ' '),
      html,
      attachments: [{
        filename: `Randevu_Belgesi_${safePassport}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      }]
    })

    const testUrl = nodemailer.getTestMessageUrl(info)
    if (testUrl) {
      console.log('PDF Eklentili Test E-Posta Gönderildi: %s', testUrl)
    }

    const log = await prisma.visaEmailLog.create({
      data: { applicationId: id, toEmail: toEmail.trim() }
    })

    return { success: true, log }
  } catch (error) {
    console.error('Nodemailer Hatası:', error)
    throw createError({ statusCode: 500, message: 'Mail gönderilirken hata oluştu.' })
  }
})
