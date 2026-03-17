<template>
  <div>
    <div class="admin-card">
      <div class="admin-card__header">
        <h2>Ülkeler</h2>
        <button class="btn btn--primary btn--sm" @click="openModal()">➕ Yeni Ülke Ekle</button>
      </div>
      
      <div class="admin-card__body">
        <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;">
          <input 
            type="text" 
            v-model="search" 
            placeholder="Ülke Ara..." 
            class="form-input" 
            style="max-width:300px;" 
          />
          <span class="muted tiny">Toplam {{ filteredCountries.length }} ülke</span>
        </div>

        <div v-if="pending" style="text-align:center;padding:20px;">Yükleniyor...</div>
        
        <table v-else class="admin-table">
          <thead>
            <tr>
              <th style="width:60px;">Bayrak</th>
              <th>Ülke Adı</th>
              <th>URL Slug</th>
              <th>Kıta</th>
              <th style="text-align:center;">Vize Kaydı</th>
              <th style="width:140px;text-align:right;">İşlem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in filteredCountries" :key="c.id">
              <td style="font-size:1.5rem;">{{ c.flagUrl || '🌍' }}</td>
              <td><strong>{{ c.name }}</strong></td>
              <td class="muted">{{ c.slug }}</td>
              <td>{{ c.continent || '-' }}</td>
              <td style="text-align:center;">
                <span class="badge badge--blue">{{ c._count?.visaInfos || 0 }}</span>
              </td>
              <td style="text-align:right;">
                <div class="actions" style="justify-content:flex-end;">
                  <NuxtLink :to="`/admin/countries/${c.id}`" class="btn btn--primary btn--sm" style="padding:6px 12px;">Detay</NuxtLink>
                  <button class="btn btn--danger btn--sm" style="padding:6px 12px;" @click="deleteCountry(c.id)">🗑️</button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredCountries.length === 0">
              <td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted);">
                Eşleşen ülke bulunamadı.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Yeni Ekle Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3>Yeni Ülke Ekle</h3>
        
        <form @submit.prevent="saveCountry" class="admin-form" style="margin-top:20px;">
          <div class="form-group">
            <label>Ülke Adı <span style="color:red">*</span></label>
            <input type="text" v-model="form.name" class="form-input" required @input="autoSlug" />
          </div>
          
          <div class="form-group">
            <label>URL Slug (Benzersiz) <span style="color:red">*</span></label>
            <input type="text" v-model="form.slug" class="form-input" required />
            <span class="tiny muted" style="margin-top:4px;">Örn: almanya, amerika-birlesik-devletleri</span>
          </div>
          
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
            <div class="form-group">
              <label>Bayrak Emoji</label>
              <input type="text" v-model="form.flagUrl" class="form-input" placeholder="🇩🇪" />
            </div>
            
            <div class="form-group">
              <label>Kıta</label>
              <select v-model="form.continent" class="form-select">
                <option value="">Seçiniz</option>
                <option value="Avrupa">Avrupa</option>
                <option value="Asya">Asya</option>
                <option value="Afrika">Afrika</option>
                <option value="Kuzey Amerika">Kuzey Amerika</option>
                <option value="Güney Amerika">Güney Amerika</option>
                <option value="Okyanusya">Okyanusya</option>
              </select>
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
useHead({ title: 'Ülkeler | Admin' })

const { data: countries, pending, refresh } = await useFetch<any[]>('/api/admin/countries')

const search = ref('')
const isModalOpen = ref(false)
const saving = ref(false)

const form = ref({
  name: '',
  slug: '',
  flagUrl: '',
  continent: ''
})

const filteredCountries = computed(() => {
  if (!countries.value) return []
  if (!search.value) return countries.value
  const s = search.value.toLowerCase()
  return countries.value.filter((c: any) => c.name.toLowerCase().includes(s) || c.slug.toLowerCase().includes(s))
})

const autoSlug = () => {
  // Basit türkçe karakter > ascii çevrimi
  const trMap: Record<string, string> = { 'ç':'c', 'ğ':'g', 'ı':'i', 'i':'i', 'ö':'o', 'ş':'s', 'ü':'u' }
  const str = form.value.name.toLowerCase().replace(/[çğıiöşü]/g, m => trMap[m])
  form.value.slug = str.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const openModal = () => {
  form.value = { name: '', slug: '', flagUrl: '', continent: '' }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveCountry = async () => {
  saving.value = true
  try {
    await $fetch('/api/admin/countries', { method: 'POST', body: form.value })
    await refresh()
    closeModal()
  } catch (err: any) {
    alert('Kaydetme hatası (Slug kullanılıyor olabilir): ' + (err.data?.message || err))
  } finally {
    saving.value = false
  }
}

const deleteCountry = async (id: number) => {
  if (!confirm('DİKKAT: Ülkeyi ve ona ait TÜM vize bilgilerini silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return
  try {
    await $fetch(`/api/admin/countries/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (err) {
    alert('Silme hatası: ' + err)
  }
}
</script>
