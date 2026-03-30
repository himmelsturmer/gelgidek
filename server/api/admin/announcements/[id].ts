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
    await requireAdmin(event)
    const id = parseInt(event.context.params!.id)
    if (event.method === 'PUT') {
        const body = await readBody(event)
        return await prisma.announcement.update({ where: { id }, data: { title: body.title, content: body.content, order: body.order, active: body.active } })
    }
    if (event.method === 'DELETE') {
        await prisma.announcement.delete({ where: { id } })
        return { ok: true }
    }
})
