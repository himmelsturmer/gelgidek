import { prisma } from '~/server/utils/prisma'

function safeParse(val: string | null | undefined, fallback: any = []) {
    if (!val) return fallback
    try { return JSON.parse(val) } catch { return fallback }
}

export default defineEventHandler(async () => {
    const tours = await prisma.tour.findMany({
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
            itinerary: true,
            pricingPackages: true,
            includedServices: true,
            excludedServices: true,
            departureDates: true,
            specialDates: true,
            extraPackage: true,
            notes: true,
            order: true,
            active: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    return tours.map((t) => ({
        ...t,
        summaryBadges: safeParse(t.summaryBadges),
        itinerary: safeParse(t.itinerary),
        pricingPackages: safeParse(t.pricingPackages),
        includedServices: safeParse(t.includedServices),
        excludedServices: safeParse(t.excludedServices),
        departureDates: safeParse(t.departureDates),
        specialDates: safeParse(t.specialDates),
        notes: safeParse(t.notes)
    }))
})
