import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'
import { subtractWorkingDays } from '~/server/utils/dateCalculations'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'Geçersiz ID' })

  const application = await prisma.visaApplication.findUnique({
    where: { id },
    include: {
      customer: true,
      appointment: {
        include: { supplier: true, institution: true }
      }
    }
  })

  if (!application || !application.appointment) {
    throw createError({ statusCode: 404, message: 'Başvuru veya bağlı randevu bulunamadı' })
  }

  const apptDate = application.appointment.tarih
  
  // Evrak Hazırlama Başlangıç: Randevu Tarihi - 10 Takvim Günü
  const evrakBaslangic = new Date(apptDate)
  evrakBaslangic.setDate(evrakBaslangic.getDate() - 10)

  // Evrak Son Teslim: Randevu Tarihi - 3 İş Günü (Tatilleri ve Hafta sonunu atlayarak hesaplar)
  const evrakTeslim = await subtractWorkingDays(apptDate, 3)

  return {
    application,
    evrakBaslangic,
    evrakTeslim
  }
})
