'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@/generated/prisma/client';
import { redirect } from 'next/navigation';

import { shop2Schema } from './schemas';

import { validateWithZodSchema } from './schemas';

export type typeShop2_14 = Prisma.Shop2_14GetPayload<object>;

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'an error occurred',
  };
};

export const fetchCategory_14 = async () => {
  if (!prisma) return [];
  const categories = await prisma.category2_14.findMany();
  return categories;
};

export const deleteProduct_14 = async (formData: FormData) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  const pid = formData.get('id');

  const productId = String(pid);

  const before = await prisma.shop2_14.count();
  console.log('total products before delete:', before);

  await prisma.shop2_14.delete({ where: { pid: productId } });

  const after = await prisma.shop2_14.count();
  console.log('total products after delete:', after);

  revalidatePath('/final_14/admin_14/shop2_14');
};

export const fetchAdminShops = async () => {
  if (!prisma) return [];
  const shop2_14 = await prisma.shop2_14.findMany();
  return shop2_14;
};

export const fetchProductsByCategory_14 = async (category: string) => {
  if (!prisma) return [];
  const categoryRecord = await prisma.category2_14.findFirst({
    where: { cname: category },
  });
  if (!categoryRecord) return [];
  const shop2_14 = await prisma.shop2_14.findMany({
    where: { cat_id: categoryRecord.cid },
  });
  return shop2_14;
};

export const deleteProductAction = async (prevState: { pid: string }) => {
  const { pid } = prevState;
  // await getAdminUser();
  try {
    if (!prisma) throw new Error('Prisma client is not initialized');

    const before = await prisma.shop2_14.count();
    console.log('total products before delete:', before);

    await prisma.shop2_14.delete({
      where: {
        pid: pid,
      },
    });

    const after = await prisma.shop2_14.count();
    console.log('total products after delete:', after);

    revalidatePath('/final_14/admin_14/shop2_14');
    return { message: 'shop2 removed' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (pid: string) => {
  if (!prisma) throw new Error('Prisma client is not initialized');
  const shop2_14 = await prisma.shop2_14.findUnique({
    where: {
      pid: pid,
    },
  });
  if (!shop2_14) redirect('/final_14/admin_14/shop2_14');
  return shop2_14;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  // await getAdminUser();
  try {
    const pid = formData.get('id') as string;
    const rawData = Object.fromEntries(formData);
    const { id, $ACTION_REF_1, $ACTION_1, $ACTION_KEY, ...cleanData } = rawData;
    const validatedFields = validateWithZodSchema(shop2Schema, cleanData);

    if (!prisma) throw new Error('Prisma client is not initialized');
    await prisma.shop2_14.update({
      where: {
        pid: pid,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/final_14/admin_14/shop2_14/edit/${pid}`);
    revalidatePath(`/final_14/admin_14/shop2_14`);
    return { message: 'product updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const createProductAction2 = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(shop2Schema, rawData);

    if (!prisma) throw new Error('Prisma client is not initialized');
    await prisma.shop2_14.create({
      data: {
        ...validatedFields,
      },
    });
    revalidatePath('/final_14/admin_14/shop2_14');
    return { message: 'shop product created' };
  } catch (error) {
    return renderError(error);
  }
};
