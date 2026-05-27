import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

function rand<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");

  const clerkIds = [
    "user_3DLmJaRD6y71qVKgRe8QU828X2o",
    "user_demo_test_account_001",
  ];
  const emails = [
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com",
    "demo@tku.edu.tw",
  ];

  const orders = Array.from({ length: 2 }).map(() => {
    const productsCount = randInt(1, 5);
    const subtotal = randInt(100, 1000);
    const tax = Math.round(subtotal * 0.1);
    const shipping = 5;
    return {
      clerkId: rand(clerkIds),
      products: productsCount,
      orderTotal: subtotal + tax + shipping,
      tax,
      shipping,
      email: rand(emails),
      isPaid: true,
    };
  });

  const created = await prisma.order.createMany({ data: orders });
  console.log(`Created ${created.count} random orders.`);

  const all = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log("Latest orders:");
  console.table(
    all.map((o) => ({
      id: o.id.slice(0, 8),
      email: o.email,
      products: o.products,
      total: o.orderTotal,
      isPaid: o.isPaid,
    })),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
