<template>
  <div class="print-page">
    <div v-if="pending" class="print-state">Belge Hazırlanıyor...</div>
    <div v-else-if="error" class="print-state print-state--error">{{ error.message }}</div>
    <div v-else-if="data" class="print-container">
      
      <!-- Arkaplan Filigran -->
      <div class="print-watermark">
         <div class="print-watermark__text">GELGİDEK</div>
      </div>

      <!-- Üst Header Grubu -->
      <div class="print-header">
        <div class="print-brand">
          <div class="print-brand__badge">G</div>
          <div>
            <div class="print-brand__title">GELGİDEK.com</div>
            <div class="print-brand__sub">Yurt Dışı Tur & Vize Danışmanlığı</div>
          </div>
        </div>

        <div class="print-doc-meta">
          <div class="print-doc-meta__info">
            <h1 class="print-doc-title">Vize Randevu Bildirimi</h1>
            <p class="print-doc-no">Belge No: <span>VZ-{{ data.application.id.toString().padStart(5, '0') }}</span></p>
            <p class="print-doc-date">Oluşturulma: {{ formatDateShort(new Date()) }}</p>
          </div>
          <div class="print-qr-box">
             <img v-if="qrDataUrl" :src="qrDataUrl" alt="QR Code" />
          </div>
        </div>
      </div>

      <!-- Müşteri ve Başvuru Kartı -->
      <div class="print-cards-grid">
        <!-- Müşteri -->
        <div class="print-card print-card--light">
          <h2 class="print-card__heading">
            <span class="print-dot print-dot--dark"></span> Müşteri Bilgileri
          </h2>
          <div class="print-rows">
            <div class="print-row"><span>Ad Soyad:</span> <strong>{{ data.application.customer.ad }} {{ data.application.customer.soyad }}</strong></div>
            <div class="print-row"><span>Pasaport:</span> <strong class="uppercase">{{ data.application.customer.pasaportNo }}</strong></div>
            <div class="print-row"><span>TC Kimlik:</span> <strong>{{ data.application.customer.tcNo || '-' }}</strong></div>
          </div>
        </div>

        <!-- Başvuru -->
        <div class="print-card print-card--primary">
          <h2 class="print-card__heading print-card__heading--accent">
            <span class="print-dot print-dot--accent"></span> Başvuru Özeti
          </h2>
          <div class="print-rows">
             <div class="print-row"><span>Hedef Ülke:</span> <strong style="font-size:1.1rem;">{{ data.application.ulke }}</strong></div>
             <div class="print-row"><span>Seyahat Tarihi:</span> <strong>{{ formatDateShort(data.application.seyahatTarihi) }}</strong></div>
             <div class="print-row"><span>Durum:</span> <strong class="print-status-pill">{{ data.application.durum.replace('_', ' ') }}</strong></div>
          </div>
        </div>
      </div>

      <!-- Randevu ve Lokasyon -->
      <div class="print-section">
         <h2 class="print-section__title">Randevu Lokasyon & Zamanlaması</h2>
         <div class="print-apt-box">
            <div class="print-apt-box__time">
               <div class="print-apt-label">Resmi Randevu Zamanı</div>
               <div class="print-apt-date">{{ formatDateOnly(data.application.appointment?.tarih) }}</div>
               <div class="print-apt-hour">{{ data.application.appointment?.saat || 'Belirtilmedi' }}</div>
            </div>
            
            <div class="print-apt-box__loc">
               <div class="print-apt-label">Randevu Merkezi</div>
               <div class="print-apt-inst">
                 📍 {{ data.application.appointment?.institution?.ad || 'Kurum Seçilmedi' }}
                 <a v-if="data.application.appointment?.institution?.mapsLink" :href="data.application.appointment.institution.mapsLink" target="_blank" rel="noopener" class="print-map-link no-print">Haritada Aç</a>
               </div>
               <div class="print-apt-addr">{{ data.application.appointment?.institution?.adres || 'Açık adres bilgisine ulaşılamadı.' }}</div>
            </div>
         </div>
      </div>

      <!-- Kritik Termin Tarihleri -->
      <div class="print-section">
         <h2 class="print-section__title">Evrak İşlem Takvimi (Termin)</h2>
         <div class="print-cards-grid">
           <div class="print-termin print-termin--green">
             <div class="print-termin__head">
               <span class="print-termin__num print-termin__num--green">1</span>
               <div class="print-termin__label">Evrak Hazırlığa Başlama</div>
             </div>
             <div class="print-termin__date print-termin__date--green">{{ formatDateOnly(data.evrakBaslangic) }}</div>
             <div class="print-termin__desc">Bu tarihten önce güncel tarihli resmi evrak (Örn: Banka dökümü) almayınız.</div>
           </div>
           
           <div class="print-termin print-termin--red">
             <div class="print-termin__head">
               <span class="print-termin__num print-termin__num--red">2</span>
               <div class="print-termin__label">Son Evrak Teslim (Bize)</div>
             </div>
             <div class="print-termin__date print-termin__date--red">{{ formatDateOnly(data.evrakTeslim) }}</div>
             <div class="print-termin__desc">Bu tarihe kadar kargo/elden teslim etmeniz zorunludur. (Aksi takdirde iptal olabilir!)</div>
           </div>
         </div>
      </div>

      <!-- Kurallar & Notlar -->
      <div class="print-notes-box">
        <h2 class="print-notes-box__title">
          ⚠ Önemli Prosedür Uyarıları
        </h2>
        <ul class="print-notes-list">
          <li>
             <span class="print-bullet">•</span>
             <span><strong>Randevudan en az 15 dakika önce</strong> randevu merkezinde şahsen (parmak izi vb. prosedürler için) hazır bulunmanız gerekmektedir.</span>
          </li>
          <li>
             <span class="print-bullet">•</span>
             <span>Eksik evrak veya geç kalınması doğrudan <strong>randevu iptaline</strong> sebep olabilir; bu durumda konsolosluk harçları iade edilememektedir.</span>
          </li>
          <li v-if="data.application.notlar" class="print-special-note">
             <strong>ÖZEL NOT:</strong>
             <span>{{ data.application.notlar }}</span>
          </li>
        </ul>
      </div>

      <!-- İmzalar -->
      <div class="print-signatures">
        <div class="print-sig-col">
          <p class="print-sig-title">Müşteri Beyanı</p>
          <p class="print-sig-line">Belgeyi Teslim Aldım <br> (Tarih ve İmza)</p>
        </div>
        <div class="print-sig-col">
          <p class="print-sig-title print-sig-title--primary">Operasyon Departmanı</p>
          <p class="print-sig-line">Gelgidek Kaşe ve İmza</p>
        </div>
      </div>

    </div>

    <!-- Yazdır Butonu -->
    <div class="print-fab no-print">
      <button @click="printDocument" class="print-fab__btn">
        <span>🖨️</span>
        <span>Randevu Belgesini Yazdır</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import QRCode from 'qrcode'

definePageMeta({ layout: false, middleware: 'admin' })

const route = useRoute()
const applicationId = route.params.id

const { data, pending, error } = await useFetch(`/api/admin/visa-basvuru/${applicationId}/document-data`)
const qrDataUrl = ref('')

watch(
  () => data.value,
  async (val) => {
    if (val && val.application && import.meta.client) {
      const qrText = `Belge: VZ-${val.application.id.toString().padStart(5, '0')}\nMüşteri: ${val.application.customer.ad} ${val.application.customer.soyad}\nKurum: ${val.application.appointment?.institution?.ad || 'Bilinmiyor'}\nTarih: ${val.application.appointment?.tarih?.slice(0, 10)}`
      try {
        qrDataUrl.value = await QRCode.toDataURL(qrText, {
          color: { dark: '#104271', light: '#ffffff' },
          margin: 0
        })
      } catch (err) {
        console.error(err)
      }
    }
  },
  { immediate: true }
)

const formatDateShort = (dateStr) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('tr-TR')
}

const formatDateOnly = (dateStr) => {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return new Intl.DateTimeFormat('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' }).format(d)
}

const printDocument = () => {
  window.print()
}
</script>

<style scoped>
.print-page {
  font-family: 'Montserrat', Arial, sans-serif;
  background: #f4f8fd;
  color: #0f1b2d;
  min-height: 100vh;
  padding: 28px 16px 90px;
  font-size: 15px;
}

.print-state {
  text-align: center;
  padding: 48px;
  color: #104271;
  font-weight: 700;
}

.print-state--error {
  color: #dc2626;
}

.print-container {
  max-width: 880px;
  margin: 0 auto;
  border: 1px solid rgba(16, 66, 113, 0.2);
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 12px 36px rgba(16, 66, 113, 0.12);
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.print-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-35deg);
  opacity: 0.03;
  pointer-events: none;
  z-index: 0;
}

.print-watermark__text {
  font-size: 150px;
  font-weight: 900;
  color: #104271;
  white-space: nowrap;
}

.print-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
  border-bottom: 3px solid #104271;
  padding-bottom: 22px;
  margin-bottom: 28px;
  position: relative;
  z-index: 2;
}

.print-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.print-brand__badge {
  width: 52px;
  height: 52px;
  background: #104271;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 900;
}

.print-brand__title {
  font-size: 1.45rem;
  font-weight: 900;
  color: #104271;
}

.print-brand__sub {
  margin-top: 2px;
  color: #46c8e8;
  font-weight: 700;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.print-doc-meta {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.print-doc-meta__info {
  text-align: right;
}

.print-doc-title {
  font-size: 1.4rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #104271;
  margin: 0 0 4px;
}

.print-doc-no {
  color: #5a7091;
  font-weight: 600;
  font-size: 0.85rem;
}

.print-doc-no span {
  color: #104271;
  font-weight: 800;
}

.print-doc-date {
  color: #5a7091;
  font-size: 0.76rem;
  margin-top: 2px;
}

.print-qr-box {
  width: 88px;
  height: 88px;
  background: #fff;
  padding: 4px;
  border: 2px solid rgba(16, 66, 113, 0.2);
  border-radius: 8px;
}

.print-qr-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.print-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 28px;
  position: relative;
  z-index: 2;
}

.print-card {
  border-radius: 10px;
  padding: 20px;
}

.print-card--light {
  background: #f4f8fd;
  border: 1px solid rgba(16, 66, 113, 0.12);
}

.print-card--primary {
  background: #104271;
  color: #fff;
}

.print-card__heading {
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 700;
  color: #5a7091;
  letter-spacing: 1px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.print-card__heading--accent {
  color: #74dff6;
}

.print-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.print-dot--dark {
  background: #104271;
}

.print-dot--accent {
  background: #74dff6;
}

.print-rows {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.print-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
}

.print-status-pill {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.print-section {
  margin-bottom: 28px;
  position: relative;
  z-index: 2;
}

.print-section__title {
  font-size: 0.88rem;
  font-weight: 800;
  color: #104271;
  border-bottom: 2px solid #f4f8fd;
  padding-bottom: 8px;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.print-apt-box {
  background: #fff;
  border: 2px solid rgba(16, 66, 113, 0.12);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 24px;
  align-items: center;
}

.print-apt-box__time {
  flex: 1;
  border-right: 1px solid rgba(16, 66, 113, 0.12);
  padding-right: 20px;
}

.print-apt-box__loc {
  flex: 2;
}

.print-apt-label {
  color: #5a7091;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.print-apt-date {
  font-size: 1.65rem;
  font-weight: 900;
  color: #104271;
}

.print-apt-hour {
  font-size: 1.15rem;
  font-weight: 800;
  color: #46c8e8;
}

.print-apt-inst {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f1b2d;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.print-map-link {
  font-size: 0.75rem;
  background: #eaf2fb;
  color: #104271;
  padding: 3px 8px;
  border-radius: 4px;
}

.print-apt-addr {
  font-size: 0.88rem;
  color: #5a7091;
}

.print-termin {
  padding: 18px;
  border-radius: 12px;
}

.print-termin--green {
  border: 1px solid rgba(22, 163, 74, 0.35);
  background: #f0fdf4;
}

.print-termin--red {
  border: 1px solid rgba(220, 38, 38, 0.35);
  background: #fef2f2;
}

.print-termin__head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.print-termin__num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.85rem;
}

.print-termin__num--green {
  background: #dcfce7;
  color: #15803d;
}

.print-termin__num--red {
  background: #fee2e2;
  color: #b91c1c;
}

.print-termin__label {
  font-weight: 700;
  font-size: 0.92rem;
}

.print-termin__date {
  font-size: 1.4rem;
  font-weight: 900;
}

.print-termin__date--green {
  color: #15803d;
}

.print-termin__date--red {
  color: #b91c1c;
}

.print-termin__desc {
  font-size: 0.8rem;
  margin-top: 6px;
  color: #475569;
}

.print-notes-box {
  margin-bottom: 32px;
  background: #f4f8fd;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  z-index: 2;
}

.print-notes-box__title {
  font-size: 0.88rem;
  font-weight: 800;
  color: #104271;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.print-notes-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.88rem;
}

.print-notes-list li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.print-bullet {
  color: #46c8e8;
  font-weight: 900;
}

.print-special-note {
  padding-top: 10px;
  border-top: 1px solid rgba(16, 66, 113, 0.12);
  color: #104271;
  font-weight: 700;
}

.print-signatures {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  border-top: 2px solid rgba(16, 66, 113, 0.12);
  padding: 36px 16px 8px;
  position: relative;
  z-index: 2;
}

.print-sig-col {
  text-align: center;
  flex: 1;
  min-width: 180px;
}

.print-sig-title {
  font-weight: 700;
  margin-bottom: 42px;
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.print-sig-title--primary {
  color: #104271;
}

.print-sig-line {
  font-size: 0.72rem;
  color: #5a7091;
  border-top: 1px solid rgba(90, 112, 145, 0.35);
  padding-top: 8px;
  max-width: 200px;
  margin: 0 auto;
}

.print-fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
}

.print-fab__btn {
  background: #104271;
  color: #fff;
  padding: 14px 26px;
  border-radius: 999px;
  box-shadow: 0 10px 30px rgba(16, 66, 113, 0.35);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

@media (max-width: 680px) {
  .print-container {
    padding: 20px 16px;
  }
  .print-cards-grid {
    grid-template-columns: 1fr;
  }
  .print-apt-box {
    flex-direction: column;
    align-items: flex-start;
  }
  .print-apt-box__time {
    border-right: none;
    border-bottom: 1px solid rgba(16, 66, 113, 0.12);
    padding-right: 0;
    padding-bottom: 14px;
    width: 100%;
  }
  .print-doc-meta__info {
    text-align: left;
  }
}

@media print {
  .no-print {
    display: none !important;
  }
  .print-page {
    background: #fff !important;
    padding: 0 !important;
    min-height: auto !important;
  }
  .print-container {
    border: none !important;
    box-shadow: none !important;
    margin: 0 !important;
    max-width: 100% !important;
    padding: 12mm !important;
  }
}
</style>
