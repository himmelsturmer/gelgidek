import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    // We expect body to be a key-value object of settings
    for (const [key, value] of Object.entries(body)) {
        if (typeof value === 'string') {
            await prisma.setting.upsert({
                where: { key },
                update: { value },
                create: { key, value }
            })
        }
    }
    
    return { ok: true }
})
