import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id as string)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Geçersiz ID' })
  }

  const body = await readBody(event)

  try {
    const data = await prisma.visaInstitution.update({
      where: { id },
      data: {
        ad: body.ad,
        adres: body.adres,
        mapsLink: body.mapsLink
      }
    })
    return { success: true, data }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Kurum güncellenemedi.'
    })
  }
})
