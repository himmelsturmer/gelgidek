const DEFAULT_IMAGES: Record<string, string> = {
    yunanistan: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1600&auto=format&fit=crop',
    bulgaristan: 'https://images.unsplash.com/photo-1563284223-333497472e88?q=80&w=1600&auto=format&fit=crop',
    kayak: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1600&auto=format&fit=crop',
    bansko: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1600&auto=format&fit=crop',
    atina: 'https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=1600&auto=format&fit=crop',
    parga: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1600&auto=format&fit=crop',
    korfu: 'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?q=80&w=1600&auto=format&fit=crop',
    dedeagac: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    italya: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1600&auto=format&fit=crop',
    fransa: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1600&auto=format&fit=crop'
}

function slugifyTr(text: string): string {
    const trMap: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', i: 'i', ö: 'o', ş: 's', ü: 'u' }
    return (text || '')
        .toLowerCase()
        .replace(/[çğıiöşü]/g, (m) => trMap[m] || m)
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
}

function pickDefaultImage(title: string, destination: string): string {
    const check = slugifyTr(`${title} ${destination}`)
    for (const [k, url] of Object.entries(DEFAULT_IMAGES)) {
        if (check.includes(k)) return url
    }
    return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop'
}

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { pdfBase64, pdfText, fileName } = body || {}

        if (!pdfBase64 && !pdfText) {
            throw createError({ statusCode: 400, statusMessage: 'PDF verisi gönderilmedi.', message: 'PDF verisi gönderilmedi.' })
        }

        const config = useRuntimeConfig()
        const apiKey =
            config.geminiApiKey ||
            process.env.NUXT_GEMINI_API_KEY ||
            process.env.GEMINI_API_KEY

        if (!apiKey) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Sunucuda GEMINI_API_KEY tanımlı değil.',
                message: 'Sunucuda GEMINI_API_KEY tanımlı değil.'
            })
        }

        const prompt = `Sen profesyonel bir tur operatörü içerik uzmanısın. Verilen Türkçe tur broşürü içeriğini incele ve içindeki tüm bilgileri eksiksiz olarak aşağıdaki JSON şemasına uygun şekilde çıkar:

{
  "title": "Turun ana başlığı (Örn: Bansko Kayak Turu veya Selanik & Kavala & İskeçe Turu)",
  "subtitle": "Alt başlık veya rota özeti (Örn: Selanik + Kavala + İskeçe + Gümülcine (1 Gece Konaklama))",
  "destination": "Gidilen ülke veya bölge (Örn: Yunanistan, Bulgaristan, Yunanistan & Bulgaristan, Balkanlar, İtalya vb.)",
  "duration": "Konaklama ve gün süresi (Örn: 1 Gece 3 Gün, 2 Gece 4 Gün, 3 Gece 5 Gün)",
  "startingPrice": "En düşük iki kişilik odada kişi başı başlangıç fiyatı (Örn: 129 €)",
  "summaryBadges": [
    "Lüks Otobüslerle Ulaşım",
    "Gizlenmiş Mecburi Ücret Yok",
    "Yeşil Pasaporta Vize Yok"
  ],
  "itinerary": [
    {
      "day": "1. Gün",
      "title": "İstanbul – Selanik",
      "description": "O güne ait tüm detaylı tur programı metni..."
    }
  ],
  "pricingPackages": [
    {
      "hotelName": "Otel adı (Örn: 4* Panorama Hotel V.B)",
      "board": "Konaklama tipi (Örn: Oda Kahvaltı)",
      "details": "Otel açıklaması veya dönem bilgisi",
      "doublePrice": "İki/Üç kişilik odada kişi başı fiyatı (Örn: 129 €)",
      "singlePrice": "Tek kişilik oda fiyatı (Örn: 209 €)",
      "child1Price": "3-12 yaş 1. çocuk fiyatı (Örn: 100 €)",
      "child2Price": "Varsa 2. çocuk fiyatı yoksa '-'",
      "babyPrice": "0-2 yaş bebek fiyatı (Örn: 0-2 Yaş Ücretsiz)",
      "period": "Dönem adı (Örn: 2027 Dönemi veya Özel Dönem / Bayram)"
    }
  ],
  "includedServices": [
    "Fiyata dahil olan her bir madde"
  ],
  "excludedServices": [
    "Fiyata dahil olmayan her bir madde"
  ],
  "departureDates": [
    "Normal hareket tarihleri listesi (Örn: 1 Ocak 2027 Cuma)"
  ],
  "specialDates": [
    "Varsa özel / bayram hareket tarihleri listesi (Örn: 8 Mart 2027 Pazartesi (Ramazan Bayramı))"
  ],
  "extraPackage": "Varsa avantajlı ekstra tur paketi bilgisi ve fiyatı, yoksa boş string",
  "notes": [
    "NOTLAR bölümündeki her bir madde"
  ]
}

Kurallar:
- PDF içindeki gün gün tur programını kısaltmadan, tüm detaylarıyla "itinerary" dizisine aktar.
- Birden fazla otel veya dönem fiyat tablosu varsa hepsini ayrı eleman olarak "pricingPackages" dizisine ekle.
- Hareket tarihlerinin tamamını eksiksiz çıkar.
- Sadece geçerli bir JSON nesnesi döndür.`

        const parts: any[] = []
        if (pdfText && String(pdfText).trim().length > 40) {
            parts.push({ text: `TUR BROŞÜRÜ METNİ:\n\n${pdfText}\n\n${prompt}` })
        } else if (pdfBase64) {
            const cleanBase64 = String(pdfBase64).replace(/^data:application\/pdf;base64,/, '')
            parts.push({
                inline_data: {
                    mime_type: 'application/pdf',
                    data: cleanBase64
                }
            })
            parts.push({ text: prompt })
        }

        const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts }],
                    generationConfig: {
                        responseMimeType: 'application/json',
                        thinkingConfig: { thinkingBudget: 0 }
                    }
                })
            }
        )

        if (!geminiRes.ok) {
            const errText = await geminiRes.text()
            throw new Error(`Gemini API hatası (${geminiRes.status}): ${errText.slice(0, 200)}`)
        }

        const geminiJson: any = await geminiRes.json()
        const rawText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text || ''

        let parsed: any = {}
        try {
            parsed = JSON.parse(rawText)
        } catch {
            const match = rawText.match(/\{[\s\S]*\}/)
            if (match) parsed = JSON.parse(match[0])
            else throw new Error('Yapay zeka yanıtı JSON formatında ayrıştırılamadı.')
        }

        const title = parsed.title || (fileName ? fileName.replace(/\.pdf$/i, '') : 'Yeni Tur')
        const slug = slugifyTr(parsed.slug || title)
        const destination = parsed.destination || ''
        const imageUrl = parsed.imageUrl || pickDefaultImage(title, destination)

        return {
            title,
            slug,
            subtitle: parsed.subtitle || '',
            destination,
            duration: parsed.duration || '',
            startingPrice: parsed.startingPrice || '',
            imageUrl,
            summaryBadges: Array.isArray(parsed.summaryBadges) ? parsed.summaryBadges : [],
            itinerary: Array.isArray(parsed.itinerary) ? parsed.itinerary : [],
            pricingPackages: Array.isArray(parsed.pricingPackages) ? parsed.pricingPackages : [],
            includedServices: Array.isArray(parsed.includedServices) ? parsed.includedServices : [],
            excludedServices: Array.isArray(parsed.excludedServices) ? parsed.excludedServices : [],
            departureDates: Array.isArray(parsed.departureDates) ? parsed.departureDates : [],
            specialDates: Array.isArray(parsed.specialDates) ? parsed.specialDates : [],
            extraPackage: parsed.extraPackage || '',
            notes: Array.isArray(parsed.notes) ? parsed.notes : []
        }
    } catch (err: any) {
        const msg = err?.statusMessage || err?.message || 'PDF ayrıştırılırken beklenmeyen bir hata oluştu.'
        throw createError({
            statusCode: 400,
            statusMessage: msg,
            message: msg,
            data: { message: msg }
        })
    }
})
