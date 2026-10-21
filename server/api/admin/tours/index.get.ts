import { prisma } from '~/server/utils/prisma'

function safeParse(val: string | null | undefined, fallback: any = []) {
    if (!val) return fallback
    try { return JSON.parse(val) } catch { return fallback }
}

export default defineEventHandler(async () => {
    const tours = await prisma.tour.findMany({
        orderBy: [{ order: 'asc' }, { id: 'asc' }]
    })

    return tours.map(({ pdfData, ...t }) => ({
        ...t,
        hasUploadedPdf: Boolean(pdfData),
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
