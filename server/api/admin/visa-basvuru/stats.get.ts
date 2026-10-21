import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const now = new Date()
  const todayStart = new Date(now)
  todayStart.setHours(0, 0, 0, 0)
  const todayEnd = new Date(now)
  todayEnd.setHours(23, 59, 59, 999)

  const [
    bugunRandevular,
    toplamBasvuru,
    onaylananlar,
    toplamMusteriSayisi,
  ] = await Promise.all([
    prisma.visaAppointment.count({
      where: { tarih: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.visaApplication.count(),
    prisma.visaApplication.count({ where: { durum: 'ONAY' } }),
    prisma.visaCustomer.count(),
  ])

  // Kalan bakiyesi bulunanlar: raw query ile
  const odemesBekleyenlerResult = await prisma.$queryRaw<{ count: string }[]>`
    SELECT COUNT(*)::text as count FROM "VisaApplication"
    WHERE "toplamTutar" > 0 AND "odenenTutar" < "toplamTutar"
  `
  const odemesBekleyenler = parseInt(odemesBekleyenlerResult[0]?.count ?? '0', 10)

  const onayOrani = toplamBasvuru > 0 ? Math.round((onaylananlar / toplamBasvuru) * 100) : 0

  return {
    bugunRandevular,
    odemesBekleyenler,
    onayOrani,
    toplamBasvuru,
    onaylananlar,
    toplamMusteriSayisi,
  }
})
