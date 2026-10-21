import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) throw new Error('Geçersiz ID')

  await prisma.supplierPayment.delete({
    where: { id }
  })

  return { success: true }
})
