import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    await prisma.carouselSlide.delete({ where: { id } })
    return { ok: true }
})
