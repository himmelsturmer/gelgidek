export default defineEventHandler(async () => {
  const [countries, visaInfos, slides, homeCountries] = await Promise.all([
    prisma.country.count(),
    prisma.visaInfo.count(),
    prisma.carouselSlide.count({ where: { active: true } }),
    prisma.country.count({ where: { showOnHome: true } })
  ])
  return { countries, visaInfos, slides, homeCountries }
})
