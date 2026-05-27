'use server';

import { prisma } from '@/lib/prisma';
import {revalidatePath} from "next/cache";
import { products as seedProducts } from '@/store/products';
import { redirect } from 'next/navigation';
import { currentUser, auth } from '@clerk/nextjs/server';

export type Product = {
	id: string;
	name: string;
	company: string;
	description: string;
	featured: boolean;
	image: string;
	price: number;
	clerkId: string;
};

const fallbackProducts: Product[] = seedProducts.map((product, index) => ({
	id: `seed-${index + 1}`,
	...product,
}));

// handle search and filter logic in the action function
export async function fetchAllProducts_14({ search }: { search?: string }): Promise<Product[]> {
	if (!prisma) {
		if (!search) return fallbackProducts;
		const keyword = search.toLowerCase();
		return fallbackProducts.filter(
			(p) =>
				p.name.toLowerCase().includes(keyword) ||
				p.company.toLowerCase().includes(keyword),
		);
	}

	try {
		return await prisma.product.findMany({
			where: search
				? {
						OR: [
							{ name: { contains: search, mode: 'insensitive' } },
							{ company: { contains: search, mode: 'insensitive' } },
						],
				  }
				: undefined,
			orderBy: {
				createdAt: 'desc',
			},
		});
	} catch (error) {
		console.error('Failed to fetch products:', error);
		return fallbackProducts;
	}
}

export async function fetchSingleProduct_14(id: string): Promise<Product | null> {
	if (!prisma) return fallbackProducts.find((p) => p.id === id) ?? null;

	try {
		return await prisma.product.findUnique({
			where: { id },
		});
	} catch (error) {
		console.error('Failed to fetch product:', error);
		return null;
	}
}

export async function fetchFeaturedProducts_14(): Promise<Product[]> {
	if (!prisma) {
		return fallbackProducts.filter((product) => product.featured);
	}

	try {
		return await prisma.product.findMany({
			where: {
				featured: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 3,
		});
	} catch (error) {
		console.error('Failed to fetch featured products:', error);
		return fallbackProducts.filter((product) => product.featured);
	}
}

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect('/store_xx');
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/store_xx');
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'an error occurred',
  };
};