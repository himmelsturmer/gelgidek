<template>
  <div>
    <div class="admin-stats">
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--blue">🌍</div>
        <div>
          <div class="stat-card__value">{{ stats?.countries || 0 }}</div>
          <div class="stat-card__label">Kayıtlı Ülke</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--green">📋</div>
        <div>
          <div class="stat-card__value">{{ stats?.visaInfos || 0 }}</div>
          <div class="stat-card__label">Vize Bilgisi Kaydı</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--orange">🖼</div>
        <div>
          <div class="stat-card__value">{{ stats?.slides || 0 }}</div>
          <div class="stat-card__label">Aktif Slayt</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-card__icon stat-card__icon--purple">🏠</div>
        <div>
          <div class="stat-card__value">{{ stats?.homeCountries || 0 }}</div>
          <div class="stat-card__label">Ana Sayfa Kartı</div>
        </div>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-card__header">
        <h2>Hoş Geldiniz</h2>
      </div>
      <div class="admin-card__body">
        <p style="color:var(--text-muted);margin-bottom:20px;">
          Sol menüyü kullanarak ana sayfa içeriklerini ve ülke bazlı vize form ve evrak paketlerini yönetebilirsiniz.
        </p>
        
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <NuxtLink to="/admin/carousel" class="btn btn--primary btn--sm">🖼 Slaytları Düzenle</NuxtLink>
          <NuxtLink to="/admin/countries" class="btn btn--accent btn--sm">🌍 Ülke Ekle/Düzenle</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Dashboard | Admin Paneli' })

// Basit istatistikleri çekmek için /api/admin/stats (yoksa direkt boş gösterelim)
const { data: stats } = await useFetch('/api/admin/stats').catch(() => ({ data: null }))
</script>
