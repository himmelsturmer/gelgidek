<template>
  <div class="section">
    <div class="container">
      <div v-if="pending" style="text-align:center;padding:48px;">Yükleniyor...</div>

      <div v-else-if="tour">
        <!-- Üst Navigasyon -->
        <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <NuxtLink to="/turlar" class="btn btn--ghost btn--sm">← Tüm Turlara Dön</NuxtLink>
          <div style="display:flex;gap:10px;flex-wrap:wrap;">
            <a
              v-if="tour.pdfUrl"
              :href="tour.pdfUrl"
              target="_blank"
              rel="noopener"
              class="btn btn--ghost btn--sm"
            >
              📄 PDF Tur Broşürünü İndir
            </a>
            <a
              :href="`https://wa.me/905074424378?text=${encodeURIComponent(tour.title + ' hakkında bilgi ve rezervasyon almak istiyorum.')}`"
              target="_blank"
              rel="noopener"
              class="btn btn--whatsapp btn--sm"
            >
              💬 WhatsApp ile Rezervasyon
            </a>
          </div>
        </div>

        <!-- Hero Banner -->
        <div class="tour-hero">
          <img
            :src="tour.imageUrl || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop'"
            :alt="tour.title"
            class="tour-hero__img"
          />
          <div class="tour-hero__overlay">
            <div class="tour-hero__meta">
              <span v-if="tour.destination" class="tour-badge">📍 {{ tour.destination }}</span>
              <span v-if="tour.duration" class="tour-badge">🕒 {{ tour.duration }}</span>
              <span v-if="tour.startingPrice" class="tour-badge tour-badge--accent">💶 {{ tour.startingPrice }}'den itibaren</span>
            </div>
            <h1>{{ tour.title }}</h1>
            <p v-if="tour.subtitle" class="tour-hero__sub">{{ tour.subtitle }}</p>
            <div v-if="tour.summaryBadges && tour.summaryBadges.length" class="tour-hero__chips">
              <span v-for="(b, idx) in tour.summaryBadges" :key="idx" class="hero-chip">✓ {{ b }}</span>
            </div>
          </div>
        </div>

        <!-- Gün Gün Tur Programı -->
        <div v-if="tour.itinerary && tour.itinerary.length" class="info-card" style="margin-top:28px;">
          <h3 style="font-size:1.3rem;margin-bottom:20px;">🗓️ Tur Programı</h3>
          <div class="itinerary-list">
            <div v-for="(item, idx) in tour.itinerary" :key="idx" class="itinerary-item">
              <div class="itinerary-item__head">
                <span class="itinerary-day">{{ item.day }}</span>
                <h4 class="itinerary-title">{{ item.title }}</h4>
              </div>
              <p class="itinerary-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Otel Seçenekleri ve Fiyat Tablosu -->
        <div v-if="tour.pricingPackages && tour.pricingPackages.length" class="info-card" style="margin-top:24px;">
          <h3 style="font-size:1.3rem;margin-bottom:18px;">🏨 Konaklama Seçenekleri ve Fiyatlar</h3>
          <div class="pricing-grid">
            <div v-for="(pkg, idx) in tour.pricingPackages" :key="idx" class="pricing-card">
              <div class="pricing-card__head">
                <span v-if="pkg.period" class="pricing-period">{{ pkg.period }}</span>
                <h4>{{ pkg.hotelName }}</h4>
                <div v-if="pkg.board" class="pricing-board">{{ pkg.board }}</div>
              </div>
              <p v-if="pkg.details" class="pricing-details">{{ pkg.details }}</p>
              <div class="pricing-rows">
                <div class="pricing-row">
                  <span>İki / Üç Kişilik Odada Kişi Başı</span>
                  <strong>{{ pkg.doublePrice || '-' }}</strong>
                </div>
                <div class="pricing-row">
                  <span>Tek Kişilik Oda</span>
                  <strong>{{ pkg.singlePrice || '-' }}</strong>
                </div>
                <div v-if="pkg.child1Price && pkg.child1Price !== '-'" class="pricing-row">
                  <span>1. Çocuk (3-12 Yaş)</span>
                  <strong>{{ pkg.child1Price }}</strong>
                </div>
                <div v-if="pkg.child2Price && pkg.child2Price !== '-'" class="pricing-row">
                  <span>2. Çocuk (3-12 Yaş)</span>
                  <strong>{{ pkg.child2Price }}</strong>
                </div>
                <div v-if="pkg.babyPrice" class="pricing-row">
                  <span>0-2 Yaş Bebek</span>
                  <strong>{{ pkg.babyPrice }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Avantajlı Ekstra Tur Paketi -->
        <div v-if="tour.extraPackage" class="info-card extra-pkg-box" style="margin-top:24px;">
          <h3>✨ Avantajlı Ekstra Tur Paketi</h3>
          <p style="margin-top:8px;font-weight:600;color:var(--primary-dark);">{{ tour.extraPackage }}</p>
        </div>

        <!-- Fiyata Dahil Olan & Olmayan Hizmetler -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:24px;margin-top:24px;">
          <div v-if="tour.includedServices && tour.includedServices.length" class="info-card">
            <h3 style="color:#15803d;">✅ Fiyatlara Dahil Olan Hizmetler</h3>
            <ul class="service-list service-list--inc">
              <li v-for="(s, i) in tour.includedServices" :key="i">{{ s }}</li>
            </ul>
          </div>

          <div v-if="tour.excludedServices && tour.excludedServices.length" class="info-card">
            <h3 style="color:#b91c1c;">❌ Fiyatlara Dahil Olmayan Servisler</h3>
            <ul class="service-list service-list--exc">
              <li v-for="(s, i) in tour.excludedServices" :key="i">{{ s }}</li>
            </ul>
          </div>
        </div>

        <!-- Hareket Tarihleri -->
        <div v-if="(tour.departureDates && tour.departureDates.length) || (tour.specialDates && tour.specialDates.length)" class="info-card" style="margin-top:24px;">
          <h3 style="font-size:1.25rem;margin-bottom:14px;">📅 2027 Hareket Tarihleri</h3>
          <div v-if="tour.departureDates && tour.departureDates.length" class="dates-grid">
            <span v-for="(d, i) in tour.departureDates" :key="i" class="date-pill">{{ d }}</span>
          </div>

          <div v-if="tour.specialDates && tour.specialDates.length" style="margin-top:22px;">
            <h4 style="color:var(--primary);margin-bottom:12px;">🌟 Özel Dönem & Bayram Hareket Tarihleri</h4>
            <div class="dates-grid">
              <span v-for="(sd, i) in tour.specialDates" :key="i" class="date-pill date-pill--special">{{ sd }}</span>
            </div>
          </div>
        </div>

        <!-- Önemli Notlar -->
        <div v-if="tour.notes && tour.notes.length" class="info-card" style="margin-top:24px;">
          <h3>📌 Önemli Notlar</h3>
          <ul style="list-style:disc;padding-left:20px;color:var(--text-muted);font-size:0.9rem;margin-top:10px;display:flex;flex-direction:column;gap:6px;">
            <li v-for="(n, i) in tour.notes" :key="i">{{ n }}</li>
          </ul>
        </div>
      </div>

      <div v-else style="text-align:center;padding:48px;">Tur bulunamadı.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: tour, pending } = await useFetch<any>(`/api/tours/${slug}`)

useHead({
  title: computed(() => (tour.value ? `${tour.value.title} — gelgidek.com` : 'Tur Detayı — gelgidek.com')),
  meta: [
    {
      name: 'description',
      content: computed(() => (tour.value ? `${tour.value.title} - ${tour.value.subtitle || ''}` : ''))
    }
  ]
})
</script>

<style scoped>
.tour-hero {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  min-height: 320px;
  display: flex;
  align-items: flex-end;
  background: var(--primary-dark);
  box-shadow: var(--shadow-lg);
}
.tour-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.45;
}
.tour-hero__overlay {
  position: relative;
  z-index: 2;
  padding: 36px 32px;
  color: #fff;
  width: 100%;
  background: linear-gradient(to top, rgba(11, 47, 82, 0.92), rgba(11, 47, 82, 0.25));
}
.tour-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}
.tour-badge {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(8px);
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 700;
}
.tour-badge--accent {
  background: var(--accent);
  color: var(--primary-dark);
}
.tour-hero h1 {
  font-size: clamp(1.6rem, 3.2vw, 2.4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 6px;
}
.tour-hero__sub {
  font-size: 1rem;
  opacity: 0.9;
  margin-bottom: 14px;
}
.tour-hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.hero-chip {
  background: rgba(116, 223, 246, 0.2);
  border: 1px solid rgba(116, 223, 246, 0.5);
  color: #fff;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}
.itinerary-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.itinerary-item {
  padding: 18px 20px;
  border-radius: var(--radius);
  background: var(--bg);
  border-left: 4px solid var(--primary);
}
.itinerary-item__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}
.itinerary-day {
  background: var(--primary);
  color: #fff;
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}
.itinerary-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--primary-dark);
}
.itinerary-desc {
  color: var(--text-muted);
  font-size: 0.92rem;
  white-space: pre-line;
  line-height: 1.65;
}
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 20px;
}
.pricing-card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg);
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.pricing-card__head h4 {
  font-size: 1.05rem;
  color: var(--primary);
  margin: 6px 0 4px;
}
.pricing-period {
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 700;
  background: var(--accent);
  color: var(--primary-dark);
  padding: 2px 10px;
  border-radius: 999px;
}
.pricing-board {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--primary-light);
  margin-bottom: 10px;
}
.pricing-details {
  font-size: 0.84rem;
  color: var(--text-muted);
  margin-bottom: 14px;
  line-height: 1.5;
}
.pricing-rows {
  margin-top: auto;
  border-top: 1px solid var(--border);
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.pricing-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.88rem;
  padding: 4px 0;
  border-bottom: 1px dashed rgba(16, 66, 113, 0.1);
}
.pricing-row strong {
  color: var(--primary-dark);
  font-weight: 800;
}
.extra-pkg-box {
  background: linear-gradient(135deg, #eaf2fb, #dff6fc);
  border-color: var(--accent-dark);
}
.service-list {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.service-list li {
  padding-left: 8px;
}
.dates-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.date-pill {
  background: var(--bg);
  border: 1px solid var(--border);
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--primary-dark);
}
.date-pill--special {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}
</style>
