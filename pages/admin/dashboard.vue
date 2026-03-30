<template>
  <div>
    <!-- Stats -->
    <div class="admin-stats">
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--blue">🌍</div>
        <div>
          <div class="stat-card__value">{{ stats?.countries || 0 }}</div>
          <div class="stat-card__label">Kayıtlı Ülke</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--green">📋</div>
        <div>
          <div class="stat-card__value">{{ stats?.visaInfos || 0 }}</div>
          <div class="stat-card__label">Vize Bilgisi Kaydı</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--orange">🖼</div>
        <div>
          <div class="stat-card__value">{{ stats?.slides || 0 }}</div>
          <div class="stat-card__label">Aktif Slayt</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--purple">🏠</div>
        <div>
          <div class="stat-card__value">{{ stats?.homeCountries || 0 }}</div>
          <div class="stat-card__label">Ana Sayfa Kartı</div>
        </div>
      </div>
    </div>

    <!-- Hızlı Erişim -->
    <div class="admin-card" style="margin-bottom:24px;">
      <div class="admin-card__header"><h2>Hızlı Erişim</h2></div>
      <div class="admin-card__body">
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <NuxtLink to="/admin/carousel" class="btn btn--primary btn--sm">🖼 Slaytları Düzenle</NuxtLink>
          <NuxtLink to="/admin/countries" class="btn btn--accent btn--sm">🌍 Ülke Ekle/Düzenle</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Önemli Duyurular -->
    <div class="admin-card" style="margin-bottom:24px;">
      <div class="admin-card__header">
        <h2>📢 Önemli Duyurular</h2>
        <button class="btn btn--primary btn--sm" @click="showAnnForm=true" v-if="!showAnnForm">+ Yeni Duyuru</button>
      </div>
      <div class="admin-card__body">
        <!-- Yeni Duyuru Formu -->
        <div v-if="showAnnForm" style="background:var(--bg-alt);border-radius:8px;padding:20px;margin-bottom:20px;">
          <div class="form-group">
            <label>Başlık</label>
            <input v-model="annForm.title" class="form-input" placeholder="Duyuru Başlığı" />
          </div>
          <div class="form-group">
            <label>İçerik</label>
            <textarea v-model="annForm.content" class="form-input" rows="4" placeholder="Duyuru içeriği..." style="resize:vertical;"></textarea>
          </div>
          <div class="form-group" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" v-model="annForm.active" id="annActive" />
            <label for="annActive" style="text-transform:none;letter-spacing:0;margin:0;font-weight:600;">Aktif</label>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn--primary btn--sm" @click="saveAnnouncement">Kaydet</button>
            <button class="btn btn--ghost btn--sm" @click="cancelAnnForm">İptal</button>
          </div>
        </div>

        <!-- Mevcut Duyurular -->
        <div v-if="announcements.length === 0" class="muted" style="text-align:center;padding:20px;">Henüz duyuru yok.</div>
        <div v-for="ann in announcements" :key="ann.id" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:12px;">
          <div v-if="editingAnn?.id !== ann.id">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
              <div style="flex:1;">
                <strong style="color:var(--primary);">{{ ann.title }}</strong>
                <span v-if="!ann.active" style="font-size:0.75rem;background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;margin-left:8px;">Pasif</span>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-top:6px;white-space:pre-wrap;">{{ ann.content }}</p>
              </div>
              <div style="display:flex;gap:6px;flex-shrink:0;">
                <button class="btn btn--ghost btn--sm" @click="editAnn(ann)">✏️</button>
                <button class="btn btn--danger btn--sm" @click="deleteAnnouncement(ann.id)">🗑</button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="form-group">
              <input v-model="editingAnn.title" class="form-input" />
            </div>
            <div class="form-group">
              <textarea v-model="editingAnn.content" class="form-input" rows="4" style="resize:vertical;"></textarea>
            </div>
            <div class="form-group" style="display:flex;align-items:center;gap:8px;">
              <input type="checkbox" v-model="editingAnn.active" :id="`annActive${ann.id}`" />
              <label :for="`annActive${ann.id}`" style="text-transform:none;letter-spacing:0;margin:0;font-weight:600;">Aktif</label>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn--primary btn--sm" @click="updateAnnouncement">Güncelle</button>
              <button class="btn btn--ghost btn--sm" @click="editingAnn=null">İptal</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sık Sorulan Sorular -->
    <div class="admin-card">
      <div class="admin-card__header">
        <h2>❓ Sık Sorulan Sorular</h2>
        <button class="btn btn--primary btn--sm" @click="showFaqForm=true" v-if="!showFaqForm">+ Yeni SSS</button>
      </div>
      <div class="admin-card__body">
        <!-- Yeni SSS Formu -->
        <div v-if="showFaqForm" style="background:var(--bg-alt);border-radius:8px;padding:20px;margin-bottom:20px;">
          <div class="form-group">
            <label>Soru</label>
            <input v-model="faqForm.question" class="form-input" placeholder="Soru metni..." />
          </div>
          <div class="form-group">
            <label>Cevap</label>
            <textarea v-model="faqForm.answer" class="form-input" rows="4" placeholder="Cevap metni..." style="resize:vertical;"></textarea>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn--primary btn--sm" @click="saveFaq">Kaydet</button>
            <button class="btn btn--ghost btn--sm" @click="cancelFaqForm">İptal</button>
          </div>
        </div>

        <!-- Mevcut SSS'ler -->
        <div v-if="faqs.length === 0" class="muted" style="text-align:center;padding:20px;">Henüz SSS yok.</div>
        <div v-for="faq in faqs" :key="faq.id" style="background:var(--surface);border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:12px;">
          <div v-if="editingFaq?.id !== faq.id">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
              <div style="flex:1;">
                <strong style="color:var(--primary);">{{ faq.question }}</strong>
                <p style="color:var(--text-muted);font-size:0.9rem;margin-top:6px;">{{ faq.answer }}</p>
              </div>
              <div style="display:flex;gap:6px;flex-shrink:0;">
                <button class="btn btn--ghost btn--sm" @click="editFaq(faq)">✏️</button>
                <button class="btn btn--danger btn--sm" @click="deleteFaq(faq.id)">🗑</button>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="form-group">
              <input v-model="editingFaq.question" class="form-input" />
            </div>
            <div class="form-group">
              <textarea v-model="editingFaq.answer" class="form-input" rows="4" style="resize:vertical;"></textarea>
            </div>
            <div style="display:flex;gap:8px;">
              <button class="btn btn--primary btn--sm" @click="updateFaq">Güncelle</button>
              <button class="btn btn--ghost btn--sm" @click="editingFaq=null">İptal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Dashboard | Admin Paneli' })

const { data: stats } = await useFetch('/api/admin/stats').catch(() => ({ data: null }))

// ---- Duyurular ----
const { data: annData, refresh: refreshAnn } = await useFetch<any[]>('/api/admin/announcements')
const announcements = computed(() => annData.value ?? [])

const showAnnForm = ref(false)
const annForm = reactive({ title: '', content: '', active: true })
const editingAnn = ref<any>(null)

function cancelAnnForm() { showAnnForm.value = false; annForm.title = ''; annForm.content = ''; annForm.active = true }
function editAnn(ann: any) { editingAnn.value = { ...ann } }

async function saveAnnouncement() {
  if (!annForm.title.trim()) return
  await $fetch('/api/admin/announcements', { method: 'POST', body: { ...annForm } })
  cancelAnnForm()
  await refreshAnn()
}

async function updateAnnouncement() {
  const { id, title, content, order, active } = editingAnn.value
  await $fetch(`/api/admin/announcements/${id}`, { method: 'PUT', body: { title, content, order, active } })
  editingAnn.value = null
  await refreshAnn()
}

async function deleteAnnouncement(id: number) {
  if (!confirm('Bu duyuru silinsin mi?')) return
  await $fetch(`/api/admin/announcements/${id}`, { method: 'DELETE' })
  await refreshAnn()
}

// ---- SSS ----
const { data: faqData, refresh: refreshFaq } = await useFetch<any[]>('/api/admin/faqs')
const faqs = computed(() => faqData.value ?? [])

const showFaqForm = ref(false)
const faqForm = reactive({ question: '', answer: '' })
const editingFaq = ref<any>(null)

function cancelFaqForm() { showFaqForm.value = false; faqForm.question = ''; faqForm.answer = '' }
function editFaq(faq: any) { editingFaq.value = { ...faq } }

async function saveFaq() {
  if (!faqForm.question.trim()) return
  await $fetch('/api/admin/faqs', { method: 'POST', body: { ...faqForm } })
  cancelFaqForm()
  await refreshFaq()
}

async function updateFaq() {
  const { id, question, answer, order } = editingFaq.value
  await $fetch(`/api/admin/faqs/${id}`, { method: 'PUT', body: { question, answer, order } })
  editingFaq.value = null
  await refreshFaq()
}

async function deleteFaq(id: number) {
  if (!confirm('Bu SSS silinsin mi?')) return
  await $fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' })
  await refreshFaq()
}
</script>
