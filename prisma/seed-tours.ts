import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const toursData = [
  {
    order: 1,
    title: 'Bansko Kayak Turu',
    slug: 'bansko-kayak-turu-3g',
    subtitle: '3 Gece Konaklama — 2027 Sömestre Özel',
    destination: 'Bulgaristan',
    duration: '3 Gece 5 Gün',
    startingPrice: '169 €',
    imageUrl: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/001-bansko-kayak-turu-3g.pdf',
    summaryBadges: [
      'Lüks Araçlarla Ulaşım (2024/2026 Model)',
      'Yeşil Pasaporta Vize Yok',
      '0-12 Yaş Ücretsiz Çocuk İmkanı'
    ],
    itinerary: [
      {
        day: '1. Gün',
        title: 'İstanbul – Bansko',
        description: "Turumuz akşam saat 22:00'de Kadıköy Evlendirme Dairesi önü, 22:30'da Mecidiyeköy Meydan (Bambi Cafe Önü) ve 23:00'de İncirli Ömür Plaza önü, 23:30'da Beylikdüzü Marmara Park AVM önü, 23:59 Silivri Vega AVM (Eski Kipa) önünde, 00:30 Edirne Otobanı Çorlu Dinlenme Tesisleri Shell Petrol'de, 01:30 Edirne Otobanı Babaeski Dinlenme tesisleri Opet Petrol'de, 03:00 Edirne Otogar Kavşağında, 03:15 Kapıkule Sınır Kapısı buluşarak başlıyor. Pasaport-Gümrük işlemlerinin ardından Bulgaristan'a geçiyor, Bansko'ya doğru hareket ediyoruz. Yaklaşık 4 saat boyunca yolculuğumuz devam ediyor."
      },
      {
        day: '2. Gün',
        title: 'Bansko',
        description: "Sabah saatlerinde Bansko'ya varış ardından kolay, orta ve zor derecelerinde toplam 85 km uzunluğa sahip, Kış Olimpiyatları için onay almış, Dünya Şampiyonu Alberto Tomba'nın kayak yaptığı ve Tomba pisti olarak anılan 2600 metreden başlayan pistler sizleri bekliyor. Bütün gün bu pistlerde kayak yapmanın zevkini yaşayacaksınız. Arzu eden misafirlerimiz kayak yapmanın dışında Bansko kasabasının tarihi ve doğal güzelliklerinden faydalanabilirler. Gece dileyenler Bansko şehrinin canlı gece hayatında eğlenebilirler.\n*Not: Uluslararası kurallar gereği odalara yerleşme saat 14:00'den sonra olmaktadır. Rehberimiz odalara giriş saati ile ilgili sizlere detaylı bilgi veriyor olacak."
      },
      {
        day: '3. Gün',
        title: 'Bansko',
        description: "Sabah kahvaltı ardından kolay, orta ve zor derecelerinde toplamda 85 km uzunluğa sahip, Kış Olimpiyatları için onay almış, Dünya Şampiyonu Alberto Tomba'nın kayak yaptığı ve Tomba pisti olarak anılan 2600 metreden başlayan pistler sizleri bekliyor. Bütün gün bu pistlerde kayak yapmanın zevkini yaşayacaksınız. Arzu eden misafirlerimiz kayak yapmanın dışında Bansko kasabasının tarihi ve doğal güzelliklerinden faydalanabilirler. Dileyen misafirlerimiz ekstra olarak düzenlenecek olan Termal Açık Hava Havuzu Turuna katılabilirler (40 €). Geceleme otelinizde. Gece dileyenler Bansko şehrinin canlı gece hayatında eğlenebilirler."
      },
      {
        day: '4. Gün',
        title: 'Bansko (Ekstra Sofya Turu)',
        description: "Sabah kahvaltı ardından kolay, orta ve zor derecelerinde toplamda 85 km uzunluğa sahip pistlerde kayak yapmanın zevkini yaşayacaksınız. Dileyen misafirlerimiz ekstra olarak düzenlenecek olan günübirlik Sofya Turuna katılabilirler (75 €). Panoramik Sofya şehir turumuz esnasında görülecek yerler arasında; Balkanların en büyük kilisesi olan Aleksander Nevski Katedrali, Milli Kütüphane, Sofya Üniversitesi, Eski Kraliyet Sarayı, Neo klasik stilinde yapılmış olan Milli Bulgar Tiyatrosu, Arkeoloji Müzesi, Eski Sofya - Serdika şehri, Rotonda Kilisesi bulunmaktadır. Daha sonra meclis binasının yanından yürüyerek Sofya Heykeli'ne panoramik bakış ve şehrin simgesi olan Banya Başı Camisini ziyaret ediyoruz. Ziyaretimiz ardından serbest zaman ve alışveriş için Jumbo Mağazası & Metro Market'te alışveriş molası veriyoruz. Akşam Bansko'ya dönüş. Geceleme otelinizde."
      },
      {
        day: '5. Gün',
        title: 'Bansko – İstanbul',
        description: "Sabah kahvaltı sonrası, odaların boşaltılması ardından rehberimizin bildireceği saatte İstanbul'a hareket. Velingrad ve Pazarcık üzerinden yaklaşık 4 saatlik yolculukla Sınır kapısına devam ediyoruz. Pasaport-Gümrük işlemlerinin ardından yaklaşık 3 saatlik yolculuk ile İstanbul'a varış ve turumuzun sonu."
      }
    ],
    pricingPackages: [
      {
        hotelName: '3* Lina Hotel',
        board: 'Oda Kahvaltı',
        details: "Bansko Merkez'de Gondol'a 1,7 Km uzaklıkta, çarşı merkezine 500mt sıcak, temiz ve şirin aile oteli. Ücretsiz Wi-Fi. Gondol'a ücretli servis (Kişi Başı Günlük 5 € / 3 Günlük 10 €).",
        doublePrice: '169 €',
        singlePrice: '259 €',
        child1Price: '119 € (3-12 Yaş 1. Çocuk)',
        child2Price: 'Mümkün Değil',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Sömestre'
      },
      {
        hotelName: '4* Royal Park SPA Hotel',
        board: 'Oda Kahvaltı',
        details: "Bansko'nun güneyinde oteller bölgesinde, Gondol'a 1,4 Km uzaklıkta, SPA hizmetlerinin sunulduğu sıcak ve temiz modern otel. Ücretsiz Wi-Fi, Jakuzi, Sauna ve Buhar Odası Kullanımı. Gondol'a ücretsiz servis.",
        doublePrice: '289 €',
        singlePrice: '389 €',
        child1Price: 'ÜCRETSİZ (3-12 Yaş 1. Çocuk)',
        child2Price: '159 € (3-12 Yaş 2. Çocuk)',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Sömestre'
      },
      {
        hotelName: '4* Royal Park SPA Hotel',
        board: 'Yarım Pansiyon Plus+',
        details: "Bansko'nun güneyinde oteller bölgesinde, Gondol'a 1,4 Km uzaklıkta. Akşam yemeği ve yemek yanında alınan Limitsiz İçecek ve Şarap ücrete dâhildir. Ücretsiz Wi-Fi, Jakuzi, Sauna ve Buhar Odası Kullanımı. Gondol'a ücretsiz servis.",
        doublePrice: '389 €',
        singlePrice: '479 €',
        child1Price: 'ÜCRETSİZ (3-12 Yaş 1. Çocuk)',
        child2Price: '259 € (3-12 Yaş 2. Çocuk)',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Sömestre'
      }
    ],
    includedServices: [
      'Lüks araçlarla ulaşım',
      'Seçilen Otelde 3 Gece konaklama',
      'Türkçe rehberlik ve danışmanlık hizmeti',
      'Kayak Kiralamada geçerli dijital indirim kartı',
      'Mali Mesuliyet Sigortası'
    ],
    excludedServices: [
      'Seyahat & Sağlık Sigortası (15 €)',
      'Yurtdışı çıkış Harcı',
      'Extra turlar ve kişisel harcamalar',
      'Skipass ve Kayak Kiralama',
      'Rehber / Şoför / Otel Bahşişleri (10 € Oda Başı)'
    ],
    departureDates: [
      '22 Ocak 2027',
      '25 Ocak 2027',
      '28 Ocak 2027',
      '31 Ocak 2027',
      '3 Şubat 2027'
    ],
    specialDates: [],
    extraPackage: null,
    notes: [
      'Programımız kesin hareketlidir.',
      'Hava ve yol koşullarına göre hareket saatlerinde değişiklik yapma hakkımız saklıdır!',
      'Bu tur için; geçerli bir Schengen Vizesi gerekmektedir.'
    ]
  },
  {
    order: 2,
    title: 'Selanik & Kavala & İskeçe Turu',
    slug: 'selanik-kavala-iskece-turu-1g',
    subtitle: 'Selanik + Kavala + İskeçe + Gümülcine (1 Gece Konaklama)',
    destination: 'Yunanistan',
    duration: '1 Gece 3 Gün',
    startingPrice: '129 €',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/002-selanik-kavala-iskece-turu-1g.pdf',
    summaryBadges: [
      'Lüks Otobüslerle Ulaşım',
      'Gizlenmiş Mecburi Ücret Yok',
      'Yeşil Pasaporta Vize Yok'
    ],
    itinerary: [
      {
        day: '1. Gün',
        title: 'İstanbul – Selanik',
        description: "Akşam saat 21:00'de Kadıköy Evlendirme Dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM, 23:30'da Çorlu Kavşağı Aytemiz Petrol, 00:30'da Tekirdağ Namık Kemal Yay Tesisleri, 02:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        day: '2. Gün',
        title: 'Selanik',
        description: "Sabah saatlerinde Selanik'e varışımıza müteakip, Lidl Market'te 1 Saatlik alışveriş molası sonrasında yapacağımız Selanik panoramik şehir gezimizde, Selanik'in en önemli kilisesi olan Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'de düzenlenecek One Salonica Outlet Mall & Jumbo Mağazası Alışveriş Turuna katılabilir (20 €). Dileyen misafirlerimiz akşam saat 20:00'de düzenlenecek Panoramik Selanik Şaheserleri Gece Turuna katılabilir (15 €). Dileyen misafirlerimiz Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Her iki programda otele dönüş için hareket saat 23:00'te. Geceleme Selanik'teki otelimizde."
      },
      {
        day: '3. Gün',
        title: 'Selanik – Kavala – İskeçe – Gümülcine – İstanbul',
        description: "Sabah kahvaltı ardından Kavala'ya hareket ediyoruz. Kavala panoramik şehir turu; İmarethane, Su Kemerleri, Kavala Kalesi, Belediye Binası, Kavala çarşısı, Kordon otobüsten panoramik olarak görülecek yerler arasındadır. 1 Saatlik serbest zaman ardından, Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyoruz. Sonrasında yine Türklerin yoğun olarak yaşadığı Komotini (Gümülcine) şehrini panoramik olarak otobüsten görerek, İpsala sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Yunan Freeshop'unda alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu."
      }
    ],
    pricingPackages: [
      {
        hotelName: '4* Panorama Hotel V.B',
        board: 'Oda Kahvaltı',
        details: 'Selanik 4* Panorama Hotel V.B otellerde 1 gece Oda/Kahvaltı konaklama.',
        doublePrice: '129 €',
        singlePrice: '209 €',
        child1Price: '100 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Dönemi'
      }
    ],
    includedServices: [
      '2024 Model ve üzeri lüks otobüslerle ulaşım',
      'Selanik, Kavala, İskeçe panoramik gezileri',
      'Selanik 4* Panorama Hotel V.B otellerde Oda/Kahvaltı konaklama',
      'Zorunlu Mali Mesuliyet Sigortası',
      'Türkçe rehberlik hizmeti'
    ],
    excludedServices: [
      'Seyahat Sağlık Sigortası',
      'Schengen Vizesi',
      'Yurtdışı çıkış Pulu',
      'Extra turlar ve kişisel harcamalar',
      'Şoför ve rehber bahşişleri (5 € Kişi Başı)'
    ],
    departureDates: [
      '1 Ocak 2027 Cuma', '8 Ocak 2027 Cuma', '15 Ocak 2027 Cuma', '22 Ocak 2027 Cuma', '29 Ocak 2027 Cuma',
      '5 Şubat 2027 Cuma', '12 Şubat 2027 Cuma', '19 Şubat 2027 Cuma', '26 Şubat 2027 Cuma',
      '5 Mart 2027 Cuma', '12 Mart 2027 Cuma', '19 Mart 2027 Cuma', '26 Mart 2027 Cuma',
      '2 Nisan 2027 Cuma', '9 Nisan 2027 Cuma', '16 Nisan 2027 Cuma', '23 Nisan 2027 Cuma', '30 Nisan 2027 Cuma',
      '7 Mayıs 2027 Cuma', '14 Mayıs 2027 Cuma', '21 Mayıs 2027 Cuma', '28 Mayıs 2027 Cuma',
      '4 Haziran 2027 Cuma', '11 Haziran 2027 Cuma', '18 Haziran 2027 Cuma', '25 Haziran 2027 Cuma',
      '10 Eylül 2027 Cuma', '17 Eylül 2027 Cuma', '24 Eylül 2027 Cuma',
      '1 Ekim 2027 Cuma', '8 Ekim 2027 Cuma', '15 Ekim 2027 Cuma', '22 Ekim 2027 Cuma', '29 Ekim 2027 Cuma',
      '5 Kasım 2027 Cuma', '12 Kasım 2027 Cuma', '19 Kasım 2027 Cuma', '26 Kasım 2027 Cuma',
      '3 Aralık 2027 Cuma', '10 Aralık 2027 Cuma', '17 Aralık 2027 Cuma'
    ],
    specialDates: [],
    extraPackage: null,
    notes: [
      'Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.',
      'Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.',
      'Bu tur için geçerli bir Schengen vizesi gerekmektedir.',
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      'Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Isuzu Nova – Turkuaz / Iveco Eurobus Midibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir.'
    ]
  },
  {
    order: 3,
    title: 'Eko-Promo Selanik & İskeçe Turu',
    slug: 'eko-promo-selanik-iskece-turu-1g',
    subtitle: 'Selanik + İskeçe (Lidl Market Alışverişi Dahil)',
    destination: 'Yunanistan',
    duration: '1 Gece 3 Gün',
    startingPrice: '79 €',
    imageUrl: 'https://images.unsplash.com/photo-1503152394-c571994fd383?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/003-eko-promo-selanik-iskece-turu-1g.pdf',
    summaryBadges: [
      'Otobüslerle Ulaşım',
      'Yeşil Pasaporta Vize Yok',
      'Lidl Market Alışverişi Dahil'
    ],
    itinerary: [
      {
        day: '1. Gün',
        title: 'İstanbul – Selanik',
        description: "Akşam saat 21:00'de Kadıköy evlendirme dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM, 23:30'da Çorlu Kavşağı Aytemiz Petrol, 00:30'da Tekirdağ Namık Kemal Yay Tesisleri, 02:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        day: '2. Gün',
        title: 'Selanik',
        description: "Sabah saatlerinde Selanik'e varışımıza müteakip, Lidl Market'te 1 Saatlik alışveriş molası sonrasında otobüsten yapacağımız Selanik panoramik şehir gezimizde, Yunanistan'ın en büyük Kilisesi olan Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyor ve Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'de düzenlenecek One Salonica Outlet Mall & Jumbo Mağazası Alışveriş Turuna katılabilir (20 €). Sonrasında otelimize geçiyoruz. Dileyen misafirlerimiz akşam Saat 20:00'de düzenlenecek Panoramik Selanik Şaheserleri Gece Turuna katılabilir (15 €). Dileyen misafirlerimiz ayrıca Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Geceleme Selanik'teki otelimizde."
      },
      {
        day: '3. Gün',
        title: 'Selanik – İskeçe – İstanbul',
        description: "Sabah kahvaltı ardından İstanbul'a doğru hareket ediyoruz. Güzergahımız üzerinde bulunan Iokmanidis Kurabiye Fabrikasında kısa bir mola ardından Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan Xanthi (İskeçe)'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyoruz. Sonrasında İpsala sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Yunan Freeshop'unda alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu."
      }
    ],
    pricingPackages: [
      {
        hotelName: '3* Assembly Hotel V.B',
        board: 'Oda Kahvaltı',
        details: 'Selanik 3* Assembly Hotel V.B otellerde 1 gece Oda/Kahvaltı konaklama.',
        doublePrice: '79 €',
        singlePrice: '179 €',
        child1Price: '69 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Dönemi'
      },
      {
        hotelName: '5* Eona Resort Hotel V.B',
        board: 'Oda Kahvaltı',
        details: "Selanik 5* Eona Resort Hotel V.B'de 1 gece Oda/Kahvaltı konaklama.",
        doublePrice: '129 €',
        singlePrice: '209 €',
        child1Price: '99 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Dönemi'
      }
    ],
    includedServices: [
      '2024 Model ve üzeri lüks araçlarla ulaşım',
      'Selanik ve İskeçe panoramik gezileri',
      "Selanik 3* Assembly Hotel V.B veya 5* Eona Resort Hotel'de Oda/Kahvaltı konaklama",
      'Zorunlu Mali Mesuliyet Sigortası',
      'Türkçe rehberlik hizmeti'
    ],
    excludedServices: [
      'Seyahat Sağlık Sigortası',
      'Schengen Vizesi',
      'Yurtdışı çıkış Harcı',
      'Extra turlar ve kişisel harcamalar',
      'Zorunlu şoför/rehber/otel bahşişi (5 € Kişi Başı)'
    ],
    departureDates: [
      '1 Ocak 2027 Cuma', '8 Ocak 2027 Cuma', '15 Ocak 2027 Cuma', '22 Ocak 2027 Cuma', '29 Ocak 2027 Cuma',
      '5 Şubat 2027 Cuma', '12 Şubat 2027 Cuma', '19 Şubat 2027 Cuma', '26 Şubat 2027 Cuma',
      '5 Mart 2027 Cuma', '12 Mart 2027 Cuma', '19 Mart 2027 Cuma', '26 Mart 2027 Cuma',
      '2 Nisan 2027 Cuma', '9 Nisan 2027 Cuma', '16 Nisan 2027 Cuma', '23 Nisan 2027 Cuma', '30 Nisan 2027 Cuma',
      '7 Mayıs 2027 Cuma', '14 Mayıs 2027 Cuma', '21 Mayıs 2027 Cuma', '28 Mayıs 2027 Cuma',
      '4 Haziran 2027 Cuma', '11 Haziran 2027 Cuma', '18 Haziran 2027 Cuma', '25 Haziran 2027 Cuma',
      '10 Eylül 2027 Cuma', '17 Eylül 2027 Cuma', '24 Eylül 2027 Cuma',
      '1 Ekim 2027 Cuma', '8 Ekim 2027 Cuma', '15 Ekim 2027 Cuma', '22 Ekim 2027 Cuma', '29 Ekim 2027 Cuma',
      '5 Kasım 2027 Cuma', '12 Kasım 2027 Cuma', '19 Kasım 2027 Cuma', '26 Kasım 2027 Cuma',
      '3 Aralık 2027 Cuma', '10 Aralık 2027 Cuma', '17 Aralık 2027 Cuma'
    ],
    specialDates: [],
    extraPackage: null,
    notes: [
      'Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.',
      'Bu tur için geçerli bir Schengen vizesi gerekmektedir.',
      'Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.',
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      'Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Isuzu Nova – Turkuaz / Iveco Eurobus Midibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir.'
    ]
  },
  {
    order: 4,
    title: 'Alexandroupolis (Dedeağaç) Hafta Sonu Kaçamağı',
    slug: 'alexandroupolis-turu-1g',
    subtitle: 'Dedeağaç – Porto Lagos – İskeçe – Gümülcine (5* Astir Palace Hotel)',
    destination: 'Yunanistan',
    duration: '1 Gece 2 Gün',
    startingPrice: '179 €',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/004-alexandroupolis-turu-1g.pdf',
    summaryBadges: [
      'Lüks Araçlarla Ulaşım',
      'Gizlenmiş Mecburi Ücret Yok',
      'Yeşil Pasaporta Vize Yok'
    ],
    itinerary: [
      {
        day: '1. Gün – Cumartesi',
        title: 'İstanbul – Alexandroupolis (Dedeağaç)',
        description: "Sabah saat 03:00'de Kadıköy Evlendirme Dairesi, saat 03:15'de Mecidiyeköy Meydan/Bambi Cafe önü, saat 03:30'da İncirli Ömür Plaza önü, 03:45'de Beylikdüzü Marmara Park AVM önü, 04:00'de Silivri Vega AVM önü, 04:30'da Çorlu Kavşağı Aytemiz Petrol, 05:15'de Tekirdağ Namık Kemal Yay Tesisleri, 07:00'de Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. İpsala'ya varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, yarım saatlik bir yolculukla Alexandroupolis'e varıyoruz. Varışımızda dileyen misafirlerimiz Ekstra olarak düzenlenecek Skalaventis Market (45dk) & Lidl Market (45dk) & Jumbo Mağazası (1,5 Saat) Alışveriş turuna katılabilirler (10 €). Dedeağaç'ın keyfini çıkarmak üzere merkezde vereceğimiz serbest zaman sonrasında 15:00'de otele gidiyoruz. Şehir merkezinde bulunan otelimizde Alexandroupolis ve otelin keyfini çıkartmak için serbest zaman. Geceleme Alexandroupolis'te."
      },
      {
        day: '2. Gün – Pazar',
        title: 'Alexandroupolis – Porto Lagos – Xanthi – Komotini',
        description: "Sabah 10:30'a dek devam eden keyifli bir Pazar kahvaltısı ile güne başlıyoruz. Dileyen misafirlerimiz Ekstra olarak düzenlenecek BATI TRAKYA turuna katılabilirler (35 €). Tura katılacak misafirlerimizle sabah kahvaltı ardından 09:30'da odaları boşaltıyor ve yaklaşık 1 saatlik yolculukla, bir tarafı deniz, bir tarafı göl ve ormandan oluşan büyüleyici Porto Lagos ile tura başlıyoruz. Burada Agios Nikolas kilisesini görüp vereceğimiz fotoğraf molası ardından Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra serbest zaman veriyoruz. Sonrasında Komotini (Gümülcine) şehrinden geçerek, otobüsten panoramik olarak görüp, otelde kalan misafirlerimizi de alarak İpsala sınır kapısına doğru yola koyuluyoruz. Yunan Freeshop'unda alışveriş imkânı ardından İstanbul'a varış."
      }
    ],
    pricingPackages: [
      {
        hotelName: '5* Astir Palace Hotel (V.B)',
        board: 'Oda Kahvaltı',
        details: '5* Astir Palace Hotel (V.B) tesiste 1 gece oda kahvaltı konaklama.',
        doublePrice: '179 €',
        singlePrice: '249 €',
        child1Price: '129 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Cumartesi Hareketli'
      }
    ],
    includedServices: [
      '2024 Model ve üzeri lüks araçlarla ulaşım',
      '5* Astir Palace Hotel (V.B) tesiste 1 gece oda kahvaltı konaklama',
      'Programda belirtilen transfer ve şehir turları',
      'Mali mesuliyet sigortası',
      'Türkçe rehberlik hizmeti'
    ],
    excludedServices: [
      'Seyahat & Sağlık Sigortası',
      'Schengen Vizesi',
      'Yurtdışı çıkış Pulu',
      'Extra turlar ve kişisel harcamalar',
      'SPA hizmetleri kullanımı',
      'Şoför ve rehber bahşişleri (5 € Kişi Başı)'
    ],
    departureDates: [
      '9 Ocak 2027 Cumartesi', '16 Ocak 2027 Cumartesi', '23 Ocak 2027 Cumartesi', '30 Ocak 2027 Cumartesi',
      '6 Şubat 2027 Cumartesi', '13 Şubat 2027 Cumartesi', '20 Şubat 2027 Cumartesi', '27 Şubat 2027 Cumartesi',
      '6 Mart 2027 Cumartesi', '13 Mart 2027 Cumartesi', '20 Mart 2027 Cumartesi', '27 Mart 2027 Cumartesi',
      '3 Nisan 2027 Cumartesi', '10 Nisan 2027 Cumartesi', '17 Nisan 2027 Cumartesi', '24 Nisan 2027 Cumartesi',
      '1 Mayıs 2027 Cumartesi', '8 Mayıs 2027 Cumartesi', '15 Mayıs 2027 Cumartesi', '22 Mayıs 2027 Cumartesi', '29 Mayıs 2027 Cumartesi',
      '5 Haziran 2027 Cumartesi', '12 Haziran 2027 Cumartesi', '19 Haziran 2027 Cumartesi', '26 Haziran 2027 Cumartesi',
      '2 Ekim 2027 Cumartesi', '9 Ekim 2027 Cumartesi', '16 Ekim 2027 Cumartesi', '23 Ekim 2027 Cumartesi', '30 Ekim 2027 Cumartesi',
      '6 Kasım 2027 Cumartesi', '13 Kasım 2027 Cumartesi', '20 Kasım 2027 Cumartesi', '27 Kasım 2027 Cumartesi',
      '4 Aralık 2027 Cumartesi', '11 Aralık 2027 Cumartesi', '18 Aralık 2027 Cumartesi'
    ],
    specialDates: [],
    extraPackage: null,
    notes: [
      'Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.',
      'Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.',
      'Bu tur için geçerli bir Schengen vizesi gerekmektedir.',
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      'Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Isuzu Nova – Turkuaz / Iveco Eurobus Midibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir.'
    ]
  },
  {
    order: 5,
    title: 'Ekspres Yunanistan Turu',
    slug: 'ekspres-yunanistan-turu-3g',
    subtitle: 'Atina (2) & Kalambaka/Meteora & Pire & Naflion & Korint Kanalı & Selanik (1) & Kavala & İskeçe',
    destination: 'Yunanistan',
    duration: '3 Gece 5 Gün',
    startingPrice: '299 €',
    imageUrl: 'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/005-ekspres-yunanistan-turu-3g.pdf',
    summaryBadges: [
      'Lüks Otobüslerle Ulaşım',
      'Gizlenmiş Mecburi Ücret Yok',
      'Yeşil Pasaporta Vize Yok'
    ],
    itinerary: [
      {
        day: '1. Gün',
        title: 'İstanbul – Atina',
        description: "Akşam saat 20:00'de Kadıköy evlendirme dairesi, saat 20:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM, 22:30 Çorlu Kavşağı Aytemiz Petrol (Melih Öge) önü, 23:00 Tekirdağ Namık Kemal Yay Tesisleri, 00:30'da Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Atina'ya yol alıyoruz."
      },
      {
        day: '2. Gün',
        title: 'Atina (Meteora)',
        description: "Sabah saatlerinde yol üzerinde, ekstra olarak düzenlenen Kalambaka – Meteora'yı ziyaret ediyoruz (65 €). Meteora, 'boşlukta asılı kalan' anlamına gelir. Burada dik kayalar üzerine kurulmuş Manastırları görüyor ve Vlaram Manastırını birlikte ziyaret ederek manastırların oluşumu ve manastır hayatıyla ilgili bilgiler alıyoruz (Manastır giriş bileti ekstra tur ücretine dahildir!). Kısa bir öğlen yemeği molası ardından Atina'ya hareket ediyoruz. Otobüsten panoramik olarak Pire limanını gezdikten sonra otelimize giriş yapıyoruz. Geceleme Atina'daki otelimizde."
      },
      {
        day: '3. Gün',
        title: 'Atina (Akropolis & Monastraki Meydanı) / (Korint Kanalı & Naphlion)',
        description: "Sabah kahvaltı ardından 08:00'de başlayarak yerel rehberimiz eşliğinde yapacağımız panoramik şehir gezimizde; Panathenaic Antik Olimpiyat Stadyumu, Zeus Tapınağı, Parlamento Binası, Cumhurbaşkanlığı Sarayı, Başbakanlık Konutu, Panepistimiou Bulvarları, Ulusal Kütüphane ve Akademi Üniversitesi ile Omonia ve Syntagma Meydanları panoramik olarak otobüsten görülecek yerler arasındadır. Dileyen misafirlerimiz ekstra olarak düzenlenecek Atina Akropolis & Monastraki Meydanı Turuna katılabilirler (75 € / Giriş Biletleri Dahil!). Öğleden sonra dileyen misafirlerimiz ekstra olarak düzenlenecek Korint Kanalı & Naphlion turuna katılabilirler (75 €). Akşam dileyen misafirlerimiz saat 20:30'da başlayacak Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Geceleme Atina'daki otelimizde."
      },
      {
        day: '4. Gün',
        title: 'Atina – Selanik',
        description: "Kahvaltı ardından Selanik'e yol alıyoruz. Öğlen saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde; Aya Dimitros Kilisesi, Atatürk'ün doğduğu ve yaşadığı ev, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını görüyoruz. Kordon Boyunda yürüyüş yapıp Aristoteles Meydanında serbest zaman veriyoruz. Bu esnada dileyen misafirlerimiz saat 16:30'da düzenlenecek One Salonica Outlet Mall AVM (1,5 Saat) & Jumbo Mağazası (1 Saat) Alışveriş Turuna katılabilir (20 €). Geceleme Selanik'teki otelimizde."
      },
      {
        day: '5. Gün',
        title: 'Selanik – Kavala – İskeçe – Gümülcine – Dedeağaç – İstanbul',
        description: "Sabah kahvaltı ardından Kavala'ya hareket ediyoruz. Kavala panoramik şehir turu; İmarethane, Su Kemerleri, Kavala Kalesi, Belediye Binası, Kavala çarşısı, Kordon görülecek yerler arasındadır. 1 Saatlik serbest zaman ardından Xanthi (İskeçe)'ye hareket ediyoruz. Eski çarşıda panoramik yürüyüş turu ve 1,5 saat serbest zaman veriyoruz. Xanthi çıkışında Lidl Market'te (45 dk) alışveriş molası ardından İpsala sınır kapısına geçiyoruz. Freeshop alışveriş imkânı ardından İstanbul'a varış ve turumuzun sonu."
      }
    ],
    pricingPackages: [
      {
        hotelName: 'Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B',
        board: 'Oda Kahvaltı (3 Gece)',
        details: 'Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.',
        doublePrice: '299 €',
        singlePrice: '499 €',
        child1Price: '199 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Normal Dönem'
      },
      {
        hotelName: 'Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B',
        board: 'Oda Kahvaltı (3 Gece)',
        details: 'Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.',
        doublePrice: '399 €',
        singlePrice: '549 €',
        child1Price: '199 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Normal Dönem'
      },
      {
        hotelName: 'Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B (Özel Günler)',
        board: 'Oda Kahvaltı (3 Gece)',
        details: 'Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.',
        doublePrice: '399 €',
        singlePrice: '549 €',
        child1Price: '199 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Özel Dönem / Bayram'
      },
      {
        hotelName: 'Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B (Özel Günler)',
        board: 'Oda Kahvaltı (3 Gece)',
        details: 'Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.',
        doublePrice: '499 €',
        singlePrice: '599 €',
        child1Price: '199 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Özel Dönem / Bayram'
      }
    ],
    includedServices: [
      '2024 Model ve üzeri Lüks otobüslerle ulaşım',
      'Atina, Selanik, Kavala, İskeçe panoramik gezileri',
      'Atina (2), Selanik (1) toplam 3 Gece 4*/5* otellerde Oda/Kahvaltı konaklama',
      'Zorunlu mali mesuliyet sigortası',
      'Türkçe rehberlik hizmeti'
    ],
    excludedServices: [
      'Seyahat sağlık sigortası',
      'Schengen vizesi',
      'Yurtdışı çıkış pulu',
      'Extra turlar ve kişisel harcamalar',
      'Şoför ve rehber bahşişleri (5 € Kişi Başı)'
    ],
    departureDates: [
      '22 Ocak 2027 Cuma', '29 Ocak 2027 Cuma',
      '5 Şubat 2027 Cuma', '12 Şubat 2027 Cuma', '19 Şubat 2027 Cuma', '26 Şubat 2027 Cuma',
      '19 Mart 2027 Cuma', '26 Mart 2027 Cuma',
      '2 Nisan 2027 Cuma', '9 Nisan 2027 Cuma',
      '4 Haziran 2027 Cuma', '11 Haziran 2027 Cuma', '18 Haziran 2027 Cuma', '25 Haziran 2027 Cuma',
      '2 Temmuz 2027 Cuma', '9 Temmuz 2027 Cuma', '16 Temmuz 2027 Cuma', '23 Temmuz 2027 Cuma', '30 Temmuz 2027 Cuma',
      '6 Ağustos 2027 Cuma', '13 Ağustos 2027 Cuma', '20 Ağustos 2027 Cuma', '27 Ağustos 2027 Cuma',
      '3 Eylül 2027 Cuma', '10 Eylül 2027 Cuma', '17 Eylül 2027 Cuma', '24 Eylül 2027 Cuma',
      '1 Ekim 2027 Cuma', '8 Ekim 2027 Cuma', '15 Ekim 2027 Cuma', '22 Ekim 2027 Cuma',
      '5 Kasım 2027 Cuma', '12 Kasım 2027 Cuma', '19 Kasım 2027 Cuma', '26 Kasım 2027 Cuma',
      '3 Aralık 2027 Cuma', '10 Aralık 2027 Cuma', '17 Aralık 2027 Cuma', '24 Aralık 2027 Cuma'
    ],
    specialDates: [
      '8 Mart 2027 Pazartesi (Ramazan Bayramı)',
      '22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)',
      '15 Mayıs 2027 Cumartesi (Kurban Bayramı)',
      '28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)',
      '29 Aralık 2027 Çarşamba (Yılbaşı)'
    ],
    extraPackage: 'Avantajlı Ekstra Tur Paketi: Kalambaka – Meteora + Akropolis Turu + Korint Kanalı & Naphlion & Monastraki Meydanı Turu + Canlı müzikli, eğlenceli Taverna & Sirtaki programı + Mega Outlet ve Jumbo Mağazası Alışveriş Turu — 310 € yerine 290 €',
    notes: [
      'Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.',
      'Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.',
      'Bu tur için geçerli bir Schengen vizesi gerekmektedir.',
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      'Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir.'
    ]
  },
  {
    order: 6,
    title: 'Sofya & Plovdiv Turu',
    slug: 'sofya-plovdiv-turu-1g',
    subtitle: 'Hafta Sonu Kaçamağı | SPA & Casino & Taverna (1 Gece 4* Ramada Plaza Sofia)',
    destination: 'Bulgaristan',
    duration: '1 Gece 3 Gün',
    startingPrice: '119 €',
    imageUrl: 'https://images.unsplash.com/photo-1563284223-333497472e88?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/006-sofya-plovdiv-turu-1g.pdf',
    summaryBadges: [
      'Lüks Otobüslerle Ulaşım',
      'Gizlenmiş Mecburi Ücret Yok',
      'Yeşil Pasaporta Vize Yok'
    ],
    itinerary: [
      {
        day: '1. Gün',
        title: 'İstanbul – Sofya',
        description: "Turumuz akşam saat 21:00'de Kadıköy Evlendirme Dairesi önü, 21:30'da Mecidiyeköy Meydan (Bambi Cafe Önü) ve 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM (Eski Kipa) önünde, 23:30'da Edirne Otobanı Çorlu Dinlenme Tesisleri Shell Petrol'de, 00:30'da Edirne Otobanı Babaeski Dinlenme tesisleri Opet Petrol'de, 02:00 Edirne Otogar Kavşağında, 02:15 Kapıkule Sınır Kapısı buluşarak başlıyor. Pasaport-Gümrük işlemlerinin ardından Bulgaristan'a geçiyor, Sofya'ya doğru hareket ediyoruz."
      },
      {
        day: '2. Gün',
        title: 'Sofya',
        description: "Sabah saatlerinde Sofya'ya varışımıza müteakip yapacağımız Sofya panoramik şehir turunda; St. Nedelya Kilisesi, Rotunda Kilisesi, Rus Kilisesi, Aya Sofya Kilisesi, Aleksandır Nevski Katedrali, Başbakanlık ve Parlamento binaları ile Sofya Üniversitesi ve Ulusal Kültür Sarayı ve Mimar Sinan tarafından tasarlanan Banyabaşı Camii, Serdika (Hoşgörü) Meydanı görülecek yerler arasındadır. Saat 14:30'a kadar serbest zaman veriyoruz. Ardından otelimize transfer ve yerleşme. Dileyen misafirlerimiz saat 15:30'da düzenlenecek Jumbo Mağazası & Paradise Center AVM Alışveriş Turuna katılabilir (20 €). Akşam dileyen misafirlerimiz ekstra olarak düzenlenecek geleneksel canlı folklor gösterisiyle tamamlanan Bulgar Gecesine katılabilirler (65 € | 3 servislik Bulgar yemeği & 20cl Şarap veya Bulgar Rakısı veya Alkolsüz İçecek Dahildir!). Geceleme Sofya'daki otelimizde."
      },
      {
        day: '3. Gün',
        title: 'Sofya – Plovdiv (Filibe) – İstanbul',
        description: "Sabah kahvaltı sonrasında saat 08:00'de Plovdiv'e hareket ediyoruz. 8000 yıllık tarihiyle Avrupa'nın en eski şehirlerinden biri olan Plovdiv'e (Filibe) varışımıza müteakip yapacağımız panoramik şehir turumuzda; Cuma Camii, Sveta Bogoroditsa kilisesi, Antik Tiyatro ve Eski Plovdiv gezilecektir. Batenberg caddesinde öğlen yemeği ve alışveriş için serbest zaman vereceğiz. Serbest zamanda dileyen misafirlerimiz ekstra olarak düzenlenecek Trakya Vadisi Bağ Gezisi ile Şarap Tadım turuna katılabilirler (45 € — 5 yerel şarap tadımı aperatiflerle birlikte ücrete dahildir). Sonrasında İstanbul'a hareket, Kapıkule sınır kapısı işlemleri ardından İstanbul'a varış."
      }
    ],
    pricingPackages: [
      {
        hotelName: '4* Ramada Plaza Sofia Hotel V.B',
        board: 'Oda Kahvaltı',
        details: '4* Ramada Plaza Sofia V.B tesislerde 1 gece Oda/Kahvaltı konaklama (Yenilenmiş Lüks Odalar).',
        doublePrice: '119 €',
        singlePrice: '209 €',
        child1Price: '100 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Dönemi'
      }
    ],
    includedServices: [
      '2024 model ve üstü yeni nesil otobüslerle ulaşım',
      'Sofya ve Plovdiv panoramik gezileri',
      '4* Ramada Plaza Sofia V.B tesislerde Oda/Kahvaltı konaklama (Yenilenmiş Lüks Odalar)',
      'Zorunlu Mali Mesuliyet Sigortası',
      'Türkçe rehberlik hizmeti'
    ],
    excludedServices: [
      'Seyahat Sağlık Sigortası',
      'Schengen Vizesi',
      'Yurtdışı çıkış Pulu',
      'Extra turlar ve kişisel harcamalar',
      'Şoför ve rehber bahşişleri (5 € Kişi Başı)'
    ],
    departureDates: [
      '1 Ocak 2027 Cuma', '8 Ocak 2027 Cuma', '15 Ocak 2027 Cuma', '22 Ocak 2027 Cuma', '29 Ocak 2027 Cuma',
      '5 Şubat 2027 Cuma', '12 Şubat 2027 Cuma', '19 Şubat 2027 Cuma', '26 Şubat 2027 Cuma',
      '5 Mart 2027 Cuma', '12 Mart 2027 Cuma', '19 Mart 2027 Cuma', '26 Mart 2027 Cuma',
      '2 Nisan 2027 Cuma', '9 Nisan 2027 Cuma', '16 Nisan 2027 Cuma', '23 Nisan 2027 Cuma', '30 Nisan 2027 Cuma',
      '7 Mayıs 2027 Cuma', '14 Mayıs 2027 Cuma', '21 Mayıs 2027 Cuma', '28 Mayıs 2027 Cuma',
      '4 Haziran 2027 Cuma', '11 Haziran 2027 Cuma', '18 Haziran 2027 Cuma', '25 Haziran 2027 Cuma',
      '2 Temmuz 2027 Cuma', '9 Temmuz 2027 Cuma', '16 Temmuz 2027 Cuma', '23 Temmuz 2027 Cuma', '30 Temmuz 2027 Cuma',
      '6 Ağustos 2027 Cuma', '13 Ağustos 2027 Cuma', '20 Ağustos 2027 Cuma', '27 Ağustos 2027 Cuma',
      '3 Eylül 2027 Cuma', '10 Eylül 2027 Cuma', '17 Eylül 2027 Cuma', '24 Eylül 2027 Cuma',
      '1 Ekim 2027 Cuma', '8 Ekim 2027 Cuma', '15 Ekim 2027 Cuma', '22 Ekim 2027 Cuma', '29 Ekim 2027 Cuma',
      '5 Kasım 2027 Cuma', '12 Kasım 2027 Cuma', '19 Kasım 2027 Cuma', '26 Kasım 2027 Cuma',
      '3 Aralık 2027 Cuma', '10 Aralık 2027 Cuma', '17 Aralık 2027 Cuma'
    ],
    specialDates: [],
    extraPackage: null,
    notes: [
      'Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.',
      'Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.',
      'Bu tur için geçerli bir Schengen vizesi gerekmektedir.',
      'Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir.'
    ]
  },
  {
    order: 7,
    title: 'Selanik & Sofya & Plovdiv Turu',
    slug: 'selanik-sofya-plovdiv-turu-2g',
    subtitle: 'Selanik (1 Gece) + Sofya (1 Gece) + Plovdiv — Yunanistan & Bulgaristan Bir Arada',
    destination: 'Yunanistan & Bulgaristan',
    duration: '2 Gece 4 Gün',
    startingPrice: '149 €',
    imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/007-selanik-sofya-plovdiv-turu-2g.pdf',
    summaryBadges: [
      'Lüks Otobüslerle Ulaşım',
      'Gizlenmiş Mecburi Ücret Yok',
      'Yeşil Pasaporta Vize Yok'
    ],
    itinerary: [
      {
        day: '1. Gün',
        title: 'İstanbul – Selanik',
        description: "Akşam saat 21:00'de Kadıköy evlendirme dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM önünden hareket ile yola çıkıyoruz. İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        day: '2. Gün',
        title: 'Selanik',
        description: "Sabah saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde; Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyoruz. Kordon Boyunda yürüyüş yapıp saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'de One Salonica Outlet Mall & Jumbo Mağazası Alışveriş Turuna katılabilir (20 €). Akşam saat 20:00'de Panoramik Selanik Şaheserleri Gece Turu (15 €) veya Canlı müzikli Taverna & Sirtaki programı (75 € / Fix Menü – Limitli İçki). Geceleme Selanik'teki otelimizde."
      },
      {
        day: '3. Gün',
        title: 'Selanik – Sofya',
        description: "Sabah kahvaltı sonrasında saat 08:00'de Sofya için yola çıkıyoruz. Öğlen saatlerinde Sofya'ya varışımıza müteakip yapacağımız Sofya panoramik şehir turunda; St. Nedelya Kilisesi, Rotunda Kilisesi, Rus Kilisesi, Aya Sofya Kilisesi, Aleksandır Nevski Katedrali, Başbakanlık ve Parlamento binaları, Sofya Üniversitesi, Ulusal Kültür Sarayı, Banyabaşı Camii ve Serdika Meydanı görülecek yerler arasındadır. Saat 16:30 Gidiş - 19:00 Dönüş olarak ücretsiz transfer ile Bulgaristan'ın ve Doğu Avrupa'nın en büyük AVM'si Paradise Center'a gidip keyifli zaman geçirebilirsiniz. Akşam dileyen misafirlerimiz ekstra Bulgar Gecesine katılabilirler (65 €). Geceleme Sofya'daki otelimizde."
      },
      {
        day: '4. Gün',
        title: 'Sofya – Plovdiv (Filibe) – İstanbul',
        description: "Sabah kahvaltı sonrasında saat 08:30'da Plovdiv'e hareket ediyoruz. Panoramik şehir turumuzda Cuma Camii, Sveta Bogoroditsa kilisesi, Antik Tiyatro ve Eski Plovdiv gezilecektir. Batenberg caddesinde serbest zaman. Dileyen misafirlerimiz ekstra olarak düzenlenecek Trakya Vadisi Bağ Gezisi ile Şarap Tadım turuna katılabilirler (45 €). Sonrasında Kapıkule sınır kapısı üzerinden İstanbul'a varış ve turumuzun sonu."
      }
    ],
    pricingPackages: [
      {
        hotelName: 'Selanik 3* Assembly Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B',
        board: 'Oda Kahvaltı (2 Gece)',
        details: 'Normal Dönem — Selanik (1 Gece) + Sofya (1 Gece) Oda/Kahvaltı konaklama.',
        doublePrice: '149 €',
        singlePrice: '269 €',
        child1Price: '119 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Normal Dönem'
      },
      {
        hotelName: 'Selanik 5* Eona Resort Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B',
        board: 'Oda Kahvaltı (2 Gece)',
        details: 'Normal Dönem — Selanik (1 Gece) + Sofya (1 Gece) Oda/Kahvaltı konaklama.',
        doublePrice: '169 €',
        singlePrice: '299 €',
        child1Price: '119 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Normal Dönem'
      },
      {
        hotelName: 'Selanik 3* Assembly Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B (Özel Günler)',
        board: 'Oda Kahvaltı (2 Gece)',
        details: 'Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.',
        doublePrice: '169 €',
        singlePrice: '299 €',
        child1Price: '119 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Özel Dönem / Bayram'
      },
      {
        hotelName: 'Selanik 5* Eona Resort Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B (Özel Günler)',
        board: 'Oda Kahvaltı (2 Gece)',
        details: 'Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.',
        doublePrice: '199 €',
        singlePrice: '349 €',
        child1Price: '119 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: 'Özel Dönem / Bayram'
      }
    ],
    includedServices: [
      '2024 Model ve üzeri Lüks otobüslerle ulaşım',
      'Selanik, Sofya, Plovdiv panoramik gezileri',
      'Selanik (1) ve Sofya (1) 2 Gece seçilen otellerde Oda/Kahvaltı konaklama',
      'Zorunlu Mali Mesuliyet Sigortası',
      'Türkçe rehberlik hizmeti'
    ],
    excludedServices: [
      'Seyahat Sağlık Sigortası',
      'Schengen Vizesi',
      'Yurtdışı çıkış Pulu',
      'Extra turlar ve kişisel harcamalar',
      'Şoför ve rehber bahşişleri (5 € Kişi Başı)'
    ],
    departureDates: [
      '7 Ocak 2027 Perşembe', '14 Ocak 2027 Perşembe', '21 Ocak 2027 Perşembe', '28 Ocak 2027 Perşembe',
      '4 Şubat 2027 Perşembe', '11 Şubat 2027 Perşembe', '18 Şubat 2027 Perşembe', '25 Şubat 2027 Perşembe',
      '25 Mart 2027 Perşembe',
      '1 Nisan 2027 Perşembe', '8 Nisan 2027 Perşembe', '15 Nisan 2027 Perşembe', '29 Nisan 2027 Perşembe',
      '3 Haziran 2027 Perşembe', '10 Haziran 2027 Perşembe', '17 Haziran 2027 Perşembe', '24 Haziran 2027 Perşembe',
      '1 Temmuz 2027 Perşembe', '8 Temmuz 2027 Perşembe', '15 Temmuz 2027 Perşembe', '22 Temmuz 2027 Perşembe', '29 Temmuz 2027 Perşembe',
      '5 Ağustos 2027 Perşembe', '12 Ağustos 2027 Perşembe', '19 Ağustos 2027 Perşembe',
      '2 Eylül 2027 Perşembe', '9 Eylül 2027 Perşembe', '16 Eylül 2027 Perşembe', '23 Eylül 2027 Perşembe', '30 Eylül 2027 Perşembe',
      '7 Ekim 2027 Perşembe', '14 Ekim 2027 Perşembe', '21 Ekim 2027 Perşembe', '28 Ekim 2027 Perşembe',
      '4 Kasım 2027 Perşembe', '11 Kasım 2027 Perşembe', '18 Kasım 2027 Perşembe', '25 Kasım 2027 Perşembe',
      '2 Aralık 2027 Perşembe', '9 Aralık 2027 Perşembe', '16 Aralık 2027 Perşembe', '23 Aralık 2027 Perşembe'
    ],
    specialDates: [
      '8 Mart 2027 Pazartesi (Ramazan Bayramı)',
      '22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)',
      '16 Mayıs 2027 Pazar (Kurban Bayramı)',
      '27 Ağustos 2027 Cuma (Zafer Bayramı)',
      '30 Aralık 2027 Perşembe (Yılbaşı)'
    ],
    extraPackage: null,
    notes: [
      'Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.',
      'Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.',
      'Bu tur için geçerli bir Schengen vizesi gerekmektedir.',
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      'Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir.'
    ]
  },
  {
    order: 8,
    title: 'Parga & Korfu Adası & Yanya & Preveze Turu',
    slug: 'parga-korfu-adasi-yanya-preveze',
    subtitle: 'Parga – Yanya – Korfu Adası – Preveze (2 Gece 4* Palatino Hotel)',
    destination: 'Yunanistan',
    duration: '2 Gece 4 Gün',
    startingPrice: '199 €',
    imageUrl: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1600&auto=format&fit=crop',
    pdfUrl: '/turlar/008-parga-korfu-adasi-yanya-preveze.pdf',
    summaryBadges: [
      'Lüks Araçlarla Ulaşım',
      'Gizlenmiş Mecburi Ücret Yok',
      'Yeşil Pasaporta Vize Yok'
    ],
    itinerary: [
      {
        day: '1. Gün',
        title: 'İstanbul – Yanya',
        description: "Akşam saat 21:00'de Kadıköy Evlendirme Dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM, 23:30'da Çorlu Kavşağı Aytemiz Petrol, 00:30'da Tekirdağ Namık Kemal Yay Tesisleri, 02:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Parga'ya yol alıyoruz."
      },
      {
        day: '2. Gün',
        title: 'Yanya – Parga',
        description: "Kavala ve Selanik yakınlarında vereceğimiz molalarla birlikte yol alacağımız Yunan otobanında onlarca tünelin içinden geçerek, sabah saatlerinde Yanya'nın tarihi göl bölgesine varıyoruz. Gölün hemen yanında bulunan Yanya Kalesi içine panoramik yürüyüş turu yaparak Ali Paşa Camii ile geleneksel Osmanlı evlerinden oluşan Kaleiçi mahallesini görüp modern Yanya bölgesine geçiyoruz. Dinlenme ve öğlen yemeği için vereceğimiz serbest zaman ardından Parga'ya hareket ediyoruz. Yürüyüş ile Parga'yı geziyoruz: Türk Pazarı Sokağı, Venedik Kalesi, geleneksel Parga evleri ve Parga meydanı. Daha sonra otelimize yerleşiyoruz. Geceleme Parga'daki otelimizde."
      },
      {
        day: '3. Gün',
        title: 'Parga – Korfu Adası',
        description: "Otelimizde alacağımız kahvaltımızın ardından serbest zaman. Arzu edenler ekstra olarak düzenlenecek Korfu Adası Turu'na katılabilirler (75 €). Bu turda, gemi ile İyon denizinin incisi Korfu adasına geçiyoruz. Tarihi Fransız ve Venedik mimarisinden oluşan bu şirin kasabada, Saint Spiridon, Patron Saint Kiliselerini, Theotoki meydanını ve Venedik Kalesi'ni görüyoruz. Şehir merkezinde vereceğimiz serbest zamanda tarihi sokaklarda bulunan seçkin mağazalardan el yapımı hediyelik eşya alabilir veya ünlü Liston meydanındaki kafelerde hoşça vakit geçirebilirsiniz. Ardından Parga'ya otelimize dönüyoruz. Geceleme Parga'daki otelimizde."
      },
      {
        day: '4. Gün',
        title: 'Parga – Preveze – İstanbul',
        description: "Otelimizde alacağımız kahvaltımızın ardından Preveze'ye hareket ediyoruz. Amvrakikos Körfezi'nin ağzında, 1538 yılında gerçekleşen Preveze Savaşı'nın yapıldığı yer olan Preveze'ye varışımıza müteakip Liman ve eski şehir boyunca yürüyerek güzel geleneksel binaları görüp ada benzeri atmosferin tadını çıkarıyoruz. Serbest zaman sonrası İstanbul'a hareket ediyoruz. Yunan Freeshop'unda alışveriş imkânı ve İpsala sınır kapısından Türkiye'ye giriş ardından İstanbul'a varış."
      }
    ],
    pricingPackages: [
      {
        hotelName: '4* Palatino Hotel V.B',
        board: 'Oda Kahvaltı (2 Gece)',
        details: '4* Palatino Hotel (V.B) tesiste 2 gece oda kahvaltı konaklama.',
        doublePrice: '199 €',
        singlePrice: '299 €',
        child1Price: '149 € (3-12 Yaş)',
        child2Price: '-',
        babyPrice: '0-2 Yaş Ücretsiz',
        period: '2027 Özel & Bayram Dönemleri'
      }
    ],
    includedServices: [
      '2024 Model ve üzeri Yeni Nesil araçlarla ulaşım',
      'Parga, Yanya, Preveze gezileri dahil',
      '4* Palatino Hotel (V.B) tesiste 2 gece oda kahvaltı konaklama',
      'Mali mesuliyet sigortası',
      'Türkçe rehberlik hizmeti'
    ],
    excludedServices: [
      'Seyahat Sigortası',
      'Schengen Vizesi',
      'Yurtdışı çıkış Pulu',
      'Extra turlar ve kişisel harcamalar',
      'Şoför/Rehber/Otel bahşişleri (5 € Kişi Başı)'
    ],
    departureDates: [
      '8 Mart 2027 Pazartesi (Ramazan Bayramı)',
      '22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)',
      '16 Mayıs 2027 Pazar (Kurban Bayramı)',
      '30 Eylül 2027 Perşembe',
      '28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)'
    ],
    specialDates: [],
    extraPackage: null,
    notes: [
      'Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.',
      'Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.',
      'Bu tur için geçerli Schengen vizesi gerekmektedir.',
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      'Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir.'
    ]
  }
]

async function main() {
  console.log('Seeding 8 tours from Turlar PDFs...')
  for (const t of toursData) {
    const payload = {
      title: t.title,
      slug: t.slug,
      subtitle: t.subtitle,
      destination: t.destination,
      duration: t.duration,
      startingPrice: t.startingPrice,
      imageUrl: t.imageUrl,
      pdfUrl: t.pdfUrl,
      summaryBadges: JSON.stringify(t.summaryBadges),
      itinerary: JSON.stringify(t.itinerary),
      pricingPackages: JSON.stringify(t.pricingPackages),
      includedServices: JSON.stringify(t.includedServices),
      excludedServices: JSON.stringify(t.excludedServices),
      departureDates: JSON.stringify(t.departureDates),
      specialDates: JSON.stringify(t.specialDates),
      extraPackage: t.extraPackage,
      notes: JSON.stringify(t.notes),
      order: t.order,
      active: true
    }

    await prisma.tour.upsert({
      where: { slug: t.slug },
      update: payload,
      create: payload
    })
    console.log(`✅ Seeded: ${t.title}`)
  }
  console.log('🎉 All 8 tours seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
