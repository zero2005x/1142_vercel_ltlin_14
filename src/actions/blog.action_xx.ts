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

export const deleteBlog_xx = async (id: number) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.blog_xx.delete({ where: { id } });
  revalidatePath('/quiz1_xx/blog_db_xx');
};

export const deleteAllBlog_xx = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.blog_xx.deleteMany();
  revalidatePath('/quiz1_xx/blog_db_xx');
};

export const SeedBlog_xx = async () => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  const existing = await prisma.blog_xx.findMany();
  if (existing.length > 0) return;
  for (const blog of BLOG_DATA) {
    await prisma.blog_xx.create({ data: blog });
  }
  revalidatePath('/quiz1_xx/blog_db_xx');
};
