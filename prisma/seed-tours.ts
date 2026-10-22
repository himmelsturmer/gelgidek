import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const toursData = [
  {
    "order": 1,
    "title": "Bansko Kayak Turu",
    "slug": "bansko-kayak-turu-3g",
    "subtitle": "3 Gece Konaklama — 2027 Sömestre",
    "destination": "Bulgaristan",
    "duration": "3 Gece 5 Gün",
    "startingPrice": "169 €",
    "pdfUrl": "/turlar/001-bansko-kayak-turu-3g.pdf",
    "summaryBadges": [
      "Lüks Araçlarla Ulaşım (2024/2026 Model)",
      "Yeşil Pasaporta Vize Yok",
      "0-12 Yaş Ücretsiz Çocuk"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Bansko",
        "description": "Turumuz akşam saat 22:00'de Kadıköy Evlendirme Dairesi önü, 22:30'da Mecidiyeköy Meydan (Bambi Cafe Önü) ve 23:00'de İncirli Ömür Plaza önü, 23:30'da Beylikdüzü Marmara Park AVM önü, 23:59 Silivri Vega AVM (Eski Kipa) önünde, 00:30 Edirne Otobanı Çorlu Dinlenme Tesisleri Shell Petrol'de, 01:30 Edirne Otobanı Babaeski Dinlenme tesisleri Opet Petrol'de, 03:00 Edirne Otogar Kavşağında, 03:15 Kapıkule Sınır Kapısı buluşarak başlıyor. Pasaport-Gümrük işlemlerinin ardından Bulgaristan'a geçiyor, Bansko'ya doğru hareket ediyoruz. Yaklaşık 4 saat boyunca yolculuğumuz devam ediyor."
      },
      {
        "day": "2. Gün",
        "title": "Bansko",
        "description": "Sabah saatlerinde Bansko'ya varış ardından kolay, orta ve zor derecelerinde toplam 85 km uzunluğa sahip, Kış Olimpiyatları için onay almış, Dünya Şampiyonu Alberto Tomba'nın kayak yaptığı ve Tomba pisti olarak anılan 2600 metreden başlayan pistler sizleri bekliyor. Bütün gün bu pistlerde kayak yapmanın zevkini yaşayacaksınız. Arzu eden misafirlerimiz kayak yapmanın dışında Bansko kasabasının tarihi ve doğal güzelliklerinden faydalanabilirler. Gece dileyenler Bansko şehrinin canlı gece hayatında eğlenebilirler.\n*Not: Uluslararası kurallar gereği odalara yerleşme saat 14:00'den sonra olmaktadır. Rehberimiz odalara giriş saati ile ilgili sizlere detaylı bilgi veriyor olacak."
      },
      {
        "day": "3. Gün",
        "title": "Bansko",
        "description": "Sabah kahvaltı ardından kolay, orta ve zor derecelerinde toplamda 85 km uzunluğa sahip, Kış Olimpiyatları için onay almış, Dünya Şampiyonu Alberto Tomba'nın kayak yaptığı ve Tomba pisti olarak anılan 2600 metreden başlayan pistler sizleri bekliyor. Bütün gün bu pistlerde kayak yapmanın zevkini yaşayacaksınız. Arzu eden misafirlerimiz kayak yapmanın dışında Bansko kasabasının tarihi ve doğal güzelliklerinden faydalanabilirler. Dileyen misafirlerimiz ekstra olarak düzenlenecek olan Termal Açık Hava Havuzu Turuna katılabilirler (40 €). Geceleme otelinizde. Gece dileyenler Bansko şehrinin canlı gece hayatında eğlenebilirler."
      },
      {
        "day": "4. Gün",
        "title": "Bansko (Ekstra Sofya Turu)",
        "description": "Sabah kahvaltı ardından kolay, orta ve zor derecelerinde toplamda 85 km uzunluğa sahip, Kış Olimpiyatları için onay almış, Dünya Şampiyonu Alberto Tomba'nın kayak yaptığı ve Tomba pisti olarak anılan 2600 metreden başlayan pistler sizleri bekliyor. Bütün gün bu pistlerde kayak yapmanın zevkini yaşayacaksınız. Arzu eden misafirlerimiz kayak yapmanın dışında Bansko kasabasının tarihi ve doğal güzelliklerinden faydalanabilirler. Dileyen misafirlerimiz ekstra olarak düzenlenecek olan günübirlik Sofya Turuna katılabilirler (75 €). Panoramik Sofya şehir turumuz esnasında görülecek yerler arasında; Balkanların en büyük kilisesi olan Aleksander Nevski Katedrali, Milli Kütüphane, Sofya Üniversitesi, Eski Kraliyet Sarayı, Neo klasik stilinde yapılmış olan Milli Bulgar Tiyatrosu, Arkeoloji Müzesi, Eski Sofya - Serdika şehri, Rotonda Kilisesi bulunmaktadır. Daha sonra meclis binasının yanından yürüyerek Sofya Heykeli'ne panoramik bakış ve şehrin simgesi olan Banya Başı Camisini ziyaret ediyoruz. Ziyaretimiz ardından serbest zaman ve alışveriş için Jumbo Mağazası & Metro Market'te alışveriş molası veriyoruz. Akşam Bansko'ya dönüş. Geceleme otelinizde. Gece dileyenler Bansko şehrinin canlı gece hayatında eğlenebilirler."
      },
      {
        "day": "5. Gün",
        "title": "Bansko – İstanbul",
        "description": "Sabah kahvaltı sonrası, odaların boşaltılması ardından rehberimizin bildireceği saatte İstanbul'a hareket. Velingrad ve Pazarcık üzerinden yaklaşık 4 saatlik yolculukla Sınır kapısına devam ediyoruz. Pasaport-Gümrük işlemlerinin ardından yaklaşık 3 saatlik yolculuk ile İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "3* Lina Hotel",
        "board": "Oda Kahvaltı",
        "details": "Bansko Merkez'de Gondol'a 1,7 Km uzaklıkta, çarşı merkezine 500 mt sıcak, temiz ve şirin aile oteli. Ücretsiz Wi-Fi. Gondol'a ücretli servis (Kişi Başı Günlük 5 € / 3 Günlük 10 €).",
        "doublePrice": "169 €",
        "singlePrice": "259 €",
        "child1Price": "119 € (3-12 Yaş 1. Çocuk)",
        "child2Price": "Mümkün Değil",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Sömestre"
      },
      {
        "hotelName": "4* Royal Park SPA Hotel",
        "board": "Oda Kahvaltı",
        "details": "Bansko'nun güneyinde oteller bölgesinde, Gondol'a 1,4 Km uzaklıkta, SPA hizmetlerinin sunulduğu sıcak ve temiz bu modern otelde akşam yeme içme imkânı bulunmaktadır. Ücretsiz Wi-Fi, Jakuzi, Sauna ve Buhar Odası Kullanımı. Gondol'a ücretsiz servis.",
        "doublePrice": "289 €",
        "singlePrice": "389 €",
        "child1Price": "Ücretsiz (3-12 Yaş 1. Çocuk)",
        "child2Price": "159 € (3-12 Yaş 2. Çocuk)",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Sömestre"
      },
      {
        "hotelName": "4* Royal Park SPA Hotel",
        "board": "Yarım Pansiyon Plus+",
        "details": "Bansko'nun güneyinde oteller bölgesinde, Gondol'a 1,4 Km uzaklıkta, SPA hizmetlerinin sunulduğu sıcak ve temiz bu modern otelde akşam yemeği ve yemek yanında alınan Limitsiz İçecek ve Şarap ücrete dâhildir. Ücretsiz Wi-Fi, Jakuzi, Sauna ve Buhar Odası Kullanımı. Gondol'a ücretsiz servis.",
        "doublePrice": "389 €",
        "singlePrice": "479 €",
        "child1Price": "Ücretsiz (3-12 Yaş 1. Çocuk)",
        "child2Price": "259 € (3-12 Yaş 2. Çocuk)",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Sömestre"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Seçilen Otelde 3 Gece konaklama",
      "Türkçe rehberlik ve danışmanlık hizmeti",
      "Kayak Kiralamada geçerli dijital indirim kartı",
      "Mali Mesuliyet Sigortası"
    ],
    "excludedServices": [
      "Seyahat & Sağlık Sigortası (15 €)",
      "Schengen Vizesi",
      "Yurtdışı çıkış Harcı",
      "Extra turlar ve kişisel harcamalar",
      "Skipass ve Kayak Kiralama",
      "Rehber / Şoför / Otel Bahşişleri (10 € Oda Başı)"
    ],
    "departureDates": [
      "22 Ocak 2027 Cuma",
      "25 Ocak 2027 Pazartesi",
      "28 Ocak 2027 Perşembe",
      "31 Ocak 2027 Pazar",
      "3 Şubat 2027 Çarşamba"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Programımız kesin hareketlidir.",
      "Hava ve yol koşullarına göre hareket saatlerinde değişiklik yapma hakkımız saklıdır!",
      "Bu tur için; geçerli bir Schengen Vizesi gerekmektedir."
    ],
    "imageUrl": "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1600&auto=format&fit=crop"
  },
  {
    "order": 2,
    "title": "Selanik & Kavala & İskeçe Turu",
    "slug": "selanik-kavala-iskece-turu-1g",
    "subtitle": "Selanik + Kavala + İskeçe (1 Gece Konaklama)",
    "destination": "Yunanistan",
    "duration": "1 Gece 3 Gün",
    "startingPrice": "129 €",
    "pdfUrl": "/turlar/002-selanik-kavala-iskece-turu-1g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Selanik",
        "description": "Akşam saat 21:00'de Kadıköy Evlendirme Dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM, 23:30'da Çorlu Kavşağı Aytemiz Petrol, 00:30'da Tekirdağ Namık Kemal Yay Tesisleri, 02:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Selanik",
        "description": "Sabah saatlerinde Selanik'e varışımıza müteakip, Lidl Market'te 1 Saatlik alışveriş molası sonrasında yapacağımız Selanik panoramik şehir gezimizde, Selanik'in en önemli kilisesi olan Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'de düzenlenecek, birbirinden ünlü markaları içinde barındıran One Salonica Outlet Mall (1,5 Saat) & Jumbo Mağazası (1 Saat) Alışveriş Turuna katılabilir (20 €). Sonrasında otelimize transfer ve yerleşme. Dileyen misafirlerimiz akşam saat 20:00'de düzenlenecek Panoramik Selanik Şaheserleri Gece Turuna katılarak da gündüz görülen yerleri akşam ışıkları altında görebilir ve Selanik'in merkezinde, serbest zaman olarak canlı gece hayatına dahil olabilirler (15 €). Dileyen misafirlerimiz Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Her iki programda otele dönüş için hareket saat 23:00'te. Geceleme Selanik'teki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Selanik – Kavala – İskeçe – Gümülcine – İstanbul",
        "description": "Sabah kahvaltı ardından Kavala'ya hareket ediyoruz. Kavala'ya varış. Kavala panoramik şehir turu; İmarethane, Su Kemerleri, Kavala Kalesi, Belediye Binası, Kavala çarşısı, Kordon otobüsten panoramik olarak görülecek yerler arasındadır. 1 Saatlik serbest zaman ardından, Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyoruz. Sonrasında 1,5 saatlik yolculukla sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri, Freeshop alışverişleri sonrasında İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu. Bir sonraki turumuzda görüşmek dileği ile…"
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Panorama Hotel V.B",
        "board": "Oda Kahvaltı",
        "details": "Selanik 4* Panorama Hotel V.B otellerde 1 gece Oda/Kahvaltı konaklama.",
        "doublePrice": "129 €",
        "singlePrice": "209 €",
        "child1Price": "100 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Selanik, Kavala, İskeçe panoramik gezileri",
      "Selanik 4* Panorama Hotel V.B otellerde Oda/Kahvaltı konaklama",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "1 Ocak 2027 Cuma",
      "8 Ocak 2027 Cuma",
      "15 Ocak 2027 Cuma",
      "22 Ocak 2027 Cuma",
      "29 Ocak 2027 Cuma",
      "5 Şubat 2027 Cuma",
      "12 Şubat 2027 Cuma",
      "19 Şubat 2027 Cuma",
      "26 Şubat 2027 Cuma",
      "5 Mart 2027 Cuma",
      "19 Mart 2027 Cuma",
      "26 Mart 2027 Cuma",
      "2 Nisan 2027 Cuma",
      "9 Nisan 2027 Cuma",
      "16 Nisan 2027 Cuma",
      "23 Nisan 2027 Cuma",
      "30 Nisan 2027 Cuma",
      "7 Mayıs 2027 Cuma",
      "14 Mayıs 2027 Cuma",
      "21 Mayıs 2027 Cuma",
      "28 Mayıs 2027 Cuma",
      "4 Haziran 2027 Cuma",
      "11 Haziran 2027 Cuma",
      "18 Haziran 2027 Cuma",
      "25 Haziran 2027 Cuma",
      "10 Eylül 2027 Cuma",
      "17 Eylül 2027 Cuma",
      "24 Eylül 2027 Cuma",
      "1 Ekim 2027 Cuma",
      "8 Ekim 2027 Cuma",
      "15 Ekim 2027 Cuma",
      "22 Ekim 2027 Cuma",
      "29 Ekim 2027 Cuma",
      "5 Kasım 2027 Cuma",
      "12 Kasım 2027 Cuma",
      "19 Kasım 2027 Cuma",
      "26 Kasım 2027 Cuma",
      "3 Aralık 2027 Cuma",
      "10 Aralık 2027 Cuma",
      "17 Aralık 2027 Cuma"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ],
    "imageUrl": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop"
  },
  {
    "order": 3,
    "title": "Eko-Promo Selanik & İskeçe Turu",
    "slug": "eko-promo-selanik-iskece-turu-1g",
    "subtitle": "Selanik + İskeçe (Lidl Market Alışverişi Dahil)",
    "destination": "Yunanistan",
    "duration": "1 Gece 3 Gün",
    "startingPrice": "79 €",
    "imageUrl": "https://images.unsplash.com/photo-1503152394-c571994fd383?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/003-eko-promo-selanik-iskece-turu-1g.pdf",
    "summaryBadges": [
      "Otobüslerle Ulaşım",
      "Yeşil Pasaporta Vize Yok",
      "Lidl Market Alışverişi Dahil"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Selanik",
        "description": "Akşam saat 21:00'de Kadıköy evlendirme dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM, 23:30'da Çorlu Kavşağı Aytemiz Petrol, 00:30'da Tekirdağ Namık Kemal Yay Tesisleri, 02:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Selanik",
        "description": "Sabah saatlerinde Selanik'e varışımıza müteakip, Lidl Market'te 1 Saatlik alışveriş molası sonrasında otobüsten yapacağımız Selanik panoramik şehir gezimizde, Yunanistan'ın en büyük Kilisesi olan Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyor ve Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'de düzenlenecek One Salonica Outlet Mall & Jumbo Mağazası Alışveriş Turuna katılabilir (20 €). Sonrasında otelimize geçiyoruz. Odalarımıza yerleşme ardından serbest zaman. Dileyen misafirlerimiz akşam Saat 20:00'de düzenlenecek Panoramik Selanik Şaheserleri Gece Turuna katılarak da gündüz görülen yerleri akşam ışıkları altında görebilir ve Selanik'in merkezinde canlı gece hayatına dahil olabilirler (15 €). Dileyen misafirlerimiz ayrıca Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Her iki programda otele dönüş için hareket saati 23:00'te. Geceleme Selanik'teki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Selanik – İskeçe – İstanbul",
        "description": "Sabah kahvaltı ardından İstanbul'a doğru hareket ediyoruz. Güzergahımız üzerinde bulunan Iokmanidis Kurabiye Fabrikasında kısa bir mola ardından Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan Xanthi (İskeçe)'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyoruz. Sonrasında İpsala sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Yunan Freeshop'unda alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu. Bir sonraki turumuzda görüşmek dileği ile…"
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "3* Assembly Hotel V.B",
        "board": "Oda Kahvaltı",
        "details": "Selanik 3* Assembly Hotel V.B otellerde 1 gece Oda/Kahvaltı konaklama.",
        "doublePrice": "79 €",
        "singlePrice": "179 €",
        "child1Price": "69 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      },
      {
        "hotelName": "5* Eona Resort Hotel V.B",
        "board": "Oda Kahvaltı",
        "details": "Selanik 5* Eona Resort Hotel V.B'de 1 gece Oda/Kahvaltı konaklama.",
        "doublePrice": "129 €",
        "singlePrice": "209 €",
        "child1Price": "99 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri lüks araçlarla ulaşım",
      "Selanik ve İskeçe panoramik gezileri",
      "Selanik seçilen otelde 1 gece Oda/Kahvaltı konaklama",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Harcı",
      "Extra turlar ve kişisel harcamalar",
      "Zorunlu şoför/rehber/otel bahşişi (5 € Kişi Başı)"
    ],
    "departureDates": [
      "1 Ocak 2027 Cuma",
      "8 Ocak 2027 Cuma",
      "15 Ocak 2027 Cuma",
      "22 Ocak 2027 Cuma",
      "29 Ocak 2027 Cuma",
      "5 Şubat 2027 Cuma",
      "12 Şubat 2027 Cuma",
      "19 Şubat 2027 Cuma",
      "26 Şubat 2027 Cuma",
      "5 Mart 2027 Cuma",
      "12 Mart 2027 Cuma",
      "19 Mart 2027 Cuma",
      "26 Mart 2027 Cuma",
      "2 Nisan 2027 Cuma",
      "9 Nisan 2027 Cuma",
      "16 Nisan 2027 Cuma",
      "23 Nisan 2027 Cuma",
      "30 Nisan 2027 Cuma",
      "7 Mayıs 2027 Cuma",
      "14 Mayıs 2027 Cuma",
      "21 Mayıs 2027 Cuma",
      "28 Mayıs 2027 Cuma",
      "4 Haziran 2027 Cuma",
      "11 Haziran 2027 Cuma",
      "18 Haziran 2027 Cuma",
      "25 Haziran 2027 Cuma",
      "10 Eylül 2027 Cuma",
      "17 Eylül 2027 Cuma",
      "24 Eylül 2027 Cuma",
      "1 Ekim 2027 Cuma",
      "8 Ekim 2027 Cuma",
      "15 Ekim 2027 Cuma",
      "22 Ekim 2027 Cuma",
      "29 Ekim 2027 Cuma",
      "5 Kasım 2027 Cuma",
      "12 Kasım 2027 Cuma",
      "19 Kasım 2027 Cuma",
      "26 Kasım 2027 Cuma",
      "3 Aralık 2027 Cuma",
      "10 Aralık 2027 Cuma",
      "17 Aralık 2027 Cuma"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 4,
    "title": "Alexandroupolis (Dedeağaç) Hafta Sonu Kaçamağı",
    "slug": "alexandroupolis-turu-1g",
    "subtitle": "Dedeağaç – Porto Lagos – İskeçe – Gümülcine (5* Astir Palace Hotel)",
    "destination": "Yunanistan",
    "duration": "1 Gece 2 Gün",
    "startingPrice": "179 €",
    "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/004-alexandroupolis-turu-1g.pdf",
    "summaryBadges": [
      "Lüks Araçlarla Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün – Cumartesi",
        "title": "İstanbul – Alexandroupolis (Dedeağaç)",
        "description": "Sabah saat 03:00'de Kadıköy Evlendirme Dairesi, saat 03:15'de Mecidiyeköy Meydan/Bambi Cafe önü, saat 03:30'da İncirli Ömür Plaza önü, 03:45'de Beylikdüzü Marmara Park AVM önü, 04:00'de Silivri Vega AVM önü, 04:30'da Çorlu Kavşağı Aytemiz Petrol, 05:15'de Tekirdağ Namık Kemal Yay Tesisleri, 07:00'de Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala'ya varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, yarım saatlik bir yolculukla Alexandroupolis'e varıyoruz. Alexandroupolis'e varışımızda dileyen misafirlerimiz Ekstra olarak düzenlenecek Skalaventis Market (45 dk) & Lidl Market (45 dk) & Jumbo Mağazası (1,5 Saat) Alışveriş turuna katılabilirler (10 €). Dedeağaç'ın keyfini çıkarmak üzere merkezde vereceğimiz serbest zaman sonrasında 15:00'de otele gidiyoruz. Şehir merkezinde bulunan otelimizde Alexandroupolis ve otelin keyfini çıkartmak için serbest zaman. Geceleme Alexandroupolis'te."
      },
      {
        "day": "2. Gün – Pazar",
        "title": "Alexandroupolis – Porto Lagos – Xanthi – Komotini",
        "description": "Sabah 10:30'a dek devam eden keyifli bir Pazar kahvaltısı ile güne başlıyoruz. Dileyen misafirlerimiz Ekstra olarak düzenlenecek BATI TRAKYA turuna katılabilirler (35 €). Tura katılacak misafirlerimizle sabah kahvaltı ardından 09:30'da odaları boşaltıyor ve yaklaşık 1 saatlik yolculukla, bir tarafı deniz, bir tarafı göl ve ormandan oluşan büyüleyici Porto Lagos ile tura başlıyoruz. Burada Agios Nikolas kilisesini görüp vereceğimiz fotoğraf molası ardından Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere serbest zaman veriyoruz. Sonrasında yine Türklerin yoğun olarak yaşadığı Komotini (Gümülcine) şehrinden geçerek, otobüsten panoramik olarak görüp, otelde kalan misafirlerimizi de alarak İpsala sınır kapısına doğru yola koyuluyoruz. Gümrük ve pasaport işlemleri sırasında Yunan Freeshop'unda alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu. Bir sonraki turumuzda görüşmek dileği ile…"
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "5* Astir Palace Hotel (V.B)",
        "board": "Oda Kahvaltı",
        "details": "5* Astir Palace Hotel (V.B) tesiste 1 gece oda kahvaltı konaklama.",
        "doublePrice": "179 €",
        "singlePrice": "249 €",
        "child1Price": "129 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Cumartesi Hareketli"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri lüks araçlarla ulaşım",
      "5* Astir Palace Hotel (V.B) tesiste 1 gece oda kahvaltı konaklama",
      "Programda belirtilen transfer ve şehir turları",
      "Mali mesuliyet sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat & Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "SPA hizmetleri kullanımı",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "9 Ocak 2027 Cumartesi",
      "16 Ocak 2027 Cumartesi",
      "23 Ocak 2027 Cumartesi",
      "30 Ocak 2027 Cumartesi",
      "6 Şubat 2027 Cumartesi",
      "13 Şubat 2027 Cumartesi",
      "20 Şubat 2027 Cumartesi",
      "27 Şubat 2027 Cumartesi",
      "6 Mart 2027 Cumartesi",
      "20 Mart 2027 Cumartesi",
      "27 Mart 2027 Cumartesi",
      "3 Nisan 2027 Cumartesi",
      "10 Nisan 2027 Cumartesi",
      "17 Nisan 2027 Cumartesi",
      "24 Nisan 2027 Cumartesi",
      "1 Mayıs 2027 Cumartesi",
      "8 Mayıs 2027 Cumartesi",
      "15 Mayıs 2027 Cumartesi",
      "22 Mayıs 2027 Cumartesi",
      "29 Mayıs 2027 Cumartesi",
      "5 Haziran 2027 Cumartesi",
      "12 Haziran 2027 Cumartesi",
      "19 Haziran 2027 Cumartesi",
      "26 Haziran 2027 Cumartesi",
      "2 Ekim 2027 Cumartesi",
      "9 Ekim 2027 Cumartesi",
      "16 Ekim 2027 Cumartesi",
      "23 Ekim 2027 Cumartesi",
      "30 Ekim 2027 Cumartesi",
      "6 Kasım 2027 Cumartesi",
      "13 Kasım 2027 Cumartesi",
      "20 Kasım 2027 Cumartesi",
      "27 Kasım 2027 Cumartesi",
      "4 Aralık 2027 Cumartesi",
      "11 Aralık 2027 Cumartesi",
      "18 Aralık 2027 Cumartesi"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 5,
    "title": "Ekspres Yunanistan Turu",
    "slug": "ekspres-yunanistan-turu-3g",
    "subtitle": "Atina (2) & Kalambaka/Meteora & Pire & Naflion & Korint Kanalı & Selanik (1) & Kavala & İskeçe",
    "destination": "Yunanistan",
    "duration": "3 Gece 5 Gün",
    "startingPrice": "299 €",
    "imageUrl": "https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/005-ekspres-yunanistan-turu-3g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Atina",
        "description": "Akşam saat 20:00'de Kadıköy evlendirme dairesi, saat 20:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM, 22:30 Çorlu Kavşağı Aytemiz Petrol (Melih Öge) önü, 23:00 Tekirdağ Namık Kemal Yay Tesisleri, 00:30'da Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İstanbul – İpsala yolculuğunun ardından İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Atina'ya yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Atina (Meteora)",
        "description": "Sabah saatlerinde yol üzerinde, ekstra olarak düzenlenen Kalambaka – Meteora'yı ziyaret ediyoruz (65 €). Meteora, 'boşlukta asılı kalan' anlamına gelir. Bu inanılmayacak derecede uzun ve dik kayaları gördüğünüzde gözlerinize inanamayacaksınız. Yalnızca muazzam bir jeolojisi yoktur bunun yanı sıra hayal gücünüzü de genişletmektedir. Orta Yunanistan'daki insanın aklını başından alan bu kayalar Kalambaka'nın kuzeyinde, Pindus Dağlarının güneyinde bulunan düz vadiye dik olarak yükselir. Manastır hayatı, uygun yerde inzivaya çekilmek amacıyla cenneti andıran bu sütunlara gelen ilk keşişlerle 11. yy'da başlamıştır. Burada dik kayalar üzerine kurulmuş Manastırları görüyor ve Vlaram Manastırını birlikte ziyaret ederek manastırların oluşumu ve manastır hayatıyla ilgili bilgiler alıyoruz (Manastır giriş bileti ekstra tur ücretine dahildir!). (Ekstra tura dahil olmayan misafirlerimizin aşağıdaki dinlenme tesisinde yaklaşık 2 saat beklemeleri gerekmektedir!) Kısa bir öğlen yemeği molası ardından Atina'ya hareket ediyoruz. Otobüsten panoramik olarak Pire limanını gezdikten sonra otelimize giriş yapıyoruz. Geceleme Atina'daki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Atina (Akropolis & Monastraki Meydanı) / (Korint Kanalı & Naphlion)",
        "description": "Sabah kahvaltı ardından 08:00'de başlayarak yerel rehberimiz eşliğinde yapacağımız panoramik şehir gezimizde; Panathenaic Antik Olimpiyat Stadyumu, Zeus Tapınağı, Parlamento Binası, Cumhurbaşkanlığı Sarayı, Başbakanlık Konutu, Panepistimiou Bulvarları, Ulusal Kütüphane ve Akademi Üniversitesi ile Omonia ve Syntagma Meydanları panoramik olarak otobüsten görülecek yerler arasındadır. Panoramik turumuz Syntagma Meydanında sona eriyor. Saat 20:00'ye kadar Atina merkezde serbest zaman. Dileyen misafirlerimiz ekstra olarak düzenlenecek Atina Akropolis & Monastraki Meydanı Turuna katılabilirler (75 € / Giriş Biletleri Dahil!). Bu turumuza panoramik gezimizin biteceği Syntagma meydanından başlıyor ve Atina'nın en hareketli bölgesi Ermou Sokağı boyunca yürüyerek Monastraki Meydanına geçiyoruz. Burada yerel hediyelik eşya mağazalarından alışveriş ve manzara eşliğinde sabah kahvesi için serbest zaman veriyoruz. Serbest zaman bitiminde Akropolisin yamaçları ile Antik Agora, Hadrian Kütüphanesini gezdikten sonra, Atina Akropolisi'ne giriyoruz. Akropolis'i yerel rehberimiz eşliğinde gezerek tüm detaylı bilgileri alıp, kişisel fotoğraf çekimi için serbest zaman verdikten sonra turumuzu öğlen saatlerinde noktalıyor ve Atina'da saat 20:00'ye kadar serbest zaman veriyoruz. Öğleden sonraki bu serbest zamanda dileyen misafirlerimiz ekstra olarak düzenlenecek Korint Kanalı & Naphlion turuna katılabilirler (75 €). Bu turumuz Saat 13:30'da Akropolis otoparkından hareket ederek başlıyor. Saronic Körfezi boyunca ilerleyip, İyonya ve Ege denizlerini birbirine bağlayan Korint Kanalı'na varacağız. Sonrasında Yunanistan'ın ilk başkenti ve Mora Yarımadası'nın en güzel şehri olan Nafplio'ya varışımıza müteakip Palamidi Kalesi, Bourtzi Kalesi, Vouleftiko Camisi, Ağapaşa Cami (Trianon), katedral ve Venedik Sarayı görülecek yerler arasındadır. Saat 18:00'de Naphlion'dan ayrılarak Syntagma meydanında kalan misafirlerimizi de alarak otelimize dönüyoruz. Dileyen misafirlerimiz saat 20:30'da başlayacak akşam Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Geceleme Atina'daki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Atina – Selanik",
        "description": "Kahvaltı ardından Selanik'e yol alıyoruz. Öğlen saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde, Yunanistan'ın en büyük Kilisesi olan Aya Dimitros Kilisesi, Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi (Pazartesi günleri kapalı olduğundan dışarıdan görüyoruz!), Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını görüyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, sonrasında Aristoteles Meydanında serbest zaman veriyoruz. Bu esnada dileyen misafirlerimiz saat 16:30'da düzenlenecek, birbirinden ünlü markaları içinde barındıran One Salonica Outlet Mall AVM (1,5 Saat) & Jumbo Mağazası (1 Saat) Alışveriş Turuna katılabilir (20 €). Sonrasında merkezde vereceğimiz serbest zaman ardından gece 22:00'de otelimize hareket ediyoruz. Otelimize yerleşme ve geceleme Selanik'teki otelimizde."
      },
      {
        "day": "5. Gün",
        "title": "Selanik – Kavala – İskeçe – Gümülcine – Dedeağaç – İstanbul",
        "description": "Sabah kahvaltı ardından Kavala'ya hareket ediyoruz. Kavala'ya varış. Kavala panoramik şehir turu; İmarethane, Su Kemerleri, Kavala Kalesi, Belediye Binası, Kavala çarşısı, Kordon otobüsten panoramik olarak görülecek yerler arasındadır. 1 Saatlik serbest zaman ardından, Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyoruz. Xanthi çıkışında Lidl Market'te (45 dk) alışveriş molası ardından İpsala sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Freeshop'da alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu. Bir sonraki turumuzda görüşmek dileği ile…"
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "299 €",
        "singlePrice": "499 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "399 €",
        "singlePrice": "599 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "399 €",
        "singlePrice": "599 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      },
      {
        "hotelName": "Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "499 €",
        "singlePrice": "699 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Lüks otobüslerle ulaşım",
      "Atina, Selanik, Kavala, İskeçe panoramik gezileri",
      "Atina (2), Selanik (1) toplam 3 Gece seçilen kategorideki otellerde Oda/Kahvaltı konaklama",
      "Zorunlu mali mesuliyet sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat sağlık sigortası",
      "Schengen vizesi",
      "Yurtdışı çıkış pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "22 Ocak 2027 Cuma",
      "29 Ocak 2027 Cuma",
      "5 Şubat 2027 Cuma",
      "12 Şubat 2027 Cuma",
      "19 Şubat 2027 Cuma",
      "26 Şubat 2027 Cuma",
      "19 Mart 2027 Cuma",
      "26 Mart 2027 Cuma",
      "2 Nisan 2027 Cuma",
      "9 Nisan 2027 Cuma",
      "4 Haziran 2027 Cuma",
      "11 Haziran 2027 Cuma",
      "18 Haziran 2027 Cuma",
      "25 Haziran 2027 Cuma",
      "2 Temmuz 2027 Cuma",
      "9 Temmuz 2027 Cuma",
      "16 Temmuz 2027 Cuma",
      "23 Temmuz 2027 Cuma",
      "30 Temmuz 2027 Cuma",
      "6 Ağustos 2027 Cuma",
      "13 Ağustos 2027 Cuma",
      "20 Ağustos 2027 Cuma",
      "27 Ağustos 2027 Cuma",
      "3 Eylül 2027 Cuma",
      "10 Eylül 2027 Cuma",
      "17 Eylül 2027 Cuma",
      "24 Eylül 2027 Cuma",
      "1 Ekim 2027 Cuma",
      "8 Ekim 2027 Cuma",
      "15 Ekim 2027 Cuma",
      "22 Ekim 2027 Cuma",
      "5 Kasım 2027 Cuma",
      "12 Kasım 2027 Cuma",
      "19 Kasım 2027 Cuma",
      "26 Kasım 2027 Cuma",
      "3 Aralık 2027 Cuma",
      "10 Aralık 2027 Cuma",
      "17 Aralık 2027 Cuma",
      "24 Aralık 2027 Cuma"
    ],
    "specialDates": [
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "15 Mayıs 2027 Cumartesi (Kurban Bayramı)",
      "28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)",
      "29 Aralık 2027 Çarşamba (Yılbaşı)"
    ],
    "extraPackage": "Avantajlı Ekstra Tur Paketi: Kalambaka – Meteora + Akropolis Turu + Korint Kanalı & Naphlion & Monastraki Meydanı Turu + Canlı müzikli, eğlenceli Taverna & Sirtaki programı + Mega Outlet ve Jumbo Mağazası Alışveriş Turu — 310 € yerine 290 €",
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 6,
    "title": "Sofya & Plovdiv Turu",
    "slug": "sofya-plovdiv-turu-1g",
    "subtitle": "Hafta Sonu Kaçamağı | SPA & Casino & Taverna (1 Gece 4* Ramada Plaza Sofia)",
    "destination": "Bulgaristan",
    "duration": "1 Gece 3 Gün",
    "startingPrice": "119 €",
    "imageUrl": "https://images.unsplash.com/photo-1563284223-333497472e88?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/006-sofya-plovdiv-turu-1g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Sofya",
        "description": "Turumuz akşam saat 21:00'de Kadıköy Evlendirme Dairesi önü, 21:30'da Mecidiyeköy Meydan (Bambi Cafe Önü) ve 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM (Eski Kipa) önünde, 23:30'da Edirne Otobanı Çorlu Dinlenme Tesisleri Shell Petrol'de, 00:30'da Edirne Otobanı Babaeski Dinlenme tesisleri Opet Petrol'de, 02:00 Edirne Otogar Kavşağında, 02:15 Kapıkule Sınır Kapısı buluşarak başlıyor. Pasaport-Gümrük işlemlerinin ardından Bulgaristan'a geçiyor, Sofya'ya doğru hareket ediyoruz. Yaklaşık 4 saat boyunca yolculuğumuz devam ediyor."
      },
      {
        "day": "2. Gün",
        "title": "Sofya",
        "description": "Sabah saatlerinde Sofya'ya varışımıza müteakip yapacağımız Sofya panoramik şehir turunda; St. Nedelya Kilisesi, Rotunda Kilisesi, Rus Kilisesi, Aya Sofya Kilisesi, Aleksandır Nevski Katedrali, Başbakanlık ve Parlamento binaları ile Sofya Üniversitesi ve Ulusal Kültür Sarayı ve Mimar Sinan tarafından tasarlanan Banyabaşı Camii, Serdika (Hoşgörü) Meydanı görülecek yerler arasındadır. Sonrasında saat 14:30'a kadar serbest zaman veriyoruz. Ardından otelimize transfer, yerleşme ve serbest zaman. Dileyen misafirlerimiz saat 15:30'da düzenlenecek Jumbo Mağazası & Paradise Center AVM Alışveriş Turuna katılabilir (20 €). Akşam dileyen misafirlerimiz ekstra olarak düzenlenecek geleneksel yerel müzik ve danstan oluşan canlı bir folklor gösterisiyle tamamlanan Bulgar Gecesine katılabilirler (65 € | Geleneksel restoranda 3 servislik Bulgar yemeği & 20cl Şarap veya Bulgar Rakısı veya Alkolsüz İçecek Dahildir!). Geceleme Sofya'daki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Sofya – Plovdiv (Filibe) – İstanbul",
        "description": "Sabah kahvaltı sonrasında saat 08:00'de Plovdiv'e hareket ediyoruz. Yaklaşık 2 saatlik keyifli bir yolculuk ardından, 8000 yıllık tarihiyle Avrupa'nın en eski şehirlerinden biri olan Plovdiv'e (Filibe) varışımıza müteakip yapacağımız panoramik şehir turumuzda; Cuma Camii, Sveta Bogoroditsa kilisesi, Antik Tiyatro ve Eski Plovdiv gezilecektir. Batenberg caddesinde öğlen yemeği ve alışveriş için serbest zaman vereceğiz. Serbest zamanda dileyen misafirlerimiz ekstra olarak düzenlenecek Trakya Vadisi Bağ Gezisi ile Şarap Tadım turuna katılabilirler (45 € — 5 yerel şarap tadımı aperatiflerle birlikte ücrete dahildir). Bu turumuz sonrasında Plovdiv merkezde kalan misafirlerimizi alarak İstanbul'a hareket ediyoruz. Kapıkule sınır kapısında pasaport ve gümrük işlemlerimizi yaptırıp, Türkiye'ye giriş ardından İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Ramada Plaza Sofia Hotel V.B",
        "board": "Oda Kahvaltı",
        "details": "4* Ramada Plaza Sofia V.B tesislerde 1 gece Oda/Kahvaltı konaklama (Yenilenmiş Lüks Odalar).",
        "doublePrice": "119 €",
        "singlePrice": "209 €",
        "child1Price": "100 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      }
    ],
    "includedServices": [
      "2024 model ve üstü yeni nesil otobüslerle ulaşım",
      "Sofya ve Plovdiv panoramik gezileri",
      "4* Ramada Plaza Sofia V.B tesislerde Oda/Kahvaltı konaklama (Yenilenmiş Lüks Odalar)",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "1 Ocak 2027 Cuma",
      "8 Ocak 2027 Cuma",
      "15 Ocak 2027 Cuma",
      "22 Ocak 2027 Cuma",
      "29 Ocak 2027 Cuma",
      "5 Şubat 2027 Cuma",
      "12 Şubat 2027 Cuma",
      "19 Şubat 2027 Cuma",
      "26 Şubat 2027 Cuma",
      "5 Mart 2027 Cuma",
      "12 Mart 2027 Cuma",
      "19 Mart 2027 Cuma",
      "26 Mart 2027 Cuma",
      "2 Nisan 2027 Cuma",
      "9 Nisan 2027 Cuma",
      "16 Nisan 2027 Cuma",
      "23 Nisan 2027 Cuma",
      "30 Nisan 2027 Cuma",
      "7 Mayıs 2027 Cuma",
      "14 Mayıs 2027 Cuma",
      "21 Mayıs 2027 Cuma",
      "28 Mayıs 2027 Cuma",
      "4 Haziran 2027 Cuma",
      "11 Haziran 2027 Cuma",
      "18 Haziran 2027 Cuma",
      "25 Haziran 2027 Cuma",
      "2 Temmuz 2027 Cuma",
      "9 Temmuz 2027 Cuma",
      "16 Temmuz 2027 Cuma",
      "23 Temmuz 2027 Cuma",
      "30 Temmuz 2027 Cuma",
      "6 Ağustos 2027 Cuma",
      "13 Ağustos 2027 Cuma",
      "20 Ağustos 2027 Cuma",
      "27 Ağustos 2027 Cuma",
      "3 Eylül 2027 Cuma",
      "10 Eylül 2027 Cuma",
      "17 Eylül 2027 Cuma",
      "24 Eylül 2027 Cuma",
      "1 Ekim 2027 Cuma",
      "8 Ekim 2027 Cuma",
      "15 Ekim 2027 Cuma",
      "22 Ekim 2027 Cuma",
      "29 Ekim 2027 Cuma",
      "5 Kasım 2027 Cuma",
      "12 Kasım 2027 Cuma",
      "19 Kasım 2027 Cuma",
      "26 Kasım 2027 Cuma",
      "3 Aralık 2027 Cuma",
      "10 Aralık 2027 Cuma",
      "17 Aralık 2027 Cuma"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 7,
    "title": "Selanik & Sofya & Plovdiv Turu",
    "slug": "selanik-sofya-plovdiv-turu-2g",
    "subtitle": "Selanik (1 Gece) + Sofya (1 Gece) + Plovdiv — Yunanistan & Bulgaristan Bir Arada",
    "destination": "Yunanistan & Bulgaristan",
    "duration": "2 Gece 4 Gün",
    "startingPrice": "149 €",
    "imageUrl": "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/007-selanik-sofya-plovdiv-turu-2g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Selanik",
        "description": "Akşam saat 21:00'de Kadıköy evlendirme dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) Yaklaşık 3 saatlik yolculuğun ardından İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Selanik",
        "description": "Sabah saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde; Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'de One Salonica Outlet Mall & Jumbo Mağazası Alışveriş Turuna katılabilir (20 €). Akşam saat 20:00'de Panoramik Selanik Şaheserleri Gece Turu (15 €) veya Canlı müzikli Taverna & Sirtaki programı (75 € / Fix Menü – Limitli İçki). Her iki programda otele dönüş için hareket saat 23:00'te. Geceleme Selanik'teki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Selanik – Sofya",
        "description": "Sabah kahvaltı sonrasında saat 08:00'de Sofya için yola çıkıyoruz. Yaklaşık 4 saatlik yolculukla öğlen saatlerinde Sofya'ya varışımıza müteakip yapacağımız Sofya panoramik şehir turunda; St. Nedelya Kilisesi, Rotunda Kilisesi, Rus Kilisesi, Aya Sofya Kilisesi, Aleksandır Nevski Katedrali, Başbakanlık ve Parlamento binaları, Sofya Üniversitesi, Ulusal Kültür Sarayı, Banyabaşı Camii ve Serdika (Hoşgörü) Meydanı görülecek yerler arasındadır. Saat 15:30'a kadar serbest zaman veriyoruz. Ardından otelimize transfer ve yerleşme. Dileyen misafirlerimiz saat 16:30 Gidiş - 19:00 Dönüş olarak ücretsiz transfer ile Bulgaristan'ın ve Doğu Avrupa'nın en büyük AVM'si Paradise Center'a gidip keyifli zaman geçirebilirler. Akşam dileyen misafirlerimiz ekstra olarak düzenlenecek canlı folklor gösterisiyle tamamlanan Bulgar Gecesine katılabilirler (65 € | 3 servislik Bulgar yemeği & 20cl Şarap veya Bulgar Rakısı veya Alkolsüz İçecek Dahildir!). Geceleme Sofya'daki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Sofya – Plovdiv (Filibe) – İstanbul",
        "description": "Sabah kahvaltı sonrasında saat 08:30'da Plovdiv'e hareket ediyoruz. 8000 yıllık tarihiyle Avrupa'nın en eski şehirlerinden biri olan Plovdiv'e (Filibe) varışımıza müteakip yapacağımız panoramik şehir turumuzda; Cuma Camii, Sveta Bogoroditsa kilisesi, Antik Tiyatro ve Eski Plovdiv gezilecektir. Batenberg caddesinde öğlen yemeği ve alışveriş için serbest zaman vereceğiz. Serbest zamanda dileyen misafirlerimiz ekstra olarak düzenlenecek Trakya Vadisi Bağ Gezisi ile Şarap Tadım turuna katılabilirler (45 € — 5 yerel şarap tadımı aperatiflerle birlikte ücrete dahildir). Sonrasında Kapıkule sınır kapısı üzerinden İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "Selanik 3* Assembly Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Normal Dönem — Selanik (1 Gece) + Sofya (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "149 €",
        "singlePrice": "269 €",
        "child1Price": "119 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Selanik 5* Eona Resort Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Normal Dönem — Selanik (1 Gece) + Sofya (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "169 €",
        "singlePrice": "299 €",
        "child1Price": "119 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Selanik 3* Assembly Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "169 €",
        "singlePrice": "299 €",
        "child1Price": "119 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      },
      {
        "hotelName": "Selanik 5* Eona Resort Hotel V.B + Sofya 4* Ramada Sofia Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "199 €",
        "singlePrice": "349 €",
        "child1Price": "119 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Lüks otobüslerle ulaşım",
      "Selanik, Sofya, Plovdiv panoramik gezileri",
      "Selanik (1) ve Sofya (1) 2 Gece seçilen otellerde Oda/Kahvaltı konaklama",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "7 Ocak 2027 Perşembe",
      "14 Ocak 2027 Perşembe",
      "21 Ocak 2027 Perşembe",
      "28 Ocak 2027 Perşembe",
      "4 Şubat 2027 Perşembe",
      "11 Şubat 2027 Perşembe",
      "18 Şubat 2027 Perşembe",
      "25 Şubat 2027 Perşembe",
      "25 Mart 2027 Perşembe",
      "1 Nisan 2027 Perşembe",
      "8 Nisan 2027 Perşembe",
      "15 Nisan 2027 Perşembe",
      "29 Nisan 2027 Perşembe",
      "3 Haziran 2027 Perşembe",
      "10 Haziran 2027 Perşembe",
      "17 Haziran 2027 Perşembe",
      "24 Haziran 2027 Perşembe",
      "1 Temmuz 2027 Perşembe",
      "8 Temmuz 2027 Perşembe",
      "15 Temmuz 2027 Perşembe",
      "22 Temmuz 2027 Perşembe",
      "29 Temmuz 2027 Perşembe",
      "5 Ağustos 2027 Perşembe",
      "12 Ağustos 2027 Perşembe",
      "19 Ağustos 2027 Perşembe",
      "2 Eylül 2027 Perşembe",
      "9 Eylül 2027 Perşembe",
      "16 Eylül 2027 Perşembe",
      "23 Eylül 2027 Perşembe",
      "30 Eylül 2027 Perşembe",
      "7 Ekim 2027 Perşembe",
      "14 Ekim 2027 Perşembe",
      "21 Ekim 2027 Perşembe",
      "28 Ekim 2027 Perşembe",
      "4 Kasım 2027 Perşembe",
      "11 Kasım 2027 Perşembe",
      "18 Kasım 2027 Perşembe",
      "25 Kasım 2027 Perşembe",
      "2 Aralık 2027 Perşembe",
      "9 Aralık 2027 Perşembe",
      "16 Aralık 2027 Perşembe",
      "23 Aralık 2027 Perşembe"
    ],
    "specialDates": [
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "16 Mayıs 2027 Pazar (Kurban Bayramı)",
      "27 Ağustos 2027 Cuma (Zafer Bayramı)",
      "30 Aralık 2027 Perşembe (Yılbaşı)"
    ],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 8,
    "title": "Parga & Korfu Adası Turu",
    "slug": "parga-korfu-adasi-turu",
    "subtitle": "Parga – Yanya – Korfu Adası – Preveze (2 Gece 4* Palatino Hotel)",
    "destination": "Yunanistan",
    "duration": "2 Gece 4 Gün",
    "startingPrice": "199 €",
    "imageUrl": "https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/008-parga-korfu-adasi-turu.pdf",
    "summaryBadges": [
      "Lüks Araçlarla Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Yanya",
        "description": "Akşam saat 20:00'de Kadıköy Evlendirme Dairesi, saat 20:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM, 22:30'da Çorlu Kavşağı Aytemiz Petrol, 23:30'da Tekirdağ Namık Kemal Yay Tesisleri, 01:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Parga'ya yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Yanya – Parga",
        "description": "Kavala ve Selanik yakınlarında vereceğimiz molalarla birlikte yol alacağımız Yunan otobanında onlarca tünelin içinden geçerek, sabah saatlerinde Yanya'nın tarihi göl bölgesine varıyoruz. Gölün hemen yanında bulunan Yanya Kalesi içine panoramik yürüyüş turu yaparak Ali Paşa Camii ile geleneksel Osmanlı evlerinden oluşan Kaleiçi mahallesini görüp modern Yanya bölgesine geçiyoruz. Dinlenme ve öğlen yemeği için vereceğimiz serbest zaman ardından Parga'ya hareket ediyoruz. Yürüyüş ile Parga'yı geziyoruz: Türk Pazarı Sokağı, Venedik Kalesi, geleneksel Parga evleri ve Parga meydanı. Daha sonra otelimize yerleşiyoruz. Geceleme Parga'daki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Parga – Korfu Adası",
        "description": "Otelimizde alacağımız kahvaltımızın ardından serbest zaman. Arzu edenler ekstra olarak düzenlenecek Korfu Adası Turu'na katılabilirler (75 €). Bu turda, gemi ile İyon denizinin incisi Korfu adasına geçiyoruz. Tarihi Fransız ve Venedik mimarisinden oluşan bu şirin kasabada, Saint Spiridon, Patron Saint Kiliselerini, Theotoki meydanını ve Venedik Kalesi'ni görüyoruz. Şehir merkezinde vereceğimiz serbest zamanda tarihi sokaklarda bulunan seçkin mağazalardan el yapımı hediyelik eşya alabilir veya ünlü Liston meydanındaki kafelerde hoşça vakit geçirebilirsiniz. Ardından Parga'ya otelimize dönüyoruz. Geceleme Parga'daki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Parga – Preveze – İstanbul",
        "description": "Otelimizde alacağımız kahvaltımızın ardından Preveze'ye hareket ediyoruz. Amvrakikos Körfezi'nin ağzında, 1538 yılında gerçekleşen Preveze Savaşı'nın yapıldığı yer olan Preveze'ye varışımıza müteakip Liman ve eski şehir boyunca yürüyerek güzel geleneksel binaları görüp ada benzeri atmosferin tadını çıkarıyoruz. Serbest zaman sonrası İstanbul'a hareket ediyoruz. Yunan Freeshop'unda alışveriş imkânı ve İpsala sınır kapısından Türkiye'ye giriş ardından İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Palatino Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "4* Palatino Hotel (V.B) tesiste 2 gece oda kahvaltı konaklama.",
        "doublePrice": "199 €",
        "singlePrice": "299 €",
        "child1Price": "149 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Özel & Bayram Dönemleri"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Parga, Yanya, Preveze gezileri dahil",
      "4* Palatino Hotel (V.B) tesiste 2 gece oda kahvaltı konaklama",
      "Mali mesuliyet sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför/Rehber/Otel bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "16 Mayıs 2027 Pazar (Kurban Bayramı)",
      "30 Eylül 2027 Perşembe",
      "28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 9,
    "title": "Balkan Üçgeni Turu",
    "slug": "balkan-ucgeni-turu-2g",
    "subtitle": "Atatürk'ün İzinde… Üsküp'te 2 Gece Konaklama — Selanik – Üsküp – Tetova (Kalkandelen) – Ohri – Bitola (Manastır) – Sofya",
    "destination": "Yunanistan & Makedonya & Bulgaristan",
    "duration": "2 Gece 4 Gün",
    "startingPrice": "169 €",
    "imageUrl": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/009-balkan-ucgeni-turu-2g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Selanik",
        "description": "Akşam saat 21:00'de Kadıköy evlendirme dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) Yaklaşık 3 saatlik yolculuğun ardından İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Selanik – Üsküp",
        "description": "Kavala yakınlarında vereceğimiz molayı takiben sabah saatlerinde Selanik'e varıyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Aristoteles meydanında kahvaltı ve şehri tanıma için verilecek serbest zaman sonrasında, otobüsle yapacağımız panoramik şehir gezimizde; Beyaz Kule, Büyük İskender Heykeli, Döner Kule, Uluslararası Fuar Alanı, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Yunanistan Makedonya'sı Başkanlık Sarayı ve Aya Dimitros Kilisesi görülecek yerler arasındadır. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ettikten sonra Üsküp'e hareket. Yunanistan ve Makedonya gümrük ve pasaport işlemlerinin ardından yaklaşık 3 saatlik yolculukla Üsküp'e varış. Üsküp girişinde Bit Pazarı, Sultan Murat Cami, İsa Bey Cami, Üsküp Adliyesi ilk olarak otobüsten göreceğimiz yerler arasındadır. Şehir merkezine varışımıza müteakip yapacağımız panoramik Üsküp yürüyüş turumuza Yeni Üsküp'ten başlıyoruz: Eski Tren İstasyonu, Rahibe Teresa Anı Evi, Büyük İskender Heykeli, II. Filip Heykeli, Arkeoloji Müzesi, Zafer Takı, Çar Samuel Heykeli, I. Justinyanus Heykeli ve Taş Köprü üzerinden Vardar Nehri'ni geçerek Eski Üsküp bölgesine geçiyoruz. Türk Çarşısı içinde Davutpaşa Hamamı, Kapan Han, Çifte Hamam, Sulu Han, Kurşunlu Han, Mustafa Paşa Cami ve Üsküp Kalesi'ni (dışarıdan) görerek otelimize hareket ediyoruz. Geceleme Üsküp'teki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Üsküp – Tetova (Kalkandelen) – Ohri – Bitola (Manastır) – Üsküp",
        "description": "Sabah kahvaltı ardından serbest zaman. Arzu edenler ekstra olarak düzenlenecek Tam Gün Tetova & Bitola (Manastır) & Ohri turuna katılabilir (75 €). Kahvaltı ardından saat 08:00'de hareket ediyoruz. Yol üzerinde Makedonya'nın en büyük üçüncü kenti Tetova'yı (Kalkandelen) ve 1495 yılında yapılmış görkemli Alaca Cami'yi ziyaret ediyoruz. Ardından Bitola'ya (Manastır) hareket: Yeni Cami, Türk Çarşısı (Elveda Rumeli dizisindeki tarihi sokaklar), Kapalı Çarşı, İshak Paşa Cami, Saat Kulesi, Şirok Sokak ve ulu önder Atatürk'ün okuduğu askeri okul İdadi'yi görüyoruz. Kısa bir serbest zaman verdikten sonra Ohri'ye hareket ediyoruz. Ohri Kalesi, Ohri Camii, Ohri Çarşısı, Eski Osmanlı Evleri, Aya Sofya ve Aziz Kaneo Kiliseleri ile Balkanların en büyük göllerinden biri olan Ohri Gölü görülecek yerler arasındadır. Serbest zamanda dünyaca ünlü Ohri İncisi satın alma imkânı. Serbest zaman bitiminde Üsküp'teki otelimize dönüyoruz. Geceleme Üsküp'te."
      },
      {
        "day": "4. Gün",
        "title": "Üsküp – Sofya – İstanbul",
        "description": "Erken alacağımız kahvaltı ardından saat 08:00'de otelimizden çıkış işlemlerinin yapılması sonrasında Sofya'ya hareket ediyoruz. Deve Bayırı sınır kapısında pasaport ve gümrük işlemleri ardından Sofya'ya varışımıza müteakip yapacağımız şehir turunda; St. Nedelya Kilisesi, Rotunda Kilisesi, Rus Kilisesi, Aya Sofya Kilisesi, Aleksandır Nevski Katedrali, Başbakanlık ve Parlamento binaları, Sofya Üniversitesi, Ulusal Kültür Sarayı ve Mimar Sinan tarafından tasarlanan Banyabaşı Camii görülecek yerler arasındadır. Öğlen yemeği ve şehri tanımak için vereceğimiz serbest zaman sonrasında İstanbul'a hareket. Plovdiv yakınlarında vereceğimiz mola ve Kapıkule Sınır Kapısı işlemleri ardından gece yarısı İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "Üsküp 3* Portal Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Üsküp 3* Portal Hotel V.B tesiste 2 gece oda kahvaltı konaklama.",
        "doublePrice": "169 €",
        "singlePrice": "269 €",
        "child1Price": "100 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      },
      {
        "hotelName": "Üsküp 4* Continental Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Üsküp 4* Continental Hotel V.B tesiste 2 gece oda kahvaltı konaklama.",
        "doublePrice": "199 €",
        "singlePrice": "299 €",
        "child1Price": "100 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Selanik, Üsküp, Sofya gezileri dahil",
      "Seçilen kategorideki otelde 2 gece oda kahvaltı konaklama",
      "Mali mesuliyet sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sigortası",
      "Çok Girişli Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför/Rehber/Otel bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "28 Haziran 2027 Pazartesi",
      "5 Temmuz 2027 Pazartesi",
      "12 Temmuz 2027 Pazartesi",
      "19 Temmuz 2027 Pazartesi",
      "26 Temmuz 2027 Pazartesi",
      "2 Ağustos 2027 Pazartesi",
      "9 Ağustos 2027 Pazartesi",
      "16 Ağustos 2027 Pazartesi",
      "23 Ağustos 2027 Pazartesi",
      "18 Kasım 2027 Perşembe"
    ],
    "specialDates": [
      "28 Ocak 2027 Perşembe (Sömestre)",
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "16 Mayıs 2027 Pazar (Kurban Bayramı)",
      "27 Ağustos 2027 Cuma (Zafer Bayramı)",
      "28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)",
      "29 Aralık 2027 Çarşamba (Yılbaşı)"
    ],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için çok girişli Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 10,
    "title": "Selanik & Halkidiki & Thassos Yüzme Turu",
    "slug": "selanik-halkidiki-thassos-yuzme-turu-2g",
    "subtitle": "Selanik (2 Gece 4* Panorama Hotel) + Halkidiki (Kassandra & Sithonia) + Thassos Adası",
    "destination": "Yunanistan",
    "duration": "2 Gece 4 Gün",
    "startingPrice": "199 €",
    "imageUrl": "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/010-selanik-halkidiki-thassos-yuzme-turu-2g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Selanik",
        "description": "Akşam saat 21:00'de Kadıköy Evlendirme Dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM, 23:30'da Çorlu Kavşağı Aytemiz Petrol, 00:30'da Tekirdağ Namık Kemal Yay Tesisleri, 02:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Selanik – Halkidiki (Kassandra – 1. Parmak)",
        "description": "Sabah saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde; Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, saat 14:00'e kadar serbest zaman veriyoruz. Sonrasında otelimize yerleşme ardından serbest zaman. Dileyen misafirlerimiz ekstra olarak düzenlenecek Halkidiki / Afytos turuna katılabilirler (60 € / Şezlong & Şemsiye dahil!). Turumuz saat 15:00'de başlıyor. Yaklaşık 1,5 saatlik yolculukla Halkidiki'nin merkezi sayılan Kassandra yarımadasında saat 18:00'e kadar yüzme molası veriyoruz. Saat 18:00'de Halkidiki'nin turistik yerleşim yeri Afytos'a geçip saat 21:00'e kadar birbirinden güzel tavernaların, kafelerin, mağazaların tadını çıkarıyoruz. Saat 22:30 sularında otelimize dönmüş oluyoruz. Geceleme Selanik'teki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Selanik – Halkidiki (Sithonia – 2. Parmak)",
        "description": "Sabah kahvaltı sonrası serbest zaman. Dileyen misafirlerimiz ekstra ücret ödeyerek Tam Gün Büyük Halkidiki Tekne turuna katılabilirler (75 €). Bu turumuzda saat 08:00'de otelden hareket edip 1,5 saatlik bir yolculukla Neos Marmaras limanında bizleri bekleyen özel teknemize binerek, Halkidiki'nin birbirinden güzel koylarını gezip kristal sularda yüzme imkânı bulunmaktadır. Halkidiki'nin orta parmağı Sithonia'da, Kelyfos Adası'nda, Diamond Beach'te ve Tarakliya koyunda yüzme molaları ardından saat 16:00 sularında Neos Marmaras limana geri dönüş, Neos Marmaras'ta 1 saatlik serbest zaman sonrası 19:00 sularında otelimize vararak turumuzu noktalıyoruz. Dileyen misafirlerimiz akşam saat 20:00'de düzenlenecek Panoramik Selanik Şaheserleri Gece Turuna katılabilir (15 €) veya Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Her iki programda otele dönüş için hareket saat 23:00'te. Geceleme Selanik'teki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Halkidiki – Thassos Adası – İstanbul",
        "description": "Sabah kahvaltı sonrası saat 08:00'de Keramoti'ye hareket ediyoruz. Yaklaşık 3 saatlik keyifli bir yolculuk ardından Keramoti'ye varmadan önce Kavala Kurabiye fabrikasında kısa bir mola verdikten sonra Keramoti'de 17:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz ekstra olarak düzenlenecek Thassos Adası turuna katılabilirler (45 €). Bu turumuzda ilk durağımız Thassos adasının en bakir köyü olan Panagia köyü, Panagia Kilisesi ve geleneksel zeytinyağı fabrika ve müzesi ziyareti. Ardından panoramik olarak Limenas bölgesini geziyoruz. Dileyen misafirlerimiz Limenas'ta bulunan plajlarda deniz, kum ve güneşin, dileyen misafirlerimiz ise tavernalarda Yunan lezzetlerinin tadını çıkarıp çarşıda alışveriş yapabilirler. Saat 16:30'da Limenas'tan hareket ederek 16:45 Feribotu ile Keramoti'ye geçip, sınır kapısına geliyoruz. Pasaport, gümrük ve Freeshop alışverişlerinden sonra İpsala, Keşan, Tekirdağ yolunu takip ederek İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Panorama Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Selanik 4* Panorama Hotel'de (V.B) 2 Gece Oda/Kahvaltı konaklama.",
        "doublePrice": "199 €",
        "singlePrice": "299 €",
        "child1Price": "149 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Yaz Dönemi"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Panoramik Selanik gezisi",
      "Selanik 4* Panorama Hotel'de (V.B) 2 Gece Oda/Kahvaltı konaklama",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "1 Temmuz 2027 Perşembe",
      "8 Temmuz 2027 Perşembe",
      "15 Temmuz 2027 Perşembe",
      "22 Temmuz 2027 Perşembe",
      "29 Temmuz 2027 Perşembe",
      "5 Ağustos 2027 Perşembe",
      "12 Ağustos 2027 Perşembe",
      "19 Ağustos 2027 Perşembe",
      "27 Ağustos 2027 Cuma",
      "2 Eylül 2027 Perşembe"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 11,
    "title": "İyonya Efsaneleri Yüzme Turu",
    "slug": "iyonya-efsaneleri-yuzme-turu-3g",
    "subtitle": "Efsane, Deniz ve Tarih ile Kutsanmış İyon Denizi Lefka'da 3 Gece Konaklama — Parga – Paxos / Antipaxos Adaları – Lefka – Kefalonia – Ithaca – Meganisi – Skorpios",
    "destination": "Yunanistan",
    "duration": "3 Gece 5 Gün",
    "startingPrice": "399 €",
    "pdfUrl": "/turlar/011-iyonya-efsaneleri-yuzme-turu-3g.pdf",
    "summaryBadges": [
      "Lüks Araçlarla Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Preveze",
        "description": "Akşam saat 20:00'de Kadıköy Evlendirme Dairesi, saat 20:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM, 22:30'da Çorlu Kavşağı Aytemiz Petrol, 23:30'da Tekirdağ Namık Kemal Yay Tesisleri, 01:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe), Kavala ve Selanik üzerinden Preveze'ye yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Preveze – Lefka",
        "description": "Kavala, Selanik ve Yanya yakınlarında vereceğimiz molalarla birlikte yol alacağımız Yunan otobanında onlarca tünelin içinden geçerek, öğlen saatlerinde Preveze'ye varışımıza müteakip, Preveze'de kısa bir panoramik yürüyüş turu yaptıktan sonra Lefka'daki otelimize geçiyor ve odalarımıza yerleşiyoruz. Geceleme Lefka'daki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Parga – Paxos / Antipaxos Adaları",
        "description": "Otelimizde alacağımız kahvaltımızın ardından serbest zaman. Arzu edenler ekstra olarak düzenlenecek Paxos / Antipaxos Adaları Tekne turuna katılabilirler (75 €). Saat 07:30'da otelimizden ayrılıyor ve Parga limanına hareket ediyoruz. Tekne turumuz saat 10:00'da başlıyor. İlk etapta yaklaşık bir buçuk saatlik yolculuk ardından yüzme molası veriyoruz. Jet sosyetenin de botlarıyla yüzmek için yakınlarında durduğu, turkuaz renkli bu müthiş, nadide ve büyüleyici plaj molasından sonra yolculuğumuz Antipaxos adasının batısını, sadece denizden görülebilen, dik kayalıkları, gizemli mağaraları, dalgaların oluşturduğu enteresan şekilleri görerek devam ediyor. Turkuaz renkli berrak deniz suyunda gizemli mağarada yarım saatlik yüzme molası veriyoruz. Sonrasında kısa bir yolculukla Paxos adasının merkezine, Gaios'a geçiyoruz. Burada vereceğimiz iki buçuk saatlik serbest zamanda hem öğlen yemeği yiyebilir hem de adanın merkezindeki plajlarda yüzmeye devam edebilirsiniz. Serbest zaman ardından tekneyle yaklaşık iki saatlik bir yolculukla Parga'ya unutulmaz hatıralarla geri dönüyoruz. Tekne sonrasında Parga'da plaj veya akşam yemeği için saat 20:00'ye kadar serbest zaman veriyoruz. Saat 22:00 sularında otelimize dönüş. Geceleme Lefka'daki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Lefka / Kefalonia / Ithaca / Meganisi / Skorpios Adaları",
        "description": "Otelimizde alacağımız kahvaltımızın ardından serbest zaman. Arzu edenler ekstra olarak düzenlenecek Lefka & Kefalonia Adaları (7 Adalar) turuna katılabilirler (85 €). Kahvaltı sonrası 08:00'de otelimizden otobüsle hareket ediyoruz. Yarım saatlik otobüs yolculuğu ile Lefka Adası Nidri limanına gidiyoruz. Sonrasında özel cruise gemisi ile İyon denizinin en ünlü adalarından Lefka'daki Egremni Plajında turkuaz İyon denizinde ve hiç kuşkusuz Avrupa'nın en ünlü plajları arasında yer alan Porto Katsiki'de hayatınız boyunca unutamayacağınız yüzme molaları ile İyonya'nın pırlantası olarak tabir edilen Kefalonia adasında Fiskardo'da keşif molası. Meganisi adasında Papanikolis mağarasında fotoğraf molası, Skorpios adasında yüzme molası; Scorpidi, Sparti ve Madouri adalarını panoramik olarak görmüş olacağız. Sabah girişte 1 Kruvasan & Kahve ikramı olacak. Öğlen yemeğimizi bir içecek dahil olarak teknede barbekü olarak alacağız. Akşam 19:00 sularında otelimize dönüyoruz. Geceleme Lefka'daki otelimizde."
      },
      {
        "day": "5. Gün",
        "title": "Lefka – İstanbul",
        "description": "Otelde alacağımız sabah kahvaltısı ardından İstanbul'a hareket. Güzergah üzerinde muhtelif noktalarda ve Kavala Kurabiye fabrikasında durarak sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Yunan Freeshop'unda alışveriş imkânı. İpsala sınır kapısından Türkiye'ye giriş ardından yaklaşık 3 saatlik bir yolculukla İstanbul'a varış ve turumuzun sonu. Bir sonraki turumuzda görüşmek dileği ile…"
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "Lefka – 3*+ Hotel Lefkas (V.B)",
        "board": "Oda Kahvaltı",
        "details": "Tesis Lefka merkezde, modern mimarisi ile marina önünde merkezi konumda bulunmaktadır. 3 gece oda kahvaltı konaklama.",
        "doublePrice": "399 €",
        "singlePrice": "679 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Preveze panoramik şehir turu",
      "3*+ Lefkas Hotel (V.B) tesiste 3 gece oda kahvaltı konaklama",
      "Mali mesuliyet sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat & Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför/Rehber/Otel bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "2 Temmuz 2027 Cuma",
      "16 Temmuz 2027 Cuma",
      "30 Temmuz 2027 Cuma",
      "13 Ağustos 2027 Cuma",
      "10 Eylül 2027 Cuma"
    ],
    "specialDates": [
      "14 Mayıs 2027 Cuma (Kurban Bayramı)",
      "27 Ağustos 2027 Cuma (Zafer Bayramı)"
    ],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Odalarda 3. kişi için ilave yatak konulmaktadır.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ],
    "imageUrl": "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=1600&auto=format&fit=crop"
  },
  {
    "order": 12,
    "title": "Halkidiki Yüzme Turu",
    "slug": "halkidiki-yuzme-turu-3g",
    "subtitle": "Yunanistan'ın En Meşhur Tatil Bölgesi Halkidiki'nin Kalbinde 3 Gece Konaklama",
    "destination": "Yunanistan",
    "duration": "3 Gece 5 Gün",
    "startingPrice": "349 €",
    "pdfUrl": "/turlar/012-halkidiki-yuzme-turu-3g.pdf",
    "summaryBadges": [
      "Lüks Araçlarla Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Halkidiki",
        "description": "Akşam saat 21:00'de Kadıköy Evlendirme Dairesi, saat 21:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 22:00'de İncirli Ömür Plaza önü, 22:30'da Beylikdüzü Marmara Park AVM önü, 23:00'de Silivri Vega AVM, 23:30'da Çorlu Kavşağı Aytemiz Petrol, 00:30'da Tekirdağ Namık Kemal Yay Tesisleri, 02:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Halkidiki'ye yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Halkidiki",
        "description": "Sabah Halkidiki'nin merkezi sayılan Kassandra yarımadasında yüzme molası ile güne başlıyoruz. Saat 16:00'da otelimize hareket ediyor ve odalarımıza yerleşiyoruz. Saat 19:30'da Kassandra kasabasının turistik yerleşim yeri Afytos'a gidiyor ve kısa panoramik yürüyüş sonrası akşam yemeği ve keşif için serbest zaman veriyoruz. Saat 22:30'da otele dönüş için hareket. Geceleme Halkidiki'deki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Halkidiki",
        "description": "Sabah kahvaltı sonrası serbest zaman, otelimizin havuzunda güneşin keyfini çıkarıyoruz. Dileyen misafirlerimiz ekstra ücret ödeyerek 10:00 gidiş - 16:00 dönüş olarak Possidi Cape (Possidi Burnu) & Lidl Market Turuna katılabilirler (35 €). Bu güzide bakir plaj bölgesinde el değmemiş / tesisleşmemiş kumsalın tadını saat 14:00'e kadar çıkarıyor, sonrasında yaklaşık 20 dk'lık yolculukla Lidl Market'te 1 saatlik alışveriş molası verip otele dönüyoruz. Dileyen misafirlerimiz akşam saat 18:45'te düzenlenecek Panoramik Selanik Şaheserleri ve canlı müzikli, eğlenceli Taverna & Sirtaki turuna katılabilirler (75 € / Fix Menü – Limitli İçki). Geceleme Halkidiki'deki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Halkidiki",
        "description": "Sabah kahvaltı sonrası serbest zaman, otelimizin havuzunda veya kısa bir yürüyüşle plajda deniz, kum ve güneşin keyfini çıkarıyoruz. Dileyen misafirlerimiz ekstra ücret ödeyerek Tam Gün Büyük Halkidiki Tekne turuna katılabilirler (75 €). Bu turumuzda saat 09:00'da otelden hareket edip 45 dk'lık bir yolculukla Palouri limanında bizleri bekleyen özel teknemize binerek, Halkidiki'nin birbirinden güzel koylarını gezip kristal sularda yüzme imkânı bulunmaktadır. Halkidiki'nin orta parmağı Sithonya'da, Kelyfos Adası'nda yüzme molası, Neos Marmaras'ta yüzme ve öğlen yemeği molası, sonrasında Tarakliya koyunda yüzme molaları ardından saat 17:00 sularında limana geri dönüş, 18:45 sularında otelimize vararak turumuzu noktalıyoruz. Dileyen misafirlerimiz akşam ekstra ücret ödeyerek birbirinden güzel ve seçkin tavernaların, mağazaların, marketlerin bulunduğu Kallithea servisinden faydalanabilir (15 €). Geceleme Halkidiki'deki otelimizde."
      },
      {
        "day": "5. Gün",
        "title": "Halkidiki – Thassos Adası – İstanbul",
        "description": "Sabah kahvaltı sonrası saat 08:00'de Keramoti'ye hareket ediyoruz. Yaklaşık 3 saatlik keyifli bir yolculuk ardından Keramoti'ye varmadan önce Kavala Kurabiye fabrikasında kısa bir mola verdikten sonra Keramoti'de 17:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz ekstra olarak düzenlenecek Thassos Adası turuna katılabilirler (45 €). Bu turumuzda ilk durağımız Thassos adasının en bakir köyü ve en kutsal yerleşim birimi olan Panagia köyü. Burada geleneksel Yunan köy evleri arasından yürüyerek Panagia Kilisesi'ni gördükten sonra zeytini ile ünlü bölgede geleneksel zeytinyağı fabrika ve müzesini ziyaret edip, köyde vereceğimiz molada dileyenler köy meydanındaki kahvehanede kahvelerini yudumlayabilir, dileyenler adanın en meşhur tavernasında (Kuzu/Oğlak/Kokoreç) lezzetleri deneyebilirler. Ardından panoramik olarak Limenas bölgesini geziyoruz. Dileyen misafirlerimiz Limenas'ta bulunan plajlarda deniz, kum ve güneşin, dileyen misafirlerimiz ise Limenas'ta bulunan tavernalarda Yunan lezzetlerinin tadını çıkarıp çarşıda alışveriş yapabilirler. Saat 16:30'da Limenas'tan hareket ederek 16:45 feribotu ile Keramoti'ye geçip, yaklaşık 2,5 saatlik bir yolculukla sınır kapısına geliyoruz. Pasaport, gümrük ve Freeshop alışverişlerinden sonra İpsala, Keşan, Tekirdağ yolunu takip ederek İstanbul'a ulaşıp, sizleri tur başlangıcında almış olduğumuz yerlerde indirerek turumuzu bitiriyoruz."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Greek Pride Palma Village Hotel & Tatilköyü (V.B)",
        "board": "Oda Kahvaltı",
        "details": "4* Greek Pride Palma Village Hotel & Tatilköyü V.B otelde 3 gece oda-kahvaltı konaklama.",
        "doublePrice": "349 €",
        "singlePrice": "549 €",
        "child1Price": "249 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "4* Greek Pride Palma Village Hotel & Tatilköyü V.B otelde 3 gece oda-kahvaltı konaklama",
      "Panoramik Afytos turu",
      "Mali Mesuliyet Sigortası",
      "Türkçe Rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış harcı",
      "Ekstra Turlar",
      "Tüm öğlen ve akşam yemekleri",
      "Kişisel Harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "30 Haziran 2027 Çarşamba",
      "7 Temmuz 2027 Çarşamba",
      "14 Temmuz 2027 Çarşamba",
      "21 Temmuz 2027 Çarşamba",
      "28 Temmuz 2027 Çarşamba",
      "4 Ağustos 2027 Çarşamba",
      "11 Ağustos 2027 Çarşamba",
      "18 Ağustos 2027 Çarşamba",
      "25 Ağustos 2027 Çarşamba",
      "1 Eylül 2027 Çarşamba",
      "8 Eylül 2027 Çarşamba",
      "15 Eylül 2027 Çarşamba"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Uluslararası kurallar gereği otel girişleri 14:00'den sonra, otel çıkışları 12:00'den önce olmaktadır.",
      "Halkidiki'ye erken saatlerde varmamıza karşın yukarıda belirtilen kural gereği odalara hemen yerleşememekteyiz. Bu nedenle Halkidiki tatilinden maksimum seviyede faydalanabilmeniz adına, plaj çantalarınızı pratik bir şekilde kullanabileceğiniz doğrultuda düzenlemenizi tavsiye ederiz. Programımızda belirtilen plajlarda üst değiştirme imkânı bulunmaktadır.",
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde ve/veya programda bildirilen mekân isimlerinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir. Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ],
    "imageUrl": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop"
  },
  {
    "order": 13,
    "title": "Thassos Adası Yüzme Turu",
    "slug": "thassos-adasi-yuzme-turu-3g",
    "subtitle": "Yunanistan'ın En Bakir ve En Yeşil Adası Thassos'un Kalbinde 3 Gece Konaklama",
    "destination": "Yunanistan",
    "duration": "3 Gece 5 Gün",
    "startingPrice": "489 €",
    "pdfUrl": "/turlar/013-thassos-adasi-yuzme-turu-3g.pdf",
    "summaryBadges": [
      "Lüks Araçlarla Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Thassos Adası",
        "description": "Akşam saat 22:00'de Kadıköy Evlendirme Dairesi, saat 22:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 23:00'de İncirli Ömür Plaza önü, 23:30'da Beylikdüzü Marmara Park AVM önü, 23:59'da Silivri Vega AVM önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) Yaklaşık 3 saatlik yolculuğun ardından İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) üzerinden Keramoti'ye yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Thassos Adası",
        "description": "Sabah erken saatlerde feribot ile Keramoti'den Thassos Adası'na geçiyoruz. Limenas merkezde rehberimizin bildireceği otel giriş saatine kadar; çarşı, deniz, kum ve güneş keyfi için serbest zaman. Dileyen misafirlerimiz merkezde bulunan plajlardan faydalanabilirler. Öğleden sonra 15:00'te otelimize giriş ve dinlenme ardından, dileyen misafirlerimiz akşam saat 20:30'da ekstra olarak Geleneksel Müzikli Yunan Taverna gecesine katılabilir (75 € / Fix Menü – Limitli İçki). Dileyen misafirlerimiz ücretsiz Limenas servisinden faydalanabilirler. Geceleme Thassos'ta."
      },
      {
        "day": "3. Gün",
        "title": "Thassos Adası",
        "description": "Sabah plaj keyfi için serbest zaman. Dileyen misafirlerimiz ekstra ücret ödeyerek saat 09:00'da başlayacak olan Ada Turu (Potos & Pissili Ammos Beach & Giola & Aliki Beach & Panagia Köyü) programına katılabilirler (75 €). Bu turumuzda öncelikle adanın mütevazı köylerini görerek Thassos Adası'nın en popüler turistik bölgesi olan Potos'a gidiyoruz. Çarşıda yapacağımız kısa bir yürüyüş ardından alışveriş ve keyif için kısa bir serbest zaman veriyoruz. Ardından adanın en güzide plajı Pissili Ammos Beach'e gidip deniz, kum ve güneşten faydalanıyoruz (Şezlong-Şemsiye-Kahve dahil!). (Çok yoğun sezonda şezlong-şemsiye için biraz beklenebilir fakat genel alanlar kullanılarak plaj keyfi hemen başlar!) Saat 14:30'da Thassos Adası'nın en önemli sembollerinden Giola'yı (Zeus'un Gözü/Oyuk Kaya) görmek isteyen misafirlerimizi yürüyüş parkuru başlangıç noktasına bırakıyoruz. (Giola için yaklaşık 30 dk'lık patika yürüyüşü gerekmektedir. Lütfen yanınıza ayakkabı almayı unutmayınız!) Saat 16:00'da Pissili Ammos'tan ayrılıyor ve 16:15'te Giola'yı ziyaret eden misafirlerimizle buluşarak yol üzerinde Archangelos Manastırı'nı görüyoruz. (Manastır açıksa içeriye girip ziyaret ediyoruz!) Ardından Aliki Antik Şehri'nde 1 saatlik yüzme ve keşif molası veriyoruz. Turumuzun son durağı Thassos adasının en bakir köyü ve en kutsal yerleşim birimi olan Panagia köyü. Burada geleneksel Yunan köy evleri arasından yürüyerek Panagia Kilisesi'ni gördükten sonra zeytini ile ünlü bölgede geleneksel zeytinyağı fabrika ve müzesini ziyaret edip, köyde vereceğimiz molada dileyenler köy meydanındaki kahvehanede kahvelerini yudumlayabilir, dileyenler adanın en meşhur tavernasında (Kuzu/Oğlak/Kokoreç) lezzetleri deneyebilirler. Mola ardından adanın çevresini tam olarak görmüş olarak saat 20:30'da otelimize dönüyoruz. Geceleme Thassos'ta."
      },
      {
        "day": "4. Gün",
        "title": "Thassos Adası",
        "description": "Sabah plaj keyfi için serbest zaman. Dileyen misafirlerimiz ekstra ücret ödeyerek Thassos Adası'nın simgesi olan bakir Marble Beach'e gidip tam gün deniz, kum ve güneşten faydalanabilirler (75 €) (Şezlong-Şemsiye-Öğlen Yemeği {Club Sandviç veya Sezar Salata}-Soft İçki dahil!). Dileyenler ekstra ücret ödeyerek Özel Yelkenli Tekne turuna katılıp, 09:00-16:00 saatleri arasında Thassos adasının eşsiz doğu sahillerini özel yelkenli tekneden görüp bakir koylarda yüzebilirler (Bu turumuza otel-liman transferleri dahildir.) (75 €). Akşam dileyen misafirlerimiz ücretsiz Limenas servisinden faydalanabilirler. Geceleme Thassos'ta."
      },
      {
        "day": "5. Gün",
        "title": "Thassos Adası – İstanbul",
        "description": "Sabah kahvaltı sonrası saat 11:00'de İstanbul'a hareket ederek 11:30 feribotu ile Keramoti'ye geçip, Kavala Kurabiye fabrikasında kısa bir mola verdikten sonra yaklaşık 2,5 saatlik bir yolculukla Kipi sınır kapısına geliyoruz. Pasaport, gümrük ve Freeshop alışverişlerinden sonra Meriç Nehri üzerinden geçerek İpsala Türk Sınır Kapısı'nda yapacağımız pasaport ve gümrük işlemleri sonrası İpsala, Keşan, Tekirdağ yolunu takip ederek İstanbul'a ulaşıp, sizleri tur başlangıcında almış olduğumuz yerlerde indirerek turumuzu bitiriyoruz."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "Barocco Wave Island-Park-Hotel — Standart Oda",
        "board": "Oda Kahvaltı (Açık Büfe)",
        "details": "Denize Sıfır / Ücretsiz Plaj & Şezlong / İnce Kum! Golden Beach / Skala Potamia merkezde butik otel. Lüks ve konforlu 1. sınıf dizayn oteli. Standart oda.",
        "doublePrice": "489 €",
        "singlePrice": "739 €",
        "child1Price": "299 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      },
      {
        "hotelName": "Barocco Wave Island-Park-Hotel — Deniz Manzaralı Oda",
        "board": "Oda Kahvaltı (Açık Büfe)",
        "details": "Denize Sıfır / Ücretsiz Plaj & Şezlong / İnce Kum! Golden Beach / Skala Potamia merkezde butik otel. Lüks ve konforlu 1. sınıf dizayn oteli. Deniz manzaralı oda.",
        "doublePrice": "579 €",
        "singlePrice": "869 €",
        "child1Price": "399 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Dönemi"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Barocco Wave Island-Park Hotel'de 3 gece konaklama",
      "Açık büfe kahvaltı",
      "Feribot ile Keramoti – Thassos Adası gidiş-dönüş geçiş ücreti",
      "Mali Mesuliyet Sigortası",
      "Türkçe Rehberlik hizmeti"
    ],
    "excludedServices": [
      "Zorunlu Seyahat & Sağlık Sigortası",
      "Schengen vize ücreti",
      "Yurtdışı çıkış harcı",
      "Ekstra Turlar",
      "Tüm öğlen ve akşam yemekleri",
      "Kişisel Harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "23 Haziran 2027 Çarşamba",
      "30 Haziran 2027 Çarşamba",
      "7 Temmuz 2027 Çarşamba",
      "14 Temmuz 2027 Çarşamba",
      "21 Temmuz 2027 Çarşamba",
      "28 Temmuz 2027 Çarşamba",
      "4 Ağustos 2027 Çarşamba",
      "11 Ağustos 2027 Çarşamba",
      "18 Ağustos 2027 Çarşamba",
      "25 Ağustos 2027 Çarşamba",
      "1 Eylül 2027 Çarşamba",
      "8 Eylül 2027 Çarşamba",
      "15 Eylül 2027 Çarşamba"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Uluslararası kurallar gereği otel girişleri 14:00'den sonra, otel çıkışları 12:00'den önce olmaktadır.",
      "Barocco Wave Island Park Hotel tesisinde Standart odada; 3. kişi için veya iki ayrı yataklı oda taleplerinde odaya ilave yatak konulmaktadır. Deniz Manzaralı odada 3. kişi için veya iki ayrı yataklı oda taleplerinde standart yatak verilmektedir.",
      "Barocco Wave Island Park Hotel tesisinde plaja giriş ve şezlong / şemsiye ücreti yoktur. Ancak yerel yönetimler yasasına göre şezlong / şemsiye kullanımı için bir miktar harcama zorunluluğu bulunmaktadır.",
      "Adaya erken saatlerde varmamıza karşın yukarıda belirtilen kural gereği odalara hemen yerleşememekteyiz. Bu nedenle Thassos tatilinden maksimum seviyede faydalanabilmeniz adına, plaj çantalarınızı pratik bir şekilde kullanabileceğiniz doğrultuda düzenlemenizi tavsiye ederiz.",
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde ve/veya programda bildirilen mekân isimlerinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir. Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa / Setra otobüs araçlardan biriyle gerçekleştirilmektedir."
    ],
    "imageUrl": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop"
  },
  {
    "order": 14,
    "title": "İskeçe Karnavalı Turu (Alexandroupolis Konaklamalı)",
    "slug": "iskece-karnavali-alexandroupolis-2g",
    "subtitle": "2 Gece Konaklamalı Alexandroupolis (Dedeağaç) — Karnavaldan Sonra After Party & Taverna İmkanı",
    "destination": "Yunanistan",
    "duration": "2 Gece 3 Gün",
    "startingPrice": "249 €",
    "pdfUrl": "/turlar/014-iskece-karnavali-alexandroupolis-2g.pdf",
    "summaryBadges": [
      "Lüks Araçlarla Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Alexandroupolis (Dedeağaç)",
        "description": "Sabah saat 03:00'te Kadıköy Evlendirme Dairesi, saat 03:15'te Mecidiyeköy Meydan/Bambi Cafe önü, saat 03:30'da İncirli Ömür Plaza önü, 03:45'te Beylikdüzü Marmara Park AVM önü, 04:00'te Silivri Vega AVM önü, 04:30'da Çorlu Kavşağı Aytemiz Petrol, 05:15'te Tekirdağ Namık Kemal Yay Tesisleri, 07:00'de Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala'ya varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, yarım saatlik bir yolculukla Alexandroupolis'e varıyoruz. Alexandroupolis'e varışımızda dileyen misafirlerimiz ekstra olarak düzenlenecek Skalaventis Market (45 dk) & Lidl Market (45 dk) & Jumbo Mağazası (1,5 saat) Alışveriş turuna katılabilirler (10 €). Dedeağaç'ın keyfini çıkarmak üzere merkezde vereceğimiz serbest zaman sonrasında 15:00'te otele gidiyoruz. Şehir merkezinde bulunan otelimizde Alexandroupolis ve otelin keyfini çıkarmak için serbest zaman. Geceleme Alexandroupolis'te."
      },
      {
        "day": "2. Gün",
        "title": "Alexandroupolis – Xanthi (İskeçe Karnavalı)",
        "description": "Sabah keyifli bir Pazar kahvaltısı ile güne başlıyoruz. Kahvaltı ardından 10:00'da Xanthi (İskeçe)'ye hareket ediyoruz. Yolculuğumuz yaklaşık 1,5 saat sürüyor. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan Xanthi (İskeçe)'de akşam saat 21:00'e kadar, İskeçe Karnavalı'nın coşkusu ile keyfini çıkarmak ve eğlenmek üzere serbest zaman veriyoruz. Akşam 16:00'da karnaval bitiminde dileyen misafirlerimiz ekstra olarak düzenlenecek After Party & Taverna organizasyonuna katılabilirler (75 € / After Party Giriş Ücreti + 1 İçki ile Taverna'da Fix Menü Yemek + 1 İçki Ücrete Dahildir.). Bu etkinliğe katılacak olan misafirlerimizle saat 16:00'da buluşuyor ve After Party'de saat 18:00'e kadar eğleniyoruz ve sonrasında Yunan Tavernası'nda keyifli ve çok lezzetli bir yemek yiyoruz. Yemek sonrasında otelimize dönüş ve geceleme."
      },
      {
        "day": "3. Gün",
        "title": "Alexandroupolis – İstanbul",
        "description": "Sabah kahvaltı sonrasında İstanbul'a hareket edip, İpsala sınır kapısına doğru yola koyuluyoruz. Gümrük ve pasaport işlemleri sırasında Yunan Freeshop'unda alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu. Bir sonraki turumuzda görüşmek dileği ile…"
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "5* Egnatia Astir Hotel",
        "board": "Oda Kahvaltı",
        "details": "Alexandroupolis şehir merkezinde 5* otelde 2 gece oda kahvaltı konaklama.",
        "doublePrice": "249 €",
        "singlePrice": "449 €",
        "child1Price": "149 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "13 Mart 2027 Cumartesi Hareketli"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "5* Astir Palace Hotel (V.B) tesiste 2 gece oda kahvaltı konaklama",
      "Programda belirtilen transfer ve şehir turları",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Zorunlu Seyahat & Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış pulu",
      "Extra turlar ve kişisel harcamalar",
      "SPA hizmetleri kullanımı (%15 İndirimli)",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "13 Mart 2027 Cumartesi"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar."
    ],
    "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1600&auto=format&fit=crop"
  },
  {
    "order": 15,
    "title": "İskeçe Karnavalı Turu (Selanik Konaklamalı)",
    "slug": "iskece-karnavali-selanik-1g",
    "subtitle": "Selanik (1 Gece Konaklama) + İskeçe Karnavalı — Karnavaldan Sonra After Party & Taverna İmkanı",
    "destination": "Yunanistan",
    "duration": "1 Gece 3 Gün",
    "startingPrice": "189 €",
    "pdfUrl": "/turlar/015-iskece-karnavali-selanik-1g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Selanik",
        "description": "Akşam saat 20:00'de Kadıköy Evlendirme Dairesi, saat 20:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM, 22:30'da Çorlu Kavşağı Aytemiz Petrol, 23:30'da Tekirdağ Namık Kemal Yay Tesisleri, 01:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Selanik",
        "description": "Sabah saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde, Selanik'in en önemli kilisesi olan Aya Dimitrios Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Camii, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu Ulu Önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyu'nda yürüyüş yapıp, saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'te düzenlenecek, birbirinden ünlü markaları içinde barındıran One Salonica Outlet Mall (1,5 saat) & Jumbo Mağazası (1 saat) Alışveriş Turuna katılabilir (20 €). Dileyen misafirlerimiz akşam saat 20:00'de düzenlenecek Panoramik Selanik Şaheserleri Gece Turuna katılarak gündüz görülen yerleri akşam ışıkları altında görebilir ve Selanik'in merkezinde serbest zaman olarak canlı gece hayatına dahil olabilirler (15 €). Dileyen misafirlerimiz Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Her iki programda otele dönüş için hareket saati 23:00. Geceleme Selanik'teki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "İskeçe Karnavalı – İstanbul",
        "description": "Sabah kahvaltı ardından Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de akşam saat 21:00'e kadar, İskeçe Karnavalı'nın coşkusu ile keyfini çıkarmak ve eğlenmek üzere serbest zaman veriyoruz. Akşam 16:00'da karnaval bitiminde dileyen misafirlerimiz ekstra olarak düzenlenecek After Party & Taverna organizasyonuna katılabilirler (75 € / After Party Giriş Ücreti + 1 İçki ile Taverna'da Fix Menü Yemek + 1 İçki Ücrete Dahildir.). Bu etkinliğe katılacak olan misafirlerimizle saat 16:00'da buluşuyor ve After Party'de saat 18:00'e kadar eğleniyoruz ve sonrasında Yunan Tavernası'nda keyifli ve çok lezzetli bir yemek yiyoruz. Yemek sonrasında İpsala sınır kapısına doğru yola koyuluyoruz. Gümrük ve pasaport işlemleri sırasında Yunan Freeshop'unda alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu. Bir sonraki turumuzda görüşmek dileği ile…"
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Panorama Hotel (V.B)",
        "board": "Oda Kahvaltı",
        "details": "Selanik 4* Panorama Hotel (V.B) tesiste 1 gece Oda/Kahvaltı konaklama.",
        "doublePrice": "189 €",
        "singlePrice": "289 €",
        "child1Price": "149 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "12 Mart 2027 Cuma Hareketli"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Selanik panoramik gezisi ve İskeçe Karnavalı ziyareti",
      "Selanik 4* Panorama Hotel (V.B) tesiste Oda/Kahvaltı konaklama",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış harcı",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "12 Mart 2027 Cuma"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ],
    "imageUrl": "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1600&auto=format&fit=crop"
  },
  {
    "order": 16,
    "title": "Bayram Özel Selanik & Meteora Turu",
    "slug": "bayram-selanik-meteora-turu-2g",
    "subtitle": "Selanik + Kalambaka (Meteora) + Kavala + İskeçe (2 Gece 4* Panorama Hotel)",
    "destination": "Yunanistan",
    "duration": "2 Gece 4 Gün",
    "startingPrice": "199 €",
    "imageUrl": "https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/016-bayram-selanik-meteora-turu-2g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Selanik",
        "description": "Akşam saat 20:00'de Kadıköy Evlendirme Dairesi, saat 20:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM, 22:30'da Çorlu Kavşağı Aytemiz Petrol, 23:30'da Tekirdağ Namık Kemal Yay Tesisleri, 01:00 Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Selanik'e yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Selanik",
        "description": "Sabah saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde; Aya Dimitros Kilisesi, Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını otobüsten inmeden panoramik olarak görüyoruz. Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi ziyaret ediyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, saat 16:30'a kadar serbest zaman veriyoruz. Dileyen misafirlerimiz saat 13:00'de düzenlenecek One Salonica Outlet Mall (1,5 Saat) & Jumbo Mağazası (1 Saat) Alışveriş Turuna katılabilir (20 €). Sonrasında otelimize transfer ve yerleşme. Geceleme Selanik'teki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Selanik – Kalambaka / Meteora – Selanik",
        "description": "Sabah kahvaltı ardından tam gün serbest zaman. Dileyen misafirlerimiz ekstra olarak düzenlenecek Kalambaka/Meteora Turu'na katılabilirler (65 €). Meteora, 'boşlukta asılı kalan' anlamına gelir. Burada dik kayalar üzerine kurulmuş Manastırları görüyor ve Vlaram Manastırını yerel rehberimizle birlikte ziyaret ederek manastırların oluşumu ve manastır hayatıyla ilgili bilgiler alıyoruz. Kısa bir öğlen yemeği molası ardından Selanik'e otelimize geri dönüyoruz. Dileyen misafirlerimiz akşam saat 20:00'de düzenlenecek Panoramik Selanik Şaheserleri Gece Turuna katılabilir (15 €) veya Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Her iki programda otele dönüş için hareket saat 23:00'te."
      },
      {
        "day": "4. Gün",
        "title": "Selanik – Kavala – İskeçe – İstanbul",
        "description": "Sabah kahvaltı ardından Kavala'ya hareket ediyoruz. Kavala panoramik şehir turu; İmarethane, Su Kemerleri, Kavala Kalesi, Belediye Binası, Kavala çarşısı, Kordon otobüsten panoramik olarak görülecek yerler arasındadır. 1 Saatlik serbest zaman ardından, Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyor ve sonrasında sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Freeshop'da alışveriş imkânı. İpsala, Keşan, Tekirdağ üzerinden İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Panorama Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "Selanik 4* Panorama Hotel V.B 2 Gece Oda/Kahvaltı konaklama.",
        "doublePrice": "199 €",
        "singlePrice": "339 €",
        "child1Price": "149 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Bayram Dönemleri"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Selanik ve İskeçe panoramik gezileri",
      "Selanik 4* Panorama Hotel V.B 2 Gece Oda/Kahvaltı konaklama",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "17 Mayıs 2027 Pazartesi (Kurban Bayramı)",
      "28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 17,
    "title": "Bayram Özel Sofya & Koprivştitsa & Plovdiv Turu",
    "slug": "bayram-sofya-koprivstitsa-plovdiv-turu-2g",
    "subtitle": "SPA & Casino & Taverna — 2 Gece 4* Ramada Plaza Sofia Konaklamalı",
    "destination": "Bulgaristan",
    "duration": "2 Gece 4 Gün",
    "startingPrice": "199 €",
    "imageUrl": "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/017-bayram-sofya-koprivstitsa-plovdiv-turu-2g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Sofya",
        "description": "Turumuz akşam saat 20:00'de Kadıköy Evlendirme Dairesi önü, 20:30'da Mecidiyeköy Meydan (Bambi Cafe Önü) ve 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM (Eski Kipa) önünde, 22:30'da Edirne Otobanı Çorlu Dinlenme Tesisleri Shell Petrol'de, 23:30'da Edirne Otobanı Babaeski Dinlenme tesisleri Opet Petrol'de, 01:00 Edirne Otogar Kavşağında, 01:15 Kapıkule Sınır Kapısı buluşarak başlıyor. Pasaport-Gümrük işlemlerinin ardından Bulgaristan'a geçiyor, Sofya'ya doğru hareket ediyoruz. Yaklaşık 4 saat boyunca yolculuğumuz devam ediyor."
      },
      {
        "day": "2. Gün",
        "title": "Sofya",
        "description": "Sabah saatlerinde Sofya'ya varışımıza müteakip yapacağımız Sofya panoramik şehir turunda; St. Nedelya Kilisesi, Rotunda Kilisesi, Rus Kilisesi, Aya Sofya Kilisesi, Aleksandır Nevski Katedrali, Başbakanlık ve Parlamento binaları ile Sofya Üniversitesi, Ulusal Kültür Sarayı, Mimar Sinan tarafından tasarlanan Banyabaşı Camii ve Serdika (Hoşgörü) Meydanı görülecek yerler arasındadır. Saat 14:30'a kadar serbest zaman veriyoruz. Ardından otelimize transfer ve yerleşme. Dileyen misafirlerimiz saat 15:30'da düzenlenecek Jumbo Mağazası & Paradise Center AVM Alışveriş Turuna katılabilir (20 €). Geceleme Sofya'daki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Sofya – Koprivştitsa",
        "description": "Sabah kahvaltı sonrasında serbest zaman. Dileyen misafirlerimiz ekstra olarak düzenlenecek Koprivştitsa turuna katılabilirler (45 €). Saat 10:00'da otelden ayrılarak yaklaşık 2,5 saatlik keyifli bir yolculukla Koprivştitsa'ya varıyoruz. Arnavut kaldırımlı sokakları, ferah verandaları, geniş saçakları ve yüksek dağ manzaralı rengârenk boyalı evleri ile Bulgaristan'ın tarihi kasabasında panoramik yürüyüş turu ve serbest zaman veriyoruz. Otele dönüşümüz akşam 18:00'de. Akşam dileyen misafirlerimiz ekstra olarak düzenlenecek canlı folklor gösterisiyle tamamlanan Bulgar Gecesine katılabilirler (65 € | Geleneksel restoranda 3 servislik Bulgar yemeği & 20cl Şarap veya Bulgar Rakısı veya Alkolsüz İçecek Dahildir!). Geceleme Sofya'daki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Sofya – Plovdiv (Filibe) – İstanbul",
        "description": "Sabah kahvaltı sonrasında saat 08:30'da Plovdiv'e hareket ediyoruz. 8000 yıllık tarihiyle Avrupa'nın en eski şehirlerinden biri olan Plovdiv'e (Filibe) varışımıza müteakip yapacağımız panoramik şehir turumuzda; Cuma Camii, Sveta Bogoroditsa kilisesi, Antik Tiyatro ve Eski Plovdiv gezilecektir. Batenberg caddesinde öğlen yemeği ve alışveriş için serbest zaman vereceğiz. Serbest zamanda dileyen misafirlerimiz ekstra olarak düzenlenecek Trakya Vadisi Bağ Gezisi ile Şarap Tadım turuna katılabilirler (45 € — 5 yerel şarap tadımı aperatiflerle birlikte ücrete dahildir). Sonrasında Kapıkule sınır kapısı üzerinden İstanbul'a varış ve turumuzun sonu."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "4* Ramada Plaza Sofia Hotel V.B",
        "board": "Oda Kahvaltı (2 Gece)",
        "details": "4* Ramada Plaza V.B otellerde 2 Gece Oda/Kahvaltı konaklama.",
        "doublePrice": "199 €",
        "singlePrice": "339 €",
        "child1Price": "149 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "2027 Bayram Dönemleri"
      }
    ],
    "includedServices": [
      "2024 model ve üzeri Yeni Nesil araçlarla ulaşım",
      "Sofya ve Plovdiv panoramik gezileri",
      "4* Ramada Plaza V.B otellerde 2 Gece Oda/Kahvaltı konaklama",
      "Zorunlu Mali Mesuliyet Sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat Sağlık Sigortası",
      "Schengen Vizesi",
      "Yurtdışı çıkış Pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "17 Mayıs 2027 Pazartesi (Kurban Bayramı)",
      "27 Ağustos 2027 Cuma (Zafer Bayramı)",
      "28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)"
    ],
    "specialDates": [],
    "extraPackage": null,
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 18,
    "title": "Adapazarı – İzmit – Gebze Çıkışlı Ekspres Yunanistan Turu",
    "slug": "adapazari-izmit-gebze-cikisli-ekspres-yunanistan-turu-3g",
    "subtitle": "Adapazarı, İzmit ve Gebze Kalkışlı — Atina (2) & Meteora & Pire & Naflion & Korint Kanalı & Selanik (1) & Kavala & İskeçe",
    "destination": "Yunanistan",
    "duration": "3 Gece 5 Gün",
    "startingPrice": "339 €",
    "imageUrl": "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/018-adapazari-izmit-gebze-cikisli-ekspres-yunanistan-turu-3g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Atina",
        "description": "Akşam saat 16:45'te Adapazarı Kent Meydanı önü, 17:45'te İzmit Real İntiba Döner önü, 18:30'da Gebze Center karşısı, 20:00'de Kadıköy evlendirme dairesi, saat 20:30'da Mecidiyeköy Meydan/Bambi Cafe önü, saat 21:00'de İncirli Ömür Plaza önü, 21:30'da Beylikdüzü Marmara Park AVM önü, 22:00'de Silivri Vega AVM, 22:30 Çorlu Kavşağı Aytemiz Petrol (Melih Öge) önü, 23:00 Tekirdağ Namık Kemal Yay Tesisleri, 00:30'da Keşan Kavşağı Shell Petrol önünden hareket ile yola çıkıyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Atina'ya yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Atina (Meteora)",
        "description": "Sabah saatlerinde yol üzerinde, ekstra olarak düzenlenen Kalambaka – Meteora'yı ziyaret ediyoruz (65 €). Meteora, 'boşlukta asılı kalan' anlamına gelir. Bu inanılmayacak derecede uzun ve dik kayaları gördüğünüzde gözlerinize inanamayacaksınız. Yalnızca muazzam bir jeolojisi yoktur bunun yanı sıra hayal gücünüzü de genişletmektedir. Orta Yunanistan'daki insanın aklını başından alan bu kayalar Kalambaka'nın kuzeyinde, Pindus Dağlarının güneyinde bulunan düz vadiye dik olarak yükselir. Manastır hayatı, uygun yerde inzivaya çekilmek amacıyla cenneti andıran bu sütunlara gelen ilk keşişlerle 11. yy'da başlamıştır. Burada dik kayalar üzerine kurulmuş Manastırları görüyor ve Vlaram Manastırını birlikte ziyaret ederek manastırların oluşumu ve manastır hayatıyla ilgili bilgiler alıyoruz (Manastır giriş bileti ekstra tur ücretine dahildir!). (Ekstra tura dahil olmayan misafirlerimizin aşağıdaki dinlenme tesisinde yaklaşık 2 saat beklemeleri gerekmektedir!) Kısa bir öğlen yemeği molası ardından Atina'ya hareket ediyoruz. Otobüsten panoramik olarak Pire limanını gezdikten sonra otelimize giriş yapıyoruz. Geceleme Atina'daki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Atina (Akropolis & Monastraki Meydanı) / (Korint Kanalı & Naphlion)",
        "description": "Sabah kahvaltı ardından 08:00'de başlayarak yerel rehberimiz eşliğinde yapacağımız panoramik şehir gezimizde; Panathenaic Antik Olimpiyat Stadyumu, Zeus Tapınağı, Parlamento Binası, Cumhurbaşkanlığı Sarayı, Başbakanlık Konutu, Panepistimiou Bulvarları, Ulusal Kütüphane ve Akademi Üniversitesi ile Omonia ve Syntagma Meydanları panoramik olarak otobüsten görülecek yerler arasındadır. Panoramik turumuz Syntagma Meydanında sona eriyor. Saat 20:00'ye kadar Atina merkezde serbest zaman. Dileyen misafirlerimiz ekstra olarak düzenlenecek Atina Akropolis & Monastraki Meydanı Turuna katılabilirler (75 € / Giriş Biletleri Dahil!). Bu turumuza panoramik gezimizin biteceği Syntagma meydanından başlıyor ve Atina'nın en hareketli bölgesi Ermou Sokağı boyunca yürüyerek Monastraki Meydanına geçiyoruz. Burada yerel hediyelik eşya mağazalarından alışveriş ve manzara eşliğinde sabah kahvesi için serbest zaman veriyoruz. Serbest zaman bitiminde Akropolisin yamaçları ile Antik Agora, Hadrian Kütüphanesini gezdikten sonra, Atina Akropolisi'ne giriyoruz. Akropolis'i yerel rehberimiz eşliğinde gezerek tüm detaylı bilgileri alıp, kişisel fotoğraf çekimi için serbest zaman verdikten sonra turumuzu öğlen saatlerinde noktalıyor ve Atina'da saat 20:00'ye kadar serbest zaman veriyoruz. Öğleden sonraki bu serbest zamanda dileyen misafirlerimiz ekstra olarak düzenlenecek Korint Kanalı & Naphlion turuna katılabilirler (75 €). Bu turumuz Saat 13:30'da Akropolis otoparkından hareket ederek başlıyor. Saronic Körfezi boyunca ilerleyip, İyonya ve Ege denizlerini birbirine bağlayan Korint Kanalı'na varacağız. Sonrasında Yunanistan'ın ilk başkenti ve Mora Yarımadası'nın en güzel şehri olan Nafplio'ya varışımıza müteakip Palamidi Kalesi, Bourtzi Kalesi, Vouleftiko Camisi, Ağapaşa Cami (Trianon), katedral ve Venedik Sarayı görülecek yerler arasındadır. Saat 18:00'de Naphlion'dan ayrılarak Syntagma meydanında kalan misafirlerimizi de alarak otelimize dönüyoruz. Dileyen misafirlerimiz saat 20:30'da başlayacak akşam Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Geceleme Atina'daki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Atina – Selanik",
        "description": "Kahvaltı ardından Selanik'e yol alıyoruz. Öğlen saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde, Yunanistan'ın en büyük Kilisesi olan Aya Dimitros Kilisesi, Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi (Pazartesi günleri kapalı olduğundan dışarıdan görüyoruz!), Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını görüyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, sonrasında Aristoteles Meydanında serbest zaman veriyoruz. Bu esnada dileyen misafirlerimiz saat 16:30'da düzenlenecek, birbirinden ünlü markaları içinde barındıran One Salonica Outlet Mall AVM (1,5 Saat) & Jumbo Mağazası (1 Saat) Alışveriş Turuna katılabilir (20 €). Sonrasında merkezde vereceğimiz serbest zaman ardından gece 22:00'de otelimize hareket ediyoruz. Otelimize yerleşme ve geceleme Selanik'teki otelimizde."
      },
      {
        "day": "5. Gün",
        "title": "Selanik – Kavala – İskeçe – Gümülcine – Dedeağaç – İstanbul",
        "description": "Sabah kahvaltı ardından Kavala'ya hareket ediyoruz. Kavala panoramik şehir turu; İmarethane, Su Kemerleri, Kavala Kalesi, Belediye Binası, Kavala çarşısı, Kordon otobüsten panoramik olarak görülecek yerler arasındadır. 1 Saatlik serbest zaman ardından, Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyoruz. Xanthi çıkışında Lidl Market'te (45 dk) alışveriş molası ardından İpsala sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Freeshop'da alışveriş imkânı. İpsala, Keşan, Tekirdağ, İstanbul üzerinden sizleri aldığımız noktalarda uğurlayarak turumuzu bitiriyoruz."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "339 €",
        "singlePrice": "539 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "439 €",
        "singlePrice": "639 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "439 €",
        "singlePrice": "639 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      },
      {
        "hotelName": "Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "539 €",
        "singlePrice": "739 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Lüks otobüslerle ulaşım",
      "Atina, Selanik, Kavala, İskeçe panoramik gezileri",
      "Atina (2), Selanik (1) toplam 3 Gece seçilen kategorideki otellerde Oda/Kahvaltı konaklama",
      "Zorunlu mali mesuliyet sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat sağlık sigortası",
      "Schengen vizesi",
      "Yurtdışı çıkış pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "22 Ocak 2027 Cuma",
      "29 Ocak 2027 Cuma",
      "5 Şubat 2027 Cuma",
      "12 Şubat 2027 Cuma",
      "19 Şubat 2027 Cuma",
      "26 Şubat 2027 Cuma",
      "19 Mart 2027 Cuma",
      "26 Mart 2027 Cuma",
      "2 Nisan 2027 Cuma",
      "9 Nisan 2027 Cuma",
      "4 Haziran 2027 Cuma",
      "11 Haziran 2027 Cuma",
      "18 Haziran 2027 Cuma",
      "25 Haziran 2027 Cuma",
      "2 Temmuz 2027 Cuma",
      "9 Temmuz 2027 Cuma",
      "16 Temmuz 2027 Cuma",
      "23 Temmuz 2027 Cuma",
      "30 Temmuz 2027 Cuma",
      "6 Ağustos 2027 Cuma",
      "13 Ağustos 2027 Cuma",
      "20 Ağustos 2027 Cuma",
      "27 Ağustos 2027 Cuma",
      "3 Eylül 2027 Cuma",
      "10 Eylül 2027 Cuma",
      "17 Eylül 2027 Cuma",
      "24 Eylül 2027 Cuma",
      "1 Ekim 2027 Cuma",
      "8 Ekim 2027 Cuma",
      "15 Ekim 2027 Cuma",
      "22 Ekim 2027 Cuma",
      "5 Kasım 2027 Cuma",
      "12 Kasım 2027 Cuma",
      "19 Kasım 2027 Cuma",
      "26 Kasım 2027 Cuma",
      "3 Aralık 2027 Cuma",
      "10 Aralık 2027 Cuma",
      "17 Aralık 2027 Cuma",
      "24 Aralık 2027 Cuma"
    ],
    "specialDates": [
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "15 Mayıs 2027 Cumartesi (Kurban Bayramı)",
      "28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)",
      "29 Aralık 2027 Çarşamba (Yılbaşı)"
    ],
    "extraPackage": "Avantajlı Ekstra Tur Paketi: Kalambaka – Meteora + Akropolis Turu + Korint Kanalı & Naphlion & Monastraki Meydanı Turu + Canlı müzikli, eğlenceli Taverna & Sirtaki programı + Mega Outlet ve Jumbo Mağazası Alışveriş Turu — 310 € yerine 290 €",
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  },
  {
    "order": 19,
    "title": "Kırklareli – Havsa – Uzunköprü Çıkışlı Ekspres Yunanistan Turu",
    "slug": "kirklareli-havsa-uzunkopru-cikisli-ekspres-yunanistan-turu-3g",
    "subtitle": "Kırklareli, Havsa ve Uzunköprü Kalkışlı — Atina (2) & Meteora & Pire & Naflion & Korint Kanalı & Selanik (1) & Kavala & İskeçe",
    "destination": "Yunanistan",
    "duration": "3 Gece 5 Gün",
    "startingPrice": "339 €",
    "imageUrl": "https://images.unsplash.com/photo-1503152394-c571994fd383?q=80&w=1600&auto=format&fit=crop",
    "pdfUrl": "/turlar/019-kirklareli-havsa-uzunkopru-cikisli-ekspres-yunanistan-turu-3g.pdf",
    "summaryBadges": [
      "Lüks Otobüslerle Ulaşım",
      "Gizlenmiş Mecburi Ücret Yok",
      "Yeşil Pasaporta Vize Yok"
    ],
    "itinerary": [
      {
        "day": "1. Gün",
        "title": "İstanbul – Atina",
        "description": "Akşam saat 22:30'da Kırklareli Eski Rektörlük Binası önü, 23:30'da Havsa Otogar önü, 23:59'da Uzunköprü Yeni Otogar önünden hareketle, Keşan Kavşağı Shell Petrol önünde tur aracımıza geçiyoruz. (Kalkış saatlerinden en geç 15 dk önce belirtilen yerlerde bulunmanız gerekmektedir.) İpsala sınır kapısına varışımızda gümrük ve pasaport işlemlerinin tamamlanması ve ardından Yunanistan'a geçerek, Alexandroupolis (Dedeağaç), Komotini (Gümülcine), Xanthi (İskeçe) ve Kavala üzerinden Atina'ya yol alıyoruz."
      },
      {
        "day": "2. Gün",
        "title": "Atina (Meteora)",
        "description": "Sabah saatlerinde yol üzerinde, ekstra olarak düzenlenen Kalambaka – Meteora'yı ziyaret ediyoruz (65 €). Meteora, 'boşlukta asılı kalan' anlamına gelir. Bu inanılmayacak derecede uzun ve dik kayaları gördüğünüzde gözlerinize inanamayacaksınız. Yalnızca muazzam bir jeolojisi yoktur bunun yanı sıra hayal gücünüzü de genişletmektedir. Orta Yunanistan'daki insanın aklını başından alan bu kayalar Kalambaka'nın kuzeyinde, Pindus Dağlarının güneyinde bulunan düz vadiye dik olarak yükselir. Manastır hayatı, uygun yerde inzivaya çekilmek amacıyla cenneti andıran bu sütunlara gelen ilk keşişlerle 11. yy'da başlamıştır. Burada dik kayalar üzerine kurulmuş Manastırları görüyor ve Vlaram Manastırını birlikte ziyaret ederek manastırların oluşumu ve manastır hayatıyla ilgili bilgiler alıyoruz (Manastır giriş bileti ekstra tur ücretine dahildir!). (Ekstra tura dahil olmayan misafirlerimizin aşağıdaki dinlenme tesisinde yaklaşık 2 saat beklemeleri gerekmektedir!) Kısa bir öğlen yemeği molası ardından Atina'ya hareket ediyoruz. Otobüsten panoramik olarak Pire limanını gezdikten sonra otelimize giriş yapıyoruz. Geceleme Atina'daki otelimizde."
      },
      {
        "day": "3. Gün",
        "title": "Atina (Akropolis & Monastraki Meydanı) / (Korint Kanalı & Naphlion)",
        "description": "Sabah kahvaltı ardından 08:00'de başlayarak yerel rehberimiz eşliğinde yapacağımız panoramik şehir gezimizde; Panathenaic Antik Olimpiyat Stadyumu, Zeus Tapınağı, Parlamento Binası, Cumhurbaşkanlığı Sarayı, Başbakanlık Konutu, Panepistimiou Bulvarları, Ulusal Kütüphane ve Akademi Üniversitesi ile Omonia ve Syntagma Meydanları panoramik olarak otobüsten görülecek yerler arasındadır. Panoramik turumuz Syntagma Meydanında sona eriyor. Saat 20:00'ye kadar Atina merkezde serbest zaman. Dileyen misafirlerimiz ekstra olarak düzenlenecek Atina Akropolis & Monastraki Meydanı Turuna katılabilirler (75 € / Giriş Biletleri Dahil!). Bu turumuza panoramik gezimizin biteceği Syntagma meydanından başlıyor ve Atina'nın en hareketli bölgesi Ermou Sokağı boyunca yürüyerek Monastraki Meydanına geçiyoruz. Burada yerel hediyelik eşya mağazalarından alışveriş ve manzara eşliğinde sabah kahvesi için serbest zaman veriyoruz. Serbest zaman bitiminde Akropolisin yamaçları ile Antik Agora, Hadrian Kütüphanesini gezdikten sonra, Atina Akropolisi'ne giriyoruz. Akropolis'i yerel rehberimiz eşliğinde gezerek tüm detaylı bilgileri alıp, kişisel fotoğraf çekimi için serbest zaman verdikten sonra turumuzu öğlen saatlerinde noktalıyor ve Atina'da saat 20:00'ye kadar serbest zaman veriyoruz. Öğleden sonraki bu serbest zamanda dileyen misafirlerimiz ekstra olarak düzenlenecek Korint Kanalı & Naphlion turuna katılabilirler (75 €). Bu turumuz Saat 13:30'da Akropolis otoparkından hareket ederek başlıyor. Saronic Körfezi boyunca ilerleyip, İyonya ve Ege denizlerini birbirine bağlayan Korint Kanalı'na varacağız. Sonrasında Yunanistan'ın ilk başkenti ve Mora Yarımadası'nın en güzel şehri olan Nafplio'ya varışımıza müteakip Palamidi Kalesi, Bourtzi Kalesi, Vouleftiko Camisi, Ağapaşa Cami (Trianon), katedral ve Venedik Sarayı görülecek yerler arasındadır. Saat 18:00'de Naphlion'dan ayrılarak Syntagma meydanında kalan misafirlerimizi de alarak otelimize dönüyoruz. Dileyen misafirlerimiz saat 20:30'da başlayacak akşam Canlı müzikli, eğlenceli Taverna & Sirtaki programına katılabilirler (75 € / Fix Menü – Limitli İçki). Geceleme Atina'daki otelimizde."
      },
      {
        "day": "4. Gün",
        "title": "Atina – Selanik",
        "description": "Kahvaltı ardından Selanik'e yol alıyoruz. Öğlen saatlerinde Selanik'e varışımıza müteakip yapacağımız Selanik panoramik şehir gezimizde, Yunanistan'ın en büyük Kilisesi olan Aya Dimitros Kilisesi, Türkiye Cumhuriyeti'nin kurucusu ulu önder Atatürk'ün doğduğu ve yaşadığı evi (Pazartesi günleri kapalı olduğundan dışarıdan görüyoruz!), Aya Sofya Kilisesi, Osmanlı Hamamı, Osmanlı Cami, Bedesten, Beyaz Kule, Döner Kule, Uluslararası Fuar alanını görüyoruz. Selanik'in kafeleri ve mağazaları ile meşhur Kordon Boyunda yürüyüş yapıp, sonrasında Aristoteles Meydanında serbest zaman veriyoruz. Bu esnada dileyen misafirlerimiz saat 16:30'da düzenlenecek, birbirinden ünlü markaları içinde barındıran One Salonica Outlet Mall AVM (1,5 Saat) & Jumbo Mağazası (1 Saat) Alışveriş Turuna katılabilir (20 €). Sonrasında merkezde vereceğimiz serbest zaman ardından gece 22:00'de otelimize hareket ediyoruz. Otelimize yerleşme ve geceleme Selanik'teki otelimizde."
      },
      {
        "day": "5. Gün",
        "title": "Selanik – Kavala – İskeçe – Gümülcine – Dedeağaç – İstanbul",
        "description": "Sabah kahvaltı ardından Kavala'ya hareket ediyoruz. Kavala panoramik şehir turu; İmarethane, Su Kemerleri, Kavala Kalesi, Belediye Binası, Kavala çarşısı, Kordon otobüsten panoramik olarak görülecek yerler arasındadır. 1 Saatlik serbest zaman ardından, Xanthi (İskeçe)'ye hareket ediyoruz. Batı Trakya Türklerinin yaşadığı önemli bir yerleşim yeri olan İskeçe'de Safranbolu'yu andıran geleneksel eski Türk evlerinden oluşan eski çarşıda kısa bir panoramik yürüyüş turu yaptıktan sonra birbirinden güzel kafelerin ve tavernaların keyfini çıkarmak üzere 1,5 saat serbest zaman veriyoruz. Xanthi çıkışında Lidl Market'te (45 dk) alışveriş molası ardından İpsala sınır kapısına geçiyoruz. Gümrük ve pasaport işlemleri sırasında Freeshop'da alışveriş imkânı. İpsala üzerinden sizleri aldığımız noktalara uğurlayarak turumuzu bitiriyoruz."
      }
    ],
    "pricingPackages": [
      {
        "hotelName": "Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "339 €",
        "singlePrice": "539 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Normal Dönem — Atina (2 Gece) + Selanik (1 Gece) Oda/Kahvaltı konaklama.",
        "doublePrice": "439 €",
        "singlePrice": "639 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Normal Dönem"
      },
      {
        "hotelName": "Atina 4* Xenophon Hotel V.B + Selanik 3* Assembly Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "439 €",
        "singlePrice": "639 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      },
      {
        "hotelName": "Atina 4* Blue Sea Hotel V.B + Selanik 5* Eona Resort Hotel V.B (Özel Günler)",
        "board": "Oda Kahvaltı (3 Gece)",
        "details": "Bayram ve Yılbaşı Özel Hareket Tarihleri için geçerli fiyat.",
        "doublePrice": "539 €",
        "singlePrice": "739 €",
        "child1Price": "199 € (3-12 Yaş)",
        "child2Price": "-",
        "babyPrice": "0-2 Yaş Ücretsiz",
        "period": "Özel Dönem / Bayram"
      }
    ],
    "includedServices": [
      "2024 Model ve üzeri Lüks otobüslerle ulaşım",
      "Atina, Selanik, Kavala, İskeçe panoramik gezileri",
      "Atina (2), Selanik (1) toplam 3 Gece seçilen kategorideki otellerde Oda/Kahvaltı konaklama",
      "Zorunlu mali mesuliyet sigortası",
      "Türkçe rehberlik hizmeti"
    ],
    "excludedServices": [
      "Seyahat sağlık sigortası",
      "Schengen vizesi",
      "Yurtdışı çıkış pulu",
      "Extra turlar ve kişisel harcamalar",
      "Şoför ve rehber bahşişleri (5 € Kişi Başı)"
    ],
    "departureDates": [
      "22 Ocak 2027 Cuma",
      "29 Ocak 2027 Cuma",
      "5 Şubat 2027 Cuma",
      "12 Şubat 2027 Cuma",
      "19 Şubat 2027 Cuma",
      "26 Şubat 2027 Cuma",
      "19 Mart 2027 Cuma",
      "26 Mart 2027 Cuma",
      "2 Nisan 2027 Cuma",
      "9 Nisan 2027 Cuma",
      "4 Haziran 2027 Cuma",
      "11 Haziran 2027 Cuma",
      "18 Haziran 2027 Cuma",
      "25 Haziran 2027 Cuma",
      "2 Temmuz 2027 Cuma",
      "9 Temmuz 2027 Cuma",
      "16 Temmuz 2027 Cuma",
      "23 Temmuz 2027 Cuma",
      "30 Temmuz 2027 Cuma",
      "6 Ağustos 2027 Cuma",
      "13 Ağustos 2027 Cuma",
      "20 Ağustos 2027 Cuma",
      "27 Ağustos 2027 Cuma",
      "3 Eylül 2027 Cuma",
      "10 Eylül 2027 Cuma",
      "17 Eylül 2027 Cuma",
      "24 Eylül 2027 Cuma",
      "1 Ekim 2027 Cuma",
      "8 Ekim 2027 Cuma",
      "15 Ekim 2027 Cuma",
      "22 Ekim 2027 Cuma",
      "5 Kasım 2027 Cuma",
      "12 Kasım 2027 Cuma",
      "19 Kasım 2027 Cuma",
      "26 Kasım 2027 Cuma",
      "3 Aralık 2027 Cuma",
      "10 Aralık 2027 Cuma",
      "17 Aralık 2027 Cuma",
      "24 Aralık 2027 Cuma"
    ],
    "specialDates": [
      "8 Mart 2027 Pazartesi (Ramazan Bayramı)",
      "22 Nisan 2027 Perşembe (Ulusal Egemenlik Bayramı)",
      "15 Mayıs 2027 Cumartesi (Kurban Bayramı)",
      "28 Ekim 2027 Perşembe (Cumhuriyet Bayramı)",
      "29 Aralık 2027 Çarşamba (Yılbaşı)"
    ],
    "extraPackage": "Avantajlı Ekstra Tur Paketi: Kalambaka – Meteora + Akropolis Turu + Korint Kanalı & Naphlion & Monastraki Meydanı Turu + Canlı müzikli, eğlenceli Taverna & Sirtaki programı + Mega Outlet ve Jumbo Mağazası Alışveriş Turu — 310 € yerine 290 €",
    "notes": [
      "Rehberimiz programı tamamen gerçekleştirmek kaydı ile program seyrinde değişiklik yapabilir.",
      "Ekstra turlarda katılımın az olması durumunda ekstra turlar gerçekleştirilmeyebilir.",
      "Bu tur için geçerli bir Schengen vizesi gerekmektedir.",
      "Pasaportunda K.K.T.C damgası olanlar ve 10 yıldan eski pasaport sahipleri Yunanistan'a giriş yapamazlar.",
      "Ulaşımlarımız; tura katılım sayısına göre VIP Volkswagen Crafter / Mercedes Sprinter Minibüs, Mercedes Tourismo – Travego / Temsa araçlardan biriyle gerçekleştirilmektedir."
    ]
  }
]

async function main() {
  console.log('Deleting existing tours...')
  await prisma.tour.deleteMany({})

  console.log('Seeding 19 tours from 2027 Turlar PDFs...')
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

    await prisma.tour.create({
      data: payload
    })
    console.log(`✅ Seeded [${t.order}]: ${t.title}`)
  }
  console.log('🎉 All 19 tours seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
