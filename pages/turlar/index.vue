<template>
  <div class="section">
    <div class="container">
      <div class="section__head">
        <h2>Yurt Dışı Turlarımız</h2>
        <p class="muted">Lüks otobüslerle ulaşım, seçkin otellerde konaklama ve profesyonel Türkçe rehberlik eşliğinde paket turlarımız.</p>
      </div>

      <!-- Filtre & Arama Barı -->
      <div class="tours-toolbar">
        <div class="tours-filters">
          <button
            v-for="dest in destinations"
            :key="dest"
            type="button"
            :class="['filter-chip', selectedDest === dest && 'filter-chip--active']"
            @click="selectedDest = dest"
          >
            {{ dest }}
          </button>
        </div>

        <input
          v-model="search"
          type="text"
          class="form-input tours-search"
          placeholder="Tur veya şehir ara..."
        />
      </div>

      <div v-if="pending" style="text-align:center;padding:48px;">Turlar yükleniyor...</div>

      <div v-else-if="filteredTours.length > 0" class="tours-grid">
        <article v-for="tour in filteredTours" :key="tour.id" class="tour-card">
          <NuxtLink :to="`/turlar/${tour.slug}`" class="tour-card__media">
            <img
              :src="tour.imageUrl || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop'"
              :alt="tour.title"
              loading="lazy"
            />
            <div class="tour-card__badges-top">
              <span v-if="tour.destination" class="tour-pill tour-pill--dest">📍 {{ tour.destination }}</span>
              <span v-if="tour.duration" class="tour-pill tour-pill--dur">🕒 {{ tour.duration }}</span>
            </div>
            <div v-if="tour.startingPrice" class="tour-card__price-tag">
              <span class="tiny">Kişi Başı</span>
              <strong>{{ tour.startingPrice }}</strong>
              <span class="tiny">'den itibaren</span>
            </div>
          </NuxtLink>

          <div class="tour-card__body">
            <NuxtLink :to="`/turlar/${tour.slug}`">
              <h3 class="tour-card__title">{{ tour.title }}</h3>
            </NuxtLink>
            <p v-if="tour.subtitle" class="tour-card__subtitle">{{ tour.subtitle }}</p>

            <div v-if="tour.summaryBadges && tour.summaryBadges.length" class="tour-card__highlights">
              <span v-for="(b, idx) in tour.summaryBadges" :key="idx" class="tour-highlight-chip">
                ✓ {{ b }}
              </span>
            </div>

            <div class="tour-card__footer">
              <NuxtLink :to="`/turlar/${tour.slug}`" class="btn btn--primary btn--sm" style="flex:1;">
                Programı İncele →
              </NuxtLink>
              <a
                v-if="tour.pdfUrl"
                :href="tour.pdfUrl"
                target="_blank"
                rel="noopener"
                class="btn btn--ghost btn--sm"
                title="PDF Tur Broşürünü İndir"
              >
                📄 PDF
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="info-card" style="text-align:center;padding:48px;">
        <p class="muted">Aradığınız kriterlere uygun tur bulunamadı.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Yurt Dışı Turlar — gelgidek.com',
  meta: [
    {
      name: 'description',
      content: 'Yunanistan, Bulgaristan, Bansko Kayak, Selanik, Kavala, İskeçe, Atina, Sofya, Plovdiv, Parga ve Korfu turları.'
    }
  ]
})

const { data: tours, pending } = await useFetch<any[]>('/api/tours')

const selectedDest = ref('Tümü')
const search = ref('')

const destinations = computed(() => {
  const set = new Set<string>(['Tümü'])
  ;(tours.value || []).forEach((t) => {
    if (t.destination) set.add(t.destination)
  })
  return Array.from(set)
})

const filteredTours = computed(() => {
  if (!tours.value) return []
  return tours.value.filter((t) => {
    if (selectedDest.value !== 'Tümü' && t.destination !== selectedDest.value) return false
    if (search.value.trim()) {
      const q = search.value.toLowerCase()
      const hay = `${t.title} ${t.subtitle || ''} ${t.destination || ''}`.toLowerCase()
      return hay.includes(q)
    }
    return true
  })
})
</script>

<style scoped>
.tours-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}
.tours-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-chip {
  padding: 8px 18px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  font-weight: 600;
  font-size: 0.86rem;
  color: var(--text-muted);
  transition: all var(--transition);
}
.filter-chip:hover {
  border-color: var(--primary);
  color: var(--primary);
}
.filter-chip--active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}
.tours-search {
  max-width: 280px;
  width: 100%;
}
.tours-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
}
.tour-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition), box-shadow var(--transition);
}
.tour-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.tour-card__media {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: var(--primary-dark);
  display: block;
}
.tour-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}
.tour-card:hover .tour-card__media img {
  transform: scale(1.05);
}
.tour-card__badges-top {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  pointer-events: none;
}
.tour-pill {
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
  backdrop-filter: blur(8px);
}
.tour-pill--dest {
  background: rgba(16, 66, 113, 0.88);
  color: #fff;
}
.tour-pill--dur {
  background: rgba(255, 255, 255, 0.92);
  color: var(--primary-dark);
}
.tour-card__price-tag {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: var(--accent);
  color: var(--primary-dark);
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: baseline;
  gap: 5px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
}
.tour-card__price-tag strong {
  font-size: 1.15rem;
  font-weight: 800;
}
.tour-card__body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.tour-card__title {
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 6px;
  line-height: 1.35;
}
.tour-card__subtitle {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}
.tour-card__highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}
.tour-highlight-chip {
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--bg-alt);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 6px;
}
.tour-card__footer {
  margin-top: auto;
  display: flex;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}
</style>
