<template>
  <div class="admin-login">
    <div class="admin-login__box">
      <h1>Admin Girişi</h1>
      <p>Yönetim paneline erişmek için giriş yapın.</p>

      <form @submit.prevent="handleLogin" class="admin-form">
        <div v-if="error" class="alert alert--error">{{ error }}</div>

        <div class="form-group">
          <label>Kullanıcı Adı</label>
          <input type="text" v-model="username" required class="form-input" autofocus />
        </div>

        <div class="form-group">
          <label>Şifre</label>
          <input type="password" v-model="password" required class="form-input" />
        </div>

        <button type="submit" class="btn btn--primary btn--block" :disabled="loading" style="margin-top:8px;">
          {{ loading ? 'Giriş Yapılıyor...' : 'Giriş Yap' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Admin login sayfasında layout kullanma
definePageMeta({ layout: false })

useHead({ title: 'Giriş | Admin Paneli' })

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })
    
    // Cookie backend tarafından set ediliyor (httpOnly) ama client tarafı /middleware/admin.ts
    // için dummy bir değer bile yeterli.
    const tokenCookie = useCookie('admin_token', { path: '/' })
    tokenCookie.value = 'loggedIn'
    
    router.push('/admin/dashboard')
  } catch (err: any) {
    error.value = err.data?.message || 'Giriş başarısız. Lütfen tekrar deneyin.'
  } finally {
    loading.value = false
  }
}
</script>
