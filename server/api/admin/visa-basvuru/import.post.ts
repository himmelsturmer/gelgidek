import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'
import * as xlsx from 'xlsx'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, message: 'Dosya bulunamadı' })
  }

  const file = formData.find(f => f.name === 'file')
  if (!file) {
    throw createError({ statusCode: 400, message: 'Geçersiz dosya yüklemesi' })
  }

  const workbook = xlsx.read(file.data, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const rows: any[] = xlsx.utils.sheet_to_json(worksheet)

  let successCount = 0

  for (const row of rows) {
    if (!row['Ad'] || !row['Soyad'] || !row['Pasaport No'] || !row['Ülke']) {
      continue // Zorunlu alanlar yoksa atla
    }

    await prisma.visaApplication.create({
      data: {
        ulke: String(row['Ülke']),
        durum: row['Durum'] || 'EVRAK_BEKLIYOR',
        seyahatTarihi: row['Seyahat Tarihi'] ? new Date(row['Seyahat Tarihi']) : null,
        toplamTutar: parseFloat(row['Toplam Tutar (Müşteri)']) || 0,
        odenenTutar: parseFloat(row['Ödenen Tutar (Müşteri)']) || 0,
        currency: row['Para Birimi'] || 'TRY',
        supplierCost: parseFloat(row['Tedarikçi Maliyeti']) || 0,
        supplierCurrency: row['Tedarikçi Para Birimi'] || 'TRY',
        notlar: row['Notlar'] ? String(row['Notlar']) : null,
        customer: {
          create: {
            ad: String(row['Ad']),
            soyad: String(row['Soyad']),
            pasaportNo: String(row['Pasaport No']),
            tcNo: row['TC No'] ? String(row['TC No']) : null,
          }
        }
      }
    })
    successCount++
  }

  return { success: true, count: successCount }
})
