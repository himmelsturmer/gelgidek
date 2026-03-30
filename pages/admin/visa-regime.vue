<template>
  <div class="admin-page">
    <div class="admin-header">
      <h2>Vize Rejim Tablosu</h2>
      <p class="muted">Ülkelerin vize gereksinimlerini düzenleyin.</p>
    </div>

    <div v-if="loading" class="loading">Yükleniyor...</div>

    <div v-else class="info-card">
      <table class="table">
        <thead>
          <tr>
            <th>Ülke Adı</th>
            <th>Umumi</th>
            <th>Hususi</th>
            <th>Diplomatik</th>
            <th width="100">İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in countries" :key="c.id">
            <td>{{ c.name }}</td>
            <td>{{ badgeLabel(c.visaUmumi) }}</td>
            <td>{{ badgeLabel(c.visaHususi) }}</td>
            <td>{{ badgeLabel(c.visaDiplomatik) }}</td>
            <td>
              <button class="btn btn--small btn--ghost" @click="editCountry(c)">Düzenle</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit Modal -->
    <div v-if="editing" class="modal-overlay" @click.self="editing = null">
      <div class="modal">
        <h3 style="margin-top:0">{{ editing.name }} - Vize Bilgileri</h3>
        <form @submit.prevent="saveCountry">
          <div class="form-group">
            <label>Umumi (Bordo) Pasaport</label>
            <div style="display:flex;gap:8px;">
              <select v-model="editing.visaUmumi" class="form-control" style="width:180px">
                <option value="Vize Var">Vize Var</option>
                <option value="Vize Yok">Vize Yok</option>
                <option value="Sınır Kapısında">Sınır Kapısında</option>
                <option value="e-Vize">e-Vize</option>
              </select>
              <input type="text" v-model="editing.visaUmumiNote" class="form-control" placeholder="Ek Not (örn: Schengen)" />
            </div>
          </div>
          
          <div class="form-group">
            <label>Hususi (Yeşil) / Hizmet (Gri) Pasaport</label>
            <div style="display:flex;gap:8px;">
              <select v-model="editing.visaHususi" class="form-control" style="width:180px">
                <option value="Vize Var">Vize Var</option>
                <option value="Vize Yok">Vize Yok</option>
                <option value="Sınır Kapısında">Sınır Kapısında</option>
                <option value="e-Vize">e-Vize</option>
              </select>
              <input type="text" v-model="editing.visaHususiNote" class="form-control" placeholder="Ek Not (örn: 90 Gün)" />
            </div>
          </div>
          
          <div class="form-group">
            <label>Diplomatik (Siyah) Pasaport</label>
            <div style="display:flex;gap:8px;">
              <select v-model="editing.visaDiplomatik" class="form-control" style="width:180px">
                <option value="Vize Var">Vize Var</option>
                <option value="Vize Yok">Vize Yok</option>
                <option value="Sınır Kapısında">Sınır Kapısında</option>
                <option value="e-Vize">e-Vize</option>
              </select>
              <input type="text" v-model="editing.visaDiplomatikNote" class="form-control" placeholder="Ek Not" />
            </div>
          </div>

          <div style="margin-top: 24px; display: flex; justify-content: flex-end; gap: 8px;">
            <button type="button" class="btn btn--ghost" @click="editing = null">İptal</button>
            <button type="submit" class="btn btn--primary" :disabled="saving">
              {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const countries = ref([])
const loading = ref(true)
const editing = ref(null)
const saving = ref(false)

function badgeLabel(val) {
  return val || 'Belirtilmedi'
}

onMounted(async () => {
  await fetchCountries()
})

async function fetchCountries() {
  try {
    const data = await $fetch('/api/countries')
    countries.value = data || []
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function editCountry(c) {
  editing.value = { ...c }
}

async function saveCountry() {
  saving.value = true
  try {
    await $fetch(`/api/admin/countries/${editing.value.id}`, {
      method: 'PUT',
      body: editing.value
    })
    
    const index = countries.value.findIndex(x => x.id === editing.value.id)
    if (index !== -1) {
      countries.value[index] = { ...editing.value }
    }
    
    editing.value = null
  } catch (err) {
    alert(err.data?.message || 'Kaydetme başarısız.')
  } finally {
    saving.value = false
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th, .table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.modal-overlay {
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 100;
}
.modal {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block; font-weight: 600; margin-bottom: 6px; font-size: 0.95rem;
}
.form-control {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
}
.form-control:focus {
  border-color: var(--accent); outline: none;
}
</style>
