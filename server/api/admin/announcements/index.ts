import { prisma } from '~/server/utils/prisma'
import { verifyToken } from '~/server/utils/jwt'

async function requireAdmin(event: any) {
    const config = useRuntimeConfig()
    const token = getCookie(event, 'admin_token')
    if (!token) throw createError({ statusCode: 401, message: 'Yetkisiz' })
    try { await verifyToken(token, config.jwtSecret) } 
    catch { throw createError({ statusCode: 401, message: 'Yetkisiz' }) }
}

export default defineEventHandler(async (event) => {
    if (event.method === 'GET') {
        return await prisma.announcement.findMany({ orderBy: { order: 'asc' } })
    }
    if (event.method === 'POST') {
        await requireAdmin(event)
        const body = await readBody(event)
        return await prisma.announcement.create({ data: { title: body.title, content: body.content, order: body.order ?? 0, active: body.active ?? true } })
    }
})
