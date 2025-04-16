import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default services
  const services = [
    {
      name: 'Basic Consultation',
      description: 'Initial consultation to discuss your needs',
      price: 50.00,
      duration: 60, // 60 minutes
    },
    {
      name: 'Follow-up Session',
      description: 'Follow-up consultation to track progress',
      price: 40.00,
      duration: 45, // 45 minutes
    },
    {
      name: 'Extended Session',
      description: 'In-depth consultation for complex cases',
      price: 75.00,
      duration: 90, // 90 minutes
    },
  ];

  // Delete existing services
  await prisma.service.deleteMany();

  // Create new services
  await prisma.service.createMany({
    data: services,
    skipDuplicates: true,
  });

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
