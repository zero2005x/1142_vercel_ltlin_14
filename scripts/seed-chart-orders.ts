import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set.");

  const clerkId =
    process.env.ADMIN_USER_ID ?? "user_demo_chart_seed_001";
  const emails = [
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com",
    "demo@tku.edu.tw",
  ];

  // Spread paid orders across the last 6 months so the chart shows multiple bars.
  const now = new Date();
  const orders = Array.from({ length: 6 }).map((_, index) => {
    const monthsAgo = 5 - index; // oldest first
    const createdAt = new Date(now);
    createdAt.setMonth(now.getMonth() - monthsAgo);
    createdAt.setDate(randInt(1, 27));

    const productsCount = randInt(1, 5);
    const subtotal = randInt(100, 1000);
    const tax = Math.round(subtotal * 0.1);
    const shipping = 5;

    return {
      clerkId,
      products: productsCount,
      orderTotal: subtotal + tax + shipping,
      tax,
      shipping,
      email: emails[index % emails.length],
      isPaid: true,
      createdAt,
    };
  });

  const created = await prisma.order.createMany({ data: orders });
  console.log(`Created ${created.count} paid orders across the last 6 months.`);

  const all = await prisma.order.findMany({
    where: { isPaid: true },
    orderBy: { createdAt: "asc" },
    take: 12,
  });
  console.log("Paid orders (chart input):");
  console.table(
    all.map((o) => ({
      date: o.createdAt.toISOString().slice(0, 10),
      email: o.email,
      products: o.products,
      total: o.orderTotal,
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
