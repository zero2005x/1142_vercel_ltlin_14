import { prisma } from '../src/lib/prisma';
import { products } from '../src/store/products';

async function main() {
  if (!prisma) {
    throw new Error('DATABASE_URL is not set.');
  }

  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log('Seeded', products.length, 'products.');
}
main()
  .then(async () => {
    await prisma?.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma?.$disconnect();
    process.exit(1);
  });
