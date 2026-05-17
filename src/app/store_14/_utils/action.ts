'use server';

import { prisma } from '@/lib/prisma';
import { products as seedProducts } from '@/store/products';

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

export async function fetchAllProducts_14(): Promise<Product[]> {
	if (!prisma) return fallbackProducts;

	try {
		return await prisma.product.findMany({
			orderBy: {
				createdAt: 'desc',
			},
		});
	} catch (error) {
		console.error('Failed to fetch products:', error);
		return fallbackProducts;
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
