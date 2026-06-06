'use server';

import { prisma } from '@/lib/prisma';
import {revalidatePath} from "next/cache";
import { products as seedProducts } from '@/store/products';
import { redirect } from 'next/navigation';
import { currentUser, auth } from '@clerk/nextjs/server';
import { productSchema } from './schemas';



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

export async function fetchSingleProduct_14(id: string): Promise<Product> {
	if (!prisma) {
		const found = fallbackProducts.find((p) => p.id === id);
		if (!found) redirect('/store_14/products_14');
		return found;
	}

	try {
		const product = await prisma.product.findUnique({ where: { id } });
		if (!product) redirect('/store_14/products_14');
		return product;
	} catch (error) {
		console.error('Failed to fetch product:', error);
		redirect('/store_14/products_14');
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
			// take: 3,
		});
	} catch (error) {
		console.error('Failed to fetch featured products:', error);
		return fallbackProducts.filter((product) => product.featured);
	}
}

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect('/store_14');
  return user;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/store_14');
  console.log('Admin user authenticated:', user.emailAddresses[0]?.emailAddress);
  console.log('Admin user ID:', user.id);
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'an error occurred',
  };
};



export const createProductAction2 = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  // 1. valaidate user authentication and authorization
  const user = await getAuthUser();
  try {
    // 2. change FormData to a normal object for easier handling
    const rawData = Object.fromEntries(formData);
    // when using FormData, the checkbox value will be 'on' when checked and undefined when unchecked, we need to normalize it to a boolean value before validation
    const normalizedData = {
      ...rawData,
      featured: formData.get('featured') === 'on',
    };
    // 3. to validate the data using zod schema, if the validation fails, it will throw an error which will be caught in the catch block and return the error message to the client
    const validatedFields = productSchema.parse(normalizedData);
    // 4. To create a new product in the database using Prisma, we also bind the created product with the Clerk User ID of the creator for future reference (e.g., to show which admin created which product)
    await prisma?.product.create({
      data: {
        ...validatedFields,
        clerkId: user.id, // bind the Clerk User ID of the creator
      },
    });
    // 5. return a success message
    return { message: 'product created' };
  } catch (error) {
    // 6. error handling
    return renderError(error);
  }
};

export const createProductAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAdminUser();
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		await prisma.product.create({
			data: {
				name: formData.get('name') as string,
				company: formData.get('company') as string,
				description: formData.get('description') as string,
				price: Number(formData.get('price')),
				image: formData.get('image') as string,
				featured: formData.get('featured') === 'on',
				clerkId: user.id,
			},
		});
	} catch (error) {
		return renderError(error);
	}
	revalidatePath('/store_14/admin_14/products_14');
	redirect('/store_14/admin_14/products_14');
};

export const fetchAdminOrders = async () => {
	await getAdminUser();

	const orders = await prisma?.order.findMany({
		where: {
			isPaid: true,
		},
		orderBy: { createdAt: 'desc' },
	});
	return orders;
};

export const fetchAdminProducts = async () => {
	await getAdminUser();
	if (!prisma) return fallbackProducts;
	return prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
};

export const deleteProductAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	await getAdminUser();
	const productId = formData.get('id') as string;
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		await prisma.product.delete({ where: { id: productId } });
		revalidatePath('/store_14/admin_14/products_14');
		return { message: 'Product deleted successfully' };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchAdminProductDetails = async (productId: string) => {
	await getAdminUser();
	if (!prisma) {
		const found = fallbackProducts.find((p) => p.id === productId);
		if (!found) redirect('/store_14/admin_14/products_14');
		return found;
	}
	const product = await prisma.product.findUnique({
		where: { id: productId },
	});
	if (!product) redirect('/store_14/admin_14/products_14');
	return product;
};

export const updateProductAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	await getAdminUser();
	const productId = formData.get('id') as string;
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		const rawData = Object.fromEntries(formData);
		const normalizedData = {
			...rawData,
			featured: formData.get('featured') === 'on',
		};
		const validatedFields = productSchema.parse(normalizedData);
		await prisma.product.update({
			where: { id: productId },
			data: validatedFields,
		});
		revalidatePath(`/store_14/admin_14/products_14/${productId}/edit`);
		revalidatePath('/store_14/admin_14/products_14');
		return { message: 'Product updated successfully' };
	} catch (error) {
		return renderError(error);
	}
};

// ---------------- CART ----------------

const includeProductClause = {
	cartItems: {
		include: { product: true },
		orderBy: { createdAt: 'asc' as const },
	},
};

// Number badge shown in the navbar cart button (no redirect for guests).
export const fetchCartItems = async (): Promise<number> => {
	const { userId } = await auth();
	if (!userId || !prisma) return 0;
	const cart = await prisma.cart.findFirst({
		where: { clerkId: userId },
		select: { numItemsInCart: true },
	});
	return cart?.numItemsInCart ?? 0;
};

const fetchProduct = async (productId: string) => {
	if (!prisma) throw new Error('Prisma client is not initialized');
	const product = await prisma.product.findUnique({ where: { id: productId } });
	if (!product) throw new Error('Product not found');
	return product;
};

export const fetchOrCreateCart = async ({
	userId,
	errorOnFailure = false,
}: {
	userId: string;
	errorOnFailure?: boolean;
}) => {
	if (!prisma) throw new Error('Prisma client is not initialized');
	let cart = await prisma.cart.findFirst({
		where: { clerkId: userId },
		include: includeProductClause,
	});
	if (!cart && errorOnFailure) throw new Error('Cart not found');
	if (!cart) {
		cart = await prisma.cart.create({
			data: { clerkId: userId },
			include: includeProductClause,
		});
	}
	return cart;
};

const updateOrCreateCartItem = async ({
	productId,
	cartId,
	amount,
}: {
	productId: string;
	cartId: string;
	amount: number;
}) => {
	if (!prisma) throw new Error('Prisma client is not initialized');
	const existing = await prisma.cartItem.findFirst({
		where: { productId, cartId },
	});
	if (existing) {
		await prisma.cartItem.update({
			where: { id: existing.id },
			data: { amount: existing.amount + amount },
		});
	} else {
		await prisma.cartItem.create({
			data: { amount, productId, cartId },
		});
	}
};

// Recalculate totals from the current cart items and persist them.
const updateCart = async (cartId: string) => {
	if (!prisma) throw new Error('Prisma client is not initialized');
	const cart = await prisma.cart.findUnique({ where: { id: cartId } });
	if (!cart) throw new Error('Cart not found');

	const cartItems = await prisma.cartItem.findMany({
		where: { cartId },
		include: { product: true },
	});

	let numItemsInCart = 0;
	let cartTotal = 0;
	for (const item of cartItems) {
		numItemsInCart += item.amount;
		cartTotal += item.amount * item.product.price;
	}

	const tax = Math.round(cart.taxRate * cartTotal);
	const shipping = cartTotal ? cart.shipping : 0;
	const orderTotal = cartTotal + tax + shipping;

	await prisma.cart.update({
		where: { id: cartId },
		data: { numItemsInCart, cartTotal, tax, shipping, orderTotal },
	});
};

export const fetchCart = async () => {
	const user = await getAuthUser();
	return fetchOrCreateCart({ userId: user.id });
};

export const addToCartAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	try {
		const productId = formData.get('productId') as string;
		const amount = Number(formData.get('amount')) || 1;
		await fetchProduct(productId);
		const cart = await fetchOrCreateCart({ userId: user.id });
		await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
		await updateCart(cart.id);
	} catch (error) {
		return renderError(error);
	}
	revalidatePath('/store_14/cart_14');
	redirect('/store_14/cart_14');
};

export const removeCartItemAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	try {
		const cartItemId = formData.get('id') as string;
		const cart = await fetchOrCreateCart({ userId: user.id, errorOnFailure: true });
		if (!prisma) throw new Error('Prisma client is not initialized');
		await prisma.cartItem.deleteMany({
			where: { id: cartItemId, cartId: cart.id },
		});
		await updateCart(cart.id);
		revalidatePath('/store_14/cart_14');
		return { message: 'Item removed from cart' };
	} catch (error) {
		return renderError(error);
	}
};

export const updateCartItemAction = async ({
	amount,
	cartItemId,
}: {
	amount: number;
	cartItemId: string;
}): Promise<{ message: string }> => {
	const user = await getAuthUser();
	try {
		const cart = await fetchOrCreateCart({ userId: user.id, errorOnFailure: true });
		if (!prisma) throw new Error('Prisma client is not initialized');
		await prisma.cartItem.updateMany({
			where: { id: cartItemId, cartId: cart.id },
			data: { amount },
		});
		await updateCart(cart.id);
		revalidatePath('/store_14/cart_14');
		return { message: 'Cart updated' };
	} catch (error) {
		return renderError(error);
	}
};
