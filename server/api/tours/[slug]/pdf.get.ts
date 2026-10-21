import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug') || ''
    const tour = await prisma.tour.findUnique({
        where: { slug },
        select: { slug: true, pdfData: true, pdfUrl: true }
    })

    if (!tour || !tour.pdfData) {
        if (tour?.pdfUrl && !tour.pdfUrl.startsWith('/api/')) {
            return sendRedirect(event, tour.pdfUrl, 302)
        }
        throw createError({ statusCode: 404, message: 'PDF broşür bulunamadı' })
    }

    const base64Clean = tour.pdfData.replace(/^data:application\/pdf;base64,/, '')
    const buffer = Buffer.from(base64Clean, 'base64')

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `inline; filename="${tour.slug}.pdf"`)
    setHeader(event, 'Cache-Control', 'public, max-age=3600')

    return buffer
})
