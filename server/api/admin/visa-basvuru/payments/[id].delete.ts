import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'Geçersiz ID' })

  const payment = await prisma.visaPayment.findUnique({ where: { id } })
  if (!payment) return { success: false }

  await prisma.visaPayment.delete({ where: { id } })

  const app = await prisma.visaApplication.findUnique({ where: { id: payment.applicationId } })
  if (app && app.currency === payment.currency) {
    await prisma.visaApplication.update({
      where: { id: app.id },
      data: { odenenTutar: Math.max(0, app.odenenTutar - payment.tutar) }
    })
  }

  return { success: true }
})
