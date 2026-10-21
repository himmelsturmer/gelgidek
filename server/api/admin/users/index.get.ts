import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
    const all = await prisma.admin.findMany({
        select: {
            id: true,
            username: true,
            createdAt: true,
            totpSecret: true,
        },
        orderBy: { id: 'asc' },
    })

    return all.map((a) => ({
        id: a.id,
        username: a.username,
        createdAt: a.createdAt,
        hasTOTP: Boolean(a.totpSecret),
    }))
})
