import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const paymentId = Number(event.context.params?.id)
  if (!paymentId) throw new Error('Payment ID required')

  const body = await readBody(event)

  const payment = await prisma.supplierPayment.update({
    where: { id: paymentId },
    data: {
      tutar: body.tutar ? Number(body.tutar) : undefined,
      currency: body.currency,
      tarih: body.tarih ? new Date(body.tarih) : undefined,
      not: body.not !== undefined ? body.not : undefined
    }
  })

  return payment
})
