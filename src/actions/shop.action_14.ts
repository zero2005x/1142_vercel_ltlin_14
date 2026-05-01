'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function seedMidtermData(): Promise<{ message: string }> {
  if (!prisma) return { message: 'Error: DATABASE_URL is not configured' };
  try {
  const existingCategories = await prisma.category_14.findMany();
  if (existingCategories.length > 0) {
    return { message: 'Data already seeded' };
  }

  const categories = [
    {
      cid: 1,
      cname: 'hats',
      size: null,
      image_url: '/images/midterm/homepage/hats.png',
      remote_image_url: 'https://i.ibb.co/cvpntL1/hats.png',
      link_url: '/exam/midterm/hats',
    },
    {
      cid: 2,
      cname: 'jackets',
      size: null,
      image_url: '/images/midterm/homepage/jackets.png',
      remote_image_url: 'https://i.ibb.co/px2tCc3/jackets.png',
      link_url: '/exam/midterm/jackets',
    },
    {
      cid: 3,
      cname: 'sneakers',
      size: null,
      image_url: '/images/midterm/homepage/sneakers.png',
      remote_image_url: 'https://i.ibb.co/0jqHpnp/sneakers.png',
      link_url: '/exam/midterm/sneakers',
    },
    {
      cid: 4,
      cname: 'womens',
      size: 'large',
      image_url: '/images/midterm/homepage/womens.png',
      remote_image_url: 'https://i.ibb.co/GCCdy8t/womens.png',
      link_url: '/exam/midterm/womens',
    },
    {
      cid: 5,
      cname: 'mens',
      size: 'large',
      image_url: '/images/midterm/homepage/mens.png',
      remote_image_url: 'https://i.ibb.co/R70vBrQ/men.png',
      link_url: '/exam/midterm/mens',
    },
  ];

  for (const cat of categories) {
    await prisma.category_14.create({ data: cat });
  }

  const shopItems = [
    {
      pid: 1,
      pname: 'Brown Brim',
      cat_id: 1,
      price: 25,
      img_url: '/images/midterm/hats/brown-brim.png',
      remote_img_url: 'https://i.ibb.co/ZYW3VTp/brown-brim.png',
    },
    {
      pid: 2,
      pname: 'Blue Beanie',
      cat_id: 1,
      price: 18,
      img_url: '/images/midterm/hats/blue-beanie.png',
      remote_img_url: 'https://i.ibb.co/ypkgK0X/blue-beanie.png',
    },
    {
      pid: 3,
      pname: 'Brown Cowboy',
      cat_id: 1,
      price: 35,
      img_url: '/images/midterm/hats/brown-cowboy.png',
      remote_img_url: 'https://i.ibb.co/QdJwgmp/brown-cowboy.png',
    },
    {
      pid: 4,
      pname: 'Grey Brim',
      cat_id: 1,
      price: 25,
      img_url: '/images/midterm/hats/grey-brim.png',
      remote_img_url: 'https://i.ibb.co/RjBLWxB/grey-brim.png',
    },
    {
      pid: 5,
      pname: 'Green Beanie',
      cat_id: 1,
      price: 18,
      img_url: '/images/midterm/hats/green-beanie.png',
      remote_img_url: 'https://i.ibb.co/YTjW3vF/green-beanie.png',
    },
    {
      pid: 6,
      pname: 'Palm Tree Cap',
      cat_id: 1,
      price: 14,
      img_url: '/images/midterm/hats/palm-tree-cap.png',
      remote_img_url: 'https://i.ibb.co/rKBDvJX/palm-tree-cap.png',
    },
    {
      pid: 7,
      pname: 'Red Beanie',
      cat_id: 1,
      price: 18,
      img_url: '/images/midterm/hats/red-beanie.png',
      remote_img_url: 'https://i.ibb.co/bLB646Z/red-beanie.png',
    },
    {
      pid: 8,
      pname: 'Wolf Cap',
      cat_id: 1,
      price: 14,
      img_url: '/images/midterm/hats/wolf-cap.png',
      remote_img_url: 'https://i.ibb.co/1f2nWMM/wolf-cap.png',
    },
    {
      pid: 9,
      pname: 'Blue Snapback',
      cat_id: 1,
      price: 16,
      img_url: '/images/midterm/hats/blue-snapback.png',
      remote_img_url: 'https://i.ibb.co/X2VJP2W/blue-snapback.png',
    },
    {
      pid: 10,
      pname: 'Black Jean Shearling',
      cat_id: 2,
      price: 125,
      img_url: '/images/midterm/jackets/black-shearling.png',
      remote_img_url: 'https://i.ibb.co/XzcwL5s/black-shearling.png',
    },
    {
      pid: 11,
      pname: 'Blue Jean Jacket',
      cat_id: 2,
      price: 90,
      img_url: '/images/midterm/jackets/blue-jean-jacket.png',
      remote_img_url: 'https://i.ibb.co/mJS6vz0/blue-jean-jacket.png',
    },
    {
      pid: 12,
      pname: 'Grey Jean Jacket',
      cat_id: 2,
      price: 90,
      img_url: '/images/midterm/jackets/grey-jean-jacket.png',
      remote_img_url: 'https://i.ibb.co/N71k1ML/grey-jean-jacket.png',
    },
    {
      pid: 13,
      pname: 'Brown Shearling',
      cat_id: 2,
      price: 165,
      img_url: '/images/midterm/jackets/brown-shearling.png',
      remote_img_url: 'https://i.ibb.co/s96FpdP/brown-shearling.png',
    },
    {
      pid: 14,
      pname: 'Tan Trench',
      cat_id: 2,
      price: 185,
      img_url: '/images/midterm/jackets/brown-trench.png',
      remote_img_url: 'https://i.ibb.co/M6hHc3F/brown-trench.png',
    },
    {
      pid: 15,
      pname: 'Adidas NMD',
      cat_id: 3,
      price: 220,
      img_url: '/images/midterm/sneakers/adidas-nmd.png',
      remote_img_url: 'https://i.ibb.co/0s3pdnc/adidas-nmd.png',
    },
    {
      pid: 16,
      pname: 'Adidas Yeezy',
      cat_id: 3,
      price: 280,
      img_url: '/images/midterm/sneakers/yeezy.png',
      remote_img_url: 'https://i.ibb.co/dJbG1cT/yeezy.png',
    },
    {
      pid: 17,
      pname: 'Black Converse',
      cat_id: 3,
      price: 110,
      img_url: '/images/midterm/sneakers/black-converse.png',
      remote_img_url: 'https://i.ibb.co/bPmVXyP/black-converse.png',
    },
    {
      pid: 18,
      pname: 'Nike White AirForce',
      cat_id: 3,
      price: 160,
      img_url: '/images/midterm/sneakers/white-nike-high-tops.png',
      remote_img_url: 'https://i.ibb.co/1RcFPk0/white-nike-high-tops.png',
    },
    {
      pid: 19,
      pname: 'Nike Red High Tops',
      cat_id: 3,
      price: 160,
      img_url: '/images/midterm/sneakers/nikes-red.png',
      remote_img_url: 'https://i.ibb.co/QcvzydB/nikes-red.png',
    },
    {
      pid: 20,
      pname: 'Nike Brown High Tops',
      cat_id: 3,
      price: 160,
      img_url: '/images/midterm/sneakers/nike-brown.png',
      remote_img_url: 'https://i.ibb.co/fMTV342/nike-brown.png',
    },
    {
      pid: 21,
      pname: 'Air Jordan Limited',
      cat_id: 3,
      price: 190,
      img_url: '/images/midterm/sneakers/nike-funky.png',
      remote_img_url: 'https://i.ibb.co/w4k6Ws9/nike-funky.png',
    },
    {
      pid: 22,
      pname: 'Timberlands',
      cat_id: 3,
      price: 200,
      img_url: '/images/midterm/sneakers/timberlands.png',
      remote_img_url: 'https://i.ibb.co/Mhh6wBg/timberlands.png',
    },
    {
      pid: 23,
      pname: 'Blue Tanktop',
      cat_id: 4,
      price: 25,
      img_url: '/images/midterm/womens/blue-tank.png',
      remote_img_url: 'https://i.ibb.co/7CQVJNm/blue-tank.png',
    },
    {
      pid: 24,
      pname: 'Floral Blouse',
      cat_id: 4,
      price: 20,
      img_url: '/images/midterm/womens/floral-blouse.png',
      remote_img_url: 'https://i.ibb.co/4W2DGKm/floral-blouse.png',
    },
    {
      pid: 25,
      pname: 'Floral Dress',
      cat_id: 4,
      price: 80,
      img_url: '/images/midterm/womens/floral-skirt.png',
      remote_img_url: 'https://i.ibb.co/KV18Ysr/floral-skirt.png',
    },
    {
      pid: 26,
      pname: 'Red Dots Dress',
      cat_id: 4,
      price: 80,
      img_url: '/images/midterm/womens/red-polka-dot-dress.png',
      remote_img_url: 'https://i.ibb.co/N3BN1bh/red-polka-dot-dress.png',
    },
    {
      pid: 27,
      pname: 'Striped Sweater',
      cat_id: 4,
      price: 45,
      img_url: '/images/midterm/womens/striped-sweater.png',
      remote_img_url: 'https://i.ibb.co/KmSkMbH/striped-sweater.png',
    },
    {
      pid: 28,
      pname: 'Yellow Track Suit',
      cat_id: 4,
      price: 135,
      img_url: '/images/midterm/womens/yellow-track-suit.png',
      remote_img_url: 'https://i.ibb.co/v1cvwNf/yellow-track-suit.png',
    },
    {
      pid: 29,
      pname: 'White Blouse',
      cat_id: 4,
      price: 20,
      img_url: '/images/midterm/womens/white-vest.png',
      remote_img_url: 'https://i.ibb.co/qBcrsJg/white-vest.png',
    },
    {
      pid: 30,
      pname: 'Camo Down Vest',
      cat_id: 5,
      price: 325,
      img_url: '/images/midterm/mens/camo-vest.png',
      remote_img_url: 'https://i.ibb.co/xJS0T3Y/camo-vest.png',
    },
    {
      pid: 31,
      pname: 'Floral T-shirt',
      cat_id: 5,
      price: 20,
      img_url: '/images/midterm/mens/floral-shirt.png',
      remote_img_url: 'https://i.ibb.co/qMQ75QZ/floral-shirt.png',
    },
    {
      pid: 32,
      pname: 'Black & White Longsleeve',
      cat_id: 5,
      price: 25,
      img_url: '/images/midterm/mens/long-sleeve.png',
      remote_img_url: 'https://i.ibb.co/55z32tw/long-sleeve.png',
    },
    {
      pid: 33,
      pname: 'Pink T-shirt',
      cat_id: 5,
      price: 25,
      img_url: '/images/midterm/mens/pink-shirt.png',
      remote_img_url: 'https://i.ibb.co/RvwnBL8/pink-shirt.png',
    },
    {
      pid: 34,
      pname: 'Jean Long Sleeve',
      cat_id: 5,
      price: 40,
      img_url: '/images/midterm/mens/roll-up-jean-shirt.png',
      remote_img_url: 'https://i.ibb.co/VpW4x5t/roll-up-jean-shirt.png',
    },
    {
      pid: 35,
      pname: 'Burgundy T-shirt',
      cat_id: 5,
      price: 25,
      img_url: '/images/midterm/mens/polka-dot-shirt.png',
      remote_img_url: 'https://i.ibb.co/mh3VM1f/polka-dot-shirt.png',
    },
  ];

  for (const item of shopItems) {
    await prisma.shop_14.create({ data: item });
  }

  return { message: 'Seeded successfully' };
  } catch (e: unknown) {
    return { message: `Error: ${e instanceof Error ? e.message : 'Unknown error'}` };
  }
}

export const deleteProduct_14 = async (formData: FormData) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  const id = formData.get('id');
  const productId = Number(id);
  await prisma.shop_14.delete({ where: { pid: productId } });
  revalidatePath('/exam/midterm');
  return { message: 'Deleted successfully' };
};

export async function deleteProductById_14(productId: number) {
  if (!prisma) throw new Error('Prisma client is not initialized');
  await prisma.shop_14.delete({ where: { pid: productId } });
  revalidatePath('/exam/midterm');
  return { message: 'Deleted successfully' };
}
