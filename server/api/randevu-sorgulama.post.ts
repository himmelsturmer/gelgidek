import { prisma } from '~/server/utils/prisma'
import { enforceRateLimit } from '~/server/utils/security'

export default defineEventHandler(async (event) => {
  enforceRateLimit(event, 'randevu-sorgulama', 15, 10 * 60 * 1000)

  const body = await readBody(event)
  const pasaportNo = typeof body?.pasaportNo === 'string' ? body.pasaportNo.trim() : ''
  const email = typeof body?.email === 'string' ? body.email.trim() : ''

  if (!pasaportNo || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pasaport numarası ve e-posta adresi zorunludur.'
    })
  }

  try {
    const customer = await prisma.visaCustomer.findFirst({
      where: {
        pasaportNo: { equals: pasaportNo, mode: 'insensitive' },
        email: { equals: email, mode: 'insensitive' }
      },
      include: {
        applications: {
          select: {
            id: true,
            ulke: true,
            seyahatTarihi: true,
            durum: true,
            notlar: true,
            visaStartDate: true,
            visaEndDate: true,
            createdAt: true,
            appointment: {
              select: {
                id: true,
                tarih: true,
                saat: true,
                konum: true,
                institution: {
                  select: {
                    ad: true,
                    adres: true,
                    mapsLink: true
                  }
                },
                supplier: {
                  select: {
                    ofisAdi: true,
                    adres: true,
                    mapsLink: true
                  }
                }
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!customer || customer.applications.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Girilen bilgilere ait randevu veya başvuru bulunamadı.'
      })
    }

    return customer.applications
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('Randevu sorgulama hatası:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.'
    })
  }
})
