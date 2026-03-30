import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    const rows = await prisma.setting.findMany()
    const settings: Record<string, string> = {}
    for (const r of rows) settings[r.key] = r.value
    return settings
})
