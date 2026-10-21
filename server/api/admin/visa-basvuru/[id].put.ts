import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) throw createError({ statusCode: 400, message: 'Geçersiz ID' })

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
    // Randevu silme
    randevuSil,
  } = body

  // Müşteri güncelle
  const existing = await prisma.visaApplication.findUnique({
    where: { id },
    include: { customer: true, appointment: true },
  })
  if (!existing) throw createError({ statusCode: 404, message: 'Başvuru bulunamadı' })

  if (ad || soyad || pasaportNo) {
    await prisma.visaCustomer.update({
      where: { id: existing.customerId },
      data: {
        ...(ad !== undefined ? { ad } : {}),
        ...(soyad !== undefined ? { soyad } : {}),
        ...(pasaportNo !== undefined ? { pasaportNo } : {}),
        ...(tcNo !== undefined ? { tcNo } : {}),
        ...(telefon !== undefined ? { telefon } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(dogumTarihi !== undefined ? { dogumTarihi: dogumTarihi ? new Date(dogumTarihi) : null } : {}),
      },
    })
  }

  // Randevu yönetimi
  if (randevuSil) {
    if (existing.appointment) {
      await prisma.visaAppointment.delete({ where: { applicationId: id } })
    }
  } else if (randevuTarih && randevuSaat) {
    if (existing.appointment) {
      await prisma.visaAppointment.update({
        where: { applicationId: id },
        data: {
          tarih: new Date(randevuTarih),
          saat: randevuSaat,
          institutionId: institutionId ? parseInt(institutionId) : null,
          supplierId: supplierId ? parseInt(supplierId) : null,
        },
      })
    } else {
      await prisma.visaAppointment.create({
        data: {
          applicationId: id,
          tarih: new Date(randevuTarih),
          saat: randevuSaat,
          institutionId: institutionId ? parseInt(institutionId) : null,
          supplierId: supplierId ? parseInt(supplierId) : null,
        },
      })
    }
  }

  // Başvuru güncelle
  const updated = await prisma.visaApplication.update({
    where: { id },
    data: {
      ...(ulke !== undefined ? { ulke } : {}),
      ...(seyahatTarihi !== undefined ? { seyahatTarihi: seyahatTarihi ? new Date(seyahatTarihi) : null } : {}),
      ...(durum !== undefined ? { durum } : {}),
      ...(notlar !== undefined ? { notlar } : {}),
      ...(visaStartDate !== undefined ? { visaStartDate: visaStartDate ? new Date(visaStartDate) : null } : {}),
      ...(visaEndDate !== undefined ? { visaEndDate: visaEndDate ? new Date(visaEndDate) : null } : {}),
      ...(currency !== undefined ? { currency } : {}),
      ...(toplamTutar !== undefined ? { toplamTutar: parseFloat(toplamTutar) } : {}),
      ...(odenenTutar !== undefined ? { odenenTutar: parseFloat(odenenTutar) } : {}),
      ...(supplierCost !== undefined ? { supplierCost: parseFloat(supplierCost) } : {}),
      ...(supplierCurrency !== undefined ? { supplierCurrency } : {}),
    },
    include: {
      customer: true,
      appointment: { include: { supplier: true, institution: true } },
    },
  })

  return {
    ...updated,
    kalanBakiye: updated.toplamTutar - updated.odenenTutar,
  }
})
