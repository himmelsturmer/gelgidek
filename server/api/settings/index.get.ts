import { prisma } from '~/server/utils/prisma'

const PUBLIC_SETTING_KEYS = [
    'contact_email',
    'contact_phone',
    'contact_whatsapp',
    'contact_address',
    'contact_hours',
    'visa_regime_notice',
]

export default defineEventHandler(async () => {
    const rows = await prisma.setting.findMany({
        where: { key: { in: PUBLIC_SETTING_KEYS } }
    })
    const settings: Record<string, string> = {}
    for (const r of rows) settings[r.key] = r.value
    return settings
})
