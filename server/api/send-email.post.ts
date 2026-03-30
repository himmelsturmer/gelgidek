import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { to, countryName, purpose, profession, documents, description,
        embassyName, embassyAddress, embassyPhone, embassyWeb,
        consulateName, consulateAddress, consulatePhone, consulateWeb,
        pdfs } = body

    if (!to) throw createError({ statusCode: 400, message: 'Alıcı e-posta adresi zorunludur' })

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

    const docListHtml = (documents || [])
        .map((doc: string) => `<li style="padding:6px 0;border-bottom:1px solid #eee;">✅ ${doc}</li>`)
        .join('')

    const pdfsHtml = (pdfs || [])
        .filter((p: { label: string, url: string }) => p.url)
        .map((p: { label: string, url: string }) =>
            `<a href="${p.url}" style="display:inline-block;margin:4px;padding:8px 16px;background:#104271;color:#fff;border-radius:6px;text-decoration:none;">📄 ${p.label}</a>`
        ).join('')

    const embassyHtml = embassyName ? `
    <h3 style="color:#104271;margin-top:20px;">🏛 Büyükelçilik</h3>
    <p><strong>${embassyName}</strong><br/>
    ${embassyAddress || ''}<br/>
    ${embassyPhone ? `📞 ${embassyPhone}<br/>` : ''}
    ${embassyWeb ? `<a href="${embassyWeb}">${embassyWeb}</a>` : ''}</p>
  ` : ''

    const consHtml = consulateName ? `
    <h3 style="color:#104271;margin-top:20px;">🏢 Konsolosluk</h3>
    <p><strong>${consulateName}</strong><br/>
    ${consulateAddress || ''}<br/>
    ${consulatePhone ? `📞 ${consulatePhone}<br/>` : ''}
    ${consulateWeb ? `<a href="${consulateWeb}">${consulateWeb}</a>` : ''}</p>
  ` : ''

    const html = `
    <div style="font-family:'Montserrat',Arial,sans-serif;max-width:620px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#104271;color:#fff;padding:28px 32px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:1.4rem;">gelgidek.com</h1>
        <p style="margin:6px 0 0;opacity:.8;">Vize Bilgisi: ${countryName}</p>
      </div>
      <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;">
        <p>Merhaba,</p>
        <p><strong>${countryName}</strong> için <em>${purpose}</em> amacıyla <em>${profession}</em> kategorisinde gereken belgeler aşağıda listelenmiştir.</p>

        <h3 style="color:#104271;">📋 Gerekli Belgeler</h3>
        <ul style="list-style:none;padding:0;">${docListHtml}</ul>

        ${description ? `<h3 style="color:#104271;">📝 Açıklama</h3><p>${description}</p>` : ''}

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
        to,
        subject: `${countryName} Vize Bilgisi — gelgidek.com`,
        html
    })

    return { ok: true }
})
