import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const vid = parseInt(getRouterParam(event, 'vid') || '0')
    const body = await readBody(event)

    const data: Record<string, unknown> = {}
    if (body.purpose !== undefined) data.purpose = body.purpose
    if (body.profession !== undefined) data.profession = body.profession
    if (body.documentList !== undefined) data.documentList = JSON.stringify(body.documentList)
    if (body.applicationZones !== undefined) data.applicationZones = JSON.stringify(body.applicationZones)
    if (body.processingTime !== undefined) data.processingTime = body.processingTime
    if (body.description !== undefined) data.description = body.description
    if (body.embassyName !== undefined) data.embassyName = body.embassyName
    if (body.embassyAddress !== undefined) data.embassyAddress = body.embassyAddress
    if (body.embassyPhone !== undefined) data.embassyPhone = body.embassyPhone
    if (body.embassyWeb !== undefined) data.embassyWeb = body.embassyWeb
    if (body.consulateName !== undefined) data.consulateName = body.consulateName
    if (body.consulateAddress !== undefined) data.consulateAddress = body.consulateAddress
    if (body.consulatePhone !== undefined) data.consulatePhone = body.consulatePhone
    if (body.consulateWeb !== undefined) data.consulateWeb = body.consulateWeb
    if (body.pdf1Url !== undefined) data.pdf1Url = body.pdf1Url
    if (body.pdf1Label !== undefined) data.pdf1Label = body.pdf1Label
    if (body.pdf2Url !== undefined) data.pdf2Url = body.pdf2Url
    if (body.pdf2Label !== undefined) data.pdf2Label = body.pdf2Label
    if (body.pdf3Url !== undefined) data.pdf3Url = body.pdf3Url
    if (body.pdf3Label !== undefined) data.pdf3Label = body.pdf3Label
    if (body.pdf4Url !== undefined) data.pdf4Url = body.pdf4Url
    if (body.pdf4Label !== undefined) data.pdf4Label = body.pdf4Label

    const record = await prisma.visaInfo.update({ where: { id: vid }, data })
    return {
        ...record,
        documentList: JSON.parse(record.documentList || '[]'),
        applicationZones: JSON.parse(record.applicationZones || '[]')
    }
})
