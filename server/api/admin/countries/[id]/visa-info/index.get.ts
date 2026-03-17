import { prisma } from '~/server/utils/prisma'

// GET — Ülkenin tüm visa info kayıtları
export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const visaInfos = await prisma.visaInfo.findMany({
        where: { countryId: id },
        orderBy: [{ purpose: 'asc' }, { profession: 'asc' }]
    })
    return visaInfos.map(v => ({
        ...v,
        documentList: JSON.parse(v.documentList || '[]'),
        applicationZones: JSON.parse(v.applicationZones || '[]')
    }))
})
