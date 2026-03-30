import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    const items = await prisma.announcement.findMany({
        where: { active: true },
        orderBy: { order: 'asc' }
    })
    return items
})
