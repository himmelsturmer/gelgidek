import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { supplierId, tutar, currency, tarih, not } = body

  if (!supplierId || !tutar) throw createError({ statusCode: 400, message: 'Tedarikçi ID ve Tutar zorunludur' })

  return await prisma.supplierPayment.create({
    data: {
      supplierId: parseInt(supplierId),
      tutar: parseFloat(tutar),
      currency: currency || 'TRY',
      tarih: tarih ? new Date(tarih) : new Date(),
      not: not || null
    }
  })
})
