import { PrismaClient } from '@prisma/client';
import { areas, fields, conditions, users } from '../surface';

const prisma = new PrismaClient();

async function main() {
  for (const area of areas) {
    await prisma.area.create({
      data: area,
    });
  }

  for (const field of fields) {
    await prisma.field.create({
      data: field,
    });
  }

  for (const condition of conditions) {
    await prisma.condition.create({
      data: condition,
    });
  }

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$connect();
  });
