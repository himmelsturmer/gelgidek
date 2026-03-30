import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug') || ''
    const country = await prisma.country.findUnique({ where: { slug } })
    if (!country) throw createError({ statusCode: 404, message: 'Ülke bulunamadı' })

    const purposes = await prisma.visaInfo.findMany({
        where: { countryId: country.id },
        select: { purpose: true },
        distinct: ['purpose']
    })

    return purposes.map(p => p.purpose)
})
