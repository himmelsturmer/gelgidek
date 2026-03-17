<template>
  <div>
    <div class="admin-card">
      <div class="admin-card__header">
        <h2>Ana Sayfa Ülke Kartları</h2>
        <button class="btn btn--primary btn--sm" @click="saveSelection" :disabled="saving">
          {{ saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
        </button>
      </div>
      
      <div class="admin-card__body">
        <p class="muted" style="margin-bottom:24px;">Ana sayfada görünmesini istediğiniz ülkeleri seçin ve sürükleerek sıralayın.</p>

        <div v-if="pending" style="text-align:center;padding:20px;">Yükleniyor...</div>
        
        <div v-else style="display:grid;grid-template-columns:1fr 1fr;gap:40px;">
          <!-- Tüm Ülkeler Listesi -->
          <div>
            <h3 style="font-size:1.1rem;color:var(--primary);margin-bottom:12px;display:flex;justify-content:space-between;">
              Tüm Ülkeler
              <input type="text" v-model="search" placeholder="Ara..." style="padding:4px 8px;border:1px solid var(--border);border-radius:4px;font-size:0.85rem;" />
            </h3>
            
            <div style="border:1px solid var(--border);border-radius:var(--radius-sm);max-height:600px;overflow-y:auto;background:var(--bg);">
              <label 
                v-for="country in filteredCountries" 
                :key="country.id"
                style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border);cursor:pointer;background:var(--surface);transition:background 0.2s;"
                :style="{ opacity: country.showOnHome ? '0.5' : '1' }"
              >
                <input type="checkbox" v-model="country.showOnHome" @change="toggleHome(country)" />
                <span style="font-size:1.5rem;line-height:1;">{{ country.flagUrl }}</span>
                <span style="font-weight:600;">{{ country.name }}</span>
              </label>
            </div>
          </div>

          <!-- Seçili Ülkeler Sıralama -->
          <div>
            <h3 style="font-size:1.1rem;color:var(--primary);margin-bottom:12px;">Ana Sayfa Sıralaması ({{ selectedCountries.length }})</h3>
            
            <div style="border:1px dashed var(--primary);border-radius:var(--radius-sm);padding:16px;background:var(--bg-alt);min-height:200px;">
              <div 
                v-for="(country, index) in selectedCountries" 
                :key="country.id"
                style="display:flex;align-items:center;justify-content:space-between;padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-sm);margin-bottom:8px;box-shadow:var(--shadow);"
              >
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="cursor:grab;color:var(--text-muted);">≡</span>
                  <span style="font-size:1.5rem;line-height:1;">{{ country.flagUrl }}</span>
                  <span style="font-weight:600;">{{ country.name }}</span>
                </div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <button class="btn btn--sm btn--ghost" style="padding:4px 8px;" @click="moveUp(index)" :disabled="index === 0">↑</button>
                  <button class="btn btn--sm btn--ghost" style="padding:4px 8px;" @click="moveDown(index)" :disabled="index === selectedCountries.length - 1">↓</button>
                  <button class="btn btn--sm btn--danger" style="padding:4px 8px;" @click="remove(country)">✕</button>
                </div>
              </div>
              <div v-if="selectedCountries.length === 0" style="text-align:center;padding:40px;color:var(--text-muted);">
                Soldaki listeden ülke seçin...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Ana Sayfa Ülkeleri | Admin' })

const { data: countriesData, pending, refresh } = await useFetch<any[]>('/api/admin/home-countries')

const countries = ref<any[]>([])
const search = ref('')
const saving = ref(false)

watch(countriesData, (newVal) => {
  if (newVal) {
    // Derin kopya, UI state bozmamak için
    countries.value = JSON.parse(JSON.stringify(newVal))
  }
}, { immediate: true })

const filteredCountries = computed(() => {
  if (!search.value) return countries.value
  const s = search.value.toLowerCase()
  return countries.value.filter(c => c.name.toLowerCase().includes(s))
})

const selectedCountries = computed(() => {
  return countries.value
    .filter(c => c.showOnHome)
    .sort((a, b) => (a.homeOrder || 999) - (b.homeOrder || 999))
})

const toggleHome = (country: any) => {
  if (country.showOnHome) {
    country.homeOrder = selectedCountries.value.length
  } else {
    country.homeOrder = null
  }
}

const remove = (country: any) => {
  const c = countries.value.find(x => x.id === country.id)
  if (c) {
    c.showOnHome = false
    c.homeOrder = null
  }
}

const moveUp = (index: number) => {
  if (index === 0) return
  const list = selectedCountries.value
  const temp = list[index].homeOrder
  list[index].homeOrder = list[index - 1].homeOrder
  list[index - 1].homeOrder = temp
}

const moveDown = (index: number) => {
  const list = selectedCountries.value
  if (index === list.length - 1) return
  const temp = list[index].homeOrder
  list[index].homeOrder = list[index + 1].homeOrder
  list[index + 1].homeOrder = temp
}

const saveSelection = async () => {
  saving.value = true
  
  // Sadece değişen state'leri yolla
  const payload = countries.value.map(c => ({
    id: c.id,
    showOnHome: c.showOnHome,
    homeOrder: c.homeOrder
  }))

  try {
    await $fetch('/api/admin/home-countries', { method: 'POST', body: payload })
    alert('Başarıyla kaydedildi!')
    await refresh()
  } catch (err) {
    alert('Kaydedilirken hata oluştu: ' + err)
  } finally {
    saving.value = false
  }
}
</script>
