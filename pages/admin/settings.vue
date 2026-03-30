<template>
  <div class="admin-page">
    <div class="admin-header">
      <h2>Genel Ayarlar</h2>
      <p class="muted">Site genelindeki metinleri ve iletişim bilgilerini düzenleyin.</p>
    </div>

    <div v-if="loading" class="loading">Yükleniyor...</div>

    <div v-else class="settings-form info-card">
      <form @submit.prevent="saveSettings">
        
        <h3 style="margin-top:0; border-bottom:1px solid #eee; padding-bottom:8px;">İletişim Bilgileri</h3>
        
        <div class="form-group">
          <label>E-posta Adresi</label>
          <input type="email" v-model="settings.contact_email" class="form-control" placeholder="Örn: info@domain.com" />
        </div>
        
        <div class="form-group">
          <label>Telefon Numarası</label>
          <input type="text" v-model="settings.contact_phone" class="form-control" placeholder="Örn: +90 555 555 55 55" />
        </div>
        
        <div class="form-group">
          <label>WhatsApp Numarası (Sadece rakam)</label>
          <input type="text" v-model="settings.contact_whatsapp" class="form-control" placeholder="Örn: 905555555555" />
        </div>

        <div class="form-group">
          <label>Fiziksel Adres</label>
          <input type="text" v-model="settings.contact_address" class="form-control" placeholder="Adresiniz" />
        </div>

        <div class="form-group">
          <label>Çalışma Saatleri</label>
          <input type="text" v-model="settings.contact_hours" class="form-control" placeholder="Hafta içi 09:00 - 18:00" />
        </div>

        <h3 style="margin-top:24px; border-bottom:1px solid #eee; padding-bottom:8px;">Vize Rejim Tablosu Notu</h3>
        <p class="tiny muted" style="margin-bottom:12px">Bu not, Vize Rejim Tablosu sayfasının en üstünde uyarı olarak görünür.</p>
        
        <div class="form-group">
          <label>Tavsiye Metni</label>
          <textarea v-model="settings.visa_regime_notice" class="form-control" rows="4"></textarea>
        </div>

        <div style="margin-top: 24px; display: flex; align-items: center; gap: 16px;">
          <button type="submit" class="btn btn--primary" :disabled="saving">
            {{ saving ? 'Kaydediliyor...' : 'Ayarları Kaydet' }}
          </button>
          <p v-if="successMsg" style="color: green; margin: 0; font-size: 0.9rem;">{{ successMsg }}</p>
          <p v-if="errorMsg" style="color: red; margin: 0; font-size: 0.9rem;">{{ errorMsg }}</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const loading = ref(true)
const saving = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const settings = ref({
  contact_email: '',
  contact_phone: '',
  contact_whatsapp: '',
  contact_address: '',
  contact_hours: '',
  visa_regime_notice: ''
})

onMounted(async () => {
  try {
    const data = await $fetch('/api/settings')
    if (data) {
      Object.assign(settings.value, data)
    }
  } catch (err) {
    errorMsg.value = 'Ayarlar yüklenemedi.'
  } finally {
    loading.value = false
  }
})

async function saveSettings() {
  saving.value = true
  successMsg.value = ''
  errorMsg.value = ''
  
  try {
    await $fetch('/api/admin/settings', {
      method: 'POST',
      body: settings.value
    })
    successMsg.value = 'Ayarlar başarıyla kaydedildi!'
    setTimeout(() => successMsg.value = '', 3000)
  } catch (err) {
    errorMsg.value = err.data?.message || 'Kaydetme sırasında bir hata oluştu.'
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 0.95rem;
}
.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.form-control:focus {
  border-color: var(--accent);
  outline: none;
}
.admin-page {
  max-width: 800px;
}
</style>
