import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = globalThis as typeof globalThis & {
    prismaGlobal?: PrismaClient;
};

const prisma = connectionString
    ? globalForPrisma.prismaGlobal ?? new PrismaClient({
        adapter: new PrismaPg({ connectionString }),
    })
    : null;

if (process.env.NODE_ENV !== 'production' && prisma) {
    globalForPrisma.prismaGlobal = prisma;
}

const prismaError = connectionString ? null : 'DATABASE_URL is not set.';

export { prisma, prismaError };
