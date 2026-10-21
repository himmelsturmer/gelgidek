import { prisma } from '~/server/utils/prisma'

function toJsonString(val: any) {
    if (typeof val === 'string') return val
    return JSON.stringify(val || [])
}

export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    const pdfUrl = body.pdfData
        ? `/api/tours/${body.slug}/pdf`
        : body.pdfUrl

    const updated = await prisma.tour.update({
        where: { id },
        data: {
            ...(body.title !== undefined && { title: body.title }),
            ...(body.slug !== undefined && { slug: body.slug }),
            ...(body.subtitle !== undefined && { subtitle: body.subtitle || null }),
            ...(body.destination !== undefined && { destination: body.destination || null }),
            ...(body.duration !== undefined && { duration: body.duration }),
            ...(body.startingPrice !== undefined && { startingPrice: body.startingPrice || null }),
            ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl || null }),
            ...(pdfUrl !== undefined && { pdfUrl: pdfUrl || null }),
            ...(body.pdfData !== undefined && body.pdfData !== '' && { pdfData: body.pdfData }),
            ...(body.summaryBadges !== undefined && { summaryBadges: toJsonString(body.summaryBadges) }),
            ...(body.itinerary !== undefined && { itinerary: toJsonString(body.itinerary) }),
            ...(body.pricingPackages !== undefined && { pricingPackages: toJsonString(body.pricingPackages) }),
            ...(body.includedServices !== undefined && { includedServices: toJsonString(body.includedServices) }),
            ...(body.excludedServices !== undefined && { excludedServices: toJsonString(body.excludedServices) }),
            ...(body.departureDates !== undefined && { departureDates: toJsonString(body.departureDates) }),
            ...(body.specialDates !== undefined && { specialDates: toJsonString(body.specialDates) }),
            ...(body.extraPackage !== undefined && { extraPackage: body.extraPackage || null }),
            ...(body.notes !== undefined && { notes: toJsonString(body.notes) }),
            ...(body.order !== undefined && { order: Number(body.order) || 0 }),
            ...(body.active !== undefined && { active: Boolean(body.active) })
        }
    })

    const { pdfData, ...rest } = updated
    return rest
})
