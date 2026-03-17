import { prisma } from '~/server/utils/prisma'

// GET /api/admin/home-countries — tüm ülkeler, showOnHome + homeOrder ile
export default defineEventHandler(async () => {
    return prisma.country.findMany({
        orderBy: { name: 'asc' },
        select: { id: true, name: true, slug: true, flagUrl: true, showOnHome: true, homeOrder: true }
    })
})
