<template>
  <div>
    <!-- Kullanıcı Listesi -->
    <div class="admin-card" style="margin-bottom:24px;">
      <div class="admin-card__header">
        <h2>👤 Admin Kullanıcıları</h2>
        <button class="btn btn--primary btn--sm" @click="showAddForm = true" v-if="!showAddForm">
          + Yeni Kullanıcı
        </button>
      </div>
      <div class="admin-card__body">

        <!-- Yeni Kullanıcı Formu -->
        <div v-if="showAddForm" style="background:var(--bg-alt);border-radius:8px;padding:20px;margin-bottom:20px;">
          <h3 style="margin:0 0 16px;font-size:1rem;">Yeni Kullanıcı Ekle</h3>
          <div v-if="addError" class="alert alert--error">{{ addError }}</div>
          <div class="form-group">
            <label>Kullanıcı Adı</label>
            <input v-model="addForm.username" class="form-input" placeholder="kullanici_adi" autofocus />
          </div>
          <div class="form-group">
            <label>Şifre (en az 6 karakter)</label>
            <input type="password" v-model="addForm.password" class="form-input" placeholder="••••••••" />
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn--primary btn--sm" @click="addUser" :disabled="addLoading">
              {{ addLoading ? 'Ekleniyor...' : 'Kaydet' }}
            </button>
            <button class="btn btn--ghost btn--sm" @click="closeAddForm">İptal</button>
          </div>
        </div>

        <!-- Kullanıcı Tablosu -->
        <div v-if="users.length === 0" class="muted" style="text-align:center;padding:20px;">Kullanıcı bulunamadı.</div>
        <div v-else style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
            <thead>
              <tr style="border-bottom:2px solid var(--border);">
                <th style="text-align:left;padding:10px 12px;color:var(--text-muted);font-weight:600;">Kullanıcı Adı</th>
                <th style="text-align:center;padding:10px 12px;color:var(--text-muted);font-weight:600;">2FA</th>
                <th style="text-align:left;padding:10px 12px;color:var(--text-muted);font-weight:600;">Oluşturulma</th>
                <th style="text-align:right;padding:10px 12px;color:var(--text-muted);font-weight:600;">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id" style="border-bottom:1px solid var(--border);">
                <td style="padding:12px;">
                  <strong>{{ user.username }}</strong>
                </td>
                <td style="padding:12px;text-align:center;">
                  <span v-if="user.hasTOTP" style="background:#d1fae5;color:#065f46;font-size:0.75rem;padding:3px 10px;border-radius:12px;font-weight:600;">
                    ✓ Aktif
                  </span>
                  <span v-else style="background:var(--bg-alt);color:var(--text-muted);font-size:0.75rem;padding:3px 10px;border-radius:12px;">
                    Kapalı
                  </span>
                </td>
                <td style="padding:12px;color:var(--text-muted);">
                  {{ new Date(user.createdAt).toLocaleDateString('tr-TR') }}
                </td>
                <td style="padding:12px;text-align:right;">
                  <div style="display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap;">
                    <button class="btn btn--ghost btn--sm" @click="openEditModal(user)" title="Düzenle">✏️ Düzenle</button>
                    <button
                      v-if="!user.hasTOTP"
                      class="btn btn--accent btn--sm"
                      @click="openTotpSetup(user)"
                      title="2FA Kur"
                    >🔐 2FA Kur</button>
                    <button
                      v-else
                      class="btn btn--ghost btn--sm"
                      @click="disableTotp(user)"
                      title="2FA Kaldır"
                    >🔓 2FA Kaldır</button>
                    <button class="btn btn--danger btn--sm" @click="deleteUser(user)" title="Sil">🗑</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Düzenle Modalı -->
    <div v-if="editModal.open" class="modal-backdrop" @click.self="closeEditModal">
      <div class="modal-box">
        <h2 style="margin:0 0 20px;font-size:1.1rem;">✏️ Kullanıcıyı Düzenle</h2>
        <div v-if="editModal.error" class="alert alert--error">{{ editModal.error }}</div>
        <div class="form-group">
          <label>Yeni Kullanıcı Adı <span style="color:var(--text-muted);font-weight:400;">(boş bırakılırsa değişmez)</span></label>
          <input v-model="editModal.username" class="form-input" :placeholder="editModal.originalUsername" />
        </div>
        <div class="form-group">
          <label>Yeni Şifre <span style="color:var(--text-muted);font-weight:400;">(boş bırakılırsa değişmez)</span></label>
          <input type="password" v-model="editModal.password" class="form-input" placeholder="••••••••" />
        </div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="btn btn--primary btn--sm" @click="saveEdit" :disabled="editModal.loading">
            {{ editModal.loading ? 'Kaydediliyor...' : 'Kaydet' }}
          </button>
          <button class="btn btn--ghost btn--sm" @click="closeEditModal">İptal</button>
        </div>
      </div>
    </div>

    <!-- 2FA Kurulum Modalı -->
    <div v-if="totpModal.open" class="modal-backdrop" @click.self="closeTotpModal">
      <div class="modal-box">
        <h2 style="margin:0 0 8px;font-size:1.1rem;">🔐 İki Adımlı Doğrulama Kur</h2>
        <p style="color:var(--text-muted);font-size:0.875rem;margin:0 0 20px;">
          <strong>{{ totpModal.username }}</strong> için
        </p>

        <div v-if="totpModal.error" class="alert alert--error">{{ totpModal.error }}</div>

        <!-- Step 1: QR scan -->
        <div v-if="totpModal.step === 'qr'">
          <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:12px;">
            1. Google Authenticator (veya uyumlu bir uygulama) açın.<br>
            2. Aşağıdaki QR kodu tarayın.<br>
            3. Uygulamadan gelen 6 haneli kodu girin.
          </p>
          <div v-if="totpModal.loading" style="text-align:center;padding:20px;color:var(--text-muted);">
            QR oluşturuluyor...
          </div>
          <div v-else style="text-align:center;margin-bottom:16px;">
            <img :src="totpModal.qrCodeDataUrl" alt="QR Kod" style="width:180px;height:180px;border-radius:8px;border:4px solid white;" />
            <div style="margin-top:8px;font-size:0.75rem;color:var(--text-muted);">
              Manuel giriş kodu:
              <code style="background:var(--bg-alt);padding:2px 6px;border-radius:4px;display:inline-block;margin-top:4px;font-size:0.8rem;letter-spacing:0.1em;">{{ totpModal.secret }}</code>
            </div>
          </div>
          <div class="form-group">
            <label>Doğrulama Kodu</label>
            <input
              v-model="totpModal.code"
              class="form-input"
              placeholder="123456"
              maxlength="6"
              style="text-align:center;letter-spacing:0.3em;font-size:1.2rem;"
            />
          </div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <button class="btn btn--primary btn--sm" @click="enableTotp" :disabled="totpModal.saving">
              {{ totpModal.saving ? 'Etkinleştiriliyor...' : 'Etkinleştir' }}
            </button>
            <button class="btn btn--ghost btn--sm" @click="closeTotpModal">İptal</button>
          </div>
        </div>

        <!-- Step 2: Success -->
        <div v-else-if="totpModal.step === 'done'" style="text-align:center;padding:20px 0;">
          <div style="font-size:3rem;margin-bottom:12px;">✅</div>
          <p style="font-weight:600;color:var(--primary);">2FA başarıyla etkinleştirildi!</p>
          <p style="font-size:0.875rem;color:var(--text-muted);">Bir sonraki girişten itibaren doğrulama kodu gerekecek.</p>
          <button class="btn btn--primary btn--sm" @click="closeTotpModal" style="margin-top:16px;">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Kullanıcı Yönetimi | Admin Paneli' })

// ---- Users ----
const { data: usersData, refresh: refreshUsers } = await useFetch<any[]>('/api/admin/users', {
  lazy: false,
  server: false, // fetch only on client-side to avoid SSR 401 issues
}).catch(() => ({ data: ref([]), refresh: async () => {} }))
const users = computed(() => usersData.value ?? [])

// ---- Add Form ----
const showAddForm = ref(false)
const addForm = reactive({ username: '', password: '' })
const addError = ref('')
const addLoading = ref(false)

function closeAddForm() {
  showAddForm.value = false
  addForm.username = ''
  addForm.password = ''
  addError.value = ''
}

async function addUser() {
  addError.value = ''
  addLoading.value = true
  try {
    await $fetch('/api/admin/users', { method: 'POST', body: { ...addForm } })
    closeAddForm()
    await refreshUsers()
  } catch (err: any) {
    addError.value = err.data?.message || 'Bir hata oluştu'
  } finally {
    addLoading.value = false
  }
}

// ---- Edit Modal ----
const editModal = reactive({
  open: false,
  id: 0,
  originalUsername: '',
  username: '',
  password: '',
  error: '',
  loading: false,
})

function openEditModal(user: any) {
  editModal.open = true
  editModal.id = user.id
  editModal.originalUsername = user.username
  editModal.username = ''
  editModal.password = ''
  editModal.error = ''
}

function closeEditModal() {
  editModal.open = false
  editModal.error = ''
}

async function saveEdit() {
  editModal.error = ''
  editModal.loading = true
  try {
    await $fetch(`/api/admin/users/${editModal.id}`, {
      method: 'PUT',
      body: {
        username: editModal.username || undefined,
        password: editModal.password || undefined,
      },
    })
    closeEditModal()
    await refreshUsers()
  } catch (err: any) {
    editModal.error = err.data?.message || 'Bir hata oluştu'
  } finally {
    editModal.loading = false
  }
}

// ---- Delete ----
async function deleteUser(user: any) {
  if (!confirm(`"${user.username}" kullanıcısı silinsin mi?`)) return
  try {
    await $fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' })
    await refreshUsers()
  } catch (err: any) {
    alert(err.data?.message || 'Silme başarısız')
  }
}

// ---- TOTP Modal ----
const totpModal = reactive({
  open: false,
  step: 'qr' as 'qr' | 'done',
  id: 0,
  username: '',
  secret: '',
  qrCodeDataUrl: '',
  code: '',
  error: '',
  loading: false,
  saving: false,
})

async function openTotpSetup(user: any) {
  totpModal.open = true
  totpModal.step = 'qr'
  totpModal.id = user.id
  totpModal.username = user.username
  totpModal.secret = ''
  totpModal.qrCodeDataUrl = ''
  totpModal.code = ''
  totpModal.error = ''
  totpModal.loading = true

  try {
    const res: any = await $fetch(`/api/admin/users/${user.id}/totp-setup`, { method: 'POST' })
    totpModal.secret = res.secret
    totpModal.qrCodeDataUrl = res.qrCodeDataUrl
  } catch (err: any) {
    totpModal.error = err.data?.message || 'QR oluşturulamadı'
  } finally {
    totpModal.loading = false
  }
}

function closeTotpModal() {
  totpModal.open = false
  refreshUsers()
}

async function enableTotp() {
  totpModal.error = ''
  if (!totpModal.code || totpModal.code.length !== 6) {
    totpModal.error = '6 haneli kodu eksiksiz girin'
    return
  }
  totpModal.saving = true
  try {
    await $fetch(`/api/admin/users/${totpModal.id}/totp-enable`, {
      method: 'POST',
      body: { secret: totpModal.secret, code: totpModal.code },
    })
    totpModal.step = 'done'
  } catch (err: any) {
    totpModal.error = err.data?.message || 'Doğrulama başarısız'
    totpModal.code = ''
  } finally {
    totpModal.saving = false
  }
}

async function disableTotp(user: any) {
  if (!confirm(`"${user.username}" için 2FA kaldırılsın mı?`)) return
  try {
    await $fetch(`/api/admin/users/${user.id}/totp-disable`, { method: 'POST' })
    await refreshUsers()
  } catch (err: any) {
    alert(err.data?.message || 'İşlem başarısız')
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  width: 100%;
  max-width: 460px;
  max-height: 90vh;
  overflow-y: auto;
}
</style>
