<template>
  <div>
    <!-- Hero -->
    <section class="about-hero">
      <div class="container">
        <h1>Hakkımızda</h1>
        <p>gelgidek.com olarak yurt dışı seyahat ve vize danışmanlığında profesyonel çözümler sunuyoruz.</p>
      </div>
    </section>

    <!-- İçerik -->
    <section class="section">
      <div class="container">
        <div class="about-content">
          <div>
            <h2>Biz Kimiz?</h2>
            <p>
              gelgidek.com, yurt dışı seyahat planlamanızı kolaylaştırmak ve vize süreçlerinizi profesyonelce yönetmek amacıyla kurulmuş
              bir danışmanlık platformudur. Deneyimli ekibimizle birlikte, her müşterimize kişiye özel çözümler sunuyoruz.
            </p>
            <p>
              Ülkelere göre güncel vize gereklilikleri, evrak listeleri, başvuru bölgeleri ve büyükelçilik bilgilerini
              tek noktadan sunarak seyahat sürecinizi kolaylaştırıyoruz.
            </p>
            <p>
              İstanbul merkezli ekibimiz, 24 saat içinde geri dönüş garantisiyle uçtan uca danışmanlık hizmeti vermektedir.
            </p>

            <div class="about-values">
              <div class="value-item">
                <h4>⚡ Hız</h4>
                <p>24 saat içinde geri dönüş</p>
              </div>
              <div class="value-item">
                <h4>🎯 Hassasiyet</h4>
                <p>Güncel ve doğru bilgi</p>
              </div>
              <div class="value-item">
                <h4>🔐 Güven</h4>
                <p>Şeffaf ve güvenilir hizmet</p>
              </div>
              <div class="value-item">
                <h4>👤 Kişisellik</h4>
                <p>1:1 özel danışmanlık</p>
              </div>
            </div>
          </div>

          <div>
            <div class="info-card" style="background:linear-gradient(135deg,var(--primary-dark),var(--primary));color:#fff;border:none;">
              <h3 style="color:#fff;border-color:rgba(255,255,255,0.2);">📊 Sayılarla gelgidek.com</h3>
              <ul class="doc-list" style="color:rgba(255,255,255,0.85);">
                <li style="border-color:rgba(255,255,255,0.15);">150+ ülkeye ait vize bilgisi</li>
                <li style="border-color:rgba(255,255,255,0.15);">24 saat içi geri dönüş garantisi</li>
                <li style="border-color:rgba(255,255,255,0.15);">Kişiye özel danışmanlık paketi</li>
                <li style="border-color:rgba(255,255,255,0.15);">Güncel evrak ve form listeleri</li>
                <li style="border-color:rgba(255,255,255,0.15);border-bottom:none;">Büyükelçilik ve konsolosluk rehberi</li>
              </ul>
            </div>

            <div style="margin-top:20px;display:flex;flex-direction:column;gap:12px;">
              <a class="btn btn--primary btn--block" href="https://wa.me/905074424378" target="_blank" rel="noopener">
                💬 WhatsApp ile Yazın
              </a>
              <NuxtLink class="btn btn--ghost btn--block" to="/iletisim">İletişime Geçin</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Nasıl Çalışıyoruz -->
    <section class="section section--alt">
      <div class="container">
        <div class="section__head">
          <h2>Nasıl Çalışıyoruz?</h2>
          <p class="muted">4 adımda profesyonel vize danışmanlığı.</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-card__icon">1️⃣</div>
            <h3>Ücretsiz Ön Görüşme</h3>
            <p>Hedef ülke, tarih ve bütçenizi değerlendirerek sizi bilgilendiriyoruz.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">2️⃣</div>
            <h3>Kişisel Plan</h3>
            <p>Durumunuza özel evrak listesi, takvim ve risk analizi hazırlıyoruz.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">3️⃣</div>
            <h3>Uygulama</h3>
            <p>Başvuru formları, rezervasyon ve dosya düzeniyle süreci kolaylaştırıyoruz.</p>
          </div>
          <div class="feature-card">
            <div class="feature-card__icon">4️⃣</div>
            <h3>Süreç Takibi</h3>
            <p>Başvuru sonrası gelişmeleri izliyor, her adımda sizi bilgilendiriyoruz.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Hakkımızda — gelgidek.com',
  meta: [{ name: 'description', content: "gelgidek.com hakkında bilgi edinin. Profesyonel vize danışmanlığı ve yurt dışı tur planlama." }]
})
</script>
