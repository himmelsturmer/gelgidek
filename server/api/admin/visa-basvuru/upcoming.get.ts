import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const now = new Date()

  const oneDayLater = new Date(now)
  oneDayLater.setDate(oneDayLater.getDate() + 1)
  oneDayLater.setHours(23, 59, 59, 999)

  const fifteenDaysLater = new Date(now)
  fifteenDaysLater.setDate(fifteenDaysLater.getDate() + 15)
  fifteenDaysLater.setHours(23, 59, 59, 999)

  const appointments = await prisma.visaAppointment.findMany({
    where: {
      tarih: {
        gte: now,
        lte: fifteenDaysLater,
      },
    },
    include: {
      application: {
        include: { customer: true },
      },
      supplier: true,
    },
    orderBy: { tarih: 'asc' },
  })

  const result = appointments.map((apt) => {
    const diffMs = apt.tarih.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    let urgency: 'critical' | 'warning' | 'normal' = 'normal'
    if (diffDays <= 2) urgency = 'critical'
    else if (diffDays <= 7) urgency = 'warning'

    return {
      ...apt,
      diffDays,
      urgency,
    }
  })

  return result
})
