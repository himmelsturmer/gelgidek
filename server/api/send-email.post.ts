import nodemailer from 'nodemailer'
import { escapeHtml, sanitizeUrl, isValidEmail, enforceRateLimit } from '~/server/utils/security'

export default defineEventHandler(async (event) => {
    enforceRateLimit(event, 'send-email', 5, 10 * 60 * 1000)

    const body = await readBody(event)
    const {
        to,
        countryName,
        purpose,
        profession,
        documents,
        description,
        embassyName,
        embassyAddress,
        embassyPhone,
        embassyWeb,
        consulateName,
        consulateAddress,
        consulatePhone,
        consulateWeb,
        pdfs
    } = body || {}

    if (!isValidEmail(to)) {
        throw createError({ statusCode: 400, message: 'Geçerli bir alıcı e-posta adresi zorunludur' })
    }

    const config = useRuntimeConfig()

    const transporter = nodemailer.createTransport({
        host: config.smtpHost,
        port: parseInt(config.smtpPort),
        secure: false,
        auth: {
            user: config.smtpUser,
            pass: config.smtpPass
        }
    })

    const safeCountryName = escapeHtml(String(countryName || '').slice(0, 100))
    const safePurpose = escapeHtml(String(purpose || '').slice(0, 100))
    const safeProfession = escapeHtml(String(profession || '').slice(0, 100))
    const safeDescription = escapeHtml(String(description || '').slice(0, 2000))

    const docListHtml = (Array.isArray(documents) ? documents.slice(0, 50) : [])
        .map((doc: unknown) => `<li style="padding:6px 0;border-bottom:1px solid #eee;">✅ ${escapeHtml(String(doc || '').slice(0, 500))}</li>`)
        .join('')

    const pdfsHtml = (Array.isArray(pdfs) ? pdfs.slice(0, 10) : [])
        .map((p: any) => ({
            label: escapeHtml(String(p?.label || 'Form').slice(0, 120)),
            url: sanitizeUrl(p?.url)
        }))
        .filter((p) => p.url)
        .map((p) =>
            `<a href="${escapeHtml(p.url)}" style="display:inline-block;margin:4px;padding:8px 16px;background:#104271;color:#fff;border-radius:6px;text-decoration:none;">📄 ${p.label}</a>`
        ).join('')

    const safeEmbassyWeb = sanitizeUrl(embassyWeb ? (String(embassyWeb).startsWith('http') ? embassyWeb : `https://${embassyWeb}`) : '')
    const embassyHtml = embassyName ? `
    <h3 style="color:#104271;margin-top:20px;">🏛 Büyükelçilik</h3>
    <p><strong>${escapeHtml(embassyName)}</strong><br/>
    ${escapeHtml(embassyAddress || '')}<br/>
    ${embassyPhone ? `📞 ${escapeHtml(embassyPhone)}<br/>` : ''}
    ${safeEmbassyWeb ? `<a href="${escapeHtml(safeEmbassyWeb)}">${escapeHtml(embassyWeb)}</a>` : ''}</p>
  ` : ''

    const safeConsulateWeb = sanitizeUrl(consulateWeb ? (String(consulateWeb).startsWith('http') ? consulateWeb : `https://${consulateWeb}`) : '')
    const consHtml = consulateName ? `
    <h3 style="color:#104271;margin-top:20px;">🏢 Konsolosluk</h3>
    <p><strong>${escapeHtml(consulateName)}</strong><br/>
    ${escapeHtml(consulateAddress || '')}<br/>
    ${consulatePhone ? `📞 ${escapeHtml(consulatePhone)}<br/>` : ''}
    ${safeConsulateWeb ? `<a href="${escapeHtml(safeConsulateWeb)}">${escapeHtml(consulateWeb)}</a>` : ''}</p>
  ` : ''

    const html = `
    <div style="font-family:'Montserrat',Arial,sans-serif;max-width:620px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#104271;color:#fff;padding:28px 32px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:1.4rem;">gelgidek.com</h1>
        <p style="margin:6px 0 0;opacity:.8;">Vize Bilgisi: ${safeCountryName}</p>
      </div>
      <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <p>Merhaba,</p>
        <p><strong>${safeCountryName}</strong> için <em>${safePurpose}</em> amacıyla <em>${safeProfession}</em> kategorisinde gereken belgeler aşağıda listelenmiştir.</p>

        <h3 style="color:#104271;">📋 Gerekli Belgeler</h3>
        <ul style="list-style:none;padding:0;">${docListHtml}</ul>

        ${safeDescription ? `<h3 style="color:#104271;">📝 Açıklama</h3><p>${safeDescription}</p>` : ''}

        ${embassyHtml}
        ${consHtml}

        ${pdfsHtml ? `<h3 style="color:#104271;margin-top:20px;">📂 Formlar ve Dilekçeler</h3>${pdfsHtml}` : ''}

        <hr style="margin:24px 0;border:none;border-top:1px solid #eee;"/>
        <p style="font-size:.82rem;color:#6b7091;">Bu e-posta gelgidek.com tarafından gönderilmiştir. İletişim: <a href="mailto:emre@gelgidek.com">emre@gelgidek.com</a></p>
      </div>
    </div>
  `

    await transporter.sendMail({
        from: config.smtpFrom,
        to: to.trim(),
        subject: `${String(countryName || '').replace(/[\r\n]/g, ' ').slice(0, 80)} Vize Bilgisi — gelgidek.com`,
        html
    })

    return { ok: true }
})
