import { prisma } from '~/server/utils/prisma'

/**
 * Verilen bir tarihten, hafta sonlarını ve 'PublicHoliday' tablosundaki resmi tatilleri çıkartarak
 * belirtilen gün sayısı kadar geriye gider.
 */
export async function subtractWorkingDays(date: Date, days: number): Promise<Date> {
  const publicHolidaysObj = await prisma.publicHoliday.findMany({ select: { tarih: true } })
  // Kolay kıyaslama için tatilleri YYYY-MM-DD string formatına çeviriyoruz
  const holidays = new Set(publicHolidaysObj.map(h => {
    // Saat/Zaman dilimi farklarına karşı güvenli olması için padStart kullanıyoruz
    const d = new Date(h.tarih)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }))

  let current = new Date(date)
  let count = 0

  while (count < days) {
    current.setDate(current.getDate() - 1)
    
    // JS'de 0: Pazar, 6: Cumartesi
    const dayOfWeek = current.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6 
    
    // Mevcut iterasyon gününü string yap
    const cYear = current.getFullYear()
    const cMonth = String(current.getMonth() + 1).padStart(2, '0')
    const cDay = String(current.getDate()).padStart(2, '0')
    const isHoliday = holidays.has(`${cYear}-${cMonth}-${cDay}`)

    // Eğer ne haftasonu ne de tatilse bir iş günü sayılır
    if (!isWeekend && !isHoliday) {
      count++
    }
  }

  return current
}
