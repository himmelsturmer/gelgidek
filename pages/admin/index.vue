<template>
  <div class="admin-login">
    <div class="admin-login__box">
      <h1>Admin Girişi</h1>
      <p>Yönetim paneline erişmek için giriş yapın.</p>

      <!-- Step 1: Username + Password -->
      <form v-if="step === 'credentials'" @submit.prevent="handleLogin" class="admin-form">
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

      <!-- Step 2: TOTP Code -->
      <form v-else-if="step === 'totp'" @submit.prevent="handleTotp" class="admin-form">
        <div v-if="error" class="alert alert--error">{{ error }}</div>

        <div style="text-align:center;margin-bottom:20px;">
          <div style="font-size:2.5rem;">🔐</div>
          <p style="color:var(--text-muted);font-size:0.9rem;margin-top:8px;">
            Google Authenticator uygulamasındaki 6 haneli kodu girin.
          </p>
        </div>

        <div class="form-group">
          <label>Doğrulama Kodu</label>
          <input
            type="text"
            v-model="totpCode"
            required
            class="form-input"
            placeholder="123456"
            maxlength="6"
            pattern="\d{6}"
            autofocus
            style="text-align:center;letter-spacing:0.3em;font-size:1.4rem;"
          />
        </div>

        <button type="submit" class="btn btn--primary btn--block" :disabled="loading" style="margin-top:8px;">
          {{ loading ? 'Doğrulanıyor...' : 'Doğrula' }}
        </button>
        <button type="button" class="btn btn--ghost btn--block" @click="step = 'credentials'; error = ''" style="margin-top:8px;">
          ← Geri Dön
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
const totpCode = ref('')
const tempToken = ref('')
const loading = ref(false)
const error = ref('')
const step = ref<'credentials' | 'totp'>('credentials')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const res: any = await $fetch('/api/admin/login', {
      method: 'POST',
      body: { username: username.value, password: password.value }
    })

    if (res.requireTotp) {
      tempToken.value = res.tempToken
      step.value = 'totp'
      return
    }

    // No 2FA — set session marker and redirect
    const sessionCookie = useCookie('admin_session', { path: '/', maxAge: 60 * 60 * 24 * 7 })
    sessionCookie.value = '1'
    window.location.href = '/admin/dashboard'
  } catch (err: any) {
    error.value = err.data?.message || 'Giriş başarısız. Lütfen tekrar deneyin.'
  } finally {
    loading.value = false
  }
}

const handleTotp = async () => {
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/admin/totp-verify', {
      method: 'POST',
      body: { tempToken: tempToken.value, code: totpCode.value }
    })

    const sessionCookie = useCookie('admin_session', { path: '/', maxAge: 60 * 60 * 24 * 7 })
    sessionCookie.value = '1'
    window.location.href = '/admin/dashboard'
  } catch (err: any) {
    error.value = err.data?.message || 'Geçersiz kod. Lütfen tekrar deneyin.'
    totpCode.value = ''
  } finally {
    loading.value = false
  }
}
</script>
