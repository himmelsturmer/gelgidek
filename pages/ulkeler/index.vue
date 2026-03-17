<template>
  <div class="section">
    <div class="container">
      <div class="section__head">
        <h2>Tüm Ülkeler</h2>
        <p class="muted">A'dan Z'ye tüm ülkeler için vize işlemleri ve evrak listeleri.</p>
      </div>

      <!-- Alfabetik filtre -> Grup -->
      <div v-for="letter in letters" :key="letter" style="margin-bottom: 40px;">
        <h3 v-if="groupedCountries[letter] && groupedCountries[letter].length > 0" 
            style="font-size:1.4rem;font-weight:800;color:var(--primary);margin-bottom:16px;border-bottom:2px solid var(--border);padding-bottom:8px;">
          {{ letter }}
        </h3>
        
        <div class="countries-grid">
          <NuxtLink
            v-for="country in groupedCountries[letter]"
            :key="country.id"
            :to="`/ulkeler/${country.slug}`"
            class="country-card"
          >
            <span class="country-card__flag">{{ country.flagUrl || '🌍' }}</span>
            <div class="country-card__name">{{ country.name }}</div>
          </NuxtLink>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
const letters = ['A','B','C','Ç','D','E','F','G','H','I','İ','J','K','L','M','N','O','Ö','P','R','S','Ş','T','U','Ü','V','Y','Z']

useHead({
  title: 'Tüm Ülkeler — gelgidek.com',
  meta: [{ name: 'description', content: 'A\'dan Z\'ye tüm ülkeler için vize rehberi, evrak listeleri ve başvuru bilgileri.' }]
})

const { data: countries } = await useFetch('/api/countries')

const groupedCountries = computed(() => {
  const groups: Record<string, any[]> = {}
  if (!countries.value) return groups

  countries.value.forEach((c: any) => {
    let firstChar = c.name.charAt(0).toLocaleUpperCase('tr-TR')
    // Temel harf eşleştirmeleri
    if (!letters.includes(firstChar)) {
      if (firstChar === 'W') firstChar = 'V'
      else if (firstChar === 'X' || firstChar === 'Q') firstChar = 'K'
      else firstChar = 'A' // Fallback
    }

    if (!groups[firstChar]) groups[firstChar] = []
    groups[firstChar].push(c)
  })
  return groups
})
</script>
