import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'
import * as xlsx from 'xlsx'

export default defineEventHandler(async (event) => {
  const applications = await prisma.visaApplication.findMany({
    include: {
      customer: true,
      appointment: {
        include: { supplier: true, institution: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  const rows = applications.map(app => ({
    'ID': app.id,
    'Ad': app.customer.ad,
    'Soyad': app.customer.soyad,
    'Pasaport No': app.customer.pasaportNo,
    'TC No': app.customer.tcNo || '',
    'Ülke': app.ulke,
    'Durum': app.durum,
    'Seyahat Tarihi': app.seyahatTarihi ? app.seyahatTarihi.toISOString().slice(0, 10) : '',
    'Vize Başlangıç': app.visaStartDate ? app.visaStartDate.toISOString().slice(0, 10) : '',
    'Vize Bitiş': app.visaEndDate ? app.visaEndDate.toISOString().slice(0, 10) : '',
    'Para Birimi': app.currency,
    'Toplam Tutar (Müşteri)': app.toplamTutar,
    'Ödenen Tutar (Müşteri)': app.odenenTutar,
    'Kalan Bakiye (Müşteri)': app.toplamTutar - app.odenenTutar,
    'Tedarikçi Maliyeti': app.supplierCost,
    'Tedarikçi Para Birimi': app.supplierCurrency,
    'Randevu Tarihi': app.appointment?.tarih ? app.appointment.tarih.toISOString().slice(0, 10) : '',
    'Randevu Saati': app.appointment?.saat || '',
    'Aracı Kurum': app.appointment?.institution?.ad || '',
    'Tedarikçi': app.appointment?.supplier?.ofisAdi || '',
    'Notlar': app.notlar || ''
  }))

  const worksheet = xlsx.utils.json_to_sheet(rows)
  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Başvurular')

  const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })

  event.node.res.setHeader('Content-Disposition', 'attachment; filename="vize_basvurulari.xlsx"')
  event.node.res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

  return buffer
})
