<template>
  <div>
    <header class="header">
      <div class="container header__inner">
        <NuxtLink class="brand" to="/" aria-label="gelgidek.com ana sayfa">
          <svg class="logo" viewBox="0 0 820 140" role="img" aria-label="GELGİDEK.COM">
            <title>GELGİDEK.COM</title>
            <text class="t1" x="10" y="105" font-size="100">GELGİDEK</text>
            <circle cx="530" cy="99" r="7" fill="#74dff6"/>
            <text class="t2" x="558" y="105" font-size="100">COM</text>
          </svg>
        </NuxtLink>

        <button
          class="nav__toggle"
          type="button"
          :aria-expanded="navOpen.toString()"
          aria-controls="navMenu"
          @click="navOpen = !navOpen"
        >
          <span class="sr-only">Menü</span>
          <span class="hamburger" aria-hidden="true"></span>
        </button>

        <nav id="navMenu" :class="['nav', navOpen && 'nav--open']" aria-label="Ana menü">
          <NuxtLink to="/" @click="navOpen=false">Anasayfa</NuxtLink>
          <NuxtLink to="/ulkeler" @click="navOpen=false">Ülkeler</NuxtLink>
          <NuxtLink to="/vize-rejim-tablosu" @click="navOpen=false">Vize Rejim Tablosu</NuxtLink>
          <NuxtLink to="/hakkimizda" @click="navOpen=false">Hakkımızda</NuxtLink>
          <NuxtLink to="/iletisim" @click="navOpen=false">İletişim</NuxtLink>
        </nav>
      </div>
    </header>

    <main>
      <slot />
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="logo-text">GELGİDEK<span>.COM</span></div>
            <p>Profesyonel yurt dışı tur planlama ve vize danışmanlığı. Kişiye özel rota tasarımı, evrak hazırlığı ve başvuru süreç takibi.</p>
          </div>
          <div>
            <div class="footer__title">Sayfalar</div>
            <div class="footer__links">
              <NuxtLink to="/">Anasayfa</NuxtLink>
              <NuxtLink to="/ulkeler">Ülkeler</NuxtLink>
              <NuxtLink to="/vize-rejim-tablosu">Vize Rejim Tablosu</NuxtLink>
              <NuxtLink to="/hakkimizda">Hakkımızda</NuxtLink>
              <NuxtLink to="/iletisim">İletişim</NuxtLink>
            </div>
          </div>
          <div>
            <div class="footer__title">İletişim</div>
            <div class="footer__links">
              <a href="mailto:emre@gelgidek.com">emre@gelgidek.com</a>
              <a href="tel:+905074424378">+90 507 442 43 78</a>
              <a href="https://wa.me/905074424378" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span><span class="footer__dot">●</span> © {{ new Date().getFullYear() }} gelgidek.com</span>
          <span>Tüm hakları saklıdır.</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const navOpen = ref(false)

// Rota değişiminde menüyü kapat
const route = useRoute()
watch(() => route.path, () => { navOpen.value = false })
</script>
