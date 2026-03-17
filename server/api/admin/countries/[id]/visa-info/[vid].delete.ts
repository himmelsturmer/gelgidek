import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const vid = parseInt(getRouterParam(event, 'vid') || '0')
    await prisma.visaInfo.delete({ where: { id: vid } })
    return { ok: true }
})
