import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const supplierId = Number(event.context.params?.id)
  if (!supplierId) throw new Error('Supplier ID required')

  const body = await readBody(event)

  const payment = await prisma.supplierPayment.create({
    data: {
      supplierId,
      tutar: Number(body.tutar),
      currency: body.currency || 'TRY',
      tarih: body.tarih ? new Date(body.tarih) : new Date(),
      not: body.not || null
    }
  })

  return payment
})
