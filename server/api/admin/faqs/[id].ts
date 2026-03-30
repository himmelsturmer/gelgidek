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
        return await prisma.faq.update({ where: { id }, data: { question: body.question, answer: body.answer, order: body.order } })
    }
    if (event.method === 'DELETE') {
        await prisma.faq.delete({ where: { id } })
        return { ok: true }
    }
})
