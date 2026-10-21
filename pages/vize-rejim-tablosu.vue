<template>
  <div class="section">
    <div class="container">
      <div class="section__head">
        <h2>Vize Rejim Tablosu</h2>
        <p class="muted">Türk vatandaşlarının tabi olduğu vize uygulamaları</p>
      </div>
      
      <div v-if="settings?.visa_regime_notice" class="info-card" style="margin-bottom: 24px;border-left:4px solid var(--accent);">
        <p class="tiny muted" style="margin:0;">
          * {{ settings.visa_regime_notice }}
        </p>
      </div>

      <div style="margin-bottom: 20px; max-width: 380px;">
        <input
          v-model="search"
          type="text"
          class="form-input"
          placeholder="🔍 Ülke ara..."
        />
      </div>

      <div class="table-responsive">
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
            <tr v-for="row in filteredCountries" :key="row.id">
              <td><strong>{{ row.flagUrl }} {{ row.name }}</strong></td>
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
      </div>
      <p class="tiny muted" style="margin-top:12px;text-align:right;">*Seyahat öncesi ilgili konsolosluktan teyit ediniz.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Vize Rejim Tablosu — gelgidek.com',
  meta: [{ name: 'description', content: 'Türk vatandaşlarının ülkelere göre tabi olduğu vize rejim tablosu ve uygulamaları.' }]
})

const search = ref('')

const [{ data: countriesData }, { data: settings }] = await Promise.all([
  useFetch<any[]>('/api/countries'),
  useFetch<Record<string, string>>('/api/settings')
])

const filteredCountries = computed(() => {
  const list = countriesData.value || []
  if (!search.value.trim()) return list
  const q = search.value.toLocaleLowerCase('tr-TR')
  return list.filter((c: any) => c.name?.toLocaleLowerCase('tr-TR').includes(q))
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
</script>
