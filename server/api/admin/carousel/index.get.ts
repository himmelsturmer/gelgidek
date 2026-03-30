import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    // Tüm slaytları admin için döndür
    return prisma.carouselSlide.findMany({ orderBy: { order: 'asc' } })
})
