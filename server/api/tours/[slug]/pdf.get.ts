import { prisma } from '~/server/utils/prisma'
import { sanitizeUrl } from '~/server/utils/security'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug') || ''
    const tour = await prisma.tour.findUnique({
        where: { slug },
        select: { slug: true, pdfData: true, pdfUrl: true }
    })

    if (!tour || !tour.pdfData) {
        const safeRedirect = sanitizeUrl(tour?.pdfUrl)
        if (safeRedirect && !safeRedirect.startsWith('/api/')) {
            return sendRedirect(event, safeRedirect, 302)
        }
        throw createError({ statusCode: 404, message: 'PDF broşür bulunamadı' })
    }

    const base64Clean = tour.pdfData.replace(/^data:application\/pdf;base64,/, '')
    const buffer = Buffer.from(base64Clean, 'base64')
    const safeFilename = tour.slug.replace(/[^a-zA-Z0-9_-]/g, '') || 'tur-brosuru'

    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `inline; filename="${safeFilename}.pdf"`)
    setHeader(event, 'Cache-Control', 'public, max-age=3600')

    return buffer
})
