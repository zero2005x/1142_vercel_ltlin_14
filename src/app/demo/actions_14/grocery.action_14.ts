'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { nanoid } from 'nanoid';

export const fetchGrocery = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  const users = await prisma.groceryItem.findMany();
  return users;
};

export const createGrocery = async (formDate: FormData) => {
  const name = formDate.get('name') as string;
  const completed = false;
  const id = nanoid();
  const newGrocery = { id, name, completed };
  console.log('newGrocery', newGrocery);
  if (!prisma) throw new Error('Prisma client is not initialized');
  try {
    const result = await prisma.groceryItem.create({
      data: newGrocery,
    });
    revalidatePath('/grocery_db_14');
  } catch (error) {
    console.log(error);
  }
};

export const removeGrocery = async (id: string, formData: FormData) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.groceryItem.delete({ where: { id } });
  revalidatePath('/grocery_db_14');
};

export const editGrocery = async (id: string, completed: boolean) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  try {
    const updatedGrocery = await prisma.groceryItem.update({
      where: { id },
      data: {
        completed,
      },
    });
    revalidatePath('/grocery_db_14');
  } catch (error) {
    console.error('Error updating grocery:', error);
    throw error;
  }
};
