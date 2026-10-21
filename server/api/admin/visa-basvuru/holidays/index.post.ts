import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { isim, tarih } = body

  if (!isim || !tarih) throw createError({ statusCode: 400, message: 'Tarih ve isim zorunludur' })

  return await prisma.publicHoliday.create({
    data: { isim, tarih: new Date(tarih) },
  })
})
