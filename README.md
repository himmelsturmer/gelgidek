# Yurt Dışı Tur & Vize Danışmanlığı (gelgidek.com) - Teklif/Kurulum

Bu proje Nuxt 3 alt yapısıyla full-stack (frontend + backend) olarak geliştirilmiştir.

## Özellikler

- **Vize Bilgileri Sistemi:** Kullanıcı, ülke > amaç > meslek seçerek gerekli evrak listesini, başvuru bölgesini, işlem süresini ve varsa form/dilekçe PDF linklerini görür.
- **E-posta Gönderme:** Ülke detay sayfasından müşteriye bu evrak listesi otomatik formatlanmış şık bir e-posta ile iletilebilir.
- **Admin Paneli:** `/admin` rotasından erişilebilir. Tüm ana sayfa vitrin ülkeleri, carousel slaytları, ülkeler ve onların vize bilgileri buradan yönetilir.
- **Güvenlik:** Admin paneli JWT token tabanlı kimlik doğrulama ile korunmaktadır.
- **Tasarım:** Sitenin güncel renk paleti ve markalama kılavuzu (Montserrat font, mavi/açık mavi tonlar) uygulanmıştır.

## Kurulum ve Çalıştırma

Gereksinimler: Node.js 18+

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Ortam değişkenlerini ayarlayın:
   `.env.example` dosyasının adını `.env` olarak değiştirin ve kendi bilgilerinizi (özellikle Gmail SMTP detayları ve güçlü bir şifreleme anahtarı) girin.

3. Veritabanını hazırlayın (Geliştirme için SQLite):
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
   *(Seed komutu örnek olarak "Almanya" vizesini ve Admin kullanıcısını `admin` / `123456` şifresiyle oluşturur)*

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

5. Canlıya almak (Production Build):
   ```bash
   npm run build
   node .output/server/index.mjs
   ```

## Klasör Yapısı

- `assets/css/main.css`: Tüm sitenin tasarım sistemi ve utility sınıfları.
- `layouts/`: Sitenin genel (Header/Footer) ve Admin şablonları.
- `pages/`: Görünen sayfalar (`index`, `hakkimizda`, `vize-rejim-tablosu`, `iletisim`, `ulkeler/[slug]`).
- `pages/admin/`: Yönetim paneli arayüzleri.
- `server/api/`: Backend Nitro rotaları (DB CRUD işlemleri, login, e-posta gönderme).
- `prisma/`: Veritabanı şeması ve başlangıç verisi dökümü.

---
*Hazırlayan: gelgidek.com Geliştirme Ekibi*
