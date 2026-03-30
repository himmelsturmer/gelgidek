import { PrismaClient } from '@prisma/client'
import fs from 'fs'

try {
  process.loadEnvFile()
} catch (e) {
  console.log('.env file could not be loaded directly, relying on system env')
}

const prisma = new PrismaClient()

async function main() {
  console.log('Reading scraped data...')
  if (!fs.existsSync('data_scraped.json')) {
      console.log('data_scraped.json not found. Run the scraper first!');
      return;
  }
  const dataRaw = fs.readFileSync('data_scraped.json', 'utf8')
  const data = JSON.parse(dataRaw)

  console.log(`Found ${data.length} visa combinations to seed.`)

  for (const item of data) {
    // 1. Ensure Country exists
    const country = await prisma.country.upsert({
      where: { slug: item.countrySlug },
      update: {},
      create: {
        name: item.country,
        slug: item.countrySlug,
        showOnHome: false
      }
    })

    // 2. Check if VisaInfo already exists for this country + purpose + profession
    const existingVisa = await prisma.visaInfo.findFirst({
        where: {
            countryId: country.id,
            purpose: item.purpose,
            profession: item.profession
        }
    })

    const payload = {
        countryId: country.id,
        purpose: item.purpose,
        profession: item.profession,
        documentList: JSON.stringify(item.documentList || []),
        applicationZones: JSON.stringify(item.applicationZones || []),
        processingTime: item.processingTime || '',
        description: item.description || '',
        embassyName: item.embassyRaw || '',
        consulateName: item.consulateRaw || '',
        pdf1Url: item.pdfs && item.pdfs.length > 0 ? item.pdfs[0].url : '',
        pdf1Label: item.pdfs && item.pdfs.length > 0 ? item.pdfs[0].label : '',
        pdf2Url: item.pdfs && item.pdfs.length > 1 ? item.pdfs[1].url : '',
        pdf2Label: item.pdfs && item.pdfs.length > 1 ? item.pdfs[1].label : '',
        pdf3Url: item.pdfs && item.pdfs.length > 2 ? item.pdfs[2].url : '',
        pdf3Label: item.pdfs && item.pdfs.length > 2 ? item.pdfs[2].label : '',
        pdf4Url: item.pdfs && item.pdfs.length > 3 ? item.pdfs[3].url : '',
        pdf4Label: item.pdfs && item.pdfs.length > 3 ? item.pdfs[3].label : ''
    }

    if (existingVisa) {
        await prisma.visaInfo.update({
            where: { id: existingVisa.id },
            data: payload
        })
    } else {
        await prisma.visaInfo.create({
            data: payload
        })
    }
  }
  
  console.log('Seeding completed successfully!')
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
