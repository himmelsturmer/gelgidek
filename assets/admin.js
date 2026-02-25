function el(id){ return document.getElementById(id); }
const statusEl = el('status');
const rowsEl = el('rows');
const qEl = el('q');
const limitEl = el('limit');
const refreshBtn = el('refreshBtn');

function setStatus(msg, isError=false){
  statusEl.textContent = msg;
  statusEl.classList.toggle('error', isError);
}

function escapeHtml(str){
  return String(str ?? '')
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#039;");
}

function formatDate(iso){
  try{
    const d = new Date(iso);
    return new Intl.DateTimeFormat('tr-TR', { dateStyle:'medium', timeStyle:'short' }).format(d);
  }catch{ return iso; }
}

async function load(){
  setStatus('Yükleniyor…');
  rowsEl.innerHTML = '';

  const limit = Number(limitEl.value || 25);
  const q = (qEl.value || '').trim();

  // Basic Auth prompt
  const user = localStorage.getItem('gg_admin_user') || prompt('Admin kullanıcı adı:');
  const pass = localStorage.getItem('gg_admin_pass') || prompt('Admin şifre:');

  if (!user || !pass) {
    setStatus('Giriş iptal edildi.', true);
    return;
  }

  localStorage.setItem('gg_admin_user', user);
  localStorage.setItem('gg_admin_pass', pass);

  const auth = btoa(user + ':' + pass);
  const url = `/.netlify/functions/submissions?limit=${encodeURIComponent(limit)}&q=${encodeURIComponent(q)}`;

  try{
    const res = await fetch(url, { headers: { 'Authorization': `Basic ${auth}` } });
    if (res.status === 401) {
      setStatus('Yetkisiz. Kullanıcı adı/şifre yanlış ya da env değişkenleri ayarlı değil.', true);
      return;
    }
    if (!res.ok) {
      const t = await res.text();
      setStatus('Hata: ' + t, true);
      return;
    }
    const data = await res.json();

    if (!data.enabled) {
      setStatus('Admin listeleme kapalı. README’deki env değişkenlerini ayarlayın.', true);
      return;
    }

    if (!Array.isArray(data.items) || data.items.length === 0) {
      setStatus('Kayıt bulunamadı.');
      return;
    }

    setStatus(`Toplam ${data.items.length} kayıt listelendi.`);

    const rows = data.items.map(item => {
      const d = formatDate(item.created_at);
      const name = escapeHtml(item.data?.name || item.data?.full_name || '');
      const email = escapeHtml(item.data?.email || '');
      const topic = escapeHtml(item.data?.topic || '');
      const msg = escapeHtml(item.data?.message || '');
      return `<tr>
        <td>${d}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${topic}</td>
        <td>${msg}</td>
      </tr>`;
    }).join('');

    rowsEl.innerHTML = rows;
  }catch(err){
    setStatus('Bağlantı hatası: ' + (err?.message || String(err)), true);
  }
}

refreshBtn?.addEventListener('click', load);
qEl?.addEventListener('keydown', (e) => { if(e.key === 'Enter') load(); });

load();
