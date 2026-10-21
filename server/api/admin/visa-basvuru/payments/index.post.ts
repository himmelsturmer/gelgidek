import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { applicationId, tutar, currency, tarih, not } = body

  if (!applicationId || !tutar) throw createError({ statusCode: 400, message: 'Başvuru ID ve Tutar zorunludur' })

  const payment = await prisma.visaPayment.create({
    data: {
      applicationId: parseInt(applicationId),
      tutar: parseFloat(tutar),
      currency: currency || 'TRY',
      tarih: tarih ? new Date(tarih) : new Date(),
      not: not || null
    }
  })

  // Toplam odenenTutar cache güncelleniyor (Yalnızca aynı döviz cinsiyse anlamlı olur)
  const app = await prisma.visaApplication.findUnique({ where: { id: parseInt(applicationId) } })
  if (app && app.currency === currency) {
    await prisma.visaApplication.update({
      where: { id: app.id },
      data: { odenenTutar: app.odenenTutar + parseFloat(tutar) }
    })
  }

  return payment
})
