import { defineEventHandler, getQuery } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { ulke, durum, randevuTarihBas, randevuTarihBit, arama, sayfa, limit } = query

  const where: any = {}

  if (ulke) where.ulke = { contains: String(ulke), mode: 'insensitive' }
  if (durum) where.durum = String(durum)

  if (arama) {
    where.OR = [
      { customer: { ad: { contains: String(arama), mode: 'insensitive' } } },
      { customer: { soyad: { contains: String(arama), mode: 'insensitive' } } },
      { customer: { pasaportNo: { contains: String(arama), mode: 'insensitive' } } },
      { customer: { tcNo: { contains: String(arama), mode: 'insensitive' } } },
      { ulke: { contains: String(arama), mode: 'insensitive' } },
    ]
  }

  if (randevuTarihBas || randevuTarihBit || query.supplierId) {
    where.appointment = {
      ...where.appointment,
      ...(randevuTarihBas ? { tarih: { gte: new Date(String(randevuTarihBas)) } } : {}),
      ...(randevuTarihBit ? { tarih: { ...where.appointment?.tarih, lte: new Date(String(randevuTarihBit)) } } : {}),
      ...(query.supplierId ? { supplierId: Number(query.supplierId) } : {}),
    }
  }

  const page = parseInt(String(sayfa || '1'))
  const pageLimit = parseInt(String(limit || '20'))
  const skip = (page - 1) * pageLimit

  const [applications, total] = await Promise.all([
    prisma.visaApplication.findMany({
      where,
      skip,
      take: pageLimit,
      orderBy: { createdAt: 'desc' },
      include: {
        customer: true,
        appointment: { include: { supplier: true, institution: true } },
      },
    }),
    prisma.visaApplication.count({ where }),
  ])

  const data = applications.map((app) => ({
    ...app,
    kalanBakiye: app.toplamTutar - app.odenenTutar,
  }))

  return { data, total, page, pageLimit }
})
