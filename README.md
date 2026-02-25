# gelgidek.com (Netlify-ready static site + optional admin)

Bu repo **build gerektirmeyen** (pure static) bir site ve **Netlify Forms** ile çalışan 2 form içerir:
- `quick-lead` (hero içinde hızlı teklif)
- `contact` (iletişim formu)

## Deploy (Netlify)
1) GitHub repo’yu Netlify’a bağla  
2) Build command: **boş bırak** (gerek yok)  
3) Publish directory: repo root (**.**)  

Deploy sonrası Netlify panelinde:
- **Forms** -> form gönderimlerini görürsün (en kolay yol).

## Opsiyonel: /admin.html ile mesajları listeme
Admin listeleme için Netlify API kullanılır (token server-side, kullanıcıya görünmez).

Netlify Site settings -> **Environment variables** içine ekle:

- `ADMIN_USER` = örn. `admin`
- `ADMIN_PASS` = güçlü bir şifre
- `NETLIFY_SITE_ID` = Site settings -> Site information -> Site ID
- `NETLIFY_ACCESS_TOKEN` = Netlify User settings -> Applications -> Personal access tokens
- (opsiyonel) `NETLIFY_FORM_NAME` = `contact` (default)

Sonra `/admin.html` sayfasına gidip kullanıcı/şifre ile giriş yap.

> Not: Formun Netlify tarafından algılanması için en az 1 kez deploy edilmiş olması gerekir.
