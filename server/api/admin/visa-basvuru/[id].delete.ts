import { defineEventHandler, getRouterParam, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'Geçersiz ID' })

  // Cascade delete – müşteri de silinir (VisaCustomer → applications cascade)
  await prisma.visaApplication.delete({ where: { id } })

  return { success: true }
})
