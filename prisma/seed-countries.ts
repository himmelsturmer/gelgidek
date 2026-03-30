import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Tüm ülkeler - vizedunyasi.com/tum-ulkeler'dan alındı
const allCountries = [
  // A
  { name: 'Afganistan', slug: 'afganistan', flagUrl: '🇦🇫' },
  { name: 'Almanya', slug: 'almanya', flagUrl: '🇩🇪', showOnHome: true, homeOrder: 1 },
  { name: 'Amerika', slug: 'amerika', flagUrl: '🇺🇸', showOnHome: true, homeOrder: 5 },
  { name: 'Andorra', slug: 'andorra', flagUrl: '🇦🇩' },
  { name: 'Angola', slug: 'angola', flagUrl: '🇦🇴' },
  { name: 'Arjantin', slug: 'arjantin', flagUrl: '🇦🇷' },
  { name: 'Avustralya', slug: 'avustralya', flagUrl: '🇦🇺' },
  { name: 'Avusturya', slug: 'avusturya', flagUrl: '🇦🇹' },
  { name: 'Azerbaycan', slug: 'azerbaycan', flagUrl: '🇦🇿' },
  // B
  { name: 'Bahamalar', slug: 'bahamalar', flagUrl: '🇧🇸' },
  { name: 'Bangladeş', slug: 'banglades', flagUrl: '🇧🇩' },
  { name: 'Barbados', slug: 'barbados', flagUrl: '🇧🇧' },
  { name: 'Belarus', slug: 'belarus', flagUrl: '🇧🇾' },
  { name: 'Belçika', slug: 'belcika', flagUrl: '🇧🇪' },
  { name: 'Birleşik Arap Emirlikleri', slug: 'birlesik-arap-emirlikleri', flagUrl: '🇦🇪' },
  { name: 'Bolivya', slug: 'bolivya', flagUrl: '🇧🇴' },
  { name: 'Bosna-Hersek', slug: 'bosnahersek', flagUrl: '🇧🇦' },
  { name: 'Botsvana', slug: 'botsvana', flagUrl: '🇧🇼' },
  { name: 'Brezilya', slug: 'brezilya', flagUrl: '🇧🇷' },
  { name: 'Brunei', slug: 'brunei', flagUrl: '🇧🇳' },
  { name: 'Bulgaristan', slug: 'bulgaristan', flagUrl: '🇧🇬' },
  { name: 'Burkina Faso', slug: 'burkina-faso', flagUrl: '🇧🇫' },
  { name: 'Butan', slug: 'butan', flagUrl: '🇧🇹' },
  // C
  { name: 'Cape Verde', slug: 'cape-verde', flagUrl: '🇨🇻' },
  { name: 'Cayman Adaları', slug: 'cayman-adalari', flagUrl: '🇰🇾' },
  { name: 'Cezayir', slug: 'cezayir', flagUrl: '🇩🇿' },
  // Ç
  { name: 'Çek Cumhuriyeti', slug: 'cek-cumhuriyeti', flagUrl: '🇨🇿' },
  { name: 'Çin', slug: 'cin', flagUrl: '🇨🇳' },
  // D
  { name: 'Danimarka', slug: 'danimarka', flagUrl: '🇩🇰' },
  { name: 'Demokratik Kongo Cumhuriyeti', slug: 'demokratik-kongo-cumhuriyeti', flagUrl: '🇨🇩' },
  { name: 'Dominik Cumhuriyeti', slug: 'dominik-cumhuriyeti', flagUrl: '🇩🇴' },
  // E
  { name: 'El Salvador', slug: 'el-salvador', flagUrl: '🇸🇻' },
  { name: 'Endonezya', slug: 'endonezya', flagUrl: '🇮🇩' },
  { name: 'Ermenistan', slug: 'ermenistan', flagUrl: '🇦🇲' },
  { name: 'Estonya', slug: 'estonya', flagUrl: '🇪🇪' },
  { name: 'Etyopya', slug: 'etyopya', flagUrl: '🇪🇹' },
  // F
  { name: 'Falkland Adaları', slug: 'falkland-adalari', flagUrl: '🇫🇰' },
  { name: 'Fas', slug: 'fas', flagUrl: '🇲🇦' },
  { name: 'Fil Dişi Sahili', slug: 'fil-disi-sahili', flagUrl: '🇨🇮' },
  { name: 'Filipinler', slug: 'filipinler', flagUrl: '🇵🇭' },
  { name: 'Finlandiya', slug: 'finlandiya', flagUrl: '🇫🇮' },
  { name: 'Fransa', slug: 'fransa', flagUrl: '🇫🇷', showOnHome: true, homeOrder: 3 },
  // G
  { name: 'Gambiya', slug: 'gambiya', flagUrl: '🇬🇲' },
  { name: 'Gana', slug: 'gana', flagUrl: '🇬🇭' },
  { name: 'Gine', slug: 'gine', flagUrl: '🇬🇳' },
  { name: 'Guadeloupe', slug: 'guadeloupe', flagUrl: '🇬🇵' },
  { name: 'Guam', slug: 'guam', flagUrl: '🇬🇺' },
  { name: 'Guatemala', slug: 'guatemala', flagUrl: '🇬🇹' },
  { name: 'Gürcistan', slug: 'gurcistan', flagUrl: '🇬🇪' },
  { name: 'Guyana', slug: 'guyana', flagUrl: '🇬🇾' },
  // H
  { name: 'Hırvatistan', slug: 'hirvatistan', flagUrl: '🇭🇷' },
  { name: 'Hindistan', slug: 'hindistan', flagUrl: '🇮🇳' },
  { name: 'Hollanda', slug: 'hollanda', flagUrl: '🇳🇱' },
  { name: 'Hollanda Antilleri', slug: 'hollanda-antilleri-curacaostmartenbonairesteustatius-ve-saba', flagUrl: '🇧🇶' },
  { name: 'Honduras', slug: 'honduras', flagUrl: '🇭🇳' },
  { name: 'Hong Kong', slug: 'hong-kong', flagUrl: '🇭🇰' },
  // I
  { name: 'Irak', slug: 'irak', flagUrl: '🇮🇶' },
  // İ
  { name: 'İngiltere', slug: 'ingiltere', flagUrl: '🇬🇧', showOnHome: true, homeOrder: 2 },
  { name: 'İran', slug: 'iran', flagUrl: '🇮🇷' },
  { name: 'İrlanda', slug: 'irlanda', flagUrl: '🇮🇪' },
  { name: 'İspanya', slug: 'ispanya', flagUrl: '🇪🇸', showOnHome: true, homeOrder: 6 },
  { name: 'İsrail', slug: 'israil', flagUrl: '🇮🇱' },
  { name: 'İsveç', slug: 'isvec', flagUrl: '🇸🇪' },
  { name: 'İsviçre', slug: 'isvicre', flagUrl: '🇨🇭' },
  { name: 'İtalya', slug: 'italya', flagUrl: '🇮🇹', showOnHome: true, homeOrder: 4 },
  { name: 'İzlanda', slug: 'izlanda', flagUrl: '🇮🇸' },
  // J
  { name: 'Jamaika', slug: 'jamaika', flagUrl: '🇯🇲' },
  { name: 'Japonya', slug: 'japonya', flagUrl: '🇯🇵' },
  // K
  { name: 'Kamboçya', slug: 'kambocya', flagUrl: '🇰🇭' },
  { name: 'Kamerun', slug: 'kamerun', flagUrl: '🇨🇲' },
  { name: 'Kanada', slug: 'kanada', flagUrl: '🇨🇦' },
  { name: 'Katar', slug: 'katar', flagUrl: '🇶🇦' },
  { name: 'Kazakistan', slug: 'kazakistan', flagUrl: '🇰🇿' },
  { name: 'Kenya', slug: 'kenya', flagUrl: '🇰🇪' },
  { name: 'Kıbrıs Rum Kesimi', slug: 'kibris-rum-kesimi', flagUrl: '🇨🇾' },
  { name: 'Kırgızistan', slug: 'kirgizistan', flagUrl: '🇰🇬' },
  { name: 'Kolombiya', slug: 'kolombiya', flagUrl: '🇨🇴' },
  { name: 'Kongo', slug: 'kongo', flagUrl: '🇨🇬' },
  { name: 'Kosta Rika', slug: 'kostarika', flagUrl: '🇨🇷' },
  { name: 'Küba', slug: 'kuba', flagUrl: '🇨🇺' },
  { name: 'Kuveyt', slug: 'kuveyt', flagUrl: '🇰🇼' },
  // L
  { name: 'Letonya', slug: 'letonya', flagUrl: '🇱🇻' },
  { name: 'Libya', slug: 'libya', flagUrl: '🇱🇾' },
  { name: 'Litvanya', slug: 'litvanya', flagUrl: '🇱🇹' },
  { name: 'Lübnan', slug: 'lubnan', flagUrl: '🇱🇧' },
  { name: 'Lüksemburg', slug: 'luksemburg', flagUrl: '🇱🇺' },
  // M
  { name: 'Macaristan', slug: 'macaristan', flagUrl: '🇭🇺' },
  { name: 'Mairutus', slug: 'mairutus', flagUrl: '🇲🇺' },
  { name: 'Makedonya', slug: 'makedonya', flagUrl: '🇲🇰' },
  { name: 'Malawi', slug: 'malawi', flagUrl: '🇲🇼' },
  { name: 'Maldiv Adaları', slug: 'maldiv-adalari', flagUrl: '🇲🇻' },
  { name: 'Malezya', slug: 'malezya', flagUrl: '🇲🇾' },
  { name: 'Mali', slug: 'mali', flagUrl: '🇲🇱' },
  { name: 'Malta', slug: 'malta', flagUrl: '🇲🇹' },
  { name: 'Martinik', slug: 'martinik', flagUrl: '🇲🇶' },
  { name: 'Meksika', slug: 'meksika', flagUrl: '🇲🇽' },
  { name: 'Mısır', slug: 'misir', flagUrl: '🇪🇬' },
  { name: 'Moğolistan', slug: 'mogolistan', flagUrl: '🇲🇳' },
  { name: 'Moldova', slug: 'moldova', flagUrl: '🇲🇩' },
  { name: 'Monako', slug: 'monako', flagUrl: '🇲🇨' },
  // N
  { name: 'Nepal', slug: 'nepal', flagUrl: '🇳🇵' },
  { name: 'Nijerya', slug: 'nijerya', flagUrl: '🇳🇬' },
  { name: 'Norveç', slug: 'norvec', flagUrl: '🇳🇴' },
  // Ö
  { name: 'Özbekistan', slug: 'ozbekistan', flagUrl: '🇺🇿' },
  // P
  { name: 'Pakistan', slug: 'pakistan', flagUrl: '🇵🇰' },
  { name: 'Panama', slug: 'panama', flagUrl: '🇵🇦' },
  { name: 'Paraguay', slug: 'paraguay', flagUrl: '🇵🇾' },
  { name: 'Peru', slug: 'peru', flagUrl: '🇵🇪' },
  { name: 'Polonya', slug: 'polonya', flagUrl: '🇵🇱' },
  { name: 'Portekiz', slug: 'portekiz', flagUrl: '🇵🇹' },
  // R
  { name: 'Romanya', slug: 'romanya', flagUrl: '🇷🇴' },
  { name: 'Rusya', slug: 'rusya', flagUrl: '🇷🇺' },
  // S
  { name: 'Senegal', slug: 'senegal', flagUrl: '🇸🇳' },
  { name: 'Sırbistan Karadağ', slug: 'sirbistan-karadag', flagUrl: '🇷🇸' },
  { name: 'Singapur', slug: 'singapur', flagUrl: '🇸🇬' },
  { name: 'Slovakya', slug: 'slovakya', flagUrl: '🇸🇰' },
  { name: 'Slovenya', slug: 'slovenya', flagUrl: '🇸🇮' },
  { name: 'Sri Lanka', slug: 'sri-lanka', flagUrl: '🇱🇰' },
  { name: 'Suriye', slug: 'suriye', flagUrl: '🇸🇾' },
  { name: 'Suudi Arabistan', slug: 'suudi-arabistan', flagUrl: '🇸🇦' },
  // T
  { name: 'Tacikistan', slug: 'tacikistan', flagUrl: '🇹🇯' },
  { name: 'Tayvan', slug: 'taiwan', flagUrl: '🇹🇼' },
  { name: 'Tanzanya', slug: 'tanzanya', flagUrl: '🇹🇿' },
  { name: 'Tayland', slug: 'tayland', flagUrl: '🇹🇭' },
  { name: 'Tunus', slug: 'tunus', flagUrl: '🇹🇳' },
  { name: 'Türkmenistan', slug: 'turkmenistan', flagUrl: '🇹🇲' },
  // U
  { name: 'Ukrayna', slug: 'ukrayna', flagUrl: '🇺🇦' },
  { name: 'Umman', slug: 'umman', flagUrl: '🇴🇲' },
  { name: 'Urugay', slug: 'urguay', flagUrl: '🇺🇾' },
  // Ü
  { name: 'Ürdün', slug: 'urdun', flagUrl: '🇯🇴' },
  // V
  { name: 'Venezuela', slug: 'venezuella', flagUrl: '🇻🇪' },
  { name: 'Vietnam', slug: 'vietnam', flagUrl: '🇻🇳' },
  // Y
  { name: 'Yemen', slug: 'yemen', flagUrl: '🇾🇪' },
  { name: 'Yeni Zelanda', slug: 'yenizellanda', flagUrl: '🇳🇿' },
  { name: 'Yunanistan', slug: 'yunanistan', flagUrl: '🇬🇷' },
  // Z
  { name: 'Zambia', slug: 'zambia', flagUrl: '🇿🇲' },
]

async function main() {
  console.log(`🌍 ${allCountries.length} ülke ekleniyor...`)

  let created = 0
  let skipped = 0

  for (const c of allCountries) {
    const result = await prisma.country.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        flagUrl: c.flagUrl,
      },
      create: {
        name: c.name,
        slug: c.slug,
        flagUrl: c.flagUrl ?? null,
        continent: (c as any).continent ?? null,
        showOnHome: (c as any).showOnHome ?? false,
        homeOrder: (c as any).homeOrder ?? null,
      },
    })
    if (result) created++
  }

  console.log(`✅ ${created} ülke başarıyla eklendi/güncellendi. ${skipped} atlandı.`)
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
