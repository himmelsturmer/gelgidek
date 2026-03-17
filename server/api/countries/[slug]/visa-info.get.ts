import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug') || ''
    const query = getQuery(event)
    const purpose = query.purpose as string
    const profession = query.profession as string

    if (!purpose || !profession) {
        throw createError({ statusCode: 400, message: 'purpose ve profession parametreleri zorunlu' })
    }

    const country = await prisma.country.findUnique({ where: { slug } })
    if (!country) throw createError({ statusCode: 404, message: 'Ülke bulunamadı' })

    const info = await prisma.visaInfo.findFirst({
        where: { countryId: country.id, purpose, profession }
    })

    if (!info) throw createError({ statusCode: 404, message: 'Vize bilgisi bulunamadı' })

    return {
        ...info,
        documentList: JSON.parse(info.documentList || '[]'),
        applicationZones: JSON.parse(info.applicationZones || '[]')
    }
})
