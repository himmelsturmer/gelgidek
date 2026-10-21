export default defineEventHandler(async (event) => {
    deleteCookie(event, 'admin_token', { path: '/' })
    deleteCookie(event, 'admin_session', { path: '/' })
    return { ok: true }
})
