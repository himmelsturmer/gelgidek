import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const {
    // Müşteri
    ad, soyad, pasaportNo, tcNo, telefon, email, dogumTarihi,
    // Başvuru
    ulke, seyahatTarihi, durum, notlar, visaStartDate, visaEndDate,
    // Finans
    toplamTutar, odenenTutar, currency, supplierCost, supplierCurrency,
    // Randevu
    randevuTarih, randevuSaat, institutionId, supplierId,
  } = body

  if (!ad || !soyad || !pasaportNo || !ulke) {
    throw createError({ statusCode: 400, message: 'Zorunlu alanlar eksik: ad, soyad, pasaportNo, ulke' })
  }

  const parseD = (val: any) => {
    if (!val) return null
    const d = new Date(val)
    if (isNaN(d.getTime())) return null
    if (d.getFullYear() > 9999 || d.getFullYear() < 1900) return null
    return d
  }

  const application = await prisma.visaApplication.create({
    data: {
      ulke,
      seyahatTarihi: parseD(seyahatTarihi),
      durum: durum || 'EVRAK_BEKLIYOR',
      notlar: notlar || null,
      visaStartDate: parseD(visaStartDate),
      visaEndDate: parseD(visaEndDate),
      currency: currency || 'TRY',
      toplamTutar: parseFloat(toplamTutar) || 0,
      odenenTutar: parseFloat(odenenTutar) || 0,
      supplierCost: parseFloat(supplierCost) || 0,
      supplierCurrency: supplierCurrency || 'TRY',
      customer: {
        create: {
          ad: String(ad).trim(),
          soyad: String(soyad).trim(),
          pasaportNo: String(pasaportNo).trim(),
          tcNo: tcNo ? String(tcNo).trim() : null,
          telefon: telefon ? String(telefon).trim() : null,
          email: email ? String(email).trim() : null,
          dogumTarihi: parseD(dogumTarihi),
        },
      },
      ...(randevuTarih && randevuSaat && parseD(randevuTarih) ? {
        appointment: {
          create: {
            tarih: parseD(randevuTarih)!,
            saat: randevuSaat,
            ...(institutionId ? { institutionId: parseInt(institutionId) } : {}),
            ...(supplierId ? { supplierId: parseInt(supplierId) } : {}),
          },
        },
      } : {}),
    },
    include: {
      customer: true,
      appointment: { include: { supplier: true, institution: true } },
    },
  })

  return {
    ...application,
    kalanBakiye: application.toplamTutar - application.odenenTutar,
  }
})
