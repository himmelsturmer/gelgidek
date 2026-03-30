import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Standart belgeler listesi (birçok Schengen ülkesi için ortak)
const schengenBase = [
  'Pasaport (Son 10 yılda alınmış, en az 2 boş sayfası ile seyahat sonrası en az 3 ay geçerli)',
  '2 Adet Biyometrik Fotoğraf (35x45mm, beyaz fonlu, son 6 ay içinde çekilmiş)',
  'Kimlik Fotokopisi ve Vukuatlı Nüfus Kayıt Örneği',
  'Seyahat Sağlık Sigortası (Min. 30.000€ teminatlı, tüm Schengen bölgesinde geçerli)'
]

const schengenEmployee = [
  ...schengenBase,
  'SGK İşe Giriş Bildirgesi ve SGK Tescil Hizmet Dökümü (Barkodlu, güncel)',
  'Son 3 Aylık Maaş Bordrosu (Kaşeli ve ıslak imzalı)',
  'İşveren Yazısı (İzin tarihlerini belirten, kaşeli-imzalı dilekçe)',
  'Güncel Şirket Evrakları (Faaliyet Belgesi, Vergi Levhası, Ticaret Sicil Gazetesi)',
  'Son 3 Aylık Şahsi Banka Hesap Dökümü (Yeterli bakiyeli)',
  'Uçak ve Otel Rezervasyonları',
]

const schengenBusiness = [
  ...schengenBase,
  'Vergi Levhası ve Ticaret Sicil Gazetesi (En güncel)',
  'Faaliyet Belgesi (Ticaret/Sanayi Odası onaylı)',
  'İmza Sirküleri',
  'Son 3 Aylık Şahsi ve Şirket Banka Hesap Dökümü',
  'Davet Mektubu (Karşı firmadan, İngilizce)',
  'Uçak Rezervasyonu',
]

const schengenStudent = [
  ...schengenBase,
  'Okul Kaydı veya Öğrenci Belgesi',
  'Okul Harç Makbuzu',
  'Ebeveyn İzin Dilekçesi (18 yaş altı için)',
  'Aile Banka Hesap Dökümü (Sponsor belgesi)',
  'Uçak ve Konaklama Rezervasyonu',
]

const countries = [
  {
    slug: 'almanya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (Son 10 yılda alınmış, seyahat dönüşünde en az 3 ay geçerli, 2 boş sayfa)',
          '2 Adet Biyometrik Fotoğraf (35x45mm, beyaz fonlu)',
          'Kimlik Fotokopisi ve Vukuatlı Nüfus Kayıt Örneği',
          'Seyahat Sağlık Sigortası (Min. 30.000€, tüm Schengen)',
          'SGK İşe Giriş Bildirgesi ve SGK Tescil Hizmet Dökümü',
          'Son 3 Aylık Maaş Bordrosu (Kaşeli-imzalı)',
          'İşveren İzin Dilekçesi (Tarihler belirtilmiş, kaşeli-imzalı)',
          'Güncel Şirket Evrakları (Faaliyet, Vergi, Ticaret Sicil)',
          'Son 3 Aylık Banka Hesap Dökümü (Min. 70.000 TL bakiye)',
          'Uçak ve Otel Rezervasyonları',
        ]),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (iDATA)', 'İzmir (iDATA)', 'Bursa (iDATA)']),
        processingTime: '15-20 İş Günü',
        description: 'Almanya Schengen vizeleri için biyometri (parmak izi) verilmesi zorunludur. Son 5 yıl içinde Schengen parmak izi verdiyseniz şahsen gelmenize gerek yoktur.',
        embassyName: 'Almanya Federal Cumhuriyeti Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 114, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 455 51 00',
        embassyWeb: 'https://turkei.diplo.de',
        consulateName: 'Almanya Federal Cumhuriyeti Başkonsolosluğu İstanbul',
        consulateAddress: 'İnönü Caddesi No: 10, Gümüşsuyu / İstanbul',
        consulatePhone: '+90 (212) 334 61 00',
        consulateWeb: 'https://turkei.diplo.de',
        pdf1Label: 'Almanya Schengen Vize Başvuru Formu',
        pdf1Url: 'https://vid.vizedunyasi.com/vize_formu/almanya-schengen-vize-basvuru-formu.pdf',
        pdf2Label: 'Şahsi İngilizce Dilekçe',
        pdf2Url: 'https://vid.vizedunyasi.com/dilekce/almanya-ing-dilekce.pdf',
      },
      {
        purpose: 'Turizm',
        profession: 'Firma Sahibi',
        documentList: JSON.stringify(schengenBusiness),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (iDATA)']),
        processingTime: '15-20 İş Günü',
        description: 'Almanya turistik vize – firma sahibi kategorisi.',
        embassyName: 'Almanya Federal Cumhuriyeti Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 114, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 455 51 00',
        embassyWeb: 'https://turkei.diplo.de',
      },
      {
        purpose: 'Turizm',
        profession: 'Öğrenci',
        documentList: JSON.stringify(schengenStudent),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (iDATA)']),
        processingTime: '15-20 İş Günü',
        description: 'Almanya turistik vize – öğrenci kategorisi.',
        embassyName: 'Almanya Federal Cumhuriyeti Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 114, Kavaklıdere / Ankara',
      },
    ]
  },
  {
    slug: 'fransa',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '15 İş Günü',
        description: 'Fransa Schengen vizesi. Başvurular VFS Global merkezleri üzerinden yapılır.',
        embassyName: 'Fransa Büyükelçiliği Ankara',
        embassyAddress: 'Paris Caddesi No: 70, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 455 45 45',
        embassyWeb: 'https://tr.ambafrance.org',
        pdf1Label: 'Fransa Vize Başvuru Formu',
        pdf1Url: 'https://vid.vizedunyasi.com/vize_formu/fransa-schengen-vize-basvuru-formu.pdf',
      },
      {
        purpose: 'Turizm',
        profession: 'Firma Sahibi',
        documentList: JSON.stringify(schengenBusiness),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '15 İş Günü',
        description: 'Fransa turistik vize – firma sahibi.',
        embassyName: 'Fransa Büyükelçiliği Ankara',
        embassyAddress: 'Paris Caddesi No: 70, Kavaklıdere / Ankara',
        embassyWeb: 'https://tr.ambafrance.org',
      },
    ]
  },
  {
    slug: 'ingiltere',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (Geçerli, en az 1 boş sayfa)',
          'Online Vize Başvuru Formu (gov.uk üzerinden)',
          'Biyometrik bilgi toplandığında kullanılacak fotoğraf',
          'İşveren Yazısı ve Son 6 Aylık Maaş Bordrosu',
          'Son 6 Aylık Banka Hesap Dökümü',
          'Güncel Şirket Evrakları (Faaliyet, Vergi, Sicil)',
          'Otel ve Uçak Rezervasyonları',
          'Seyahat Sigortası (Zorunlu değil, önerilir)',
          'Evlilik Cüzdanı (Evliyse)',
        ]),
        applicationZones: JSON.stringify(['İstanbul (UKVI Başvuru Merkezi)', 'Ankara (UKVI Başvuru Merkezi)']),
        processingTime: '15-20 İş Günü',
        description: 'İngiltere vizesi online başvuru gerektirir. Başvurular gov.uk üzerinden yapılır, ardından biyometri merkezi ziyareti zorunludur.',
        embassyName: 'İngiliz Büyükelçiliği Ankara',
        embassyAddress: 'Şehit Ersan Caddesi No: 46/A, Çankaya / Ankara',
        embassyPhone: '+90 (312) 455 33 44',
        embassyWeb: 'https://www.gov.uk/world/turkey',
        consulateName: 'İngiliz Başkonsolosluğu İstanbul',
        consulateAddress: 'Meşrutiyet Caddesi No: 34, Tepebaşı / İstanbul',
        consulatePhone: '+90 (212) 334 64 00',
        consulateWeb: 'https://www.gov.uk/world/turkey',
        pdf1Label: 'İngiltere Vize Kontrol Listesi',
        pdf1Url: 'https://vid.vizedunyasi.com/vize_formu/ingiltere-vize-kontrol-listesi.pdf',
      },
    ]
  },
  {
    slug: 'italya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '10-15 İş Günü',
        description: 'İtalya Schengen vizesi.',
        embassyName: 'İtalya Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 118, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 457 05 05',
        embassyWeb: 'https://ambasciata.ankara.esteri.it',
        pdf1Label: 'İtalya Vize Başvuru Formu',
        pdf1Url: 'https://vid.vizedunyasi.com/vize_formu/italya-schengen-vize-basvuru-formu.pdf',
      },
    ]
  },
  {
    slug: 'ispanya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (BLS International)', 'Ankara (İspanya Konsolosluğu)']),
        processingTime: '10-15 İş Günü',
        description: 'İspanya Schengen vizesi. BLS International üzerinden başvurulur.',
        embassyName: 'İspanya Büyükelçiliği Ankara',
        embassyAddress: 'Abdullah Cevdet Sokak No: 24, Çankaya / Ankara',
        embassyPhone: '+90 (312) 440 17 00',
        embassyWeb: 'https://www.exteriores.gob.es/Embajadas/ankara',
        pdf1Label: 'İspanya Vize Başvuru Formu (EX-01)',
        pdf1Url: 'https://vid.vizedunyasi.com/vize_formu/ispanya-schengen-vize-basvuru-formu.pdf',
      },
    ]
  },
  {
    slug: 'hollanda',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '10-15 İş Günü',
        description: 'Hollanda Schengen vizesi.',
        embassyName: 'Hollanda Büyükelçiliği Ankara',
        embassyAddress: 'Hollanda Caddesi No: 5, Yıldız / Ankara',
        embassyPhone: '+90 (312) 409 18 00',
        embassyWeb: 'https://www.netherlandsworldwide.nl/countries/turkey',
      },
    ]
  },
  {
    slug: 'belcika',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (Belçika Büyükelçiliği)']),
        processingTime: '10-15 İş Günü',
        description: 'Belçika Schengen vizesi.',
        embassyName: 'Belçika Krallığı Büyükelçiliği Ankara',
        embassyAddress: 'Nenehatun Caddesi No: 109, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 446 82 47',
        embassyWeb: 'https://turkey.diplomatie.belgium.be',
      },
    ]
  },
  {
    slug: 'avusturya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (OeAD)', 'Ankara (Avusturya Büyükelçiliği)']),
        processingTime: '15 İş Günü',
        description: 'Avusturya Schengen vizesi.',
        embassyName: 'Avusturya Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 189, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 419 04 31',
        embassyWeb: 'https://www.bmeia.gv.at/tr/oe-b-ankara',
      },
    ]
  },
  {
    slug: 'isvec',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '10-15 İş Günü',
        description: 'İsveç Schengen vizesi.',
        embassyName: 'İsveç Büyükelçiliği Ankara',
        embassyAddress: 'Katip Çelebi Sokak No: 7, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 455 41 00',
        embassyWeb: 'https://www.swedenabroad.se/tr/embassies/turkey-ankara',
      },
    ]
  },
  {
    slug: 'isvicre',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (İsviçre Büyükelçiliği)']),
        processingTime: '10-15 İş Günü',
        description: 'İsviçre Schengen vizesi.',
        embassyName: 'İsviçre Büyükelçiliği Ankara',
        embassyAddress: 'Filistin Sokak No: 26, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 467 54 14',
        embassyWeb: 'https://www.eda.admin.ch/ankara',
      },
    ]
  },
  {
    slug: 'danimarka',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '10-15 İş Günü',
        description: 'Danimarka Schengen vizesi.',
        embassyName: 'Danimarka Büyükelçiliği Ankara',
        embassyAddress: 'Kırlangıç Sokak No: 42, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 447 13 20',
        embassyWeb: 'https://tyrkiet.um.dk',
      },
    ]
  },
  {
    slug: 'norvec',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '15 İş Günü',
        description: 'Norveç Schengen vizesi.',
        embassyName: 'Norveç Büyükelçiliği Ankara',
        embassyAddress: 'Gelincik Sokak No: 11, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 405 96 00',
        embassyWeb: 'https://www.norway.no/tr/turkey',
      },
    ]
  },
  {
    slug: 'finlandiya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)']),
        processingTime: '10-15 İş Günü',
        description: 'Finlandiya Schengen vizesi.',
        embassyName: 'Finlandiya Büyükelçiliği Ankara',
        embassyAddress: 'Galveston Sokak No: 3, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 457 79 30',
        embassyWeb: 'https://finlandiya.fi/tr',
      },
    ]
  },
  {
    slug: 'polonya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (Polonya Büyükelçiliği)']),
        processingTime: '10-15 İş Günü',
        description: 'Polonya Schengen vizesi.',
        embassyName: 'Polonya Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 241, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 446 87 95',
        embassyWeb: 'https://ankara.msz.gov.pl',
      },
    ]
  },
  {
    slug: 'portekiz',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)']),
        processingTime: '15 İş Günü',
        description: 'Portekiz Schengen vizesi.',
        embassyName: 'Portekiz Büyükelçiliği Ankara',
        embassyAddress: 'Filistin Sokak No: 19, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 446 18 76',
        embassyWeb: 'https://www.embaixadadeportugal.net.tr',
      },
    ]
  },
  {
    slug: 'macaristan',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)']),
        processingTime: '10-15 İş Günü',
        description: 'Macaristan Schengen vizesi.',
        embassyName: 'Macaristan Büyükelçiliği Ankara',
        embassyAddress: 'Sancak Mahallesi, 206. Cadde No: 10, Yıldız / Ankara',
        embassyPhone: '+90 (312) 442 23 53',
        embassyWeb: 'https://ankara.mfa.gov.hu',
      },
    ]
  },
  {
    slug: 'cek-cumhuriyeti',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (Çek Konsolosluğu)']),
        processingTime: '15 İş Günü',
        description: 'Çek Cumhuriyeti Schengen vizesi.',
        embassyName: 'Çek Cumhuriyeti Büyükelçiliği Ankara',
        embassyAddress: 'Cinnah Caddesi No: 102, Çankaya / Ankara',
        embassyPhone: '+90 (312) 426 17 66',
        embassyWeb: 'https://www.mzv.cz/ankara',
      },
    ]
  },
  {
    slug: 'estonya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)']),
        processingTime: '15 İş Günü',
        description: 'Estonya Schengen vizesi.',
        embassyName: 'Estonya Büyükelçiliği Ankara',
        embassyAddress: 'Nenehatun Caddesi No: 107B, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 405 96 90',
        embassyWeb: 'https://www.vm.ee/en/missions/turkey',
      },
    ]
  },
  {
    slug: 'irlanda',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (En az 6 ay geçerli)',
          'Online Vize Başvuru Formu (INIS sistemi)',
          'İşveren Yazısı ve Son 6 Aylık Maaş Bordrosu',
          'Son 6 Aylık Banka Hesap Dökümü',
          'Otel ve Uçak Rezervasyonları',
          'Seyahat Sigortası',
          '2 Adet Fotoğraf',
        ]),
        applicationZones: JSON.stringify(['Ankara (İrlanda Büyükelçiliği)']),
        processingTime: '4-8 Hafta',
        description: 'İrlanda vizesi Schengen dışındadır. INIS (Irish Naturalisation and Immigration Service) üzerinden online başvuru yapılır.',
        embassyName: 'İrlanda Büyükelçiliği Ankara',
        embassyAddress: 'Uğur Mumcu Caddesi No: 88, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 446 61 72',
        embassyWeb: 'https://www.dfa.ie/irish-embassy/turkey',
      },
    ]
  },
  {
    slug: 'izlanda',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (Norveç Konsolosluğu – İzlanda adına)']),
        processingTime: '15-20 İş Günü',
        description: 'İzlanda Schengen vizesi. İzlanda\'nın Türkiye\'de doğrudan konsolosluğu yoktur; başvurular Norveç konsolosluğu üzerinden yapılabilir.',
        embassyName: 'İzlanda Büyükelçiliği (Ankara – Norveç vasıtasıyla)',
        embassyWeb: 'https://www.utl.is',
      },
    ]
  },
  {
    slug: 'hirvatistan',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (Hırvatistan Konsolosluğu)', 'Ankara (Hırvatistan Büyükelçiliği)']),
        processingTime: '15 İş Günü',
        description: 'Hırvatistan 2023\'te Schengen bölgesine katılmıştır.',
        embassyName: 'Hırvatistan Büyükelçiliği Ankara',
        embassyAddress: 'Reşit Galip Caddesi No: 35, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 495 27 00',
        embassyWeb: 'https://tr.mvep.gov.hr',
      },
    ]
  },
  {
    slug: 'malta',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global – İtalya üzerinden)']),
        processingTime: '10-15 İş Günü',
        description: 'Malta Schengen vizesi. Malta\'nın Türkiye\'de vize merkezi yoktur; İtalya konsolosluğu üzerinden başvurulur.',
        embassyName: 'Malta Yüksek Komiserliği (İstanbul)',
        embassyWeb: 'https://foreignandeu.gov.mt',
      },
    ]
  },
  {
    slug: 'bulgaristan',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (En az 3 ay geçerli)',
          '2 Adet Biyometrik Fotoğraf',
          'Kimlik Fotokopisi',
          'Seyahat Sigortası',
          'SGK İşe Giriş Bildirgesi ve Maaş Bordrosu',
          'İşveren Dilekçesi',
          'Banka Hesap Dökümü',
          'Otel ve Uçak Rezervasyonu',
        ]),
        applicationZones: JSON.stringify(['İstanbul (Bulgaristan Konsolosluğu)', 'Ankara (Bulgaristan Büyükelçiliği)', 'Edirne (Bulgaristan Konsolosluğu)']),
        processingTime: '5-10 İş Günü',
        description: 'Bulgaristan henüz tam Schengen üyesi değildir; ayrı ulusal vize gerektirir.',
        embassyName: 'Bulgaristan Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 124, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 467 20 71',
        embassyWeb: 'https://www.mfa.bg/embassies/turkey',
      },
    ]
  },
  {
    slug: 'romanya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (En az 3 ay geçerli)',
          '2 Adet Biyometrik Fotoğraf',
          'Seyahat Sigortası',
          'SGK İşe Giriş Bildirgesi ve Maaş Bordrosu',
          'İşveren Dilekçesi',
          'Banka Hesap Dökümü',
          'Otel ve Uçak Rezervasyonu',
        ]),
        applicationZones: JSON.stringify(['İstanbul (Romanya Konsolosluğu)', 'Ankara (Romanya Büyükelçiliği)']),
        processingTime: '5-10 İş Günü',
        description: 'Romanya ayrı ulusal vize uygulamaktadır.',
        embassyName: 'Romanya Büyükelçiliği Ankara',
        embassyAddress: 'Bükreş Sokak No: 4, Çankaya / Ankara',
        embassyPhone: '+90 (312) 467 34 69',
        embassyWeb: 'https://ankara.mae.ro',
      },
    ]
  },
  {
    slug: 'rusya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (En az 6 ay geçerli)',
          '2 Adet Fotoğraf (3x4 cm)',
          'Vize Başvuru Formu (Online doldurulacak)',
          'Turistik Davet/Voucher (Seyahat ACENTESINDEN)',
          'Seyahat Sigortası (Min. 30.000 USD)',
          'Uçak Rezervasyonu',
        ]),
        applicationZones: JSON.stringify(['İstanbul (Rusya Başkonsolosluğu)', 'Ankara (Rusya Büyükelçiliği)']),
        processingTime: '10-15 İş Günü',
        description: 'Rusya turistik vizesi için seyahat acentesi aracılığıyla düzenlenen Touron/Voucher belgesi zorunludur.',
        embassyName: 'Rusya Büyükelçiliği Ankara',
        embassyAddress: 'Karyağdı Sokak No: 5, Çankaya / Ankara',
        embassyPhone: '+90 (312) 439 21 22',
        embassyWeb: 'https://ankara.mid.ru',
        consulateName: 'Rusya Başkonsolosluğu İstanbul',
        consulateAddress: 'İstiklal Caddesi No: 443, Beyoğlu / İstanbul',
        consulatePhone: '+90 (212) 292 16 93',
      },
    ]
  },
  {
    slug: 'cin',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Pasaport (En az 6 ay geçerli, 2 boş sayfa)',
          '2 Adet Fotoğraf (33x48mm, beyaz arka plan)',
          'Vize Başvuru Formu (Online doldurulup çıktısı alınacak)',
          'Uçak Bilet Rezervasyonu (Gidiş-dönüş)',
          'Otel Rezervasyonu (Tüm konaklama boyunca)',
          'Maaş Bordrosu (Son 3 ay)',
          'Banka Hesap Dökümü (Son 3 ay)',
          'İşveren Yazısı',
        ]),
        applicationZones: JSON.stringify(['İstanbul (Çin Başkonsolosluğu)', 'Ankara (Çin Büyükelçiliği)']),
        processingTime: '4-7 İş Günü',
        description: 'Çin vizesi için online başvuru formu doldurulduktan sonra konsolosluğa şahsen ya da yetkilendirilmiş acente aracılığıyla teslim edilir.',
        embassyName: 'Çin Halk Cumhuriyeti Büyükelçiliği Ankara',
        embassyAddress: 'Gölgeli Sokak No: 10, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 436 09 06',
        embassyWeb: 'https://tr.china-embassy.gov.cn',
        consulateName: 'Çin Başkonsolosluğu İstanbul',
        consulateAddress: 'Maçka Caddesi No: 14, Şişli / İstanbul',
        consulatePhone: '+90 (212) 306 29 00',
      },
    ]
  },
  {
    slug: 'kanada',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Geçerli Pasaport',
          'Online Vize Başvurusu (IRCC – Canada.ca)',
          'Dijital Fotoğraf (Standarda uygun)',
          'Seyahat Geçmişi (Önceki Schengen veya ABD vizeleri güçlendirir)',
          'İşveren Yazısı ve Son 3-6 Aylık Maaş Bordrosu',
          'Son 3-6 Aylık Banka Hesap Dökümü',
          'Vergi Beyannamesi (Varsa)',
          'Uçak Rezervasyonu',
        ]),
        applicationZones: JSON.stringify(['Online Başvuru (IRCC)', 'İstanbul (VAC Biyometri Merkezi)']),
        processingTime: '4-8 Hafta',
        description: 'Kanada vizesi IRCC cloud sistemi üzerinden online yapılır. Ardından biyometri verilmesi gerekmektedir. İşlem süreleri yoğunluğa göre değişmektedir.',
        embassyName: 'Kanada Büyükelçiliği Ankara',
        embassyAddress: 'Cinnah Caddesi No: 58, Çankaya / Ankara',
        embassyPhone: '+90 (312) 409 27 00',
        embassyWeb: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
      },
    ]
  },
  {
    slug: 'avustralya',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Geçerli Pasaport',
          'Online Vize Başvurusu (immi.homeaffairs.gov.au)',
          'Dijital Fotoğraf',
          'Banka Hesap Dökümü (Son 3-6 ay)',
          'Maaş Bordrosu ve İşveren Yazısı',
          'Geçmiş Seyahat Bilgileri',
          'İngilizce Dilekçe (Turistik amaç açıklama)',
        ]),
        applicationZones: JSON.stringify(['Online Başvuru (ImmiAccount)', 'Ankara (Avustralya Büyükelçiliği biyometri)']),
        processingTime: '3-8 Hafta',
        description: 'Avustralya Visitor Visa (subclass 600) online başvurulur. Biyometri gerekmektedir.',
        embassyName: 'Avustralya Büyükelçiliği Ankara',
        embassyAddress: 'MNG Tower, Uğur Mumcu Caddesi No: 88 K: 7, Gazi Osman Paşa / Ankara',
        embassyPhone: '+90 (312) 459 95 00',
        embassyWeb: 'https://turkey.embassy.gov.au',
      },
    ]
  },
  {
    slug: 'yunanistan',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify(schengenEmployee),
        applicationZones: JSON.stringify(['İstanbul (VFS Global)', 'Ankara (VFS Global)', 'İzmir (VFS Global)']),
        processingTime: '5-10 İş Günü',
        description: 'Yunanistan Schengen vizesi. Sık gidilen bir destinasyon olduğundan randevu planlaması önemlidir.',
        embassyName: 'Yunanistan Büyükelçiliği Ankara',
        embassyAddress: 'Zia Gökalp Caddesi No: 9-11, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 448 04 65',
        embassyWeb: 'https://www.mfa.gr/ankara',
        consulateName: 'Yunanistan Başkonsolosluğu İstanbul',
        consulateAddress: 'Turnacıbaşı Sokak No: 32, Galatasaray / İstanbul',
        consulatePhone: '+90 (212) 516 50 11',
        pdf1Label: 'Yunanistan Vize Başvuru Formu',
        pdf1Url: 'https://vid.vizedunyasi.com/vize_formu/yunanistan-schengen-vize-basvuru-formu.pdf',
      },
    ]
  },
  {
    slug: 'amerika',
    visaInfos: [
      {
        purpose: 'Turizm',
        profession: 'Ücretli Çalışan',
        documentList: JSON.stringify([
          'Geçerli Pasaport (En az 6 ay geçerli)',
          'DS-160 Online Başvuru Formu',
          'Dijital Fotoğraf (DS-160 standardında)',
          'MRV Ücret Makbuzu',
          'Konsolosluk Randevusu',
          'İşveren Yazısı ve Maaş Bordrosu',
          'Banka Hesap Dökümü',
          'Taşınmaz Mal / Tapu Belgesi (Varsa)',
          'Aile Bağ Belgeleri (Eş ve çocukları için)',
        ]),
        applicationZones: JSON.stringify(['İstanbul (ABD Başkonsolosluğu)', 'Ankara (ABD Büyükelçiliği)']),
        processingTime: '2-8 Hafta (Randevuya göre değişir)',
        description: 'ABD B1/B2 turistik/iş vizesi. DS-160 formu online doldurulduktan sonra konsolosluk mülakat randevusu alınır.',
        embassyName: 'ABD Büyükelçiliği Ankara',
        embassyAddress: 'Atatürk Bulvarı No: 110, Kavaklıdere / Ankara',
        embassyPhone: '+90 (312) 455 55 55',
        embassyWeb: 'https://tr.usembassy.gov',
        consulateName: 'ABD Başkonsolosluğu İstanbul',
        consulateAddress: 'İstinye Mahallesi, Kaplamaçı Sokak No: 2, İstinye / İstanbul',
        consulatePhone: '+90 (212) 335 90 00',
      },
    ]
  },
]

async function main() {
  console.log('🌍 30 ülke için vize bilgileri yükleniyor...')
  
  for (const c of countries) {
    const country = await prisma.country.findUnique({ where: { slug: c.slug } })
    if (!country) {
      console.log(`⚠️ Ülke bulunamadı: ${c.slug}`)
      continue
    }
    
    for (const vi of c.visaInfos) {
      await prisma.visaInfo.deleteMany({
        where: {
          countryId: country.id,
          purpose: vi.purpose,
          profession: vi.profession ?? 'Genel',
        }
      })
      await prisma.visaInfo.create({
        data: {
          countryId: country.id,
          ...vi,
        } as any,
      })
    }
    
    console.log(`✅ ${country.name} vize bilgileri eklendi`)
  }
  
  console.log('🎉 Tüm vize bilgileri başarıyla yüklendi!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
