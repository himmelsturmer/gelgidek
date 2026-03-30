<template>
  <div>
    <div style="margin-bottom:20px;display:flex;align-items:center;gap:16px;">
      <NuxtLink to="/admin/countries" class="btn btn--ghost btn--sm">← Geri Dön</NuxtLink>
      <h2 style="font-size:1.4rem;color:var(--primary);display:flex;align-items:center;gap:8px;">
        {{ country?.flagUrl }} {{ country?.name }}
      </h2>
    </div>

    <div class="admin-card" style="margin-bottom:32px;">
      <div class="admin-card__header">
        <h2>Vize Bilgileri Tablosu</h2>
        <button class="btn btn--primary btn--sm" @click="openModal()">➕ Yeni Ekle</button>
      </div>
      
      <div class="admin-card__body">
        <div v-if="pending" style="text-align:center;padding:20px;">Yükleniyor...</div>
        
        <table v-else class="admin-table">
          <thead>
            <tr>
              <th>Gidiş Amacı</th>
              <th>Meslek</th>
              <th>Evrak (Adet)</th>
              <th>İşlem Süresi</th>
              <th style="width:140px;text-align:right;">İşlem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="info in visaInfos" :key="info.id">
              <td><strong>{{ info.purpose }}</strong></td>
              <td>{{ info.profession }}</td>
              <td><span class="badge badge--blue">{{ info.documentList?.length || 0 }} Adet</span></td>
              <td>{{ info.processingTime || '-' }}</td>
              <td style="text-align:right;">
                <div class="actions" style="justify-content:flex-end;">
                  <button class="btn btn--ghost btn--sm" style="padding:6px 12px;" @click="openModal(info)">✏️ Düzenle</button>
                  <button class="btn btn--danger btn--sm" style="padding:6px 12px;" @click="deleteVisaInfo(info.id)">🗑️</button>
                </div>
              </td>
            </tr>
            <tr v-if="!visaInfos || visaInfos.length === 0">
              <td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted);">
                Henüz vize şartı eklenmemiş. "Turizm - Ücretli Çalışan" gibi kombinasyonları ekleyerek başlayın.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tam Sayfa Form Modalı (Kapsamlı Veri İçin) -->
    <div v-if="isModalOpen" class="modal-overlay" style="padding:0;align-items:stretch;overflow:hidden;">
      <div class="modal" style="max-width:900px;width:100%;height:100vh;border-radius:0;display:flex;flex-direction:column;padding:0;">
        <div style="padding:20px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;background:var(--surface);">
          <h3 style="margin:0;">{{ form.id ? 'Vize Kaydını Düzenle' : 'Yeni Vize Şartı Ekle' }}</h3>
          <button @click="closeModal" style="font-size:1.5rem;color:var(--text-muted);">&times;</button>
        </div>
        
        <div style="padding:24px;flex:1;overflow-y:auto;background:var(--bg);">
          <form id="visaForm" @submit.prevent="saveVisaInfo" class="admin-form">
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;">
              <div class="admin-card" style="padding:20px;">
                <h4 style="color:var(--primary);margin-bottom:16px;">Temel Bilgiler</h4>
                
                <div class="form-group">
                  <label>Gidiş Amacı <span style="color:red">*</span></label>
                  <input type="text" v-model="form.purpose" class="form-input" required placeholder="Örn: Turistik, Ticari, Aile Ziyareti" />
                </div>
                
                <div class="form-group" style="margin-top:16px;">
                  <label>Meslek / Kategori <span style="color:red">*</span></label>
                  <input type="text" v-model="form.profession" class="form-input" required placeholder="Örn: Ücretli Çalışan, İşveren, Öğrenci" />
                </div>
                
                <div class="form-group" style="margin-top:16px;">
                  <label>İşlem Süresi</label>
                  <input type="text" v-model="form.processingTime" class="form-input" placeholder="Örn: 10-15 İş Günü" />
                </div>

                <div class="form-group" style="margin-top:16px;">
                  <label>Açıklama / Uyarılar</label>
                  <textarea v-model="form.description" class="form-textarea" placeholder="Bu kategoriye özel notlar..." style="min-height:80px;"></textarea>
                </div>
              </div>

              <div class="admin-card" style="padding:20px;">
                <h4 style="color:var(--primary);margin-bottom:16px;">Gerekli Evraklar <span class="badge badge--blue" style="float:right;">{{ docs.length }} Adet</span></h4>
                <p class="tiny muted" style="margin-bottom:8px;">Satır satır maddeleri alt alta yazın. Her enter yeni maddedir.</p>
                
                <textarea 
                  v-model="docsText" 
                  class="form-textarea" 
                  style="min-height:280px;font-family:monospace;font-size:0.85rem;" 
                  placeholder="1. Pasaport (En az 6 ay geçerli)&#10;2. Biyometrik Fotoğraf (2 Adet)&#10;3. Kimlik Fotokopisi"
                ></textarea>
              </div>
            </div>

            <!-- Kurumlar -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:24px;">
              <div class="admin-card" style="padding:20px;">
                <h4 style="color:var(--primary);margin-bottom:16px;">🏛 Büyükelçilik Bilgileri</h4>
                <div class="form-group"><label>Kurum Adı</label><input type="text" v-model="form.embassyName" class="form-input"></div>
                <div class="form-group"><label>Adres</label><textarea v-model="form.embassyAddress" class="form-textarea" style="min-height:60px;"></textarea></div>
                <div class="form-group"><label>Telefon</label><input type="text" v-model="form.embassyPhone" class="form-input"></div>
                <div class="form-group"><label>Web Sitesi</label><input type="text" v-model="form.embassyWeb" class="form-input" placeholder="https://..."></div>
              </div>

              <div class="admin-card" style="padding:20px;">
                <h4 style="color:var(--primary);margin-bottom:16px;">🏢 Konsolosluk Bilgileri</h4>
                <div class="form-group"><label>Kurum Adı</label><input type="text" v-model="form.consulateName" class="form-input"></div>
                <div class="form-group"><label>Adres</label><textarea v-model="form.consulateAddress" class="form-textarea" style="min-height:60px;"></textarea></div>
                <div class="form-group"><label>Telefon</label><input type="text" v-model="form.consulatePhone" class="form-input"></div>
                <div class="form-group"><label>Web Sitesi</label><input type="text" v-model="form.consulateWeb" class="form-input" placeholder="https://..."></div>
              </div>
            </div>

            <!-- PDF Linkleri -->
            <div class="admin-card" style="padding:20px;margin-top:24px;margin-bottom:40px;">
              <h4 style="color:var(--primary);margin-bottom:16px;">📂 Form & Dilekçe Linkleri</h4>
              <p class="muted tiny" style="margin-bottom:16px;">Örnek siteden veya bulut diskinizden aldığınız direkt PDF indirme linklerini ve link isimlerini buraya girin.</p>
              
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
                <div style="background:var(--bg-alt);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--border);">
                  <div class="form-group"><label>Link 1 Adı</label><input type="text" v-model="form.pdf1Label" class="form-input" placeholder="Başvuru Formu"></div>
                  <div class="form-group" style="margin-top:8px;"><label>Link 1 URL</label><input type="url" v-model="form.pdf1Url" class="form-input" placeholder="https://..."></div>
                </div>
                <div style="background:var(--bg-alt);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--border);">
                  <div class="form-group"><label>Link 2 Adı</label><input type="text" v-model="form.pdf2Label" class="form-input" placeholder="İşveren Dilekçesi (BİO)"></div>
                  <div class="form-group" style="margin-top:8px;"><label>Link 2 URL</label><input type="url" v-model="form.pdf2Url" class="form-input" placeholder="https://..."></div>
                </div>
                <div style="background:var(--bg-alt);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--border);">
                  <div class="form-group"><label>Link 3 Adı</label><input type="text" v-model="form.pdf3Label" class="form-input" placeholder="Turistik Şahsi Dilekçe"></div>
                  <div class="form-group" style="margin-top:8px;"><label>Link 3 URL</label><input type="url" v-model="form.pdf3Url" class="form-input" placeholder="https://..."></div>
                </div>
                <div style="background:var(--bg-alt);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--border);">
                  <div class="form-group"><label>Link 4 Adı</label><input type="text" v-model="form.pdf4Label" class="form-input" placeholder="Ticari Dilekçe"></div>
                  <div class="form-group" style="margin-top:8px;"><label>Link 4 URL</label><input type="url" v-model="form.pdf4Url" class="form-input" placeholder="https://..."></div>
                </div>
              </div>
            </div>

          </form>
        </div>
        
        <div style="padding:16px 24px;border-top:1px solid var(--border);background:var(--surface);display:flex;justify-content:flex-end;gap:12px;">
          <button type="button" class="btn btn--ghost" @click="closeModal">İptal</button>
          <button type="submit" form="visaForm" class="btn btn--primary" :disabled="saving">
            {{ saving ? 'Kaydediliyor...' : 'Tüm Değişiklikleri Kaydet' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const countryId = Number(route.params.id)

const { data: country } = await useFetch<any>(`/api/admin/countries`)
  .then(res => ({ data: (res.data.value || []).find((c: any) => c.id === countryId) }))

useHead({ title: computed(() => country ? `${country.name} Vize Bilgileri | Admin` : 'Loading | Admin') })

const { data: visaInfos, pending, refresh } = await useFetch<any[]>(`/api/admin/countries/${countryId}/visa-info`)

const isModalOpen = ref(false)
const saving = ref(false)

// Boş form şablonu
const defaultForm = {
  id: 0,
  purpose: '',
  profession: '',
  processingTime: '',
  description: '',
  embassyName: '', embassyAddress: '', embassyPhone: '', embassyWeb: '',
  consulateName: '', consulateAddress: '', consulatePhone: '', consulateWeb: '',
  pdf1Url: '', pdf1Label: '', pdf2Url: '', pdf2Label: '',
  pdf3Url: '', pdf3Label: '', pdf4Url: '', pdf4Label: ''
}

const form = ref({ ...defaultForm })
const docs = ref<string[]>([])

// Textarea (string) <=> Array (json) dönüştürücüsü
const docsText = computed({
  get: () => docs.value.join('\n'),
  set: (val) => { docs.value = val.split('\n').map(s => s.trim()).filter(s => s) }
})

const openModal = (info: any = null) => {
  if (info) {
    form.value = { ...info }
    docs.value = info.documentList ? [...info.documentList] : []
  } else {
    form.value = { ...defaultForm }
    docs.value = []
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveVisaInfo = async () => {
  saving.value = true
  
  const payload = {
    ...form.value,
    documentList: docs.value
  }

  try {
    const url = form.value.id 
      ? `/api/admin/countries/${countryId}/visa-info/${form.value.id}` 
      : `/api/admin/countries/${countryId}/visa-info`
      
    const method = form.value.id ? 'PUT' : 'POST'
    
    await $fetch(url, { method, body: payload })
    await refresh()
    closeModal()
  } catch (err) {
    alert('Kaydetme hatası: ' + err)
  } finally {
    saving.value = false
  }
}

const deleteVisaInfo = async (vid: number) => {
  if (!confirm('Bu vize şartını silmek istediğinize emin misiniz?')) return
  try {
    await $fetch(`/api/admin/countries/${countryId}/visa-info/${vid}`, { method: 'DELETE' })
    await refresh()
  } catch (err) {
    alert('Silme hatası: ' + err)
  }
}
</script>
