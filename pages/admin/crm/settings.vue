<template>
  <div class="vb-root">
    
    <!-- ── MİNİMALİST MENÜ (Sistem Özeti) ── -->
    <div style="display:flex; gap:24px; margin-bottom:24px; border-bottom:1px solid #e2e8f0; padding-bottom:8px; overflow-x:auto;">
      <button :style="settingsTab === 'supplier' ? 'font-weight:bold; color:#0f1b2d; border-bottom:2px solid #0f1b2d;' : 'color:#64748b;'" @click="settingsTab = 'supplier'" style="background:transparent; border:none; cursor:pointer; padding:8px 4px; font-size:15px; transition:0.3s; white-space:nowrap;">
        🏢 Tedarikçiler (B2B Cari & Mizan)
      </button>
      <button :style="settingsTab === 'institution' ? 'font-weight:bold; color:#0f1b2d; border-bottom:2px solid #0f1b2d;' : 'color:#64748b;'" @click="settingsTab = 'institution'" style="background:transparent; border:none; cursor:pointer; padding:8px 4px; font-size:15px; transition:0.3s; white-space:nowrap;">
        📑 Aracı Kurumlar (VFS, iData vb.)
      </button>
      <button :style="settingsTab === 'holiday' ? 'font-weight:bold; color:#0f1b2d; border-bottom:2px solid #0f1b2d;' : 'color:#64748b;'" @click="settingsTab = 'holiday'" style="background:transparent; border:none; cursor:pointer; padding:8px 4px; font-size:15px; transition:0.3s; white-space:nowrap;">
        📅 Resmi Tatiller (Tatil ve Takvim)
      </button>
    </div>

    <!-- ── İÇERİK KARTI ── -->
    <div class="admin-card">
      <div class="admin-card__header" style="background:var(--bg-alt); padding:16px;">
         <h2 style="margin:0; font-size:1.1rem; color:var(--primary); font-weight:700;">
            {{ 
              settingsTab === 'supplier' ? 'B2B Tedarikçi İşlemleri & Cari Mizan' : 
              (settingsTab === 'institution' ? 'Aracı Kurum Merkezleri' : 'Sistem Tatil Takvimi') 
            }}
         </h2>
      </div>
      <div class="admin-card__body" style="padding: 20px;">
        
        <!-- TEDARİKÇİLER (CARİ) SEKMESİ -->
        <div v-if="settingsTab === 'supplier'">
          
          <!-- Üst Menü: Seçim ve Yeni Tedarikçi -->
          <div style="display:flex; gap:20px; margin-bottom:24px; flex-wrap:wrap;">
            <div style="flex:1; min-width:min(100%, 280px); background:#f8fafc; padding:18px; border-radius:8px; border:1px solid #e2e8f0;">
              <label style="font-weight:bold; display:block; margin-bottom:8px; color:#475569;">Cari Görüntülenecek Tedarikçiyi Seçin</label>
              <select v-model="selectedSupplierId" class="form-input" style="font-size:1rem; font-weight:bold; padding:12px;">
                 <option :value="null">-- Lütfen Tedarikçi Seçin --</option>
                 <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">{{ sup.ofisAdi }}</option>
              </select>
            </div>
            
            <div style="flex:1; min-width:min(100%, 280px); border: 2px dashed #cbd5e1; border-radius:8px; padding:18px; background:#f8fafc;">
               <div class="vb-section-title" style="margin-top:0; border-bottom:none; margin-bottom:12px;">Yeni Tedarikçi Aç</div>
               <div style="display:flex; gap:10px;">
                  <input v-model="newSupplier.ofisAdi" class="form-input" placeholder="Firma Adı" style="flex:1;" />
                  <button class="btn btn--primary" @click="addSupplier">+</button>
               </div>
            </div>
          </div>

          <!-- SEÇİLEN TEDARİKÇİ İÇERİĞİ -->
          <div v-if="activeSupplier" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
             
             <!-- Tedarikçi Header & Edit (Düzenleme Modülü) -->
             <div style="background: #f8fafc; padding: 18px; border-bottom: 1px solid #e2e8f0;">
                <div v-if="!editingSupplierMode" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                  <div>
                    <h3 style="margin:0 0 4px 0; font-size:1.3rem; color:#0f1b2d;">{{ activeSupplier.ofisAdi }}</h3>
                    <div class="vb-sub">
                      {{ activeSupplier.adres || 'Adres bilgisi yok' }} 
                      <a v-if="activeSupplier.mapsLink" :href="activeSupplier.mapsLink" target="_blank" style="color:#2563eb; margin-left:8px; text-decoration:none;">📍 Harita</a>
                    </div>
                  </div>
                  <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <a :href="`/api/admin/visa-basvuru/suppliers/${activeSupplier.id}/export`" download class="btn btn--secondary btn--sm" style="background:#10b981; color:white; border:none;">📥 Excel'e Dök</a>
                    <button class="btn btn--secondary btn--sm" @click="openSupplierEditor">✏️ Düzenle</button>
                    <button class="btn btn--danger btn--sm" @click="deleteSupplier(activeSupplier.id)">🗑 Sil</button>
                  </div>
                </div>

                <div v-else style="background:white; padding:16px; border-radius:8px; border:1px solid #cbd5e1;">
                  <h4 style="margin:0 0 12px 0;">Tedarikçi Kartını Düzenle</h4>
                  <div class="vb-form-grid">
                    <div class="form-group">
                      <label>Firma Adı</label>
                      <input v-model="editSupplierForm.ofisAdi" class="form-input" />
                    </div>
                    <div class="form-group">
                      <label>Adres</label>
                      <input v-model="editSupplierForm.adres" class="form-input" />
                    </div>
                    <div class="form-group col-span-full">
                      <label>Google Maps Linki</label>
                      <input v-model="editSupplierForm.mapsLink" class="form-input" />
                    </div>
                  </div>
                  <div style="margin-top:16px; display:flex; gap:10px; justify-content:flex-end; flex-wrap:wrap;">
                     <button class="btn btn--ghost btn--sm" @click="editingSupplierMode = false">İptal</button>
                     <button class="btn btn--primary btn--sm" @click="saveSupplierEdit">Kaydet</button>
                  </div>
                </div>
             </div>

             <div style="padding: 18px;">
                <div class="vb-section-title">Cari Hesap Ekstresi</div>
                
                <div class="table-responsive" style="margin-bottom: 20px;">
                  <table class="vb-table">
                    <thead>
                      <tr>
                         <th>Tarih</th>
                         <th>İşlem Detayı (Müşteri & Ülke) </th>
                         <th>Maliyet Tutarı (Borç)</th>
                         <th>Tahsilat (Alacak)</th>
                         <th style="width:100px; text-align:center;">İşlem</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="apt in activeSupplier.appointments" :key="'apt-'+apt.id">
                         <tr v-if="apt.application?.supplierCost > 0" class="vb-row">
                            <td class="vb-mono">{{ formatDateShort(apt.application.createdAt || apt.tarih) }}</td>
                            <td>
                               <div class="vb-name">{{ apt.application.customer.ad }} {{ apt.application.customer.soyad }}</div>
                               <div class="vb-sub">{{ apt.application.ulke }} Vizesi</div>
                            </td>
                            <td><span style="color:#d97706; font-weight:bold; background:#fef3c7; padding:2px 6px; border-radius:4px;">{{ apt.application.supplierCost }} {{ apt.application.supplierCurrency }}</span></td>
                            <td>-</td>
                            <td style="text-align:center;"><span style="font-size:0.8rem; color:#94a3b8;">Sistem Kaydı</span></td>
                         </tr>
                      </template>

                      <template v-for="pay in activeSupplier.payments" :key="'pay-'+pay.id">
                         <tr class="vb-row" style="background: #f0fdf4;">
                            <td class="vb-mono">{{ formatDateShort(pay.tarih) }}</td>
                            <td>
                               <div class="vb-name" style="color:#166534;">Tahsilat / Ödeme</div>
                               <div v-if="pay.not" class="vb-sub" style="color:#15803d; max-width:250px; overflow:hidden; text-overflow:ellipsis;" :title="pay.not">Not: {{ pay.not }}</div>
                            </td>
                            <td>-</td>
                            <td><span style="color:#16a34a; font-weight:bold; background:#dcfce7; padding:2px 6px; border-radius:4px;">{{ pay.tutar }} {{ pay.currency }}</span></td>
                            <td style="text-align:center;">
                               <div style="display:inline-flex; gap:6px; justify-content:center;">
                                 <button class="btn btn--sm" style="background:white; border:1px solid #cbd5e1; padding:4px 8px;" @click="openPaymentEditMode(pay)">✏️</button>
                                 <button class="btn btn--danger btn--sm" style="padding:4px 8px;" @click="deleteSupplierPayment(pay.id)">🗑</button>
                               </div>
                            </td>
                         </tr>
                      </template>
                      
                      <tr v-if="!activeSupplier.appointments?.some((a: any)=>a.application?.supplierCost>0) && !activeSupplier.payments?.length">
                         <td colspan="5" class="vb-empty">Finansal hareket bulunmuyor.</td>
                      </tr>
                      
                      <!-- TOPLAMLAR SATIRI -->
                      <tr style="background:#f1f5f9; font-weight:bold;">
                         <td colspan="2" style="text-align:right; padding-right:16px;">TOPLAM ÖZET:</td>
                         <td style="color:#d97706;">{{ activeLedgerTotals.totalCost }}</td>
                         <td style="color:#16a34a;">{{ activeLedgerTotals.totalPaid }}</td>
                         <td style="text-align:center;">
                           <div style="font-size:0.8rem; color:#64748b; line-height:1;">Bakiye:</div>
                           <div :style="{ color: (activeLedgerTotals._rawBalanceForColor ?? 0) > 0 ? '#ef4444' : '#10b981', fontSize:'1.05rem' }">{{ activeLedgerTotals.balance }}</div>
                         </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Ödeme Ekleme/Düzenleme Formu -->
                <div style="background:#f8fafc; padding:18px; border-radius:8px; border:1px solid #cbd5e1;">
                   <h4 style="margin:0 0 16px 0; color:#0f1b2d;">{{ paymentEditId ? 'Tahsilatı Güncelle' : 'Tahsilat / Ödeme Ekle' }}</h4>
                   <div style="display:flex; flex-wrap:wrap; gap:14px; align-items:flex-end;">
                      <div class="form-group" style="flex:1; min-width:120px;">
                         <label>Tutar</label>
                         <input v-model.number="paymentForm.tutar" type="number" class="form-input" style="font-weight:bold;" />
                      </div>
                      <div class="form-group" style="width:100px;">
                         <label>Kur</label>
                         <select v-model="paymentForm.currency" class="form-input">
                            <option value="TRY">TRY</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                         </select>
                      </div>
                      <div class="form-group" style="flex:1; min-width:140px;">
                         <label>Tarih</label>
                         <input v-model="paymentForm.tarih" type="date" class="form-input" />
                      </div>
                      <div class="form-group" style="flex:2; min-width:180px;">
                         <label>Dekont Özel Notu (Opsiyonel)</label>
                         <input v-model="paymentForm.not" class="form-input" placeholder="Referans veya açıklama" />
                      </div>
                      <div style="display:flex; gap:8px;">
                         <button v-if="paymentEditId" class="btn btn--ghost" style="height:42px;" @click="cancelPaymentEdit">İptal</button>
                         <button class="btn btn--primary" style="height:42px; padding:0 24px; font-weight:bold;" @click="saveSupplierPayment(activeSupplier.id)">{{ paymentEditId ? 'Güncelle' : 'Ekle' }}</button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <!-- KURUMLAR SEKMESİ -->
        <div v-if="settingsTab === 'institution'">
          <div class="table-responsive" style="margin-bottom:20px;">
            <table class="vb-table">
              <thead>
                <tr>
                  <th>Aracı Kurum</th>
                  <th style="text-align:right;">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                 <tr v-for="inst in institutions" :key="inst.id" class="vb-row">
                   <td v-if="editingInstitutionId === inst.id" colspan="2" style="padding: 16px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px;">
                      <div class="vb-form-grid">
                        <div class="form-group">
                          <label style="font-weight:bold;font-size:0.85rem;color:#475569;">Kurum Adı</label>
                          <input v-model="editInstitutionForm.ad" class="form-input" />
                        </div>
                        <div class="form-group">
                          <label style="font-weight:bold;font-size:0.85rem;color:#475569;">Şube / Adres</label>
                          <input v-model="editInstitutionForm.adres" class="form-input" />
                        </div>
                        <div class="form-group col-span-full">
                          <label style="font-weight:bold;font-size:0.85rem;color:#475569;">Harita Linki</label>
                          <input v-model="editInstitutionForm.mapsLink" class="form-input" />
                        </div>
                      </div>
                      <div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end;">
                        <button class="btn btn--ghost btn--sm" @click="cancelInstitutionEdit">İptal</button>
                        <button class="btn btn--primary btn--sm" @click="saveInstitutionEdit(inst.id)">Kaydet</button>
                      </div>
                   </td>
                   <template v-else>
                     <td>
                        <div class="vb-name">{{ inst.ad }}</div>
                        <div class="vb-sub">{{ inst.adres || 'Adres belirtilmemiş' }} <a v-if="inst.mapsLink" :href="inst.mapsLink" target="_blank" style="color:#2563eb; margin-left:4px;">Harita Bağlantısı</a></div>
                     </td>
                     <td style="text-align:right;">
                        <div style="display:inline-flex; gap:8px; align-items:center;">
                          <button class="btn btn--secondary btn--sm" @click="openInstitutionEdit(inst)">✏️ Düzenle</button>
                          <button class="btn btn--danger btn--sm" @click="deleteInstitution(inst.id)">Sil</button>
                        </div>
                     </td>
                   </template>
                 </tr>
                 <tr v-if="!institutions.length">
                   <td colspan="2" class="vb-empty">Kayıtlı kurum bulunmuyor.</td>
                 </tr>
              </tbody>
            </table>
          </div>

          <div style="border: 2px dashed #cbd5e1; border-radius:8px; padding:18px; background:#f8fafc;">
            <div class="vb-section-title">Yeni Aracı Kurum Ekle</div>
            <div class="vb-form-grid">
                <div class="form-group">
                  <label>Kurum Adı (VFS vb.)</label>
                  <input v-model="newInstitution.ad" class="form-input" />
                </div>
                <div class="form-group">
                  <label>Şube / Adres</label>
                  <input v-model="newInstitution.adres" class="form-input" />
                </div>
                <div class="form-group col-span-full">
                  <label>Harita Linki</label>
                  <input v-model="newInstitution.mapsLink" class="form-input" />
                </div>
            </div>
            <button class="btn btn--primary" style="margin-top:16px; width:100%;" @click="addInstitution">Sisteme Kaydet</button>
          </div>
        </div>

        <!-- TATİLLER SEKMESİ -->
        <div v-if="settingsTab === 'holiday'">
           <div style="background:#fff7ed; padding:12px; border-left:4px solid #ea580c; color:#9a3412; margin-bottom:20px; font-size:0.9rem;">
             <strong>Takvim Optimizasyonu:</strong> Listeye girdiğiniz bayramlar, sistemin 'Evrak Son Teslim' hesaplamasında (randevudan -3 iş günü geriye gitme formülünde) bir iş günü olarak <b>DÜŞÜLMEZ</b> (atlanır). Hafta sonlarını eklemenize gerek yoktur.
           </div>

           <div style="display:flex; gap:20px; flex-wrap:wrap;">
              <div style="flex:2; min-width:min(100%, 280px);">
                 <div class="table-responsive">
                   <table class="vb-table">
                     <thead>
                       <tr>
                          <th>Tarih</th>
                          <th>Tatil / Bayram Günü</th>
                          <th>İşlem</th>
                       </tr>
                     </thead>
                     <tbody>
                        <tr v-for="h in holidays" :key="h.id" class="vb-row">
                           <td class="vb-mono">{{ formatDateShort(h.tarih) }}</td>
                           <td class="vb-name">{{ h.isim }}</td>
                           <td><button class="btn btn--danger btn--sm" @click="deleteHoliday(h.id)">Sil</button></td>
                        </tr>
                        <tr v-if="!holidays.length">
                           <td colspan="3" class="vb-empty">Özel bir tatil günü kayıtlanmadı.</td>
                        </tr>
                     </tbody>
                   </table>
                 </div>
              </div>
              <div style="flex:1; min-width:min(100%, 240px);">
                 <div style="border: 2px dashed #cbd5e1; border-radius:8px; padding:18px; background:#f8fafc;">
                    <div class="vb-section-title" style="margin-top:0;">Tatil Günü Ekle</div>
                    <div class="form-group" style="margin-bottom:12px;">
                      <label>Takvim</label>
                      <input v-model="newHoliday.tarih" type="date" class="form-input" />
                    </div>
                    <div class="form-group" style="margin-bottom:12px;">
                      <label>Bayram Açıklaması</label>
                      <input v-model="newHoliday.isim" class="form-input" placeholder="Örn: 29 Ekim" />
                    </div>
                    <button class="btn btn--primary" style="width:100%;" @click="addHoliday">Listeye Ekle</button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'B2B Ayarlar & Cari | Gelgidek CRM' })

const settingsTab = ref('supplier')

const suppliers = ref<any[]>([])
const institutions = ref<any[]>([])
const holidays = ref<any[]>([])

const selectedSupplierId = ref<number | null>(null)
const activeSupplier = computed(() => {
  return suppliers.value.find(s => s.id === selectedSupplierId.value) || null
})

// Edit Supplier Modes
const editingSupplierMode = ref(false)
const editSupplierForm = ref({ ofisAdi: '', adres: '', mapsLink: '' })

// Payment Form (Ekle / Düzenle Ortak)
const paymentForm = ref({ tutar: null as number|null, currency: 'TRY', tarih: new Date().toISOString().slice(0,10), not: '' })
const paymentEditId = ref<number|null>(null)

const newSupplier = ref({ ofisAdi: '', adres: '', mapsLink: '' })
const newInstitution = ref({ ad: '', adres: '', mapsLink: '' })
const newHoliday = ref({ tarih: '', isim: '' })

// Edit Institution Modes
const editingInstitutionId = ref<number | null>(null)
const editInstitutionForm = ref({ ad: '', adres: '', mapsLink: '' })

function openInstitutionEdit(inst: any) {
  editingInstitutionId.value = inst.id
  editInstitutionForm.value = { ad: inst.ad, adres: inst.adres || '', mapsLink: inst.mapsLink || '' }
}

function cancelInstitutionEdit() {
  editingInstitutionId.value = null
}

async function saveInstitutionEdit(id: number) {
  if (!editInstitutionForm.value.ad) return alert('Kurum adı zorunludur')
  try {
    await $fetch(`/api/admin/visa-basvuru/institutions/${id}`, {
      method: 'PUT',
      body: editInstitutionForm.value
    })
    alert('Aracı kurum güncellendi.')
    cancelInstitutionEdit()
    await fetchSettingsVars()
  } catch (err) {
    alert('Güncelleme sırasında hata oluştu.')
  }
}

// Totals Calculation
const activeLedgerTotals = computed(() => {
   if(!activeSupplier.value) return { totalCost: 0, totalPaid: 0, balance: 0 }
   
   let grouped: Record<string, { cost: number, paid: number }> = {}
   
   activeSupplier.value.appointments?.forEach((a: any) => {
      const c = a.application?.supplierCost
      if(c > 0) {
         const curr = a.application.supplierCurrency || 'TRY'
         if(!grouped[curr]) grouped[curr] = { cost: 0, paid: 0 }
         grouped[curr].cost += c
      }
   })
   
   activeSupplier.value.payments?.forEach((p: any) => {
      const c = p.currency || 'TRY'
      if(!grouped[c]) grouped[c] = { cost: 0, paid: 0 }
      grouped[c].paid += p.tutar
   })
   
   let totalCostStr = []
   let totalPaidStr = []
   let balanceStr = []   
   let mainBalance = 0 // simplified total logic for single currency assumption/warning

   for(const [curr, vals] of Object.entries(grouped)) {
      totalCostStr.push(`${vals.cost} ${curr}`)
      totalPaidStr.push(`${vals.paid} ${curr}`)
      const bal = vals.cost - vals.paid
      balanceStr.push(`${bal} ${curr}`)
      if(curr === 'TRY') mainBalance += bal
      else mainBalance += (bal > 0 ? 1 : -1) // just to trigger conditional coloring
   }
   
   if(Object.keys(grouped).length === 0) {
      return { totalCost: '0', totalPaid: '0', balance: 0 }
   }

   return {
     totalCost: totalCostStr.join(' + '),
     totalPaid: totalPaidStr.join(' + '),
     balance: balanceStr.join(' + '),
     _rawBalanceForColor: mainBalance
   }
})

const fetchSettingsVars = async () => {
  try {
    const [sup, inst, hol] = await Promise.all([
      $fetch('/api/admin/visa-basvuru/suppliers'),
      $fetch('/api/admin/visa-basvuru/institutions'),
      $fetch('/api/admin/visa-basvuru/holidays')
    ])
    suppliers.value = sup as any[]
    institutions.value = inst as any[]
    holidays.value = hol as any[]
  } catch (err) {
    console.error("Ayarlar yüklenemedi", err)
  }
}

onMounted(() => {
  fetchSettingsVars()
})

const formatDateShort = (dateStr: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('tr-TR')
}

// —— KURUM ——
const addInstitution = async () => {
  if (!newInstitution.value.ad) return alert('Kurum adı zorunludur')
  await $fetch('/api/admin/visa-basvuru/institutions', { method: 'POST', body: newInstitution.value })
  newInstitution.value = { ad: '', adres: '', mapsLink: '' }
  fetchSettingsVars()
}
const deleteInstitution = async (id: number) => {
  if(!confirm('Kurumu silmek istiyor musunuz?')) return
  await $fetch(`/api/admin/visa-basvuru/institutions/${id}`, { method: 'DELETE' })
  fetchSettingsVars()
}

// —— TEDARIKCI SEÇİMİ VE DÜZENLEME ——
function openSupplierEditor() {
   if(activeSupplier.value) {
      editSupplierForm.value = {
         ofisAdi: activeSupplier.value.ofisAdi,
         adres: activeSupplier.value.adres || '',
         mapsLink: activeSupplier.value.mapsLink || ''
      }
      editingSupplierMode.value = true
   }
}

watch(selectedSupplierId, (val) => {
   editingSupplierMode.value = false
   if(val) {
      const s = suppliers.value.find(x => x.id === val)
      if(s) {
         editSupplierForm.value = { ofisAdi: s.ofisAdi, adres: s.adres || '', mapsLink: s.mapsLink || '' }
      }
   }
})

const saveSupplierEdit = async () => {
   try {
     await $fetch(`/api/admin/visa-basvuru/suppliers/${activeSupplier.value.id}`, {
        method: 'PUT',
        body: editSupplierForm.value
     })
     alert('Tedarikçi güncellendi.')
     editingSupplierMode.value = false
     await fetchSettingsVars()
   } catch (err) {
     alert('Güncelleme hatası.')
   }
}

const addSupplier = async () => {
  if (!newSupplier.value.ofisAdi) return alert('Tedarikçi adı zorunludur')
  await $fetch('/api/admin/visa-basvuru/suppliers', { method: 'POST', body: newSupplier.value })
  newSupplier.value = { ofisAdi: '', adres: '', mapsLink: '' }
  fetchSettingsVars()
}
const deleteSupplier = async (id: number) => {
  if(!confirm('Silmek istiyor musunuz? İlgili vizeler etkilenebilir.')) return
  await $fetch(`/api/admin/visa-basvuru/suppliers/${id}`, { method: 'DELETE' })
  if(selectedSupplierId.value === id) selectedSupplierId.value = null
  fetchSettingsVars()
}

// —— ÖDEME (CARİ) ——
const openPaymentEditMode = (pay: any) => {
  paymentEditId.value = pay.id
  paymentForm.value = {
    tutar: pay.tutar,
    currency: pay.currency,
    tarih: new Date(pay.tarih).toISOString().slice(0,10),
    not: pay.not || ''
  }
}

const cancelPaymentEdit = () => {
  paymentEditId.value = null
  paymentForm.value = { tutar: null, currency: 'TRY', tarih: new Date().toISOString().slice(0,10), not: '' }
}

const saveSupplierPayment = async (supplierId: number) => {
  if (!paymentForm.value.tutar) return alert('Geçerli bir tutar girin')
  
  if (paymentEditId.value) {
    // Edit exist
    await $fetch(`/api/admin/visa-basvuru/suppliers/payment/${paymentEditId.value}`, {
      method: 'PUT',
      body: paymentForm.value
    })
    alert('Tahsilat düzenlendi.')
  } else {
    // Add new
    await $fetch(`/api/admin/visa-basvuru/suppliers/${supplierId}/payment`, {
      method: 'POST',
      body: paymentForm.value
    })
  }

  cancelPaymentEdit()
  fetchSettingsVars()
}

const deleteSupplierPayment = async (supplierPaymentId: number) => {
  if(!confirm('Ödeme kaydını silmek istiyor musunuz?')) return
  await $fetch(`/api/admin/visa-basvuru/suppliers/payment/${supplierPaymentId}`, { method: 'DELETE' })
  fetchSettingsVars()
}

// —— TATİLLER ——
const addHoliday = async () => {
  if (!newHoliday.value.tarih || !newHoliday.value.isim) return alert('Tarih ve isim zorunludur')
  await $fetch('/api/admin/visa-basvuru/holidays', {
    method: 'POST', body: newHoliday.value
  })
  newHoliday.value = { tarih: '', isim: '' }
  fetchSettingsVars()
}
const deleteHoliday = async (id: number) => {
  if(!confirm('Tatili silmek istediğinize emin misiniz?')) return
  await $fetch(`/api/admin/visa-basvuru/holidays/${id}`, { method: 'DELETE' })
  fetchSettingsVars()
}
</script>
