import { prisma } from '~/server/utils/prisma'

// POST /api/admin/home-countries — toplu güncelleme
export default defineEventHandler(async (event) => {
    const body = await readBody(event) // [{ id, showOnHome, homeOrder }]

    await Promise.all(
        body.map((item: { id: number, showOnHome: boolean, homeOrder: number | null }) =>
            prisma.country.update({
                where: { id: item.id },
                data: { showOnHome: item.showOnHome, homeOrder: item.homeOrder }
            })
        )
    )

    return { ok: true }
})
