<template>
  <div>
    <div class="admin-card">
      <div class="admin-card__header">
        <h2>Carousel Slaytları</h2>
        <button class="btn btn--primary btn--sm" @click="openModal()">➕ Yeni Ekle</button>
      </div>
      
      <div class="admin-card__body">
        <div v-if="pending" style="padding:20px;text-align:center;">Yükleniyor...</div>
        <table v-else class="admin-table">
          <thead>
            <tr>
              <th style="width:120px;">Görsel</th>
              <th>Başlık</th>
              <th>Sıra</th>
              <th>Durum</th>
              <th style="width:140px;text-align:right;">İşlem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slide in slides" :key="slide.id">
              <td>
                <div class="slide-thumb">
                  <img :src="slide.imageUrl" :alt="slide.title" v-if="slide.imageUrl" />
                  <span v-else>Yok</span>
                </div>
              </td>
              <td><strong>{{ slide.title }}</strong><br><span class="tiny muted">{{ slide.subtitle }}</span></td>
              <td>{{ slide.order }}</td>
              <td>
                <span :class="['badge', slide.active ? 'badge--green' : 'badge--yellow']">
                  {{ slide.active ? 'Aktif' : 'Pasif' }}
                </span>
              </td>
              <td style="text-align:right;">
                <div class="actions" style="justify-content:flex-end;">
                  <button class="btn btn--ghost btn--sm" style="padding:6px 12px;" @click="openModal(slide)">✏️</button>
                  <button class="btn btn--danger btn--sm" style="padding:6px 12px;" @click="deleteSlide(slide.id)">🗑️</button>
                </div>
              </td>
            </tr>
            <tr v-if="!slides || slides.length === 0">
              <td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted);">Henüz slayt eklenmemiş.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal" style="max-width:600px;">
        <h3>{{ form.id ? 'Slayt Düzenle' : 'Yeni Slayt Ekle' }}</h3>
        
        <form @submit.prevent="saveSlide" class="admin-form" style="margin-top:20px;">
          <div class="form-group">
            <label>Görsel URL <span style="color:red">*</span></label>
            <input type="url" v-model="form.imageUrl" class="form-input" required placeholder="https://..." />
          </div>
          
          <div class="form-group">
            <label>Başlık <span style="color:red">*</span></label>
            <input type="text" v-model="form.title" class="form-input" required />
          </div>
          
          <div class="form-group">
            <label>Alt Başlık</label>
            <input type="text" v-model="form.subtitle" class="form-input" />
          </div>
          
          <div class="form-group">
            <label>Hedef Link URL (İsteğe Bağlı)</label>
            <input type="url" v-model="form.link" class="form-input" placeholder="https://..." />
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
            <div class="form-group">
              <label>Sıralama</label>
              <input type="number" v-model="form.order" class="form-input" />
            </div>
            
            <div class="form-group">
              <label>Durum</label>
              <div style="margin-top:8px;">
                <label class="toggle" style="display:flex;align-items:center;gap:12px;width:auto;cursor:pointer;">
                  <span style="position:relative;width:44px;display:inline-block;flex-shrink:0;">
                    <input type="checkbox" v-model="form.active" />
                    <span class="toggle__track"></span>
                  </span>
                  <span style="font-size:0.9rem;font-weight:600;color:var(--text);">{{ form.active ? 'Aktif' : 'Pasif' }}</span>
                </label>
              </div>
            </div>
          </div>
          
          <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:24px;">
            <button type="button" class="btn btn--ghost" @click="closeModal">İptal</button>
            <button type="submit" class="btn btn--primary" :disabled="saving">
              {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Carousel Yönetimi | Admin' })

const { data: slides, refresh, pending } = await useFetch<any[]>('/api/admin/carousel')

const isModalOpen = ref(false)
const saving = ref(false)

const form = ref({
  id: 0,
  imageUrl: '',
  title: '',
  subtitle: '',
  link: '',
  order: 0,
  active: true
})

const openModal = (slide: any = null) => {
  if (slide) {
    form.value = { ...slide }
  } else {
    const maxOrder = slides.value?.length ? Math.max(...slides.value.map(s => s.order || 0)) : 0
    form.value = { id: 0, imageUrl: '', title: '', subtitle: '', link: '', order: maxOrder + 1, active: true }
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveSlide = async () => {
  saving.value = true
  try {
    const url = form.value.id ? `/api/admin/carousel/${form.value.id}` : '/api/admin/carousel'
    const method = form.value.id ? 'PUT' : 'POST'
    
    await $fetch(url, { method, body: form.value })
    await refresh()
    closeModal()
  } catch (err) {
    alert('Kaydetme hatası: ' + err)
  } finally {
    saving.value = false
  }
}

const deleteSlide = async (id: number) => {
  if (!confirm('Bu slaytı silmek istediğinize emin misiniz?')) return
  await $fetch(`/api/admin/carousel/${id}`, { method: 'DELETE' })
  await refresh()
}
</script>
