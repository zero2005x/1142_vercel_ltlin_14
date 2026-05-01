'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const BLOG_DATA = [
  { title: 'Seven Reasons Why Coffee Is Awesome', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://picsum.photos/seed/blog1/400/300' },
  { title: 'Travel To Paris', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://picsum.photos/seed/blog2/400/300' },
  { title: 'Coffee Brings Friendship', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://picsum.photos/seed/blog3/400/300' },
  { title: 'Coffee Make You Feel Good', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://picsum.photos/seed/blog4/400/300' },
  { title: 'Coffee Make You Calm', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://picsum.photos/seed/blog5/400/300' },
  { title: '101 Tower In Taipei', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://picsum.photos/seed/blog6/400/300' },
  { title: 'Sun Rise From The Mountain', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://picsum.photos/seed/blog7/400/300' },
  { title: 'Serene Lake With Trees', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://picsum.photos/seed/blog8/400/300' },
  { title: 'Rocks Of Queen Head In Yehliu Taiwan', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://picsum.photos/seed/blog9/400/300' },
];

export const fetchBlog_14 = async () => {
  if (!prisma) return [];
  try {
    return await prisma.blog_14.findMany();
  } catch {
    return [];
  }
};

export const deleteBlog_14 = async (id: number) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.blog_14.delete({ where: { id } });
  revalidatePath('/quiz1_14/blog_db_14');
};

export const deleteAllBlog_14 = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.blog_14.deleteMany();
  revalidatePath('/quiz1_14/blog_db_14');
};

export const SeedBlog_14 = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  const existing = await prisma.blog_14.findMany();
  if (existing.length > 0) return { message: 'Already seeded' };
  for (const blog of BLOG_DATA) {
    await prisma.blog_14.create({ data: blog });
  }
  revalidatePath('/quiz1_14/blog_db_14');
  return { message: 'Seeded successfully' };
};
