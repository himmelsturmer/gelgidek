import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    const { imageUrl, title, subtitle, link, order, active } = body

    const slide = await prisma.carouselSlide.update({
        where: { id },
        data: {
            ...(imageUrl !== undefined && { imageUrl }),
            ...(title !== undefined && { title }),
            ...(subtitle !== undefined && { subtitle }),
            ...(link !== undefined && { link }),
            ...(order !== undefined && { order }),
            ...(active !== undefined && { active })
        }
    })
    return slide
})
