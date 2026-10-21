<template>
  <div class="section">
    <div class="container randevu-sorgulama">
      <div class="randevu-grid">
        <!-- Sol taraf: Form -->
        <div class="randevu-form-wrapper">
          <h2>Randevu Sorgulama</h2>
          <p>
            Vize başvurunuza ve randevunuza ait güncel bilgileri görüntülemek için lütfen aşağıdaki bilgileri eksiksiz doldurun.
          </p>

          <form @submit.prevent="submitForm" class="randevu-form">
            <div class="form-group">
              <label for="pasaportNo">Pasaport Numarası</label>
              <input
                id="pasaportNo"
                v-model="form.pasaportNo"
                type="text"
                class="form-control"
                placeholder="Örn: U1234567"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="email">E-posta Adresi</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="Örn: ornek@email.com"
                required
              />
            </div>

            <button type="submit" class="btn btn--block btn--primary" :disabled="loading">
              <span v-if="loading">Sorgulanıyor...</span>
              <span v-else>Sorgula</span>
            </button>
            
            <div v-if="error" class="error-message">
              {{ error }}
            </div>
          </form>
        </div>

        <!-- Sağ taraf: Sonuçlar -->
        <div class="randevu-results-wrapper">
          <div v-if="!hasSearched && !loading" class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>Sorgulama Yapın</h3>
            <p>Sonuçlarınızı görmek için sol taraftaki formu doldurun.</p>
          </div>

          <div v-else-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Bilgileriniz getiriliyor...</p>
          </div>

          <div v-else-if="results && results.length > 0" class="results-list">
            <h3>Başvurularınız ({{ results.length }})</h3>
            <div v-for="app in results" :key="app.id" class="result-card">
              <div class="result-header">
                <h4>{{ app.ulke }} Vizesi</h4>
                <span :class="['status-badge', 'status-' + app.durum.toLowerCase()]">
                  {{ formatDurum(app.durum) }}
                </span>
              </div>
              
              <div class="result-body">
                <div class="info-row" v-if="app.seyahatTarihi">
                  <span class="info-label">Seyahat Tarihi:</span>
                  <span class="info-value">{{ formatDate(app.seyahatTarihi) }}</span>
                </div>
                
                <div class="info-row" v-if="app.visaStartDate && app.visaEndDate">
                  <span class="info-label">Vize Geçerlilik:</span>
                  <span class="info-value">{{ formatDate(app.visaStartDate) }} - {{ formatDate(app.visaEndDate) }}</span>
                </div>
                
                <div v-if="app.appointment" class="appointment-details">
                  <h5>Randevu Bilgileri</h5>
                  <div class="info-row">
                    <span class="info-label">Tarih:</span>
                    <span class="info-value">{{ formatDate(app.appointment.tarih) }} {{ app.appointment.saat }}</span>
                  </div>
                  
                  <div class="info-row" v-if="app.appointment.institution">
                    <span class="info-label">Kurum:</span>
                    <span class="info-value">{{ app.appointment.institution.ad }}</span>
                  </div>
                  
                  <div class="info-row" v-if="app.appointment.institution?.adres">
                    <span class="info-label">Adres:</span>
                    <span class="info-value">{{ app.appointment.institution.adres }}</span>
                  </div>
                  
                  <div class="info-row" v-if="app.appointment.supplier">
                    <span class="info-label">Aracı Kurum:</span>
                    <span class="info-value">{{ app.appointment.supplier.ofisAdi }}</span>
                  </div>
                  
                  <div class="info-row" v-if="app.appointment.supplier?.adres">
                    <span class="info-label">Adres:</span>
                    <span class="info-value">{{ app.appointment.supplier.adres }}</span>
                  </div>
                  
                  <div v-if="app.appointment.institution?.mapsLink || app.appointment.supplier?.mapsLink" class="mt-3">
                     <a :href="app.appointment.institution?.mapsLink || app.appointment.supplier?.mapsLink" target="_blank" rel="noopener" class="btn btn--ghost btn--small">
                        Haritada Gör
                     </a>
                  </div>
                </div>
                
                <div v-else-if="app.durum !== 'ONAY' && app.durum !== 'RED'" class="no-appointment">
                  <p>Henüz atanmış bir randevunuz bulunmamaktadır.</p>
                </div>
                
                <div class="info-row mt-3" v-if="app.notlar">
                  <span class="info-label">Notlar:</span>
                  <span class="info-value note-text">{{ app.notlar }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-else class="empty-state error">
            <div class="empty-icon">❌</div>
            <h3>Kayıt Bulunamadı</h3>
            <p>Girdiğiniz bilgilere ait sistemde kayıtlı başvuru veya randevu bulunamadı.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

useHead({
  title: 'Randevu Sorgulama — gelgidek.com',
  meta: [{ name: 'description', content: "Mevcut vize randevunuzu ve başvuru durumunuzu pasaport numaranız ve e-posta adresiniz ile sorgulayın." }]
})

const loading = ref(false)
const hasSearched = ref(false)
const error = ref('')
const results = ref<any>(null)

const form = ref({
  pasaportNo: '',
  email: ''
})

async function submitForm() {
  loading.value = true
  error.value = ''
  
  try {
    const data = await $fetch('/api/randevu-sorgulama', {
      method: 'POST',
      body: {
        pasaportNo: form.value.pasaportNo,
        email: form.value.email
      }
    })
    
    results.value = data
    hasSearched.value = true
  } catch (err: any) {
    hasSearched.value = true
    if (err.statusCode === 404) {
      results.value = []
    } else {
      error.value = err.statusMessage || 'Sorgulama işlemi başarısız oldu. Lütfen tekrar deneyin.'
    }
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

function formatDurum(durum: string) {
  const map: Record<string, string> = {
    'EVRAK_BEKLIYOR': 'Evrak Bekleniyor',
    'RANDEVU_BEKLIYOR': 'Randevu Bekleniyor',
    'SONUC_BEKLIYOR': 'Sonuç Bekleniyor',
    'ONAY': 'Onaylandı',
    'RED': 'Reddedildi'
  }
  return map[durum] || durum
}
</script>

<style scoped>
.randevu-sorgulama {
  padding-top: 40px;
  padding-bottom: 60px;
}

.randevu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 768px) {
  .randevu-grid {
    grid-template-columns: 400px 1fr;
    align-items: flex-start;
  }
}

.randevu-form-wrapper {
  background: var(--bg-secondary, #f8fafc);
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.randevu-form-wrapper h2 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: var(--text-heading, #0f172a);
}

.randevu-form-wrapper p {
  color: var(--text-muted, #64748b);
  font-size: 0.95rem;
  margin-bottom: 24px;
  line-height: 1.5;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-main, #334155);
}

.form-control {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.form-control:focus {
  outline: none;
  border-color: var(--brand, #0ea5e9);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
}

.btn--primary {
  background: var(--brand, #0284c7);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.btn--primary:hover {
  background: var(--brand-dark, #0369a1);
}

.btn--primary:disabled {
  background: #94a3b8;
  cursor: not-allowed;
}

.error-message {
  margin-top: 16px;
  padding: 12px;
  background: #fef2f2;
  color: #b91c1c;
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid #fecaca;
}

/* Sonuçlar Stili */
.randevu-results-wrapper {
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-secondary, #f8fafc);
  border-radius: 16px;
  padding: 40px;
  border: 2px dashed var(--border-color, #e2e8f0);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state h3 {
  color: var(--text-heading, #0f172a);
  margin-bottom: 8px;
}

.empty-state p {
  color: var(--text-muted, #64748b);
}

.loading-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color, #e2e8f0);
  border-top-color: var(--brand, #0ea5e9);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.results-list h3 {
  margin-bottom: 20px;
  font-size: 1.4rem;
  color: var(--text-heading, #0f172a);
}

.result-card {
  background: white;
  border: 1px solid var(--border-color, #e2e8f0);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  transition: transform 0.2s, box-shadow 0.2s;
}

.result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--border-color, #e2e8f0);
}

.result-header h4 {
  font-size: 1.25rem;
  margin: 0;
  color: var(--text-heading, #0f172a);
}

.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-evrak_bekliyor { background: #fef08a; color: #854d0e; }
.status-randevu_bekliyor { background: #fed7aa; color: #c2410c; }
.status-sonuc_bekliyor { background: #e0f2fe; color: #0369a1; }
.status-onay { background: #bbf7d0; color: #15803d; }
.status-red { background: #fecaca; color: #b91c1c; }

.info-row {
  display: flex;
  margin-bottom: 10px;
  line-height: 1.5;
}

.info-label {
  width: 140px;
  flex-shrink: 0;
  font-weight: 500;
  color: var(--text-muted, #64748b);
}

.info-value {
  flex: 1;
  color: var(--text-main, #334155);
}

.appointment-details {
  margin-top: 20px;
  padding: 20px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
}

.appointment-details h5 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #166534;
  font-size: 1.1rem;
}

.no-appointment {
  margin-top: 16px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  color: #64748b;
  font-style: italic;
}

.note-text {
  font-style: italic;
  white-space: pre-line;
}

.mt-3 {
  margin-top: 16px;
}

.btn--small {
  padding: 8px 16px;
  font-size: 0.9rem;
}

.btn--ghost {
  background: transparent;
  border: 1px solid var(--border-color, #cbd5e1);
  color: var(--text-main, #334155);
  border-radius: 6px;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
  transition: all 0.2s;
}

.btn--ghost:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
}

@media (max-width: 600px) {
  .randevu-sorgulama {
    padding-top: 24px;
    padding-bottom: 40px;
  }
  .randevu-form-wrapper {
    padding: 20px 16px;
  }
  .result-card {
    padding: 18px 16px;
  }
  .result-header {
    flex-wrap: wrap;
    gap: 10px;
  }
  .info-row {
    flex-direction: column;
    gap: 2px;
  }
  .info-label {
    width: 100%;
    font-size: 0.82rem;
  }
  .appointment-details {
    padding: 14px;
  }
}
</style>
