import { PrismaClient } from '@prisma/client';
import { areas, fields, users, comments, conds } from '../surface';

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

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const comment of comments) {
    await prisma.comment.create({
      data: comment,
    });
  }

  for (const cond of conds) {
    await prisma.cond.create({
      data: cond,
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$connect();
  });
