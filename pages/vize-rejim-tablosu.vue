<template>
  <div class="section">
    <div class="container">
      <div class="section__head">
        <h2>Vize Rejim Tablosu</h2>
        <p class="muted">Türk vatandaşlarının tabi olduğu vize uygulamaları</p>
      </div>
      
      <div class="info-card" style="margin-bottom: 32px;border-left:4px solid var(--accent);">
        <p class="tiny muted" style="margin:0;">
          * Vize başvurunuzu olabildiğince erken bir tarihte (örneğin bir ay öncesinden) yapmanız tavsiye edilir. Çalışma ve öğrenim amaçlı vizelerin alınması 2-3 ay veya daha uzun sürebilir. Pasaportunuzun geçerlilik süresinin en az bir yıl olmasına özen gösterin.
        </p>
      </div>

      <div style="overflow-x:auto;">
        <table class="visa-table">
          <thead>
            <tr>
              <th>Ülke</th>
              <th>Umumi (Bordo) Pasaport</th>
              <th>Hususi (Yeşil) / Hizmet (Gri) Pasaport</th>
              <th>Diplomatik (Siyah) Pasaport</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableData" :key="row.name">
              <td><strong>{{ row.name }}</strong></td>
              <td>
                <span :class="badgeClass(row.umumi)">{{ badgeLabel(row.umumi) }}</span>
                <span v-if="row.umumiNote" style="font-size:0.82rem;color:var(--text-muted);"> {{ row.umumiNote }}</span>
              </td>
              <td>
                <span :class="badgeClass(row.hususi)">{{ badgeLabel(row.hususi) }}</span>
                <span v-if="row.hususiNote" style="font-size:0.82rem;color:var(--text-muted);"> {{ row.hususiNote }}</span>
              </td>
              <td>
                <span :class="badgeClass(row.diplomatik)">{{ badgeLabel(row.diplomatik) }}</span>
                <span v-if="row.diplomatikNote" style="font-size:0.82rem;color:var(--text-muted);"> {{ row.diplomatikNote }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="tiny muted" style="margin-top:12px;text-align:right;">* Kaynak: vizedunyasi.com. Seyahat öncesi ilgili konsolosluktan teyit ediniz.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Vize Rejim Tablosu — gelgidek.com',
  meta: [{ name: 'description', content: 'Türk vatandaşlarının ülkelere göre tabi olduğu vize rejim tablosu ve uygulamaları.' }]
})

function badgeClass(status: string) {
  const s = status?.toLowerCase() ?? ''
  if (s.includes('yok') || s === 'muaf') return 'badge badge--green'
  if (s.includes('sinir') || s.includes('sınır') || s.includes('kapısında') || s.includes('e-vize') || s.includes('evize')) return 'badge badge--yellow'
  return 'badge badge--red'
}

function badgeLabel(status: string) {
  const s = status?.toLowerCase() ?? ''
  if (s.includes('yok') || s === 'muaf') return 'Vize Yok'
  if (s.includes('sinir') || s.includes('sınır') || s.includes('kapısında')) return 'Sınır Kapısında'
  if (s.includes('e-vize') || s.includes('evize')) return 'e-Vize'
  return 'Vize Var'
}

const tableData = [
  { name: 'A.B.D. (Amerika)', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Var' },
  { name: 'Afganistan', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Almanya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', hususiNote: '(90 gün)', diplomatik: 'Vize Yok', diplomatikNote: '(90 gün)' },
  { name: 'Andorra', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Angola', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Var' },
  { name: 'Antigua-Barbuda', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Arjantin', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Arnavutluk', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Avustralya', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Var' },
  { name: 'Avusturya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Azerbaycan', umumi: 'Sınır Kapısında', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Bahamalar', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Bahreyn', umumi: 'Sınır Kapısında', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Bangladeş', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Barbados', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Belarus', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Belçika', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Belize', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Benin', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Birleşik Arap Emirlikleri', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Bolivya', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Bosna-Hersek', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Botsvana', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Brezilya', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Brunei', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Bulgaristan', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Burkina Faso', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Cezayir', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Çad', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Çek Cumhuriyeti', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Çin', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Var' },
  { name: 'Danimarka', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Dominik Cumhuriyeti', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Ekvador', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'El Salvador', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Endonezya', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Ermenistan', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Estonya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Etyopya', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Fas', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Fiji', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Filipinler', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Finlandiya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Fransa', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Gana', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Guatemala', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Güney Afrika', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Güney Kore', umumi: 'Vize Yok', umumiNote: '(K-ETA gerekli)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Gürcistan', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Haiti', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Hırvatistan', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Hindistan', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Var' },
  { name: 'Hollanda', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Honduras', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Hong Kong', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Irak', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'İngiltere', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'İran', umumi: 'Sınır Kapısında', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'İrlanda', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'İspanya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'İsrail', umumi: 'Vize Yok', umumiNote: '(90 gün)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'İsveç', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'İsviçre', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'İtalya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'İzlanda', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Jamaika', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Japonya', umumi: 'Vize Yok', umumiNote: '(90 gün)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Kamboçya', umumi: 'Sınır Kapısında', hususi: 'Sınır Kapısında', diplomatik: 'Sınır Kapısında' },
  { name: 'Kanada', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Var' },
  { name: 'Katar', umumi: 'Vize Yok', umumiNote: '(30 gün)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Kazakistan', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Kenya', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Kıbrıs Rum Kesimi', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Kolombiya', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Kosta Rika', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Kuveyt', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Küba', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Letonya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Libya', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Litvanya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Lübnan', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Lüksemburg', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Macaristan', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Maldiv Adaları', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Malezya', umumi: 'Vize Yok', umumiNote: '(90 gün)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Malta', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Meksika', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Mısır', umumi: 'Sınır Kapısında', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Moldova', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Moğolistan', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Monako', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Mozambik', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Nepal', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Nijerya', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Norveç', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Özbekistan', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Pakistan', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Panama', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Paraguay', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Peru', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Polonya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Portekiz', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Romanya', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Rusya', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Senegal', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Sırbistan', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Singapur', umumi: 'Vize Yok', umumiNote: '(30 gün)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Slovakya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Slovenya', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Sri Lanka', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Suriye', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Suudi Arabistan', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Tayland', umumi: 'Vize Yok', umumiNote: '(30 gün)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Tanzanya', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Tayvan', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Tunus', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Ukrayna', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Umman', umumi: 'Sınır Kapısında', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Uruguay', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Ürdün', umumi: 'Sınır Kapısında', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Venezuela', umumi: 'Vize Yok', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Vietnam', umumi: 'Vize Var', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Yemen', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Yeni Zelanda', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Var' },
  { name: 'Yunanistan', umumi: 'Vize Var', umumiNote: '(Schengen)', hususi: 'Vize Yok', diplomatik: 'Vize Yok' },
  { name: 'Zambia', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
  { name: 'Zimbabwe', umumi: 'Vize Var', hususi: 'Vize Var', diplomatik: 'Vize Yok' },
]
</script>
