'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type UserInfo = {
  name: string;
  email: string;
};

export type User = UserInfo & { id: number };

export const fetchUsers = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  const users = await prisma.user.findMany();
  return users;
};

export const createUser = async (prevState: any, formData: FormData) => {
  console.log('prevState', prevState);
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const newUser: UserInfo = { name, email };
  console.log('newUser', newUser);

  if (!prisma) throw new Error('Prisma client is not initialized');
  try {
    const result = await prisma.user.create({ data: newUser });
    revalidatePath('/users_db_14');

    // some logic
    return 'user created successfully...';
  } catch (error) {
    console.log(error);
    return 'failed to create user...';
  }
};

export const removeUser = async (id: number, formData: FormData) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.user.delete({ where: { id } });
  revalidatePath('/users_db_14');
};
