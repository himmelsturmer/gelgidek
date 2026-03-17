import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, slug, flagUrl, continent, showOnHome, homeOrder } = body

    if (!name || !slug) throw createError({ statusCode: 400, message: 'name ve slug zorunludur' })

    return prisma.country.create({
        data: { name, slug, flagUrl, continent, showOnHome: showOnHome ?? false, homeOrder: homeOrder ?? null }
    })
})
