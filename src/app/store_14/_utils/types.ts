import { Prisma, PrismaClient } from '@/generated/prisma/client';

export type StorePrismaClient = PrismaClient;
export type StorePrismaTransactionClient = Prisma.TransactionClient;

export type actionFunction = (
  prevState: { message: string },
  formData: FormData
) => Promise<{ message: string }>;
