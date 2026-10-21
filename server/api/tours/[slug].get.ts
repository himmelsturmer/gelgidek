import { prisma } from '~/server/utils/prisma'

function safeParse(val: string | null | undefined, fallback: any = []) {
    if (!val) return fallback
    try { return JSON.parse(val) } catch { return fallback }
}

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug') || ''
    const tour = await prisma.tour.findUnique({ where: { slug } })

    if (!tour || !tour.active) {
        throw createError({ statusCode: 404, message: 'Tur bulunamadı' })
    }

    return {
        ...tour,
        summaryBadges: safeParse(tour.summaryBadges),
        itinerary: safeParse(tour.itinerary),
        pricingPackages: safeParse(tour.pricingPackages),
        includedServices: safeParse(tour.includedServices),
        excludedServices: safeParse(tour.excludedServices),
        departureDates: safeParse(tour.departureDates),
        specialDates: safeParse(tour.specialDates),
        notes: safeParse(tour.notes)
    }
})
