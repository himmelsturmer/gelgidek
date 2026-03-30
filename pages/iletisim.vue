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
            <div class="contact-item" v-if="settings?.contact_email">
              <div class="contact-item__icon">✉️</div>
              <div>
                <div class="contact-item__label">E-posta</div>
                <div class="contact-item__value">
                  <a :href="'mailto:' + settings.contact_email">{{ settings.contact_email }}</a>
                </div>
              </div>
            </div>

            <div class="contact-item" v-if="settings?.contact_phone">
              <div class="contact-item__icon">📞</div>
              <div>
                <div class="contact-item__label">Telefon</div>
                <div class="contact-item__value">
                  <a :href="'tel:' + formatPhone(settings.contact_phone)">{{ settings.contact_phone }}</a>
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
            <a v-if="settings?.contact_whatsapp" class="btn btn--block btn--whatsapp" :href="'https://wa.me/' + settings.contact_whatsapp" target="_blank" rel="noopener">
              💬 WhatsApp ile Yazın
            </a>
            <a v-if="settings?.contact_email" class="btn btn--block btn--ghost" :href="'mailto:' + settings.contact_email">
              ✉️ E-posta Gönderin
            </a>
            <a v-if="settings?.contact_phone" class="btn btn--block btn--ghost" :href="'tel:' + formatPhone(settings.contact_phone)">
              📞 Hemen Arayın
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

useHead({
  title: 'İletişim — gelgidek.com',
  meta: [{ name: 'description', content: "gelgidek.com ile iletişime geçin. Vize danışmanlığı, yurt dışı turları ve seyahat planlaması." }]
})

const settings = ref(null)

function formatPhone(phone: string) {
  // Removes spaces and dashes for the tel: link
  return phone ? phone.replace(/[\s-()]/g, '') : ''
}

onMounted(async () => {
  try {
    settings.value = await $fetch('/api/settings')
  } catch (err) {
    console.error('Settings could not be loaded', err)
  }
})
</script>
