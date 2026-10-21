import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) throw new Error('Supplier ID required')

  const body = await readBody(event)

  const updated = await prisma.visaSupplier.update({
    where: { id },
    data: {
      ofisAdi: body.ofisAdi,
      adres: body.adres,
      mapsLink: body.mapsLink
    }
  })

  return updated
})
