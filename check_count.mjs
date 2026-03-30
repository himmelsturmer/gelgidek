import { PrismaClient } from '@prisma/client';

process.loadEnvFile();
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.visaInfo.count();
    console.log(`CURRENT_COUNT=${count}`);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
