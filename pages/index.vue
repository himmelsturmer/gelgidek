<template>
  <div>
    <!-- Hero Carousel -->
    <AppCarousel :slides="slides" />

    <!-- Ülke Kartları -->
    <section class="section">
      <div class="container">
        <div class="section__head">
          <h2>Nereye Gitmek İstersiniz?</h2>
          <p class="muted">Vize gereklilikleri, evrak listeleri ve başvuru bilgileri için ülke seçin.</p>
        </div>
        <div class="countries-grid">
          <NuxtLink
            v-for="country in homeCountries"
            :key="country.id"
            :to="`/ulkeler/${country.slug}`"
            class="country-card"
          >
            <span class="country-card__flag">{{ country.flagUrl || '🌍' }}</span>
            <div class="country-card__name">{{ country.name }}</div>
          </NuxtLink>
          <NuxtLink to="/ulkeler" class="country-card" style="border-style:dashed;">
            <span class="country-card__flag">➕</span>
            <div class="country-card__name">Tüm Ülkeler</div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Neden Biz -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__head">
          <h2>Neden gelgidek.com?</h2>
          <p class="muted">Vize işlemlerinizi güvenli ve hızlı şekilde yönetmeniz için doğru adrestesiniz.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-card__icon">⚡</div>
            <h3>Zaman Tasarrufu</h3>
            <p>Gereksiz formalitelerden sizi kurtararak vize işlemlerinizi en kısa sürede sonuçlandırıyoruz.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">📋</div>
            <h3>Eksiksiz Rehberlik</h3>
            <p>İstenen evrakları hazırlamanızda eksiksiz ve güvenilir danışmanlık sunuyoruz.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">🔄</div>
            <h3>Güncel Bilgi</h3>
            <p>Sürekli güncellenen sistemimizle en doğru bilgiyle işlem yapıyoruz.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">🌐</div>
            <h3>Tek Nokta</h3>
            <p>Vize adına ihtiyacınız olan tüm bilgiler, formlar ve başvuru detayları tek bir sitede.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Duyurular -->
    <section class="section" v-if="announcements && announcements.length > 0">
      <div class="container" style="max-width:800px;">
        <div class="section__head">
          <h2>Önemli Duyurular</h2>
        </div>
        <div class="info-card" v-for="ann in announcements" :key="ann.id" style="border-left:4px solid var(--accent);">
          <h3>📢 {{ ann.title }}</h3>
          <p style="white-space:pre-wrap;color:var(--text-muted);">{{ ann.content }}</p>
        </div>
      </div>
    </section>

    <!-- SSS -->
    <section class="section section--alt" v-if="faqs && faqs.length > 0">
      <div class="container">
        <div class="section__head">
          <h2>Sık Sorulan Sorular</h2>
        </div>
        <div class="faq-list">
          <details class="faq-item" v-for="faq in faqs" :key="faq.id">
            <summary>{{ faq.question }}</summary>
            <p>{{ faq.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Referanslar/CTA -->
    <section class="section">
      <div class="container" style="text-align:center;">
        <h2 style="font-size:clamp(1.4rem,4vw,2rem);font-weight:800;color:var(--primary);margin-bottom:16px;">
          Yurt dışı seyahatinizi profesyonelce planlıyoruz.
        </h2>
        <p class="muted" style="max-width:560px;margin:0 auto 32px;">
          Bütçenize, tarihinize ve hedefinize uygun kişiye özel tur planları, vize süreç yönetimi ve evrak danışmanlığı.
        </p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
          <a class="btn btn--primary" href="https://wa.me/905074424378" target="_blank" rel="noopener">WhatsApp ile Yazın</a>
          <NuxtLink class="btn btn--ghost" to="/iletisim">İletişime Geçin</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'gelgidek.com — Yurt Dışı Tur & Vize Danışmanlığı',
  meta: [{ name: 'description', content: 'Ülkelere göre vize bilgisi, evrak listeleri ve başvuru rehberi.' }]
})

const { data: slides } = await useFetch('/api/carousel')
const { data: homeCountries } = await useFetch('/api/countries/home')
const { data: announcements } = await useFetch('/api/announcements')
const { data: faqs } = await useFetch('/api/faqs')
</script>
