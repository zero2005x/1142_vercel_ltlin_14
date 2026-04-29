import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL ?? '';

const globalForPrisma = globalThis as typeof globalThis & {
  prismaGlobal?: PrismaClient;
};

export const prisma =
  globalForPrisma.prismaGlobal ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString }),
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prismaGlobal = prisma;
}
