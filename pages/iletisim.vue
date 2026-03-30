<template>
  <div class="section">
    <div class="container contact">
      <div class="contact-grid">
        <div class="contact-info">
          <h2>İletişim</h2>
          <p>
            Seyahat planlarınız hakkında bilgi almak, fiyat teklifi talep etmek veya herhangi bir sorunuzu iletmek için
            aşağıdaki kanallardan bize ulaşabilirsiniz.
          </p>

          <div class="contact-items">
            <div class="contact-item">
              <div class="contact-item__icon">✉️</div>
              <div>
                <div class="contact-item__label">E-posta</div>
                <div class="contact-item__value">
                  <a href="mailto:emre@gelgidek.com">emre@gelgidek.com</a>
                </div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon">📞</div>
              <div>
                <div class="contact-item__label">Telefon</div>
                <div class="contact-item__value">
                  <a href="tel:+905074424378">+90 507 442 43 78</a>
                </div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon">📍</div>
              <div>
                <div class="contact-item__label">Adres</div>
                <div class="contact-item__value">
                  İstanbul, Türkiye
                </div>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-item__icon">🕒</div>
              <div>
                <div class="contact-item__label">Çalışma Saatleri</div>
                <div class="contact-item__value">
                  Hafta içi 10:00 – 18:00
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-cta">
          <h3>Bize Ulaşın</h3>
          <p>Size en uygun kanaldan hemen iletişime geçin. İlk görüşme ücretsiz ve bağlayıcı değildir.</p>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <a class="btn btn--block btn--whatsapp" href="https://wa.me/905074424378" target="_blank" rel="noopener">
              💬 WhatsApp ile Yazın
            </a>
            <a class="btn btn--block btn--ghost" href="mailto:emre@gelgidek.com">
              ✉️ E-posta Gönderin
            </a>
            <a class="btn btn--block btn--ghost" href="tel:+905074424378">
              📞 Hemen Arayın
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'İletişim — gelgidek.com',
  meta: [{ name: 'description', content: "gelgidek.com ile iletişime geçin. Vize danışmanlığı, yurt dışı turları ve seyahat planlaması." }]
})
</script>
