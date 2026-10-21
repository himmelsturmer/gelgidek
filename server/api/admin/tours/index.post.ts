import { prisma } from '~/server/utils/prisma'

function toJsonString(val: any) {
    if (typeof val === 'string') return val
    return JSON.stringify(val || [])
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    return prisma.tour.create({
        data: {
            title: body.title,
            slug: body.slug,
            subtitle: body.subtitle || null,
            destination: body.destination || null,
            duration: body.duration || '',
            startingPrice: body.startingPrice || null,
            imageUrl: body.imageUrl || null,
            pdfUrl: body.pdfUrl || null,
            summaryBadges: toJsonString(body.summaryBadges),
            itinerary: toJsonString(body.itinerary),
            pricingPackages: toJsonString(body.pricingPackages),
            includedServices: toJsonString(body.includedServices),
            excludedServices: toJsonString(body.excludedServices),
            departureDates: toJsonString(body.departureDates),
            specialDates: toJsonString(body.specialDates),
            extraPackage: body.extraPackage || null,
            notes: toJsonString(body.notes),
            order: Number(body.order) || 0,
            active: body.active !== undefined ? Boolean(body.active) : true
        }
    })
})
