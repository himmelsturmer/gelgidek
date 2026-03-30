import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    const items = await prisma.faq.findMany({
        orderBy: { order: 'asc' }
    })
    return items
})
