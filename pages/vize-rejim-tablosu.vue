<template>
  <div class="section">
    <div class="container">
      <div class="section__head">
        <h2>Vize Rejim Tablosu</h2>
        <p class="muted">Türk vatandaşlarının tabi olduğu vize uygulamaları</p>
      </div>
      
      <div class="info-card" style="margin-bottom: 32px;border-left:4px solid var(--accent);">
        <p class="tiny muted" style="margin:0;">
          * Vize başvurunuzu olabildiğince erken bir tarihte (örneğin bir ay öncesinden) yapmanız tavsiye edilir. Çalışma ve öğrenim amaçlı vizelerin alınması 2-3 ay veya daha uzun sürebilir. Pasaportunuzun geçerlilik süresinin en az bir yıl olmasına özen gösterin.
        </p>
      </div>

      <div style="overflow-x:auto;">
        <table class="visa-table">
          <thead>
            <tr>
              <th>Ülke</th>
              <th>Umumi (Bordo) Pasaport</th>
              <th>Hususi (Yeşil) / Hizmet (Gri) Pasaport</th>
              <th>Diplomatik (Siyah) Pasaport</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Almanya</strong></td>
              <td><span class="badge badge--red">Vizeye Tabi</span> (Schengen)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
            </tr>
            <tr>
              <td><strong>Amerika Birleşik Devletleri</strong></td>
              <td><span class="badge badge--red">Vizeye Tabi</span></td>
              <td><span class="badge badge--red">Vizeye Tabi</span></td>
              <td><span class="badge badge--red">Vizeye Tabi</span></td>
            </tr>
            <tr>
              <td><strong>Fransa</strong></td>
              <td><span class="badge badge--red">Vizeye Tabi</span> (Schengen)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
            </tr>
            <tr>
              <td><strong>İngiltere (Birleşik Krallık)</strong></td>
              <td><span class="badge badge--red">Vizeye Tabi</span></td>
              <td><span class="badge badge--red">Vizeye Tabi</span></td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
            </tr>
            <tr>
              <td><strong>İtalya</strong></td>
              <td><span class="badge badge--red">Vizeye Tabi</span> (Schengen)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
            </tr>
            <tr>
              <td><strong>İspanya</strong></td>
              <td><span class="badge badge--red">Vizeye Tabi</span> (Schengen)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
              <td><span class="badge badge--green">Muaf</span> (180 günde 90 gün)</td>
            </tr>
            <tr>
              <td><strong>Japonya</strong></td>
              <td><span class="badge badge--green">Muaf</span> (90 gün)</td>
              <td><span class="badge badge--green">Muaf</span> (90 gün)</td>
              <td><span class="badge badge--green">Muaf</span> (90 gün)</td>
            </tr>
            <tr>
              <td><strong>Güney Kore</strong></td>
              <td><span class="badge badge--green">Muaf</span> (90 gün - K-ETA gerekli)</td>
              <td><span class="badge badge--green">Muaf</span> (90 gün - K-ETA gerekli)</td>
              <td><span class="badge badge--green">Muaf</span> (90 gün)</td>
            </tr>
            <tr>
              <td><strong>Sırbistan</strong></td>
              <td><span class="badge badge--green">Muaf</span> (90 gün - Kimlikle giriş imkanı)</td>
              <td><span class="badge badge--green">Muaf</span> (90 gün)</td>
              <td><span class="badge badge--green">Muaf</span> (90 gün)</td>
            </tr>
            <tr>
              <td><strong>Kuzey Kıbrıs Türk Cumhuriyeti</strong></td>
              <td><span class="badge badge--green">Muaf</span> (Kimlikle giriş imkanı)</td>
              <td><span class="badge badge--green">Muaf</span></td>
              <td><span class="badge badge--green">Muaf</span></td>
            </tr>
          </tbody>
        </table>
        <p class="tiny muted" style="margin-top:12px;text-align:right;">* Tablo örnek olarak hazırlanmıştır. Seyahat öncesi ilgili konsolosluktan teyit ediniz.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Vize Rejim Tablosu — gelgidek.com',
  meta: [{ name: 'description', content: 'Türk vatandaşlarının ülkelere göre tabi olduğu vize rejim tablosu ve uygulamaları.' }]
})
</script>
