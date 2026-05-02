'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { blogData2_14 } from './data/blogData';

export const deleteBlog_14 = async (id: number) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.blog_14.delete({ where: { id } });
  revalidatePath('/quiz1_14/p1_14');
};

export const deleteAllBlog_14 = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.blog_14.deleteMany();
  revalidatePath('/quiz1_14/p1_14');
};

export const SeedBlog_14 = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  // console.log('blogData2_14:', blogData2_14);
  await prisma.blog_14.createMany({
    data: blogData2_14,
    skipDuplicates: true,
  });
  revalidatePath('/quiz1_14/p1_14');
};
