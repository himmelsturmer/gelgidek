<template>
  <div class="vb-root">
    <!-- ── KPI KARTLAR ── -->
    <div class="vb-kpi-grid">
      <div class="vb-kpi-card vb-kpi-blue">
        <div class="vb-kpi-icon">📅</div>
        <div class="vb-kpi-body">
          <div class="vb-kpi-value">{{ kpi?.bugunRandevular ?? '–' }}</div>
          <div class="vb-kpi-label">Bugünkü Randevular</div>
        </div>
      </div>
      <div class="vb-kpi-card vb-kpi-orange">
        <div class="vb-kpi-icon">💳</div>
        <div class="vb-kpi-body">
          <div class="vb-kpi-value">{{ kpi?.odemesBekleyenler ?? '–' }}</div>
          <div class="vb-kpi-label">Ödemesi Bekleyenler</div>
        </div>
      </div>
      <div class="vb-kpi-card vb-kpi-green">
        <div class="vb-kpi-icon">✅</div>
        <div class="vb-kpi-body">
          <div class="vb-kpi-value">{{ kpi?.onayOrani ?? '–' }}%</div>
          <div class="vb-kpi-label">Onay Oranı</div>
        </div>
      </div>
      <div class="vb-kpi-card vb-kpi-purple">
        <div class="vb-kpi-icon">👤</div>
        <div class="vb-kpi-body">
          <div class="vb-kpi-value">{{ kpi?.toplamBasvuru ?? '–' }}</div>
          <div class="vb-kpi-label">Toplam Başvuru</div>
        </div>
      </div>
    </div>

    <!-- ── YAKLAŞANLAR (Bitiş & Randevu) YAN YANA ── -->
    <div style="display:flex; gap:20px; flex-wrap:wrap; margin-bottom:20px;">
      
      <!-- RETENTION PANELİ -->
      <div v-if="retention && retention.length > 0" class="vb-upcoming-panel" style="flex:1; min-width:min(100%, 280px); border-color: #fca5a5; margin-bottom:0;">
        <div class="vb-upcoming-header" style="background:#fef2f2; border-bottom-color:#fca5a5;">
          <span class="vb-upcoming-title" style="color:#991b1b;">🎈 Vizesi Sona Yaklaşanlar</span>
          <span class="vb-upcoming-count" style="color:#b91c1c;">{{ retention.length }} Müşteri (Son 60 gün)</span>
        </div>
        <div class="vb-upcoming-list" style="max-height: 250px; overflow-y: auto;">
          <div v-for="app in retention" :key="app.id" class="vb-upcoming-item" style="border-left: 4px solid #ef4444;">
            <div class="vb-upcoming-info">
              <strong>{{ app.customer?.ad }} {{ app.customer?.soyad }}</strong>
              <span>{{ app.ulke }} Vizesi — Bitiş: {{ formatDate(app.visaEndDate) }}</span>
            </div>
            <div class="vb-actions">
              <button class="btn btn--sm" style="background:white; border:1px solid #cbd5e1;" @click="openEditModal(app)">📞 İletişime Geç</button>
            </div>
          </div>
        </div>
      </div>

      <!-- YAKLAŞAN RANDEVULAR PANELİ -->
      <div v-if="upcoming && upcoming.length > 0" class="vb-upcoming-panel" style="flex:1; min-width:min(100%, 280px); margin-bottom:0;">
        <div class="vb-upcoming-header">
          <span class="vb-upcoming-title">🔔 Yaklaşan Randevular (15 Gün)</span>
          <span class="vb-upcoming-count">{{ upcoming.length }} randevu</span>
        </div>
        <div class="vb-upcoming-list" style="max-height: 250px; overflow-y: auto;">
          <div
            v-for="apt in upcoming"
            :key="apt.id"
            class="vb-upcoming-item"
            :class="`vb-upcoming-${apt.urgency}`"
          >
            <div class="vb-upcoming-badge" :class="`badge-${apt.urgency}`">
              {{ apt.urgency === 'critical' ? '🚨 Yaklaştı' : `📆 ${apt.diffDays} gün` }}
            </div>
            <div class="vb-upcoming-info" style="flex:1;">
              <strong>{{ apt.application?.customer?.ad }} {{ apt.application?.customer?.soyad }}</strong>
              <span>{{ apt.application?.ulke }} — {{ apt.konum || apt.institution?.ad || 'Atanmadı' }}</span>
            </div>
            <div class="vb-upcoming-time" style="font-weight:bold; color:#0f1b2d;">
              {{ formatDateShort(apt.tarih) }}<br/>{{ apt.saat }}
            </div>
            <div class="vb-actions" style="margin-left:auto; padding-left:10px;">
              <button class="btn btn--sm" style="background:white; border:1px solid #cbd5e1;" @click="openEditModal(apt.application)">📞 İletişime Geç</button>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- ── YÖNETİM BUTONLARI (İthalat / İhracat) ── -->
    <div class="admin-card" style="margin-bottom:0;">
      <div class="admin-card__body" style="padding:12px 16px; display:flex; gap:10px; flex-wrap:wrap; background: var(--bg-alt);">
        <NuxtLink to="/admin/crm/settings" class="btn btn--primary btn--sm" style="background:#104271; border:none;">⚙️ B2B Ayarlar & Cari</NuxtLink>
        <button class="btn btn--secondary btn--sm" style="margin-left:auto;" @click="exportData">📥 Excel'e Aktar (Export)</button>
        <label class="btn btn--primary btn--sm" style="cursor:pointer; display:inline-flex; align-items:center;">
          {{ importing ? 'Yükleniyor...' : '📤 Excel Yükle (Import)' }}
          <input type="file" style="display:none" accept=".xlsx" @change="importData" :disabled="importing" />
        </label>
      </div>
    </div>

    <!-- ── FİLTRELER + ARA ── -->
    <div class="vb-filters-bar admin-card" style="margin-bottom:16px;">
      <div class="admin-card__body" style="padding:16px;">
        <div class="vb-filters-row">
          <input
            v-model="filters.arama"
            class="form-input vb-filter-search"
            placeholder="🔍 Ad, Soyad, Pasaport, Ülke ara..."
            @input="debouncedFetch"
          />
          <select v-model="filters.ulke" class="form-input vb-filter-select" @change="fetchApplications">
            <option value="">Tüm Ülkeler</option>
            <option v-for="u in ulkeOptions" :key="u" :value="u">{{ u }}</option>
          </select>
          <select v-model="filters.durum" class="form-input vb-filter-select" @change="fetchApplications">
            <option value="">Tüm Durumlar</option>
            <option v-for="s in statusOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
          </select>
          <select v-model="filters.supplierId" class="form-input vb-filter-select" @change="fetchApplications">
            <option value="">Tüm Tedarikçiler</option>
            <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">{{ sup.ofisAdi }}</option>
          </select>
          <input
            v-model="filters.randevuTarihBas"
            type="date"
            class="form-input vb-filter-date"
            @change="fetchApplications"
          />
          <input
            v-model="filters.randevuTarihBit"
            type="date"
            class="form-input vb-filter-date"
            @change="fetchApplications"
          />
          <button class="btn btn--ghost btn--sm" @click="resetFilters">↺ Sıfırla</button>
          <button class="btn btn--primary btn--sm" style="margin-left:auto;" @click="openNewModal">
            + Yeni Başvuru
          </button>
        </div>
      </div>
    </div>

    <!-- ── VERİ TABLOSU ── -->
    <div class="admin-card">
      <div class="admin-card__body" style="padding:0;overflow-x:auto;">
        <div v-if="loading" class="vb-loading">
          <div class="vb-spinner"></div>
          <span>Yükleniyor...</span>
        </div>
        <table v-else class="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-[11px] uppercase tracking-wider text-slate-500 font-bold">
              <th class="px-6 py-4 rounded-tl-lg">#</th>
              <th class="px-6 py-4">Müşteri</th>
              <th class="px-6 py-4">Kimlik Belgesi</th>
              <th class="px-6 py-4">Vize & Geçerlilik</th>
              <th class="px-6 py-4">Randevu Detayı</th>
              <th class="px-6 py-4">Durum Modülü</th>
              <th class="px-6 py-4">Finansal Özet</th>
              <th class="px-6 py-4 rounded-tr-lg text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="applications.length === 0">
              <td colspan="8" class="px-6 py-12 text-center text-slate-400">
                <div class="text-4xl mb-3">📋</div>
                <p class="font-medium">Henüz başvuru yok. "Yeni Başvuru" butonuna tıklayın.</p>
              </td>
            </tr>
            <tr v-for="app in applications" :key="app.id" class="hover:bg-slate-50/80 transition-colors group">
              <td class="px-6 py-4 text-xs font-bold text-slate-400">#{{ app.id }}</td>
              
              <td class="px-6 py-4" style="min-width:180px;">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full bg-[#104271] text-white flex items-center justify-center font-bold text-[14px] shadow-sm shadow-[#104271]/20">{{ (app.customer?.ad?.[0] || '?') }}</div>
                  <div style="line-height:1.35;">
                    <div class="font-bold text-slate-800 text-[13.5px] group-hover:text-[#104271] transition-colors">
                      {{ app.customer?.ad }} <br>
                      {{ app.customer?.soyad }}
                    </div>
                    <div class="text-[11px] text-slate-500 font-medium" style="margin-top:2px;">{{ app.customer?.dogumTarihi ? formatDateShort(app.customer.dogumTarihi) : '' }}</div>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4">
                <div class="font-mono text-[12px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded inline-block">{{ app.customer?.pasaportNo }}</div>
                <div class="text-[11px] text-slate-500 mt-1 font-medium">{{ app.customer?.tcNo || '-' }}</div>
              </td>
              
              <td class="px-6 py-4">
                <span class="inline-block px-2.5 py-1 bg-[#104271] text-white text-[11px] font-bold rounded shadow-sm">{{ app.ulke }}</span>
                <div class="text-[11px] text-slate-500 font-medium mt-1.5 flex items-center gap-1">✈ Gidiş: <span class="font-bold text-slate-700">{{ app.seyahatTarihi ? formatDateShort(app.seyahatTarihi) : '—' }}</span></div>
                <div v-if="app.visaEndDate" class="text-[11px] text-green-600 font-medium flex items-center gap-1 mt-0.5">🗓 Bitiş: <span class="font-bold">{{ formatDateShort(app.visaEndDate) }}</span></div>
              </td>
              
              <td class="px-6 py-4">
                <div v-if="app.appointment" class="flex flex-col gap-0.5">
                  <div class="text-[12px] font-bold text-slate-800">{{ formatDateShort(app.appointment.tarih) }} <span class="text-[#74dff6]">{{ app.appointment.saat }}</span></div>
                  <div class="text-[11px] font-bold text-slate-500">{{ app.appointment.institution?.ad || app.appointment.konum || 'Kurum Belirsiz' }}</div>
                  <div v-if="app.appointment.supplier" class="text-[10px] uppercase font-bold text-[#104271] bg-[#104271]/5 px-1.5 py-0.5 rounded inline-block w-max mt-1">
                    Operasyon: {{ app.appointment.supplier.ofisAdi }}
                  </div>
                </div>
                <span v-else class="text-xs text-slate-400 font-medium italic">— Seçilmedi —</span>
              </td>
              
              <td class="px-6 py-4">
                <select
                  :value="app.durum"
                  class="text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full border cursor-pointer outline-none shadow-sm transition appearance-none pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2210%22%20height%3D%225%22%20viewBox%3D%220%200%2010%205%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200l5%205%205-5z%22%20fill%3D%22%2394a3b8%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_10px_center]"
                  :style="getStatusStyle(app.durum)"
                  @change="(e) => quickStatusChange(app.id, (e.target as HTMLSelectElement).value)"
                >
                  <option v-for="s in statusOptions" :key="s.value" :value="s.value" class="text-slate-800 bg-white">{{ s.label }}</option>
                </select>
              </td>
              
              <td class="px-6 py-4">
                <div class="flex flex-col gap-1 text-[12px]">
                  <div class="flex justify-between w-32"><span class="text-slate-500 font-medium">Toplam:</span> <span class="font-bold text-slate-800">{{ app.toplamTutar }} {{ app.currency }}</span></div>
                  <div class="flex justify-between w-32"><span class="text-slate-500 font-medium">Ödenen:</span> <span class="font-bold text-green-600">{{ app.odenenTutar }} {{ app.currency }}</span></div>
                  <div class="flex justify-between w-32 pt-1 border-t border-slate-100">
                     <span class="text-slate-500 font-medium">Kalan:</span> 
                     <span class="font-bold" :class="app.kalanBakiye > 0 ? 'text-orange-500 bg-orange-50 px-1 rounded' : 'text-slate-400'">{{ app.kalanBakiye }} {{ app.currency }}</span>
                  </div>
                </div>
              </td>
              
              <td class="px-6 py-4 text-right whitespace-nowrap" style="min-width: 140px;">
                <div class="inline-flex gap-1 items-center justify-end">
                  <button v-if="app.appointment" class="w-8 h-8 rounded border border-slate-300 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm shrink-0" title="E-Posta Gönder" @click="openEmailModal(app)">
                    📩
                  </button>
                  <NuxtLink v-if="app.appointment" :to="`/admin/visa-basvuru/${app.id}/print`" target="_blank" class="w-8 h-8 rounded border border-slate-300 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm shrink-0" title="Randevu Belgesi (PDF)">
                    🖨️
                  </NuxtLink>
                  <button class="w-9 h-8 rounded border border-slate-700 bg-white text-slate-700 flex items-center justify-center hover:bg-slate-50 transition-colors shadow-sm shrink-0 text-sm" title="Düzenle" @click="openEditModal(app)">
                    ✏️
                  </button>
                  <button class="w-9 h-8 rounded border border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm shrink-0 text-sm" title="Sil" @click="deleteApplication(app.id)">
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="total > pageLimit" class="vb-pagination">
        <button class="btn btn--ghost btn--sm" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">← Önceki</button>
        <span class="vb-page-info">Sayfa {{ currentPage }} / {{ totalPages }}</span>
        <button class="btn btn--ghost btn--sm" :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Sonraki →</button>
      </div>
    </div>

    <!-- ── MODAL: YENİ / DÜZENLE BAŞVURU ── -->
    <Teleport to="body">
      <div v-if="showModal" class="vb-overlay" @click.self="closeModal">
        <div class="vb-modal">
          <div class="vb-modal-header">
            <h2>{{ editingId ? 'Başvuru Düzenle' : 'Yeni Başvuru Ekle' }}</h2>
            <button class="vb-modal-close" @click="closeModal">✕</button>
          </div>

          <div class="vb-modal-body">
            <!-- MÜŞTERİ, BAŞVURU VEYA FİNANS TABLARI? Hepsini tek form tutalım. -->
            <div class="vb-section-title">👤 Müşteri Bilgileri</div>
            <div class="vb-form-grid">
              <div class="form-group">
                <label>Ad <span class="vb-req">*</span></label>
                <input v-model="form.ad" class="form-input" placeholder="Ahmet" />
              </div>
              <div class="form-group">
                <label>Soyad <span class="vb-req">*</span></label>
                <input v-model="form.soyad" class="form-input" placeholder="Yılmaz" />
              </div>
              <div class="form-group">
                <label>Pasaport No <span class="vb-req">*</span></label>
                <input v-model="form.pasaportNo" class="form-input uppercase" placeholder="U12345678" />
              </div>
              <div class="form-group">
                <label>TC Kimlik No</label>
                <input v-model="form.tcNo" class="form-input" placeholder="12345678901" />
              </div>
              <div class="form-group">
                <label>Telefon Numarası</label>
                <input v-model="form.telefon" type="tel" class="form-input" placeholder="05XX XXX XX XX" />
              </div>
              <div class="form-group">
                <label>E-Posta</label>
                <input v-model="form.email" type="email" class="form-input" placeholder="mail@ornek.com" />
              </div>
              <div class="form-group" style="grid-column: 1/-1;">
                <label>Doğum Tarihi</label>
                <input v-model="form.dogumTarihi" type="date" class="form-input" />
              </div>
            </div>

            <div class="vb-section-title" style="margin-top:20px;">🌍 Başvuru Süreci & Geçerlilik</div>
            <div class="vb-form-grid">
              <div class="form-group">
                <label>Ülke <span class="vb-req">*</span></label>
                <input v-model="form.ulke" class="form-input" list="ulke-list" placeholder="Almanya, ABD..." />
                <datalist id="ulke-list">
                  <option v-for="u in ulkeOptions" :key="u" :value="u" />
                </datalist>
              </div>
              <div class="form-group">
                <label>Seyahat Tarihi</label>
                <input v-model="form.seyahatTarihi" type="date" class="form-input" />
              </div>
              <div class="form-group">
                <label>Vize Durumu</label>
                <select v-model="form.durum" class="form-input">
                  <option v-for="s in statusOptions" :key="s.value" :value="s.value">{{ s.label }}</option>
                </select>
              </div>
              <div class="form-group">
                <label>Vize Başlangıç</label>
                <input v-model="form.visaStartDate" type="date" class="form-input" />
              </div>
              <div class="form-group">
                <label>Vize Bitiş</label>
                <input v-model="form.visaEndDate" type="date" class="form-input" />
              </div>
              <div class="form-group" style="grid-column: 1 / -1;">
                <label>Müşteri Özel Notları</label>
                <textarea v-model="form.notlar" class="form-input" rows="2" style="resize:vertical;" />
              </div>
            </div>

            <!-- RANDEVU -->
            <div class="vb-section-title" style="margin-top:20px;">📅 Randevu</div>
            <div class="vb-form-grid">
              <div class="form-group">
                <label>Randevu Tarihi</label>
                <input v-model="form.randevuTarih" type="date" class="form-input" />
              </div>
              <div class="form-group">
                <label>Randevu Saati</label>
                <input v-model="form.randevuSaat" type="time" class="form-input" />
              </div>
              <div class="form-group">
                <label>Aracı Kurum (VFS, iData..)</label>
                <div class="flex gap-2">
                  <select v-model="form.institutionId" class="form-input flex-1">
                    <option value="">— Yok / Seçilmedi —</option>
                    <option v-for="inst in institutions" :key="inst.id" :value="inst.id">{{ inst.ad }}</option>
                  </select>
                  <button type="button" class="btn btn--secondary btn--sm px-3 font-bold" title="Hızlı Kurum Ekle" @click="showInstitutionPanel = !showInstitutionPanel">+</button>
                </div>
              </div>
              <div class="form-group">
                <label>Operasyon Tedarikçisi</label>
                <div class="flex gap-2">
                  <select v-model="form.supplierId" class="form-input flex-1">
                    <option value="">— Yok / Kendimiz —</option>
                    <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.ofisAdi }}</option>
                  </select>
                  <button type="button" class="btn btn--secondary btn--sm px-3 font-bold" title="Hızlı Tedarikçi Ekle" @click="showSupplierPanel = !showSupplierPanel">+</button>
                </div>
              </div>

              <!-- Hızlı Ekleme Panelleri -->
              <div v-if="showInstitutionPanel" style="grid-column: 1 / -1;" class="bg-blue-50 p-3 rounded border border-blue-200">
                <div class="text-xs font-bold text-blue-800 mb-2">Hızlı Aracı Kurum Ekle</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <input v-model="newInstitution.ad" class="form-input text-sm flex-1" style="min-width:160px;" placeholder="Kurum Adı (Örn: VFS Global) *" />
                  <input v-model="newInstitution.adres" class="form-input text-sm flex-1" style="min-width:160px;" placeholder="Adres / Şube" />
                  <input v-model="newInstitution.mapsLink" class="form-input text-sm flex-1" style="min-width:160px;" placeholder="Google Maps Linki" />
                  <button type="button" class="btn btn--primary btn--sm" @click="addInstitutionInline">Kaydet</button>
                </div>
              </div>

              <div v-if="showSupplierPanel" style="grid-column: 1 / -1;" class="bg-green-50 p-3 rounded border border-green-200">
                <div class="text-xs font-bold text-green-800 mb-2">Hızlı Tedarikçi Ekle</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <input v-model="newSupplier.ofisAdi" class="form-input text-sm flex-1" style="min-width:160px;" placeholder="Tedarikçi Adı *" />
                  <input v-model="newSupplier.adres" class="form-input text-sm flex-1" style="min-width:160px;" placeholder="Adres / Şube" />
                  <input v-model="newSupplier.mapsLink" class="form-input text-sm flex-1" style="min-width:160px;" placeholder="Google Maps Linki" />
                  <button type="button" class="btn btn--primary btn--sm" @click="addSupplierInline">Kaydet</button>
                </div>
              </div>
            </div>

            <!-- FİNANS -->
            <div class="vb-section-title" style="margin-top:20px;">💰 Müşteri Finans Yönetimi</div>
            <div class="vb-form-grid" style="background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
              <div class="form-group">
                <label>Toplam Tutar (Müşteri Borcu)</label>
                <input v-model.number="form.toplamTutar" type="number" min="0" step="0.01" class="form-input" />
              </div>
              <div class="form-group">
                <label>Döviz Cinsi</label>
                <select v-model="form.currency" class="form-input font-bold">
                  <option value="TRY">TRY (₺)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div class="form-group">
                <label>Ödenen Tutar</label>
                <input v-model.number="form.odenenTutar" type="number" step="0.01" class="form-input" readonly title="Taksitler/Ödemeler listesinden otomatik hesaplanır, ancak elle de girilebilir" />
              </div>
              <div class="form-group">
                <label>Kalan Bakiye</label>
                <div class="form-input vb-readonly" :class="kalanBakiye > 0 ? 'vb-due-bg' : 'vb-clear-bg'">
                  {{ kalanBakiye }} {{ form.currency }}
                </div>
              </div>
            </div>

            <!-- CARİ MALİYET (Tedarikçi) -->
            <div class="vb-section-title" style="margin-top:20px;">🏢 Tedarikçi (Aracı) Maliyeti</div>
            <div class="vb-form-grid">
              <div class="form-group">
                <label>Maliyet Tutarı</label>
                <input v-model.number="form.supplierCost" type="number" min="0" step="0.01" class="form-input" />
              </div>
              <div class="form-group">
                <label>Maliyet Dövizi</label>
                <select v-model="form.supplierCurrency" class="form-input font-bold">
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <!-- ÖDEME / TAKSİTLER BÖLÜMÜ (Sadece Düzenleme Ekranında Taksit Ekleme Açık) -->
            <div v-if="editingId" class="vb-section-title" style="margin-top:30px; border-top:1px solid #e2e8f0; padding-top:16px;">💳 Tahsilatlar (Müşteriden Alınan Ödemeler)</div>
            <div v-if="editingId" class="vb-payments-container">
              <div class="vb-payment-list mb-4">
                <div v-for="p in selectedAppPayments" :key="p.id" class="flex items-center justify-between p-2 border-b">
                  <div>
                    <span class="font-bold">{{ p.tutar }} {{ p.currency }}</span>
                    <span class="text-xs text-gray-500 ml-2">{{ formatDateShort(p.tarih) }}</span>
                    <span v-if="p.not" class="text-xs ml-2 italic text-gray-600">- {{ p.not }}</span>
                  </div>
                  <button class="text-red-500 hover:text-red-700 text-xs font-bold px-2" @click="deletePayment(p.id)">Sil</button>
                </div>
                <div v-if="selectedAppPayments.length === 0" class="text-sm text-gray-400 italic p-2">Henüz ödeme/tahsilat girilmemiş.</div>
              </div>

              <!-- Yeni Tahsilat Formu -->
              <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;" class="bg-gray-50 p-2 rounded border border-gray-200">
                <div style="flex:1;min-width:110px;">
                  <label class="text-xs font-bold text-gray-600">Tutar</label>
                  <input v-model.number="newPayment.tutar" type="number" class="form-input py-1 text-sm" placeholder="0.00" />
                </div>
                <div style="width: 80px;">
                  <label class="text-xs font-bold text-gray-600">Döviz</label>
                  <select v-model="newPayment.currency" class="form-input py-1 text-sm font-bold">
                    <option value="TRY">TL</option>
                    <option value="USD">$</option>
                    <option value="EUR">€</option>
                    <option value="GBP">£</option>
                  </select>
                </div>
                <div style="width: 140px;">
                  <label class="text-xs font-bold text-gray-600">Tarih</label>
                  <input v-model="newPayment.tarih" type="date" class="form-input py-1 text-sm" />
                </div>
                <button class="btn btn--primary btn--sm" style="height:36px;" title="Ödeme Ekle" @click="addPayment">+</button>
              </div>
            </div>

          </div>

          <div class="vb-modal-footer">
            <div v-if="formError" class="vb-form-error">{{ formError }}</div>
            <button class="btn btn--ghost" @click="closeModal">İptal</button>
            <button class="btn btn--primary" :disabled="saving" @click="saveApplication">
              {{ saving ? 'Kaydediliyor...' : (editingId ? 'Güncelle' : 'Kaydet (Müşteriyi Oluştur)') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>



    <!-- ── MODAL: OTO MAİL GÖNDER ── -->
    <Teleport to="body">
      <div v-if="showEmailModal" class="vb-overlay" @click.self="closeEmailModal">
        <div class="vb-modal" style="max-width: 500px;">
          <div class="vb-modal-header bg-blue-50 text-blue-900 border-blue-200">
            <h2 class="text-blue-900">📩 Müşteriye Randevu Belgesi Gönder</h2>
            <button class="vb-modal-close text-blue-500" @click="closeEmailModal">✕</button>
          </div>
          <div class="vb-modal-body">
            <div class="form-group mb-4">
              <label>Kime (Alıcı E-Posta Adresi) <span class="text-red-500">*</span></label>
              <input v-model="emailForm.toEmail" class="form-input font-bold" placeholder="musteri@mail.com" />
              <div class="text-xs text-gray-500 mt-1">Virgül ile ayırarak birden fazla adres yazabilirsiniz.</div>
            </div>
            
            <div class="form-group mb-4">
              <label>Ayrıca Eklemek İstediğiniz Özel Not (Opsiyonel)</label>
              <textarea v-model="emailForm.messageNote" class="form-input" rows="3" placeholder="Lütfen parmak izine gelirken..."></textarea>
            </div>

            <div class="bg-gray-50 p-3 rounded border text-sm mt-6">
              <div class="font-bold text-gray-700 mb-2">📜 Gönderim Geçmişi (Log)</div>
              <ul v-if="selectedAppEmailLogs.length > 0" class="space-y-1">
                <li v-for="log in selectedAppEmailLogs" :key="log.id" class="text-gray-600 border-b border-gray-200 pb-1">
                  -> <span class="font-semibold">{{ log.toEmail }}</span> adresine atıldı. 
                  <span class="text-xs text-gray-400">({{ formatDateShort(log.sentAt) }})</span>
                </li>
              </ul>
              <div v-else class="text-gray-400 italic">Daha önce bu başvuru için mail atılmamış.</div>
            </div>
          </div>
          <div class="vb-modal-footer">
            <div v-if="emailFormError" class="vb-form-error">{{ emailFormError }}</div>
            <button class="btn btn--ghost" @click="closeEmailModal">İptal</button>
            <button class="btn btn--primary" style="background:#2563eb; color:white; border:none;" :disabled="sendingEmail" @click="sendEmail">
              {{ sendingEmail ? 'Gönderiliyor...' : 'Şimdi Gönder' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Vize Başvuruları | Admin Paneli' })

// ── SABIT VERİLER ──
const statusOptions = [
  { value: 'EVRAK_BEKLIYOR', label: '📄 Evrak Bekliyor' },
  { value: 'RANDEVU_BEKLIYOR', label: '🕐 Randevu Bekliyor' },
  { value: 'SONUC_BEKLIYOR', label: '⏳ Sonuç Bekliyor' },
  { value: 'ONAY', label: '✅ Onay' },
  { value: 'RED', label: '❌ Red' },
]

const ulkeOptions = ref<string[]>([])

// ── STATE ──
const applications = ref<any[]>([])
const retention = ref<any[]>([])
const total = ref(0)
const currentPage = ref(1)
const pageLimit = 20
const loading = ref(true)

const kpi = ref<any>(null)
const upcoming = ref<any[]>([])
const suppliers = ref<any[]>([])
const institutions = ref<any[]>([])
const holidays = ref<any[]>([])

const getStatusStyle = (status: string) => {
  const map: Record<string, string> = {
    'EVRAK_BEKLIYOR': 'background-color: #fef2f2; color: #ef4444; border-color: #fecaca;',
    'RANDEVU_BEKLIYOR': 'background-color: #fffbeb; color: #f59e0b; border-color: #fde68a;',
    'SONUC_BEKLIYOR': 'background-color: #eff6ff; color: #3b82f6; border-color: #bfdbfe;',
    'ONAY': 'background-color: #f0fdf4; color: #22c55e; border-color: #bbf7d0;',
    'RED': 'background-color: #1a202c; color: #ffffff; border-color: #4a5568;'
  }
  return map[status] || 'background-color: #f8fafc; color: #64748b; border-color: #e2e8f0;'
}

const filters = reactive({ arama: '', ulke: '', durum: '', randevuTarihBas: '', randevuTarihBit: '', supplierId: '' })

// Çeşitli Modallar & Ayarlar
const showModal = ref(false)
const showSettingsModal = ref(false)
const showInstitutionPanel = ref(false)
const showSupplierPanel = ref(false)
const settingsTab = ref('supplier')
const editingId = ref<number | null>(null)
const saving = ref(false)
const formError = ref('')
const importing = ref(false)

const showEmailModal = ref(false)
const emailFormError = ref('')
const sendingEmail = ref(false)
const emailForm = reactive({ applicationId: null as number | null, toEmail: '', messageNote: '' })
const selectedAppEmailLogs = ref<any[]>([])

const form = reactive({
  ad: '', soyad: '', pasaportNo: '', tcNo: '', telefon: '', email: '', dogumTarihi: '',
  ulke: '', seyahatTarihi: '', durum: 'EVRAK_BEKLIYOR', notlar: '',
  visaStartDate: '', visaEndDate: '',
  toplamTutar: 0, odenenTutar: 0, currency: 'TRY',
  supplierCost: 0, supplierCurrency: 'TRY',
  randevuTarih: '', randevuSaat: '', institutionId: '', supplierId: '',
})

// Tahsilatlar
const selectedAppPayments = ref<any[]>([])
const newPayment = reactive({ tutar: 0, currency: 'TRY', tarih: new Date().toISOString().slice(0,10) })

const newSupplier = reactive({ ofisAdi: '', adres: '', mapsLink: '' })
const newInstitution = reactive({ ad: '', adres: '', mapsLink: '' })
const newHoliday = reactive({ isim: '', tarih: '' })
const newSupplierPayment = reactive<Record<number, { tutar: number, currency: string }>>({})

// ── HESAPLAMA ──
const kalanBakiye = computed(() => {
  const sumPayments = selectedAppPayments.value.filter(p => p.currency === form.currency).reduce((acc, curr) => acc + curr.tutar, 0)
  const paidOut = editingId.value && selectedAppPayments.value.length ? sumPayments : (form.odenenTutar || 0)
  return parseFloat(((form.toplamTutar || 0) - paidOut).toFixed(2))
})
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageLimit)))

// ── VERİ YÜKLEME (API ÇAĞRILARI) ──
async function fetchEverything() {
  await Promise.all([
    fetchApplications(),
    fetchKpi(),
    fetchUpcoming(),
    fetchRetention(),
    fetchSettings()
  ])
}

async function fetchApplications() {
  loading.value = true
  try {
    const params: Record<string, any> = { sayfa: currentPage.value, limit: pageLimit }
    if (filters.arama) params.arama = filters.arama
    if (filters.ulke) params.ulke = filters.ulke
    if (filters.durum) params.durum = filters.durum
    if (filters.randevuTarihBas) params.randevuTarihBas = filters.randevuTarihBas
    if (filters.randevuTarihBit) params.randevuTarihBit = filters.randevuTarihBit
    if (filters.supplierId) params.supplierId = filters.supplierId

    const res = await $fetch<any>('/api/admin/visa-basvuru', { params })
    applications.value = res.data
    total.value = res.total

    const ulkelerSet = new Set(res.data.map((a:any) => a.ulke))
    ulkelerSet.forEach(u => typeof u === 'string' && !ulkeOptions.value.includes(u) && ulkeOptions.value.push(u))
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function fetchKpi() { kpi.value = await $fetch('/api/admin/visa-basvuru/stats').catch(() => null) }
async function fetchUpcoming() { upcoming.value = await $fetch('/api/admin/visa-basvuru/upcoming').catch(() => []) }
async function fetchRetention() { retention.value = await $fetch('/api/admin/visa-basvuru/retention').catch(() => []) }

async function fetchSettings() {
  suppliers.value = await $fetch('/api/admin/visa-basvuru/suppliers').catch(() => [])
  institutions.value = await $fetch('/api/admin/visa-basvuru/institutions').catch(() => [])
  holidays.value = await $fetch('/api/admin/visa-basvuru/holidays').catch(() => [])
  
  suppliers.value.forEach(s => {
    if (!newSupplierPayment[s.id]) {
      newSupplierPayment[s.id] = { tutar: 0, currency: 'TRY' }
    }
  })
}

// ── TABLO FİLTRE DEBOUNCE ──
let debounceTimer: ReturnType<typeof setTimeout>
function debouncedFetch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { currentPage.value = 1; fetchApplications() }, 400)
}
function resetFilters() {
  Object.assign(filters, { arama: '', ulke: '', durum: '', randevuTarihBas: '', randevuTarihBit: '', supplierId: '' })
  currentPage.value = 1
  fetchApplications()
}
function changePage(p: number) { currentPage.value = p; fetchApplications() }

// ── BAŞVURU (MODAL/CRUD) ──
function openNewModal() {
  editingId.value = null
  Object.assign(form, {
    ad: '', soyad: '', pasaportNo: '', tcNo: '', telefon: '', email: '', dogumTarihi: '',
    ulke: '', seyahatTarihi: '', durum: 'EVRAK_BEKLIYOR', notlar: '',
    visaStartDate: '', visaEndDate: '',
    toplamTutar: 0, odenenTutar: 0, currency: 'TRY',
    supplierCost: 0, supplierCurrency: 'TRY',
    randevuTarih: '', randevuSaat: '', institutionId: '', supplierId: '',
  })
  selectedAppPayments.value = []
  formError.value = ''
  showInstitutionPanel.value = false
  showSupplierPanel.value = false
  showModal.value = true
}

async function openEditModal(baseApp: any) {
  const app = await $fetch<any>(`/api/admin/visa-basvuru/${baseApp.id}`)
  editingId.value = app.id
  Object.assign(form, {
    ad: app.customer.ad,
    soyad: app.customer.soyad,
    pasaportNo: app.customer.pasaportNo,
    tcNo: app.customer.tcNo || '',
    telefon: app.customer.telefon || '',
    email: app.customer.email || '',
    dogumTarihi: app.customer.dogumTarihi ? app.customer.dogumTarihi.slice(0, 10) : '',
    ulke: app.ulke,
    seyahatTarihi: app.seyahatTarihi ? app.seyahatTarihi.slice(0, 10) : '',
    durum: app.durum,
    notlar: app.notlar || '',
    visaStartDate: app.visaStartDate ? app.visaStartDate.slice(0,10) : '',
    visaEndDate: app.visaEndDate ? app.visaEndDate.slice(0,10) : '',
    currency: app.currency || 'TRY',
    toplamTutar: app.toplamTutar,
    odenenTutar: app.odenenTutar,
    supplierCost: app.supplierCost || 0,
    supplierCurrency: app.supplierCurrency || 'TRY',
    randevuTarih: app.appointment ? app.appointment.tarih.slice(0, 10) : '',
    randevuSaat: app.appointment?.saat || '',
    institutionId: app.appointment?.institutionId || '',
    supplierId: app.appointment?.supplierId || '',
  })
  selectedAppPayments.value = app.payments || []
  formError.value = ''
  showModal.value = true
}

function closeModal() { showModal.value = false; editingId.value = null }

async function saveApplication() {
  if (!form.ad || !form.soyad || !form.pasaportNo || !form.ulke) {
    formError.value = 'Müşteri ad soyad, pasaport no ve ülke zorunludur.'
    return
  }
  form.odenenTutar = parseFloat(form.odenenTutar.toString()) || 0
  if (editingId.value && selectedAppPayments.value.length) {
    const calc = selectedAppPayments.value.filter(p => p.currency === form.currency).reduce((a,c) => a + c.tutar, 0)
    form.odenenTutar = calc
  }

  saving.value = true
  formError.value = ''
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/visa-basvuru/${editingId.value}`, { method: 'PUT', body: form })
    } else {
      await $fetch('/api/admin/visa-basvuru', { method: 'POST', body: form })
    }
    closeModal()
    await fetchEverything()
  } catch (err: any) {
    formError.value = err?.data?.message || 'Bir hata oluştu.'
  } finally {
    saving.value = false
  }
}

async function deleteApplication(id: number) {
  if (!confirm('Tüm finansal veriler, randevular ve müşteriyle birlikte silinecek. Emin misiniz?')) return
  await $fetch(`/api/admin/visa-basvuru/${id}`, { method: 'DELETE' })
  await fetchEverything()
}

async function quickStatusChange(id: number, durum: string) {
  await $fetch(`/api/admin/visa-basvuru/${id}`, { method: 'PUT', body: { durum } })
  applications.value = applications.value.map((a) => a.id === id ? { ...a, durum } : a)
  await Promise.all([fetchKpi(), fetchRetention()])
}

// ── CUSTOMER PAYMENTS ──
async function addPayment() {
  if (!editingId.value || newPayment.tutar <= 0) return
  await $fetch('/api/admin/visa-basvuru/payments', {
    method: 'POST',
    body: { applicationId: editingId.value, ...newPayment }
  })
  Object.assign(newPayment, { tutar: 0 })
  const app = await $fetch<any>(`/api/admin/visa-basvuru/${editingId.value}`)
  selectedAppPayments.value = app.payments || []
}

async function deletePayment(pid: number) {
  if (!confirm('Tahsilat iptal edilsin mi?')) return
  await $fetch(`/api/admin/visa-basvuru/payments/${pid}`, { method: 'DELETE' })
  const app = await $fetch<any>(`/api/admin/visa-basvuru/${editingId.value}`)
  selectedAppPayments.value = app.payments || []
}

// ── SUPPLIERS & LEDGERS ──
async function addSupplier() {
  if (!newSupplier.ofisAdi.trim()) return
  await $fetch('/api/admin/visa-basvuru/suppliers', { method: 'POST', body: newSupplier })
  Object.assign(newSupplier, { ofisAdi: '', adres: '', mapsLink: '' })
  await fetchSettings()
}
async function deleteSupplier(id: number) {
  if (!confirm('Bu tedarikçi silinsin mi? (Raporlar etkilenebilir)')) return
  await $fetch(`/api/admin/visa-basvuru/suppliers/${id}`, { method: 'DELETE' })
  await fetchSettings()
}
async function addSupplierPayment(sid: number) {
  const v = newSupplierPayment[sid]
  if (!v || v.tutar <= 0) return
  await $fetch('/api/admin/visa-basvuru/supplier-payments', {
    method: 'POST',
    body: { supplierId: sid, tutar: v.tutar, currency: v.currency }
  })
  newSupplierPayment[sid].tutar = 0
  await fetchSettings()
}
async function deleteSupplierPayment(pid: number) {
  if (!confirm('Tedarikçi ödemesi silinsin mi?')) return
  await $fetch(`/api/admin/visa-basvuru/supplier-payments/${pid}`, { method: 'DELETE' })
  await fetchSettings()
}

// ── INSTITUTIONS ──
async function addInstitution() {
  if (!newInstitution.ad.trim()) return
  await $fetch('/api/admin/visa-basvuru/institutions', { method: 'POST', body: newInstitution })
  Object.assign(newInstitution, { ad: '', adres: '', mapsLink: '' })
  await fetchSettings()
}
async function deleteInstitution(id: number) {
  if (!confirm('Aracı kurum kaydı silinsin mi?')) return
  await $fetch(`/api/admin/visa-basvuru/institutions/${id}`, { method: 'DELETE' })
  await fetchSettings()
}

// ── INLINE EKLEME ──
async function addInstitutionInline() {
  if (!newInstitution.ad.trim()) return
  const res = await $fetch<any>('/api/admin/visa-basvuru/institutions', { method: 'POST', body: newInstitution })
  Object.assign(newInstitution, { ad: '', adres: '', mapsLink: '' })
  await fetchSettings()
  form.institutionId = res.id
  showInstitutionPanel.value = false
}

async function addSupplierInline() {
  if (!newSupplier.ofisAdi.trim()) return
  const res = await $fetch<any>('/api/admin/visa-basvuru/suppliers', { method: 'POST', body: newSupplier })
  Object.assign(newSupplier, { ofisAdi: '', adres: '', mapsLink: '' })
  await fetchSettings()
  form.supplierId = res.id
  showSupplierPanel.value = false
}

// ── HOLIDAYS ──
async function addHoliday() {
  if (!newHoliday.tarih || !newHoliday.isim.trim()) return
  await $fetch('/api/admin/visa-basvuru/holidays', { method: 'POST', body: newHoliday })
  Object.assign(newHoliday, { isim: '', tarih: '' })
  await fetchSettings()
}
async function deleteHoliday(id: number) {
  await $fetch(`/api/admin/visa-basvuru/holidays/${id}`, { method: 'DELETE' })
  await fetchSettings()
}

// ── EMAIL LOGIC ──
async function openEmailModal(baseApp: any) {
  const app = await $fetch<any>(`/api/admin/visa-basvuru/${baseApp.id}`)
  emailForm.applicationId = app.id
  emailForm.toEmail = app.customer?.email || ''
  emailForm.messageNote = ''
  selectedAppEmailLogs.value = app.emailLogs || []
  emailFormError.value = ''
  showEmailModal.value = true
}

function closeEmailModal() { showEmailModal.value = false }

async function sendEmail() {
  if (!emailForm.toEmail) { emailFormError.value = 'E-posta adresi gerekli'; return }
  sendingEmail.value = true
  emailFormError.value = ''
  try {
    await $fetch(`/api/admin/visa-basvuru/${emailForm.applicationId}/send-email`, {
      method: 'POST',
      body: { toEmail: emailForm.toEmail, messageNote: emailForm.messageNote }
    })
    alert('Randevu belgesi e-posta olarak başarıyla gönderildi!')
    await fetchEverything()
    closeEmailModal()
  } catch (err: any) {
    emailFormError.value = err?.data?.message || 'Gönderim başarısız'
  } finally {
    sendingEmail.value = false
  }
}

// ── IMPORT / EXPORT EXCEL ──
async function exportData() {
  try {
    const res = await $fetch('/api/admin/visa-basvuru/export', { responseType: 'blob' })
    const url = window.URL.createObjectURL(res as Blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vizeler_${new Date().toISOString().slice(0, 10)}.xlsx`
    document.body.appendChild(a)
    a.click()
    a.remove()
  } catch (err) {
    alert("Dışa aktarma hatası.")
  }
}

async function importData(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  importing.value = true
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await $fetch<{success: boolean, count: number}>('/api/admin/visa-basvuru/import', {
      method: 'POST',
      body: formData
    })
    alert(`Başarılı! Toplam ${res.count} kayıt eklendi.`)
    await fetchEverything()
  } catch (err) {
    alert('Dosya yükleme başarısız. Doğru formatta olduğuna emin olun.')
  } finally {
    target.value = ''
    importing.value = false
  }
}

// ── YARDIMCI FONKSİYONLAR ──
function formatDate(d: string | Date | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })
}
function formatDateShort(d: string | Date | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// INIT
await fetchEverything()
</script>

<style scoped>
/* Mevcut Gelgidek Admin Paneli Temaları ve Form Stilleri */
.vb-root { display: flex; flex-direction: column; gap: 20px; }

/* ── KPI KARTLAR ── */
.vb-kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; }
.vb-kpi-card { display: flex; align-items: center; gap: 16px; padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: var(--surface); transition: transform .18s, box-shadow .18s; }
.vb-kpi-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,.12); }
.vb-kpi-icon { font-size: 2rem; line-height: 1; }
.vb-kpi-value { font-size: 2rem; font-weight: 800; line-height: 1.1; }
.vb-kpi-label { font-size: .8rem; color: var(--text-muted); margin-top: 2px; }
.vb-kpi-blue  { border-left: 4px solid #3b82f6; } .vb-kpi-orange{ border-left: 4px solid #f59e0b; }
.vb-kpi-green { border-left: 4px solid #10b981; } .vb-kpi-purple{ border-left: 4px solid #8b5cf6; }
.vb-kpi-blue  .vb-kpi-value { color: #3b82f6; } .vb-kpi-orange .vb-kpi-value { color: #f59e0b; }
.vb-kpi-green  .vb-kpi-value { color: #10b981; } .vb-kpi-purple .vb-kpi-value { color: #8b5cf6; }

/* ── YAKLAŞANLAR PANELİ ── */
.vb-upcoming-panel { background: var(--surface); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
.vb-upcoming-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; padding: 14px 20px; background: var(--bg-alt); border-bottom: 1px solid var(--border); }
.vb-upcoming-title { font-weight: 700; font-size: .95rem; }
.vb-upcoming-count { font-size: .8rem; font-weight: bold; }
.vb-upcoming-list { display: flex; flex-direction: column; }
.vb-upcoming-item { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; padding: 12px 16px; border-bottom: 1px solid var(--border); }
.vb-upcoming-item:last-child { border-bottom: none; }
.vb-upcoming-critical { border-left: 4px solid #ef4444; } .vb-upcoming-warning { border-left: 4px solid #f59e0b; } .vb-upcoming-normal { border-left: 4px solid #10b981; }
.badge-critical { background: #fee2e2; color: #b91c1c; padding:4px 8px; border-radius:8px; font-weight:600; font-size:12px; }
.badge-warning  { background: #fef3c7; color: #92400e; padding:4px 8px; border-radius:8px; font-weight:600; font-size:12px; }
.badge-normal   { background: #d1fae5; color: #065f46; padding:4px 8px; border-radius:8px; font-weight:600; font-size:12px; }
.vb-upcoming-info { flex: 1; min-width: 150px; font-size: .85rem; } .vb-upcoming-info strong { display: block; }
.vb-upcoming-info span { color: var(--text-muted); font-size: .8rem; }
.vb-upcoming-time { font-size: .8rem; color: var(--text-muted); }

/* ── FİLTRELER VE TABLO ── */
.vb-filters-row { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.vb-filter-search { min-width: 200px; flex: 1; }
.vb-filter-select, .vb-filter-date { min-width: 135px; }

.vb-table { width: 100%; border-collapse: collapse; font-size: .875rem; text-align: left; }
.vb-table th { padding: 12px 14px; font-size: .75rem; color: var(--text-muted); text-transform: uppercase; background: var(--bg-alt); border-bottom: 1px solid var(--border); }
.vb-table td { padding: 12px 14px; border-bottom: 1px solid var(--border); }
.vb-row:hover { background: var(--bg-alt); }
.vb-td-id { color: var(--text-muted); font-size: .8rem; }
.vb-td-name { display: flex; gap: 10px; align-items: center; }
.vb-name { font-weight:600; }
.vb-sub { font-size:.75rem; color:var(--text-muted); }
.vb-mono { font-family: monospace; }
.vb-country-chip { background: var(--bg-alt); border: 1px solid var(--border); padding: 3px 10px; border-radius: 20px; font-size:.8rem; font-weight:600; }

.vb-status-select { appearance:none; padding:4px 10px; border-radius:12px; font-size:12px; font-weight:700; border:1px solid var(--border); background:var(--surface); cursor:pointer; }
.vb-finance-row { display: flex; justify-content: space-between; font-size: .8rem; margin-bottom: 3px; gap:8px; }
.vb-finance-val { font-weight:700; }
.vb-paid { color:#10b981; } .vb-due { color:#ef4444; } .vb-clear { color:#10b981; }

.vb-actions { display:flex; gap:6px; }

.vb-pagination { display: flex; align-items: center; justify-content: center; gap: 14px; padding: 14px; flex-wrap: wrap; }

/* ── MODALS VE FORMLAR ── */
.vb-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.5); z-index: 1000; display:flex; align-items:center; justify-content:center; padding: 12px; }
.vb-modal { background: var(--surface); width: 100%; max-width: 650px; max-height: 92dvh; display:flex; flex-direction:column; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.vb-modal-header { padding: 16px 20px; display:flex; justify-content:space-between; align-items: center; border-bottom: 1px solid var(--border); font-weight:700; font-size:1.1rem; }
.vb-modal-close { background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--text-muted); }
.vb-modal-body { padding: 20px; overflow-y: auto; flex:1; }
.vb-modal-footer { padding: 14px 20px; border-top: 1px solid var(--border); display:flex; justify-content:flex-end; gap:10px; align-items:center; flex-wrap: wrap; background:var(--bg-alt); }

.vb-section-title { font-weight: 700; font-size: .95rem; margin-bottom: 12px; color: var(--primary); }
.vb-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.form-group label { display:block; font-size:.8rem; font-weight:600; margin-bottom:4px; color:var(--text-muted); }
.form-input { width: 100%; padding: 8px 12px; border: 1px solid var(--border); border-radius: 8px; font-size:.9rem; outline:none; background:var(--surface); }
.form-input:focus { border-color:var(--primary); }

.vb-readonly { background: #f3f4f6; cursor: not-allowed; font-weight: 700; }
.vb-due-bg { background:#fee2e2; color:#ef4444; } .vb-clear-bg { background:#d1fae5; color:#10b981; }

.vb-form-error { color: #ef4444; font-size: .85rem; font-weight: 600; margin-right:auto; width: 100%; }

.btn { border:none; border-radius:8px; cursor:pointer; font-weight:600; padding:8px 14px; text-decoration:none; display:inline-flex; align-items:center; justify-content:center; }
.btn--sm { padding: 6px 10px; font-size: .8rem; }
.btn--primary { background:var(--primary); color:#fff; } .btn--primary:hover { opacity:.9; }
.btn--ghost { background:transparent; border:1px solid var(--border); } .btn--ghost:hover { background:var(--bg-alt); }
.btn--default { background:var(--bg-alt); border:1px solid var(--border); }
.btn--danger { background:#fef2f2; color:#ef4444; border:1px solid #fca5a5; } .btn--danger:hover { background:#fee2e2; }
.btn--secondary { background:#e0e7ff; color:#4338ca; border:1px solid #c7d2fe; }

.uppercase { text-transform: uppercase; }

@media (max-width: 768px) {
  .vb-form-grid {
    grid-template-columns: 1fr;
  }
  .vb-filter-search,
  .vb-filter-select,
  .vb-filter-date {
    width: 100%;
    min-width: 100%;
  }
  .vb-modal-body {
    padding: 16px;
  }
}
</style>
