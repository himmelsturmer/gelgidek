import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { imageUrl, title, subtitle, link, order, active } = body

    if (!imageUrl || !title) {
        throw createError({ statusCode: 400, message: 'imageUrl ve title zorunludur' })
    }

    // En yüksek order değerini bul
    const maxOrder = await prisma.carouselSlide.aggregate({ _max: { order: true } })
    const nextOrder = (maxOrder._max.order ?? 0) + 1

    const slide = await prisma.carouselSlide.create({
        data: {
            imageUrl,
            title,
            subtitle: subtitle || null,
            link: link || null,
            order: order ?? nextOrder,
            active: active !== false
        }
    })
    return slide
})
