import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  const now = new Date()
  
  // Bugünden itibaren 60 gün sonrasını belirliyoruz
  const days60Later = new Date(now)
  days60Later.setDate(now.getDate() + 60)

  const applications = await prisma.visaApplication.findMany({
    where: {
      durum: 'ONAY',
      visaEndDate: {
        not: null,
        lte: days60Later // Bitiş tarihi (Bugün + 60 gün) aralığında olanlar veya çoktan geçmiş olanlar
      }
    },
    include: {
      customer: true
    },
    orderBy: {
      visaEndDate: 'asc' // En çok aciliyeti olanlar/yaklaşanlar en üstte durur
    }
  })

  return applications
})
