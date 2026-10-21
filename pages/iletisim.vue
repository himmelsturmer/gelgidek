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
            <div class="contact-item" v-if="contactEmail">
              <div class="contact-item__icon">✉️</div>
              <div>
                <div class="contact-item__label">E-posta</div>
                <div class="contact-item__value">
                  <a :href="'mailto:' + contactEmail">{{ contactEmail }}</a>
                </div>
              </div>
            </div>

            <div class="contact-item" v-if="contactPhone">
              <div class="contact-item__icon">📞</div>
              <div>
                <div class="contact-item__label">Telefon</div>
                <div class="contact-item__value">
                  <a :href="'tel:' + formatPhone(contactPhone)">{{ contactPhone }}</a>
                </div>
              </div>
            </div>

            <div class="contact-item" v-if="settings?.contact_address">
              <div class="contact-item__icon">📍</div>
              <div>
                <div class="contact-item__label">Adres</div>
                <div class="contact-item__value">
                  {{ settings.contact_address }}
                </div>
              </div>
            </div>

            <div class="contact-item" v-if="settings?.contact_hours">
              <div class="contact-item__icon">🕒</div>
              <div>
                <div class="contact-item__label">Çalışma Saatleri</div>
                <div class="contact-item__value">
                  {{ settings.contact_hours }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-cta">
          <h3>Bize Ulaşın</h3>
          <p>Size en uygun kanaldan hemen iletişime geçin. İlk görüşme ücretsiz ve bağlayıcı değildir.</p>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <a v-if="contactWhatsapp" class="btn btn--block btn--whatsapp" :href="'https://wa.me/' + contactWhatsapp" target="_blank" rel="noopener noreferrer">
              💬 WhatsApp ile Yazın
            </a>
            <a v-if="contactEmail" class="btn btn--block btn--ghost" :href="'mailto:' + contactEmail">
              ✉️ E-posta Gönderin
            </a>
            <a v-if="contactPhone" class="btn btn--block btn--ghost" :href="'tel:' + formatPhone(contactPhone)">
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

const { data: settings } = await useFetch<Record<string, string>>('/api/settings')

const contactEmail = computed(() => settings.value?.contact_email || 'emre@gelgidek.com')
const contactPhone = computed(() => settings.value?.contact_phone || '+90 507 442 43 78')
const contactWhatsapp = computed(() => settings.value?.contact_whatsapp || '905074424378')

function formatPhone(phone: string) {
  return phone ? phone.replace(/[\s-()]/g, '') : ''
}
</script>
