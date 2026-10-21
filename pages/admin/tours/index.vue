<template>
  <div>
    <div class="admin-card">
      <div class="admin-card__header" style="flex-wrap:wrap;gap:12px;">
        <h2>Turlar Yönetimi</h2>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <input
            ref="quickPdfInput"
            type="file"
            accept="application/pdf,.pdf"
            style="display:none;"
            @change="onQuickPdfSelected"
          />
          <button
            class="btn btn--accent btn--sm"
            :disabled="parsingPdf"
            @click="triggerQuickPdf"
          >
            {{ parsingPdf ? '⏳ PDF Analiz Ediliyor...' : '📄 PDF Yükleyerek Otomatik Tur Ekle' }}
          </button>
          <button class="btn btn--primary btn--sm" @click="openModal()">➕ Manuel Tur Ekle</button>
        </div>
      </div>

      <div class="admin-card__body">
        <!-- PDF Analiz Durum Bildirimi -->
        <div
          v-if="parsingPdf"
          style="background:#eff6ff;border:1px solid #93c5fd;color:#1e3a8a;padding:16px 20px;border-radius:var(--radius-sm);margin-bottom:20px;display:flex;align-items:center;gap:12px;font-weight:600;"
        >
          <span>⏳</span>
          <span>PDF broşür yapay zeka ile okunuyor; tur programı, otel/fiyat tabloları, dahil/hariç hizmetler ve hareket tarihleri otomatik çıkarılıyor (yaklaşık 5-15 sn)...</span>
        </div>

        <div style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;">
          <input
            v-model="search"
            type="text"
            placeholder="Tur Ara..."
            class="form-input"
            style="max-width:320px;"
          />
          <span class="muted tiny">Toplam {{ filteredTours.length }} tur</span>
        </div>

        <div v-if="pending" style="text-align:center;padding:24px;">Yükleniyor...</div>

        <div v-else class="table-responsive">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width:60px;">Sıra</th>
                <th>Tur Adı</th>
                <th>Bölge / Ülke</th>
                <th>Süre</th>
                <th>Başlangıç Fiyatı</th>
                <th style="text-align:center;">Durum</th>
                <th style="width:200px;text-align:right;">İşlem</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in filteredTours" :key="t.id">
                <td><strong>#{{ t.order }}</strong></td>
                <td>
                  <strong>{{ t.title }}</strong>
                  <div class="tiny muted">{{ t.subtitle || t.slug }}</div>
                </td>
                <td>{{ t.destination || '-' }}</td>
                <td>{{ t.duration || '-' }}</td>
                <td><span class="badge badge--blue">{{ t.startingPrice || '-' }}</span></td>
                <td style="text-align:center;">
                  <span
                    :style="{
                      padding: '4px 10px',
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: t.active ? '#dcfce7' : '#fee2e2',
                      color: t.active ? '#15803d' : '#b91c1c'
                    }"
                  >
                    {{ t.active ? 'Aktif' : 'Pasif' }}
                  </span>
                </td>
                <td style="text-align:right;">
                  <div class="actions" style="justify-content:flex-end;">
                    <NuxtLink :to="`/turlar/${t.slug}`" target="_blank" class="btn btn--ghost btn--sm" style="padding:6px 10px;" title="Sitede Gör">🌐</NuxtLink>
                    <button class="btn btn--primary btn--sm" style="padding:6px 12px;" @click="openModal(t)">✏️ Düzenle</button>
                    <button class="btn btn--danger btn--sm" style="padding:6px 10px;" @click="deleteTour(t.id)">🗑️</button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredTours.length === 0">
                <td colspan="7" style="text-align:center;padding:32px;color:var(--text-muted);">
                  Kayıtlı tur bulunamadı.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tam Ekran Tur Düzenleme / Ekleme Modalı -->
    <div v-if="isModalOpen" class="modal-overlay" style="padding:0;align-items:stretch;overflow:hidden;">
      <div class="modal" style="max-width:1050px;width:100%;height:100dvh;border-radius:0;display:flex;flex-direction:column;padding:0;">
        <div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--surface);">
          <h3 style="margin:0;font-size:1.1rem;">{{ form.id ? `Turu Düzenle: ${form.title}` : 'Yeni Tur Ekle' }}</h3>
          <button @click="closeModal" style="font-size:1.6rem;color:var(--text-muted);line-height:1;">&times;</button>
        </div>

        <div class="admin-modal-scroll" style="padding:20px;flex:1;overflow-y:auto;background:var(--bg);">
          <!-- PDF'den Otomatik Doldurma Kutusu -->
          <div
            style="background:linear-gradient(135deg, #eaf2fb, #dff6fc);border:2px dashed var(--primary-light);border-radius:var(--radius);padding:16px 20px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;"
          >
            <div style="flex:1;min-width:220px;">
              <strong style="color:var(--primary-dark);font-size:1rem;">📄 PDF Broşürden Otomatik Tur Yükle</strong>
              <p class="tiny muted" style="margin-top:4px;">
                Tur PDF dosyasını seçtiğinizde başlık, gün gün program, otel/fiyat paketleri ve hareket tarihleri otomatik doldurulur ve PDF dosyası tura eklenir.
              </p>
              <div v-if="uploadedPdfName" style="margin-top:6px;font-size:0.82rem;color:#15803d;font-weight:700;">
                ✓ Yüklendi: {{ uploadedPdfName }}
              </div>
            </div>
            <div>
              <input
                ref="modalPdfInput"
                type="file"
                accept="application/pdf,.pdf"
                style="display:none;"
                @change="onModalPdfSelected"
              />
              <button
                type="button"
                class="btn btn--primary btn--sm"
                :disabled="parsingPdf"
                @click="triggerModalPdf"
              >
                {{ parsingPdf ? '⏳ PDF Okunuyor...' : '📤 PDF Dosyası Seç & Doldur' }}
              </button>
            </div>
          </div>

          <form id="tourForm" @submit.prevent="saveTour" class="admin-form">
            <!-- 1. Genel Bilgiler -->
            <div class="admin-card" style="padding:20px;margin-bottom:24px;">
              <h4 style="color:var(--primary);margin-bottom:16px;">📌 Genel Tur Bilgileri</h4>
              <div class="admin-grid-2">
                <div class="form-group">
                  <label>Tur Başlığı <span style="color:red">*</span></label>
                  <input type="text" v-model="form.title" class="form-input" required @input="autoSlug" placeholder="Örn: Bansko Kayak Turu" />
                </div>
                <div class="form-group">
                  <label>URL Slug (Benzersiz) <span style="color:red">*</span></label>
                  <input type="text" v-model="form.slug" class="form-input" required placeholder="bansko-kayak-turu-3g" />
                </div>
                <div class="form-group col-span-full">
                  <label>Alt Başlık / Rota Özeti</label>
                  <input type="text" v-model="form.subtitle" class="form-input" placeholder="Örn: Selanik + Kavala + İskeçe + Gümülcine" />
                </div>
                <div class="form-group">
                  <label>Bölge / Ülke</label>
                  <input type="text" v-model="form.destination" class="form-input" placeholder="Örn: Yunanistan, Bulgaristan" />
                </div>
                <div class="form-group">
                  <label>Tur Süresi</label>
                  <input type="text" v-model="form.duration" class="form-input" placeholder="Örn: 1 Gece 3 Gün" />
                </div>
                <div class="form-group">
                  <label>Başlangıç Fiyatı (Kartta Görünür)</label>
                  <input type="text" v-model="form.startingPrice" class="form-input" placeholder="Örn: 129 €" />
                </div>
                <div class="admin-grid-2" style="gap:12px;">
                  <div class="form-group">
                    <label>Sıralama</label>
                    <input type="number" v-model.number="form.order" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Durum</label>
                    <select v-model="form.active" class="form-select">
                      <option :value="true">Aktif (Sitede Görünür)</option>
                      <option :value="false">Pasif (Gizli)</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label>Kapak Görseli URL</label>
                  <input type="text" v-model="form.imageUrl" class="form-input" placeholder="https://..." />
                </div>
                <div class="form-group">
                  <label>PDF Broşür Linki (PDF yüklerseniz otomatik oluşur)</label>
                  <input type="text" v-model="form.pdfUrl" class="form-input" placeholder="/turlar/001-bansko-kayak-turu-3g.pdf" />
                </div>
              </div>

              <div class="form-group" style="margin-top:16px;">
                <label>Öne Çıkan Rozetler (Her satıra 1 özellik yazın)</label>
                <textarea
                  v-model="badgesText"
                  class="form-textarea"
                  style="min-height:70px;"
                  placeholder="Lüks Otobüslerle Ulaşım&#10;Gizlenmiş Mecburi Ücret Yok&#10;Yeşil Pasaporta Vize Yok"
                ></textarea>
              </div>
            </div>

            <!-- 2. Gün Gün Tur Programı -->
            <div class="admin-card" style="padding:20px;margin-bottom:24px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
                <h4 style="color:var(--primary);margin:0;">🗓️ Gün Gün Tur Programı ({{ form.itinerary.length }} Gün)</h4>
                <button type="button" class="btn btn--primary btn--sm" @click="addItineraryDay">➕ Gün Ekle</button>
              </div>

              <div v-for="(dayItem, idx) in form.itinerary" :key="idx" style="background:var(--bg-alt);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--border);margin-bottom:12px;">
                <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-bottom:10px;">
                  <input type="text" v-model="dayItem.day" class="form-input" style="max-width:150px;min-width:110px;" placeholder="1. Gün" />
                  <input type="text" v-model="dayItem.title" class="form-input" style="flex:1;min-width:180px;" placeholder="İstanbul – Selanik" />
                  <button type="button" class="btn btn--danger btn--sm" style="padding:6px 10px;" @click="form.itinerary.splice(idx, 1)">🗑️</button>
                </div>
                <textarea v-model="dayItem.description" class="form-textarea" style="min-height:95px;" placeholder="Günün detaylı programı..."></textarea>
              </div>
            </div>

            <!-- 3. Otel & Fiyat Paketleri -->
            <div class="admin-card" style="padding:20px;margin-bottom:24px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
                <h4 style="color:var(--primary);margin:0;">🏨 Konaklama & Fiyat Paketleri ({{ form.pricingPackages.length }} Paket)</h4>
                <button type="button" class="btn btn--primary btn--sm" @click="addPricingPackage">➕ Otel / Fiyat Paketi Ekle</button>
              </div>

              <div v-for="(pkg, idx) in form.pricingPackages" :key="idx" style="background:var(--bg-alt);padding:16px;border-radius:var(--radius-sm);border:1px solid var(--border);margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                  <strong>Paket #{{ idx + 1 }}</strong>
                  <button type="button" class="btn btn--danger btn--sm" style="padding:4px 10px;" @click="form.pricingPackages.splice(idx, 1)">🗑️ Paketi Sil</button>
                </div>
                <div class="admin-grid-3-tour" style="margin-bottom:10px;">
                  <div class="form-group">
                    <label>Otel Adı</label>
                    <input type="text" v-model="pkg.hotelName" class="form-input" placeholder="4* Panorama Hotel V.B" />
                  </div>
                  <div class="form-group">
                    <label>Konaklama Tipi</label>
                    <input type="text" v-model="pkg.board" class="form-input" placeholder="Oda Kahvaltı" />
                  </div>
                  <div class="form-group">
                    <label>Dönem Etiketi</label>
                    <input type="text" v-model="pkg.period" class="form-input" placeholder="Normal Dönem / Özel Dönem" />
                  </div>
                </div>
                <div class="form-group" style="margin-bottom:10px;">
                  <label>Otel Açıklaması / Detay</label>
                  <input type="text" v-model="pkg.details" class="form-input" placeholder="Otel özellikleri..." />
                </div>
                <div class="admin-grid-5">
                  <div class="form-group">
                    <label>2/3 Kişilik Oda Kişi Başı</label>
                    <input type="text" v-model="pkg.doublePrice" class="form-input" placeholder="129 €" />
                  </div>
                  <div class="form-group">
                    <label>Tek Kişilik Oda</label>
                    <input type="text" v-model="pkg.singlePrice" class="form-input" placeholder="209 €" />
                  </div>
                  <div class="form-group">
                    <label>1. Çocuk (3-12 Yaş)</label>
                    <input type="text" v-model="pkg.child1Price" class="form-input" placeholder="100 €" />
                  </div>
                  <div class="form-group">
                    <label>2. Çocuk (3-12 Yaş)</label>
                    <input type="text" v-model="pkg.child2Price" class="form-input" placeholder="-" />
                  </div>
                  <div class="form-group">
                    <label>0-2 Yaş Bebek</label>
                    <input type="text" v-model="pkg.babyPrice" class="form-input" placeholder="0-2 Yaş Ücretsiz" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 4. Dahil Olan ve Olmayan Hizmetler -->
            <div class="admin-grid-2" style="gap:20px;margin-bottom:24px;">
              <div class="admin-card" style="padding:20px;">
                <h4 style="color:#15803d;margin-bottom:10px;">✅ Fiyata Dahil Olan Hizmetler</h4>
                <p class="tiny muted" style="margin-bottom:8px;">Her satıra bir madde yazın.</p>
                <textarea v-model="includedText" class="form-textarea" style="min-height:160px;"></textarea>
              </div>
              <div class="admin-card" style="padding:20px;">
                <h4 style="color:#b91c1c;margin-bottom:10px;">❌ Fiyata Dahil Olmayan Servisler</h4>
                <p class="tiny muted" style="margin-bottom:8px;">Her satıra bir madde yazın.</p>
                <textarea v-model="excludedText" class="form-textarea" style="min-height:160px;"></textarea>
              </div>
            </div>

            <!-- 5. Hareket Tarihleri & Özel Tarihler -->
            <div class="admin-grid-2" style="gap:20px;margin-bottom:24px;">
              <div class="admin-card" style="padding:20px;">
                <h4 style="color:var(--primary);margin-bottom:10px;">📅 Normal Hareket Tarihleri</h4>
                <p class="tiny muted" style="margin-bottom:8px;">Her satıra bir tarih yazın.</p>
                <textarea v-model="datesText" class="form-textarea" style="min-height:180px;"></textarea>
              </div>
              <div class="admin-card" style="padding:20px;">
                <h4 style="color:var(--primary);margin-bottom:10px;">🌟 Özel / Bayram Hareket Tarihleri</h4>
                <p class="tiny muted" style="margin-bottom:8px;">Varsa her satıra bir özel tarih yazın.</p>
                <textarea v-model="specialDatesText" class="form-textarea" style="min-height:180px;"></textarea>
              </div>
            </div>

            <!-- 6. Ekstra Tur Paketi & Notlar -->
            <div class="admin-card" style="padding:20px;margin-bottom:32px;">
              <h4 style="color:var(--primary);margin-bottom:14px;">📝 Avantajlı Ekstra Tur Paketi & Notlar</h4>
              <div class="form-group" style="margin-bottom:16px;">
                <label>Avantajlı Ekstra Tur Paketi Açıklaması (Opsiyonel)</label>
                <textarea v-model="form.extraPackage" class="form-textarea" style="min-height:65px;" placeholder="Örn: Kalambaka – Meteora + Akropolis Turu... 310 € yerine 290 €"></textarea>
              </div>
              <div class="form-group">
                <label>Önemli Notlar (Her satıra bir not yazın)</label>
                <textarea v-model="notesText" class="form-textarea" style="min-height:120px;"></textarea>
              </div>
            </div>
          </form>
        </div>

        <div style="padding:14px 20px;border-top:1px solid var(--border);background:var(--surface);display:flex;justify-content:flex-end;gap:12px;flex-wrap:wrap;">
          <button type="button" class="btn btn--ghost" @click="closeModal">İptal</button>
          <button type="submit" form="tourForm" class="btn btn--primary" :disabled="saving || parsingPdf">
            {{ saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Turlar Yönetimi | Admin' })

const { data: tours, pending, refresh } = await useFetch<any[]>('/api/admin/tours')

const search = ref('')
const isModalOpen = ref(false)
const saving = ref(false)
const parsingPdf = ref(false)
const uploadedPdfName = ref('')

const quickPdfInput = ref<HTMLInputElement | null>(null)
const modalPdfInput = ref<HTMLInputElement | null>(null)

const defaultForm = () => ({
  id: 0,
  title: '',
  slug: '',
  subtitle: '',
  destination: '',
  duration: '',
  startingPrice: '',
  imageUrl: '',
  pdfUrl: '',
  pdfData: '',
  summaryBadges: [] as string[],
  itinerary: [] as { day: string; title: string; description: string }[],
  pricingPackages: [] as {
    hotelName: string
    board: string
    details: string
    doublePrice: string
    singlePrice: string
    child1Price: string
    child2Price: string
    babyPrice: string
    period: string
  }[],
  includedServices: [] as string[],
  excludedServices: [] as string[],
  departureDates: [] as string[],
  specialDates: [] as string[],
  extraPackage: '',
  notes: [] as string[],
  order: 1,
  active: true
})

const form = ref(defaultForm())

const filteredTours = computed(() => {
  if (!tours.value) return []
  if (!search.value.trim()) return tours.value
  const q = search.value.toLowerCase()
  return tours.value.filter(
    (t: any) =>
      t.title.toLowerCase().includes(q) ||
      (t.subtitle && t.subtitle.toLowerCase().includes(q)) ||
      (t.destination && t.destination.toLowerCase().includes(q))
  )
})

const badgesText = computed({
  get: () => form.value.summaryBadges.join('\n'),
  set: (v) => {
    form.value.summaryBadges = v.split('\n').map((s) => s.trim()).filter(Boolean)
  }
})

const includedText = computed({
  get: () => form.value.includedServices.join('\n'),
  set: (v) => {
    form.value.includedServices = v.split('\n').map((s) => s.trim()).filter(Boolean)
  }
})

const excludedText = computed({
  get: () => form.value.excludedServices.join('\n'),
  set: (v) => {
    form.value.excludedServices = v.split('\n').map((s) => s.trim()).filter(Boolean)
  }
})

const datesText = computed({
  get: () => form.value.departureDates.join('\n'),
  set: (v) => {
    form.value.departureDates = v.split('\n').map((s) => s.trim()).filter(Boolean)
  }
})

const specialDatesText = computed({
  get: () => form.value.specialDates.join('\n'),
  set: (v) => {
    form.value.specialDates = v.split('\n').map((s) => s.trim()).filter(Boolean)
  }
})

const notesText = computed({
  get: () => form.value.notes.join('\n'),
  set: (v) => {
    form.value.notes = v.split('\n').map((s) => s.trim()).filter(Boolean)
  }
})

const autoSlug = () => {
  if (form.value.id) return
  const trMap: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', i: 'i', ö: 'o', ş: 's', ü: 'u' }
  const str = form.value.title.toLowerCase().replace(/[çğıiöşü]/g, (m) => trMap[m])
  form.value.slug = str.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  if (form.value.pdfData && form.value.slug) {
    form.value.pdfUrl = `/api/tours/${form.value.slug}/pdf`
  }
}

const addItineraryDay = () => {
  const nextNum = form.value.itinerary.length + 1
  form.value.itinerary.push({
    day: `${nextNum}. Gün`,
    title: '',
    description: ''
  })
}

const addPricingPackage = () => {
  form.value.pricingPackages.push({
    hotelName: '',
    board: 'Oda Kahvaltı',
    details: '',
    doublePrice: '',
    singlePrice: '',
    child1Price: '',
    child2Price: '-',
    babyPrice: '0-2 Yaş Ücretsiz',
    period: '2027 Dönemi'
  })
}

const openModal = (tour: any = null) => {
  uploadedPdfName.value = ''
  if (tour) {
    form.value = {
      id: tour.id,
      title: tour.title || '',
      slug: tour.slug || '',
      subtitle: tour.subtitle || '',
      destination: tour.destination || '',
      duration: tour.duration || '',
      startingPrice: tour.startingPrice || '',
      imageUrl: tour.imageUrl || '',
      pdfUrl: tour.pdfUrl || '',
      pdfData: '',
      summaryBadges: Array.isArray(tour.summaryBadges) ? [...tour.summaryBadges] : [],
      itinerary: Array.isArray(tour.itinerary) ? tour.itinerary.map((x: any) => ({ ...x })) : [],
      pricingPackages: Array.isArray(tour.pricingPackages) ? tour.pricingPackages.map((x: any) => ({ ...x })) : [],
      includedServices: Array.isArray(tour.includedServices) ? [...tour.includedServices] : [],
      excludedServices: Array.isArray(tour.excludedServices) ? [...tour.excludedServices] : [],
      departureDates: Array.isArray(tour.departureDates) ? [...tour.departureDates] : [],
      specialDates: Array.isArray(tour.specialDates) ? [...tour.specialDates] : [],
      extraPackage: tour.extraPackage || '',
      notes: Array.isArray(tour.notes) ? [...tour.notes] : [],
      order: tour.order ?? 1,
      active: tour.active ?? true
    }
  } else {
    form.value = defaultForm()
    form.value.order = (tours.value?.length || 0) + 1
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result || ''))
    reader.onerror = (err) => reject(err)
    reader.readAsDataURL(file)
  })
}

const extractTextWithPdfJs = async (file: File): Promise<string> => {
  try {
    const w = window as any
    if (!w.pdfjsLib) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script')
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
        s.onload = () => resolve()
        s.onerror = () => reject(new Error('pdf.js yüklenemedi'))
        document.head.appendChild(s)
      })
      w.pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
    }
    const buf = await file.arrayBuffer()
    const pdf = await w.pdfjsLib.getDocument({ data: buf }).promise
    const pages: string[] = []
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      const pageText = content.items.map((it: any) => it.str || '').join(' ')
      pages.push(`--- SAYFA ${i} ---\n${pageText}`)
    }
    return pages.join('\n\n').trim()
  } catch {
    return ''
  }
}

const DEFAULT_TOUR_IMAGES: Record<string, string> = {
  yunanistan: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
  bulgaristan: 'https://images.unsplash.com/photo-1563284223-333497472e88?q=80&w=1600&auto=format&fit=crop',
  kayak: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1600&auto=format&fit=crop',
  bansko: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1600&auto=format&fit=crop',
  atina: 'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=1600&auto=format&fit=crop',
  parga: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1600&auto=format&fit=crop',
  korfu: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1600&auto=format&fit=crop',
  dedeagac: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'
}

const slugifyTr = (text: string): string => {
  const trMap: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', i: 'i', ö: 'o', ş: 's', ü: 'u' }
  return (text || '')
    .toLowerCase()
    .replace(/[çğıiöşü]/g, (m) => trMap[m] || m)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const pickDefaultImage = (title: string, destination: string): string => {
  const check = slugifyTr(`${title} ${destination}`)
  for (const [k, url] of Object.entries(DEFAULT_TOUR_IMAGES)) {
    if (check.includes(k)) return url
  }
  return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop'
}

const processPdfFile = async (file: File, openNewModalIfClosed: boolean) => {
  parsingPdf.value = true
  try {
    const [base64DataUrl, extractedText] = await Promise.all([
      readFileAsBase64(file),
      extractTextWithPdfJs(file)
    ])

    const extracted = await $fetch<any>('/api/admin/tours/parse-pdf', {
      method: 'POST',
      body: {
        fileName: file.name,
        pdfText: extractedText && extractedText.length > 80 ? extractedText : undefined,
        pdfBase64: !extractedText || extractedText.length <= 80 ? base64DataUrl : undefined
      }
    })

    if (openNewModalIfClosed && !isModalOpen.value) {
      form.value = defaultForm()
      form.value.order = (tours.value?.length || 0) + 1
      isModalOpen.value = true
    }

    uploadedPdfName.value = file.name
    const title = extracted.title || file.name.replace(/\.pdf$/i, '')
    const slug = slugifyTr(extracted.slug || title) || 'yeni-tur'
    const destination = extracted.destination || ''

    form.value.title = title
    if (!form.value.id) {
      form.value.slug = slug
    }
    form.value.subtitle = extracted.subtitle || form.value.subtitle
    form.value.destination = destination || form.value.destination
    form.value.duration = extracted.duration || form.value.duration
    form.value.startingPrice = extracted.startingPrice || form.value.startingPrice
    form.value.imageUrl = extracted.imageUrl || form.value.imageUrl || pickDefaultImage(title, destination)
    if (file.size <= 3.5 * 1024 * 1024) {
      form.value.pdfData = base64DataUrl
      form.value.pdfUrl = `/api/tours/${form.value.slug || slug}/pdf`
    }
    form.value.summaryBadges = Array.isArray(extracted.summaryBadges) ? extracted.summaryBadges : []
    form.value.itinerary = Array.isArray(extracted.itinerary) ? extracted.itinerary : []
    form.value.pricingPackages = Array.isArray(extracted.pricingPackages) ? extracted.pricingPackages : []
    form.value.includedServices = Array.isArray(extracted.includedServices) ? extracted.includedServices : []
    form.value.excludedServices = Array.isArray(extracted.excludedServices) ? extracted.excludedServices : []
    form.value.departureDates = Array.isArray(extracted.departureDates) ? extracted.departureDates : []
    form.value.specialDates = Array.isArray(extracted.specialDates) ? extracted.specialDates : []
    form.value.extraPackage = extracted.extraPackage || ''
    form.value.notes = Array.isArray(extracted.notes) ? extracted.notes : []
  } catch (err: any) {
    alert('PDF ayrıştırma hatası: ' + (err.data?.message || err.statusMessage || err.message || err))
  } finally {
    parsingPdf.value = false
  }
}

const triggerQuickPdf = () => {
  quickPdfInput.value?.click()
}

const triggerModalPdf = () => {
  modalPdfInput.value?.click()
}

const onQuickPdfSelected = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  await processPdfFile(file, true)
}

const onModalPdfSelected = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return
  await processPdfFile(file, false)
}

const saveTour = async () => {
  saving.value = true
  try {
    const url = form.value.id ? `/api/admin/tours/${form.value.id}` : '/api/admin/tours'
    const method = form.value.id ? 'PUT' : 'POST'
    await $fetch(url, { method, body: form.value })
    await refresh()
    closeModal()
  } catch (err: any) {
    alert('Kaydetme hatası: ' + (err.data?.message || err))
  } finally {
    saving.value = false
  }
}

const deleteTour = async (id: number) => {
  if (!confirm('Bu turu silmek istediğinize emin misiniz?')) return
  try {
    await $fetch(`/api/admin/tours/${id}`, { method: 'DELETE' })
    await refresh()
  } catch (err) {
    alert('Silme hatası: ' + err)
  }
}
</script>
