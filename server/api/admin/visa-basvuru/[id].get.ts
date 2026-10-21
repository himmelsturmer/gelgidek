import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'Geçersiz ID' })

  const application = await prisma.visaApplication.findUnique({
    where: { id },
    include: {
      customer: true,
      appointment: { include: { supplier: true, institution: true } },
      payments: { orderBy: { tarih: 'asc' } },
      emailLogs: { orderBy: { sentAt: 'desc' } }
    },
  })

  if (!application) throw createError({ statusCode: 404, message: 'Başvuru bulunamadı' })

  return {
    ...application,
    kalanBakiye: application.toplamTutar - application.odenenTutar,
  }
})
