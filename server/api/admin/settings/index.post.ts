import { prisma } from '~/server/utils/prisma'

const ALLOWED_KEYS = new Set([
    'contact_email',
    'contact_phone',
    'contact_whatsapp',
    'contact_address',
    'contact_hours',
    'visa_regime_notice',
])

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body || typeof body !== 'object') {
        throw createError({ statusCode: 400, message: 'Geçersiz veri formatı' })
    }

    const updates = Object.entries(body)
        .filter(([key, value]) => ALLOWED_KEYS.has(key) && typeof value === 'string')
        .map(([key, value]) =>
            prisma.setting.upsert({
                where: { key },
                update: { value: (value as string).trim() },
                create: { key, value: (value as string).trim() }
            })
        )

    await Promise.all(updates)

    return { ok: true }
})
