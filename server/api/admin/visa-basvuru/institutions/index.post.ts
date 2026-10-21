import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { ad, adres, mapsLink } = body

  if (!ad) throw createError({ statusCode: 400, message: 'Kurum adı zorunludur' })

  return await prisma.visaInstitution.create({
    data: { ad, adres: adres || null, mapsLink: mapsLink || null },
  })
})
