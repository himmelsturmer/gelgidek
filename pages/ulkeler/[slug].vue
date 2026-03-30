<template>
  <div class="section">
    <div class="container">
      <div v-if="pending" style="text-align:center;padding:40px;">Yükleniyor...</div>
      
      <div v-else-if="country">
        <div class="section__head">
          <div style="font-size:3rem;margin-bottom:8px;">{{ country.flagUrl || '🌍' }}</div>
          <h2>{{ country.name }} Vizesi Neler Gerekli?</h2>
          <p class="muted">Gidiş amacı ve mesleğinizi seçerek evrak listesini görüntüleyin.</p>
        </div>

        <div class="visa-select-box">
          <h2>Seçim Yapın</h2>
          
          <div class="form-group">
            <label for="purpose">Gidiş Amacı</label>
            <select id="purpose" class="form-select" v-model="selectedPurpose" :disabled="!purposes || purposes.length === 0">
              <option value="">Seçiniz</option>
              <option v-for="p in purposes" :key="p" :value="p">{{ p }}</option>
            </select>
            <div v-if="purposes && purposes.length === 0" class="tiny" style="color:var(--text-muted);margin-top:4px;">Bu ülke için henüz vize bilgisi girilmemiştir.</div>
          </div>

          <div class="form-group" v-if="selectedPurpose">
            <label for="profession">Meslek</label>
            <select id="profession" class="form-select" v-model="selectedProfession" :disabled="pendingProfessions">
              <option value="">Seçiniz</option>
              <option v-for="p in professions" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
        </div>

        <!-- Sonuç Alanı -->
        <div class="visa-result" v-if="visaInfo">
          
          <div class="info-card">
            <h3>📋 Gerekli Evraklar</h3>
            <ul class="doc-list" v-if="visaInfo.documentList && visaInfo.documentList.length > 0">
              <li v-for="(doc, i) in visaInfo.documentList" :key="i">{{ doc }}</li>
            </ul>
            <p v-else class="muted tiny">Evrak listesi girilmemiş.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
            <div class="info-card" v-if="visaInfo.applicationZones && visaInfo.applicationZones.length > 0">
              <h3>📍 Başvuru Bölgeleri</h3>
              <ul style="list-style:disc;padding-left:20px;color:var(--text-muted);font-size:0.9rem;">
                <li v-for="(zone, i) in visaInfo.applicationZones" :key="i">{{ zone }}</li>
              </ul>
            </div>
            
            <div class="info-card" v-if="visaInfo.processingTime">
              <h3>⏱ İşlem Süresi</h3>
              <p style="color:var(--text-muted);font-size:0.9rem;">{{ visaInfo.processingTime }}</p>
            </div>
          </div>

          <div class="info-card" v-if="visaInfo.description">
            <h3>📝 Açıklama</h3>
            <div style="color:var(--text-muted);font-size:0.9rem;white-space:pre-wrap;">{{ visaInfo.description }}</div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;">
            <div class="info-card" v-if="visaInfo.embassyName">
              <h3>🏛 Büyükelçilik</h3>
              <div style="color:var(--text-muted);font-size:0.9rem;">
                <strong>{{ visaInfo.embassyName }}</strong><br>
                <div v-if="visaInfo.embassyAddress" style="margin-top:4px;">{{ visaInfo.embassyAddress }}</div>
                <div v-if="visaInfo.embassyPhone" style="margin-top:4px;">📞 {{ visaInfo.embassyPhone }}</div>
                <div v-if="visaInfo.embassyWeb" style="margin-top:4px;">🌐 <a :href="visaInfo.embassyWeb.startsWith('http') ? visaInfo.embassyWeb : 'https://' + visaInfo.embassyWeb" target="_blank">{{ visaInfo.embassyWeb }}</a></div>
              </div>
            </div>

            <div class="info-card" v-if="visaInfo.consulateName">
              <h3>🏢 Konsolosluk</h3>
              <div style="color:var(--text-muted);font-size:0.9rem;">
                <strong>{{ visaInfo.consulateName }}</strong><br>
                <div v-if="visaInfo.consulateAddress" style="margin-top:4px;">{{ visaInfo.consulateAddress }}</div>
                <div v-if="visaInfo.consulatePhone" style="margin-top:4px;">📞 {{ visaInfo.consulatePhone }}</div>
                <div v-if="visaInfo.consulateWeb" style="margin-top:4px;">🌐 <a :href="visaInfo.consulateWeb.startsWith('http') ? visaInfo.consulateWeb : 'https://' + visaInfo.consulateWeb" target="_blank">{{ visaInfo.consulateWeb }}</a></div>
              </div>
            </div>
          </div>

          <div class="info-card" v-if="hasPdfs">
            <h3>📂 Formlar ve Dilekçeler</h3>
            <div class="pdf-grid">
              <a v-if="visaInfo.pdf1Url && visaInfo.pdf1Label" :href="visaInfo.pdf1Url" target="_blank" class="pdf-link">📄 {{ visaInfo.pdf1Label }}</a>
              <a v-if="visaInfo.pdf2Url && visaInfo.pdf2Label" :href="visaInfo.pdf2Url" target="_blank" class="pdf-link">📄 {{ visaInfo.pdf2Label }}</a>
              <a v-if="visaInfo.pdf3Url && visaInfo.pdf3Label" :href="visaInfo.pdf3Url" target="_blank" class="pdf-link">📄 {{ visaInfo.pdf3Label }}</a>
              <a v-if="visaInfo.pdf4Url && visaInfo.pdf4Label" :href="visaInfo.pdf4Url" target="_blank" class="pdf-link">📄 {{ visaInfo.pdf4Label }}</a>
            </div>
          </div>

          <div class="action-buttons">
            <button class="btn btn--primary" @click="showEmailModal = true">✉️ E-posta Olarak Gönder</button>
            <button class="btn btn--ghost" @click="handlePrint">🖨️ Yazdır</button>
          </div>
        </div>

      </div>
      <div v-else style="text-align:center;padding:40px;">Ülke bulunamadı.</div>
    </div>

    <!-- E-posta Modal -->
    <div v-if="showEmailModal" class="modal-overlay" @click.self="showEmailModal = false">
      <div class="modal">
        <h3>E-posta Olarak Gönder</h3>
        <p class="muted tiny" style="margin-bottom:16px;">Gerekli evrak listesi ve PDF formları girdiğiniz adrese iletilecektir.</p>
        
        <form @submit.prevent="sendEmail">
          <div class="form-group">
            <label>E-posta Adresi</label>
            <input type="email" class="form-input" v-model="emailAddress" required placeholder="ornek@mail.com" />
          </div>
          
          <div v-if="emailStatus" :style="{ color: emailStatus.type === 'error' ? '#dc2626' : '#16a34a', fontSize:'0.85rem', marginBottom:'12px' }">
            {{ emailStatus.text }}
          </div>

          <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:24px;">
            <button type="button" class="btn btn--ghost btn--sm" style="border:none;" @click="showEmailModal = false" :disabled="sendingEmail">İptal</button>
            <button type="submit" class="btn btn--primary btn--sm" :disabled="sendingEmail">
              {{ sendingEmail ? 'Gönderiliyor...' : 'Gönder' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const selectedPurpose = ref('')
const selectedProfession = ref('')
const showEmailModal = ref(false)
const emailAddress = ref('')
const sendingEmail = ref(false)
const emailStatus = ref<{type: 'success'|'error', text: string} | null>(null)

// 1. Ülkeyi getir
const { data: country, pending } = await useFetch(`/api/countries/${slug}`)

useHead({
  title: computed(() => country.value ? `${country.value.name} Vizesi Gerekli Evraklar — gelgidek.com` : 'Ülke Yükleniyor...'),
  meta: [
    { name: 'description', content: computed(() => country.value ? `${country.value.name} vizesi için başvuruda gerekli evraklar ve işlem bilgileri.` : '') }
  ]
})

// 2. Amaçları getir
const { data: purposes } = await useFetch(`/api/countries/${slug}/purposes`)

// 3. Meslekleri getir (Amaç değiştiğinde)
const professions = ref<string[]>([])
const pendingProfessions = ref(false)
watch(selectedPurpose, async (newVal) => {
  selectedProfession.value = ''
  if (!newVal) {
    professions.value = []
    return
  }
  pendingProfessions.value = true
  const res = await $fetch(`/api/countries/${slug}/professions`, { query: { purpose: newVal } }).catch(() => []) as string[]
  professions.value = res
  pendingProfessions.value = false
})

// 4. Tam sonuçları getir (Meslek değiştiğinde)
const visaInfo = ref<any>(null)
watch(selectedProfession, async (newVal) => {
  if (!newVal || !selectedPurpose.value) {
    visaInfo.value = null
    return
  }
  const res = await $fetch(`/api/countries/${slug}/visa-info`, {
    query: { purpose: selectedPurpose.value, profession: newVal }
  }).catch(() => null)
  visaInfo.value = res
})

const hasPdfs = computed(() => {
  if (!visaInfo.value) return false
  return (visaInfo.value.pdf1Url && visaInfo.value.pdf1Label) ||
         (visaInfo.value.pdf2Url && visaInfo.value.pdf2Label) ||
         (visaInfo.value.pdf3Url && visaInfo.value.pdf3Label) ||
         (visaInfo.value.pdf4Url && visaInfo.value.pdf4Label)
})

const getPdfList = () => {
  const p = []
  if (visaInfo.value.pdf1Url) p.push({ label: visaInfo.value.pdf1Label, url: visaInfo.value.pdf1Url })
  if (visaInfo.value.pdf2Url) p.push({ label: visaInfo.value.pdf2Label, url: visaInfo.value.pdf2Url })
  if (visaInfo.value.pdf3Url) p.push({ label: visaInfo.value.pdf3Label, url: visaInfo.value.pdf3Url })
  if (visaInfo.value.pdf4Url) p.push({ label: visaInfo.value.pdf4Label, url: visaInfo.value.pdf4Url })
  return p
}

const handlePrint = () => {
  window.print()
}

const sendEmail = async () => {
  if (!emailAddress.value || !selectedPurpose.value || !selectedProfession.value || !country.value || !visaInfo.value) return
  
  sendingEmail.value = true
  emailStatus.value = null
  
  try {
    await $fetch('/api/send-email', {
      method: 'POST',
      body: {
        to: emailAddress.value,
        countryName: country.value.name,
        purpose: selectedPurpose.value,
        profession: selectedProfession.value,
        documents: visaInfo.value.documentList,
        description: visaInfo.value.description,
        embassyName: visaInfo.value.embassyName,
        embassyAddress: visaInfo.value.embassyAddress,
        embassyPhone: visaInfo.value.embassyPhone,
        embassyWeb: visaInfo.value.embassyWeb,
        consulateName: visaInfo.value.consulateName,
        consulateAddress: visaInfo.value.consulateAddress,
        consulatePhone: visaInfo.value.consulatePhone,
        consulateWeb: visaInfo.value.consulateWeb,
        pdfs: getPdfList()
      }
    })
    emailStatus.value = { type: 'success', text: 'E-posta başarıyla gönderildi.' }
    setTimeout(() => { showEmailModal.value = false; emailStatus.value = null; emailAddress.value = ''; }, 2000)
  } catch (err: any) {
    emailStatus.value = { type: 'error', text: err.data?.message || 'E-posta gönderilirken bir hata oluştu.' }
  } finally {
    sendingEmail.value = false
  }
}
</script>
