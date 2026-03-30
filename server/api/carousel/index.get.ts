import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    const slides = await prisma.carouselSlide.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
    })
    return slides
})
