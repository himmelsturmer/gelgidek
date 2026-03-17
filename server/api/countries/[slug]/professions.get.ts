import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug') || ''
    const query = getQuery(event)
    const purpose = query.purpose as string

    if (!purpose) throw createError({ statusCode: 400, message: 'purpose parametresi zorunlu' })

    const country = await prisma.country.findUnique({ where: { slug } })
    if (!country) throw createError({ statusCode: 404, message: 'Ülke bulunamadı' })

    const professions = await prisma.visaInfo.findMany({
        where: { countryId: country.id, purpose },
        select: { profession: true },
        distinct: ['profession']
    })

    return professions.map(p => p.profession)
})
