import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    return prisma.country.findMany({
        where: { showOnHome: true },
        orderBy: { homeOrder: 'asc' }
    })
})
