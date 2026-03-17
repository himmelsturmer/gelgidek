import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // 1. Admin Kullanıcısı
  const adminPassword = await bcrypt.hash('123456', 10)
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: adminPassword
    }
  })
  console.log('✅ Admin user created (admin / 123456)')

  // 2. Carousel Slaytları
  await prisma.carouselSlide.createMany({
    data: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
        title: 'Avrupa\'nın Kalbine Yolculuk',
        subtitle: 'Schengen vizelerinizde profesyonel destek.',
        link: '/ulkeler/fransa',
        order: 1
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop',
        title: 'İngiltere Vizesi',
        subtitle: 'İngiltere vize başvurularınız için %100 danışmanlık.',
        link: '/ulkeler/ingiltere',
        order: 2
      }
    ]
  })
  console.log('✅ Carousel slides created')

  // 3. Ülkeler (Örnek Data - vizedunyasi.com'dan alınan link matrisi için placeholderlar)
  const countriesData = [
    { name: 'Almanya', slug: 'almanya', flagUrl: '🇩🇪', continent: 'Avrupa', showOnHome: true, homeOrder: 1 },
    { name: 'İngiltere', slug: 'ingiltere', flagUrl: '🇬🇧', continent: 'Avrupa', showOnHome: true, homeOrder: 2 },
    { name: 'Fransa', slug: 'fransa', flagUrl: '🇫🇷', continent: 'Avrupa', showOnHome: true, homeOrder: 3 },
    { name: 'İtalya', slug: 'italya', flagUrl: '🇮🇹', continent: 'Avrupa', showOnHome: true, homeOrder: 4 },
    { name: 'Amerika', slug: 'amerika', flagUrl: '🇺🇸', continent: 'Kuzey Amerika', showOnHome: true, homeOrder: 5 },
    { name: 'İspanya', slug: 'ispanya', flagUrl: '🇪🇸', continent: 'Avrupa', showOnHome: true, homeOrder: 6 },
    { name: 'Hollanda', slug: 'hollanda', flagUrl: '🇳🇱', continent: 'Avrupa', showOnHome: false, homeOrder: null },
    { name: 'Yunanistan', slug: 'yunanistan', flagUrl: '🇬🇷', continent: 'Avrupa', showOnHome: false, homeOrder: null },
    { name: 'Schengen Ortak Formu', slug: 'schengen', flagUrl: '🇪🇺', continent: 'Avrupa', showOnHome: false, homeOrder: null }
  ]

  for (const c of countriesData) {
    await prisma.country.upsert({
      where: { slug: c.slug },
      update: {},
      create: c
    })
  }
  console.log('✅ Initial countries created')

  // 4. Vize Bilgileri (Örnek Almanya -> Turistik -> Ücretli Çalışan)
  const germany = await prisma.country.findUnique({ where: { slug: 'almanya' } })
  if (germany) {
    await prisma.visaInfo.create({
      data: {
        countryId: germany.id,
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (Seyahat dönüşü en az 3 ay daha geçerli, son 10 yıl içinde alınmış, 2 adet boş vize sayfası olan)',
          '2 Adet Biyometrik Fotoğraf (35x45 mm, beyaz fonlu, güncel)',
          'Kimlik Fotokopisi ve Tam Tekmil Vukuatlı Nüfus Kayıt Örneği',
          'Barkodlu SGK İşe Giriş Bildirgesi ve SGK Tescil ve Hizmet Dökümü',
          'Son 3 Aylık Maaş Bordrosu (Kaşeli ve ıslak imzalı)',
          'Şirket Yazısı (İşveren tarafından yazılmış, izin tarihlerini belirten imzalı dilekçe)',
          'Güncel Şirket Evrakları (Faaliyet Belgesi, Vergi Levhası, İmza Sirküleri, Ticaret Sicil Gazetesi)',
          'Son 3 Aylık Şahsi Banka Hesap Dökümü (Banka imza sirküleri ile birlikte, güncel bakiyeli)',
          'Uçak ve Otel Rezervasyonları (Tarafımızca geçici olarak yapılabilir)',
          'Seyahat Sağlık Sigortası (Tarafımızca yapılabilir, 30.000€ teminatlı)'
        ]),
        applicationZones: JSON.stringify([
          'İstanbul (VFS Global)',
          'Ankara (iDATA)',
          'İzmir (iDATA)',
          'Bursa (iDATA)'
        ]),
        processingTime: '15-20 İş Günü (Randevu tarihinden itibaren)',
        description: 'Almanya Schengen vizeleri için parmak izi (BİOMETRİ) verilmesi zorunludur. Son 5 yıl içinde Schengen vizesi için parmak izi verdiyseniz (VIS ibaresi varsa) şahsen gelmenize gerek yoktur.',
        embassyName: 'Almanya Federal Cumhuriyeti Büyükelçiliği',
        embassyAddress: 'Atatürk Bulvarı No: 114, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 455 51 00',
        embassyWeb: 'https://turkei.diplo.de',
        consulateName: 'Almanya Federal Cumhuriyeti Başkonsolosluğu İstanbul',
        consulateAddress: 'İnönü Caddesi No: 10, Gümüşsuyu / İstanbul',
        consulatePhone: '+90 (212) 334 61 00',
        consulateWeb: 'https://turkei.diplo.de',
        pdf1Label: 'Almanya Schengen Vize Başvuru Formu',
        pdf1Url: 'https://vid.vizedunyasi.com/vize_formu/almanya-schengen-vize-basvuru-formu.pdf',
        pdf2Label: 'Şahsi İngilizce Dilekçe Örneği',
        pdf2Url: 'https://vid.vizedunyasi.com/dilekce/almanya-ing-dilekce.pdf',
        pdf3Label: 'İşveren İngilizce Dilekçe Örneği',
        pdf3Url: 'https://vid.vizedunyasi.com/dilekce/almanya-isveren-ing-dilekce.pdf',
        pdf4Label: 'Aile Arkadaş Ziyareti Dilekçe',
        pdf4Url: 'https://vid.vizedunyasi.com/dilekce/almanya-aile-ziyareti-dilekce.pdf'
      }
    })
    console.log('✅ Visa info for Germany created')
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
