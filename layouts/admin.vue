<template>
  <div class="admin-layout">
    <div
      v-if="sidebarOpen"
      class="admin-sidebar-overlay"
      @click="sidebarOpen = false"
    ></div>

    <aside :class="['admin-sidebar', sidebarOpen && 'admin-sidebar--open']">
      <div class="admin-sidebar__brand" style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <div>
          <div class="brand-name">gelgidek.com</div>
          <div class="brand-sub">Admin Paneli</div>
        </div>
        <button
          type="button"
          class="admin-sidebar__close"
          aria-label="Menüyü Kapat"
          @click="sidebarOpen = false"
        >
          &times;
        </button>
      </div>

      <nav class="admin-sidebar__nav">
        <div class="admin-nav-section">Genel</div>
        <NuxtLink class="admin-nav-item" to="/admin/dashboard" @click="sidebarOpen = false">
          📊 Dashboard
        </NuxtLink>

        <div class="admin-nav-section">Ana Sayfa</div>
        <NuxtLink class="admin-nav-item" to="/admin/carousel" @click="sidebarOpen = false">
          🖼 Carousel Yönetimi
        </NuxtLink>
        <NuxtLink class="admin-nav-item" to="/admin/home-countries" @click="sidebarOpen = false">
          🌍 Ülke Kartları
        </NuxtLink>

        <div class="admin-nav-section">İçerik</div>
        <NuxtLink class="admin-nav-item" to="/admin/tours" @click="sidebarOpen = false">
          🚌 Turlar Yönetimi
        </NuxtLink>
        <NuxtLink class="admin-nav-item" to="/admin/countries" @click="sidebarOpen = false">
          📋 Ülkeler & Vize Bilgisi
        </NuxtLink>

        <div class="admin-nav-section">CRM</div>
        <NuxtLink class="admin-nav-item" to="/admin/visa-basvuru" @click="sidebarOpen = false">
          🗓 Vize Başvuruları
        </NuxtLink>
        <NuxtLink class="admin-nav-item" to="/admin/crm/settings" @click="sidebarOpen = false">
          ⚙️ B2B Ayarlar & Cari
        </NuxtLink>

        <div class="admin-nav-section">Sistem</div>
        <NuxtLink class="admin-nav-item" to="/admin/users" @click="sidebarOpen = false">
          👤 Kullanıcı Yönetimi
        </NuxtLink>
        <NuxtLink class="admin-nav-item" to="/admin/visa-regime" @click="sidebarOpen = false">
          📋 Vize Rejim Tablosu
        </NuxtLink>
        <NuxtLink class="admin-nav-item" to="/admin/settings" @click="sidebarOpen = false">
          ⚙️ Genel Ayarlar
        </NuxtLink>
        <NuxtLink class="admin-nav-item" to="/" target="_blank" @click="sidebarOpen = false">
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
        <div style="display:flex;align-items:center;gap:12px;">
          <button
            type="button"
            class="admin-topbar__toggle"
            aria-label="Menüyü Aç"
            @click="sidebarOpen = !sidebarOpen"
          >
            ☰
          </button>
          <h1>{{ title }}</h1>
        </div>
        <span style="font-size:0.85rem;color:var(--text-muted);font-weight:600;">Admin</span>
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
const sidebarOpen = ref(false)

watch(() => route.path, () => {
  sidebarOpen.value = false
})

const titles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/carousel': 'Carousel Yönetimi',
  '/admin/home-countries': 'Ana Sayfa Ülke Kartları',
  '/admin/tours': 'Turlar Yönetimi',
  '/admin/countries': 'Ülkeler',
  '/admin/users': 'Kullanıcı Yönetimi',
  '/admin/settings': 'Genel Ayarlar',
  '/admin/visa-regime': 'Vize Rejim Tablosu',
  '/admin/visa-basvuru': 'Vize Başvuruları',
  '/admin/crm/settings': 'B2B Ayarlar & Cari',
}
const title = computed(() => {
  if (route.path.includes('/admin/countries/') && route.params.id) return 'Ülke Düzenleme'
  return titles[route.path] || 'Admin'
})

async function logout() {
  await $fetch('/api/admin/logout', { method: 'POST' }).catch(() => {})
  const sessionCookie = useCookie('admin_session')
  sessionCookie.value = null
  document.cookie = 'admin_token=; Max-Age=0; path=/'
  document.cookie = 'admin_session=; Max-Age=0; path=/'
  router.push('/admin')
}
</script>
