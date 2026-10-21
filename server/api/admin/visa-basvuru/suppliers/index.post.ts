import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { ofisAdi, adres, mapsLink } = body

  if (!ofisAdi) throw createError({ statusCode: 400, message: 'Ofis adı zorunludur' })

  const supplier = await prisma.visaSupplier.create({
    data: { ofisAdi, adres: adres || null, mapsLink: mapsLink || null },
  })
  return supplier
})
