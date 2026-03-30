import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const id = parseInt(getRouterParam(event, 'id') || '0')
    const body = await readBody(event)
    const { name, slug, flagUrl, continent, showOnHome, homeOrder } = body

    return prisma.country.update({
        where: { id },
        data: {
            ...(name !== undefined && { name }),
            ...(slug !== undefined && { slug }),
            ...(flagUrl !== undefined && { flagUrl }),
            ...(continent !== undefined && { continent }),
            ...(showOnHome !== undefined && { showOnHome }),
            ...(homeOrder !== undefined && { homeOrder })
        }
    })
})
