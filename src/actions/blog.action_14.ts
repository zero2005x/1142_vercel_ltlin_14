'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const BLOG_DATA = [
  { title: 'Seven Reasons Why Coffee Is Awesome', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-1.jpg' },
  { title: 'Travel To Paris', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-2.jpg' },
  { title: 'Coffee Brings Friendship', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-3.jpg' },
  { title: 'Coffee Make You Feel Good', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-4.jpg' },
  { title: 'Coffee Make You Calm', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'lifestyle', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-5.jpg' },
  { title: '101 Tower In Taipei', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-6.jpg' },
  { title: 'Sun Rise From The Mountain', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-7.jpg' },
  { title: 'Serene Lake With Trees', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-8.jpg' },
  { title: 'Rocks Of Queen Head In Yehliu Taiwan', descrip: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', category: 'travel', img: 'https://erogcveccbzsyhbgputf.supabase.co/storage/v1/object/public/demo-xx/card-xx/photo-9.jpg' },
];

export const fetchBlog_14 = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  return prisma.blog_14.findMany();
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
