import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    return prisma.country.findMany({
        orderBy: { name: 'asc' },
        include: {
            _count: { select: { visaInfos: true } }
        }
    })
})
