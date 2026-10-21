import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  return await prisma.publicHoliday.findMany({ orderBy: { tarih: 'asc' } })
})
