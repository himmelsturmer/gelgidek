<template>
  <section
    class="hero-section"
    @mouseenter="pauseAuto"
    @mouseleave="startAuto"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div class="carousel">
      <div
        class="carousel__track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(slide, idx) in activeSlides"
          :key="slide.id || idx"
          class="carousel__slide"
          :style="slide.imageUrl ? { backgroundImage: `url(${slide.imageUrl})` } : {}"
        >
          <div class="carousel__content">
            <h2>{{ slide.title }}</h2>
            <p v-if="slide.subtitle">{{ slide.subtitle }}</p>
            <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
              <template v-if="slide.link">
                <NuxtLink
                  v-if="slide.link.startsWith('/')"
                  :to="slide.link"
                  class="btn btn--accent"
                >
                  Detaylı İncele →
                </NuxtLink>
                <a
                  v-else-if="isSafeHttp(slide.link)"
                  :href="slide.link"
                  target="_blank"
                  rel="noopener"
                  class="btn btn--accent"
                >
                  Detaylı İncele →
                </a>
              </template>
              <NuxtLink to="/turlar" class="btn btn--ghost" style="border-color:rgba(255,255,255,0.6);color:#fff;">
                🚌 Turlarımız
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <template v-if="activeSlides.length > 1">
        <button
          type="button"
          class="carousel__btn carousel__btn--prev"
          aria-label="Önceki slayt"
          @click="prevSlide"
        >
          ‹
        </button>
        <button
          type="button"
          class="carousel__btn carousel__btn--next"
          aria-label="Sonraki slayt"
          @click="nextSlide"
        >
          ›
        </button>
      </template>
    </div>

    <div v-if="activeSlides.length > 1" class="carousel__dots">
      <button
        v-for="(slide, idx) in activeSlides"
        :key="slide.id || idx"
        type="button"
        :class="['carousel__dot', idx === currentIndex && 'carousel__dot--active']"
        :aria-label="`${idx + 1}. slayta git`"
        @click="goToSlide(idx)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  slides?: any[] | null
}>()

const fallbackSlides = [
  {
    id: 0,
    title: 'Yurt Dışı Tur & Vize Danışmanlığı',
    subtitle: 'Profesyonel vize başvuru yönetimi, güncel evrak listeleri ve seçkin yurt dışı paket turlarımızla dünyayı keşfedin.',
    imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop',
    link: '/ulkeler'
  }
]

const activeSlides = computed(() => {
  if (props.slides && props.slides.length > 0) return props.slides
  return fallbackSlides
})

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
let touchStartX = 0

function isSafeHttp(url: string) {
  return /^https?:\/\//i.test(url || '')
}

function nextSlide() {
  const len = activeSlides.value.length
  if (len <= 1) return
  currentIndex.value = (currentIndex.value + 1) % len
}

function prevSlide() {
  const len = activeSlides.value.length
  if (len <= 1) return
  currentIndex.value = (currentIndex.value - 1 + len) % len
}

function goToSlide(idx: number) {
  currentIndex.value = idx
}

function startAuto() {
  pauseAuto()
  if (activeSlides.value.length > 1) {
    timer = setInterval(nextSlide, 6000)
  }
}

function pauseAuto() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function onTouchStart(e: TouchEvent) {
  touchStartX = e.changedTouches[0]?.clientX || 0
  pauseAuto()
}

function onTouchEnd(e: TouchEvent) {
  const endX = e.changedTouches[0]?.clientX || 0
  const diff = touchStartX - endX
  if (Math.abs(diff) > 45) {
    if (diff > 0) nextSlide()
    else prevSlide()
  }
  startAuto()
}

onMounted(() => {
  startAuto()
})

onBeforeUnmount(() => {
  pauseAuto()
})
</script>
