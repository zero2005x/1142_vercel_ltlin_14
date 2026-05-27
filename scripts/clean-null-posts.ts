import { PrismaClient } from "../src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$executeRawUnsafe(
    `DELETE FROM "Post" WHERE "authorId" IS NULL;`
  );
  console.log(`Deleted ${result} rows from Post where authorId IS NULL.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
