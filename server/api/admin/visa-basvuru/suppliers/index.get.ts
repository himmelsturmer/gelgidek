import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  return await prisma.visaSupplier.findMany({
    orderBy: { ofisAdi: 'asc' },
    include: {
      payments: {
        orderBy: { tarih: 'asc' }
      },
      appointments: {
        include: {
          application: {
            include: {
              customer: true
            }
          }
        }
      }
    }
  })
})
