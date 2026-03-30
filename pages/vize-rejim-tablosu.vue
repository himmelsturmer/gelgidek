<template>
  <div class="section">
    <div class="container">
      <div class="section__head">
        <h2>Vize Rejim Tablosu</h2>
        <p class="muted">Türk vatandaşlarının tabi olduğu vize uygulamaları</p>
      </div>
      
      <div v-if="settings?.visa_regime_notice" class="info-card" style="margin-bottom: 32px;border-left:4px solid var(--accent);">
        <p class="tiny muted" style="margin:0;">
          * {{ settings.visa_regime_notice }}
        </p>
      </div>

      <div style="overflow-x:auto;">
        <table class="visa-table">
          <thead>
            <tr>
              <th>Ülke</th>
              <th>Umumi (Bordo) Pasaport</th>
              <th>Hususi (Yeşil) / Hizmet (Gri) Pasaport</th>
              <th>Diplomatik (Siyah) Pasaport</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in countries" :key="row.id">
              <td><strong>{{ row.name }}</strong></td>
              <td>
                <span :class="badgeClass(row.visaUmumi)">{{ badgeLabel(row.visaUmumi) }}</span>
                <span v-if="row.visaUmumiNote" style="font-size:0.82rem;color:var(--text-muted);"> {{ row.visaUmumiNote }}</span>
              </td>
              <td>
                <span :class="badgeClass(row.visaHususi)">{{ badgeLabel(row.visaHususi) }}</span>
                <span v-if="row.visaHususiNote" style="font-size:0.82rem;color:var(--text-muted);"> {{ row.visaHususiNote }}</span>
              </td>
              <td>
                <span :class="badgeClass(row.visaDiplomatik)">{{ badgeLabel(row.visaDiplomatik) }}</span>
                <span v-if="row.visaDiplomatikNote" style="font-size:0.82rem;color:var(--text-muted);"> {{ row.visaDiplomatikNote }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="tiny muted" style="margin-top:12px;text-align:right;">*Seyahat öncesi ilgili konsolosluktan teyit ediniz.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

useHead({
  title: 'Vize Rejim Tablosu — gelgidek.com',
  meta: [{ name: 'description', content: 'Türk vatandaşlarının ülkelere göre tabi olduğu vize rejim tablosu ve uygulamaları.' }]
})

function badgeClass(status: string) {
  const s = status?.toLowerCase() ?? ''
  if (!s) return 'badge badge--gray'
  if (s.includes('yok') || s === 'muaf') return 'badge badge--green'
  if (s.includes('sinir') || s.includes('sınır') || s.includes('kapısında') || s.includes('e-vize') || s.includes('evize')) return 'badge badge--yellow'
  return 'badge badge--red'
}

function badgeLabel(status: string) {
  if (!status) return 'Belirtilmedi'
  return status
}

const countries = ref([])
const settings = ref(null)

onMounted(async () => {
  try {
    const [cRes, sRes] = await Promise.all([
      $fetch('/api/countries'),
      $fetch('/api/settings')
    ])
    countries.value = cRes
    settings.value = sRes
  } catch (err) {
    console.error('Error loading data', err)
  }
})
</script>
