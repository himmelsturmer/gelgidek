import { prisma } from '~/server/utils/prisma'

function safeParse(val: string | null | undefined, fallback: any = []) {
    if (!val) return fallback
    try { return JSON.parse(val) } catch { return fallback }
}

export default defineEventHandler(async () => {
    const tours = await prisma.tour.findMany({
        where: { active: true },
        orderBy: [{ order: 'asc' }, { id: 'asc' }],
        select: {
            id: true,
            title: true,
            slug: true,
            subtitle: true,
            destination: true,
            duration: true,
            startingPrice: true,
            imageUrl: true,
            pdfUrl: true,
            summaryBadges: true,
            order: true,
            active: true,
        }
    })

    return tours.map((t) => ({
        ...t,
        summaryBadges: safeParse(t.summaryBadges),
    }))
})
