<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar__brand">
        <div class="brand-name">gelgidek.com</div>
        <div class="brand-sub">Admin Paneli</div>
      </div>

      <nav class="admin-sidebar__nav">
        <div class="admin-nav-section">Genel</div>
        <NuxtLink class="admin-nav-item" to="/admin/dashboard">
          📊 Dashboard
        </NuxtLink>

        <div class="admin-nav-section">Ana Sayfa</div>
        <NuxtLink class="admin-nav-item" to="/admin/carousel">
          🖼 Carousel Yönetimi
        </NuxtLink>
        <NuxtLink class="admin-nav-item" to="/admin/home-countries">
          🌍 Ülke Kartları
        </NuxtLink>

        <div class="admin-nav-section">İçerik</div>
        <NuxtLink class="admin-nav-item" to="/admin/countries">
          📋 Ülkeler & Vize Bilgisi
        </NuxtLink>

        <div class="admin-nav-section">Sistem</div>
        <NuxtLink class="admin-nav-item" to="/" target="_blank">
          🌐 Siteyi Görüntüle
        </NuxtLink>
      </nav>

      <div class="admin-sidebar__footer">
        <button class="admin-nav-item" style="width:100%;border:none;cursor:pointer;" @click="logout">
          🚪 Çıkış Yap
        </button>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <h1>{{ title }}</h1>
        <span style="font-size:0.85rem;color:var(--text-muted);">Admin</span>
      </header>

      <div class="admin-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'AdminLayout' })

const route = useRoute()
const router = useRouter()

const titles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/carousel': 'Carousel Yönetimi',
  '/admin/home-countries': 'Ana Sayfa Ülke Kartları',
  '/admin/countries': 'Ülkeler',
}
const title = computed(() => {
  if (route.path.includes('/admin/countries/') && route.params.id) return 'Ülke Düzenleme'
  return titles[route.path] || 'Admin'
})

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
  document.cookie = 'admin_token=; Max-Age=0; path=/'
  router.push('/admin')
}
</script>
