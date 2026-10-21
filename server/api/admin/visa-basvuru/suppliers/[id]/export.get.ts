import { defineEventHandler, setHeader } from 'h3'
import { prisma } from '~/server/utils/prisma'
import * as xlsx from 'xlsx'

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id)
  if (!id) throw new Error('Geçersiz Tedarikçi ID')

  const supplier = await prisma.visaSupplier.findUnique({
    where: { id },
    include: {
      payments: { orderBy: { tarih: 'asc' } },
      appointments: {
        include: {
          application: {
            include: { customer: true }
          }
        }
      }
    }
  })

  if (!supplier) throw new Error('Tedarikçi bulunamadı')

  const rows: any[] = []

  const totals: Record<string, { cost: number, paid: number }> = {}

  // Add Debt (Maliyetler)
  supplier.appointments.forEach((apt) => {
    if (apt.application && apt.application.supplierCost > 0) {
      const curr = apt.application.supplierCurrency || 'TRY'
      if (!totals[curr]) totals[curr] = { cost: 0, paid: 0 }
      totals[curr].cost += apt.application.supplierCost

      rows.push({
        'Tarih': new Date(apt.application.createdAt || apt.tarih).toLocaleDateString('tr-TR'),
        'İşlem Tipi': 'Hizmet Alımı (Borç)',
        'Müşteri / Açıklama': `${apt.application.customer.ad} ${apt.application.customer.soyad} - ${apt.application.ulke} Vizesi`,
        'Tutar': `-${apt.application.supplierCost} ${curr}`,
        'SıralamaTarihi': new Date(apt.application.createdAt || apt.tarih).getTime()
      })
    }
  })

  // Add Payments (Ödemeler)
  supplier.payments.forEach((p) => {
    const curr = p.currency || 'TRY'
    if (!totals[curr]) totals[curr] = { cost: 0, paid: 0 }
    totals[curr].paid += p.tutar

    rows.push({
      'Tarih': new Date(p.tarih).toLocaleDateString('tr-TR'),
      'İşlem Tipi': 'Nakdi/Banka Tahsilat',
      'Müşteri / Açıklama': p.not || 'Tahsilat Makbuzu',
      'Tutar': `+${p.tutar} ${curr}`,
      'SıralamaTarihi': new Date(p.tarih).getTime()
    })
  })

  rows.sort((a, b) => a.SıralamaTarihi - b.SıralamaTarihi)
  rows.forEach(r => delete r.SıralamaTarihi)

  if (rows.length > 0) {
    rows.push({}) // Empty line
    rows.push({
      'Tarih': 'TOPLAM ÖZET',
      'İşlem Tipi': '---',
      'Müşteri / Açıklama': '---',
      'Tutar': '---'
    })
    for (const [curr, vals] of Object.entries(totals)) {
      const balance = vals.cost - vals.paid
      rows.push({
        'Tarih': `Döviz: ${curr}`,
        'İşlem Tipi': `Toplam Maliyet: ${vals.cost} ${curr}`,
        'Müşteri / Açıklama': `Toplam Ödenen: ${vals.paid} ${curr}`,
        'Tutar': `Bakiye: ${balance} ${curr}`
      })
    }
  }

  const wb = xlsx.utils.book_new()
  const ws = xlsx.utils.json_to_sheet(rows)
  xlsx.utils.book_append_sheet(wb, ws, "Cari_Ekstre")

  const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' })

  setHeader(event, 'Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  setHeader(event, 'Content-Disposition', `attachment; filename=Tedarikci_Ekstre_${supplier.ofisAdi.replace(/\s+/g, '_')}.xlsx`)

  return buffer
})
