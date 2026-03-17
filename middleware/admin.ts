// Admin route guard — client-side middleware
export default defineNuxtRouteMiddleware((to) => {
    // Sadece /admin altındaki sayfalarda çalış; login sayfası hariç
    if (to.path === '/admin' || to.path === '/admin/') return

    const token = useCookie('admin_token')
    if (!token.value) {
        return navigateTo('/admin')
    }
})
