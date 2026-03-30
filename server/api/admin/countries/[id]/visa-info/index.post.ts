import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)

    const data = {
        countryId: id,
        purpose: body.purpose,
        profession: body.profession,
        documentList: JSON.stringify(body.documentList || []),
        applicationZones: JSON.stringify(body.applicationZones || []),
        processingTime: body.processingTime || '',
        description: body.description || '',
        embassyName: body.embassyName || null,
        embassyAddress: body.embassyAddress || null,
        embassyPhone: body.embassyPhone || null,
        embassyWeb: body.embassyWeb || null,
        consulateName: body.consulateName || null,
        consulateAddress: body.consulateAddress || null,
        consulatePhone: body.consulatePhone || null,
        consulateWeb: body.consulateWeb || null,
        pdf1Url: body.pdf1Url || null,
        pdf1Label: body.pdf1Label || null,
        pdf2Url: body.pdf2Url || null,
        pdf2Label: body.pdf2Label || null,
        pdf3Url: body.pdf3Url || null,
        pdf3Label: body.pdf3Label || null,
        pdf4Url: body.pdf4Url || null,
        pdf4Label: body.pdf4Label || null,
    }

    const record = await prisma.visaInfo.create({ data })
    return { ...record, documentList: body.documentList, applicationZones: body.applicationZones }
})
