'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { products as seedProducts } from '@/store/products';
import { redirect } from 'next/navigation';
import { currentUser, auth } from '@clerk/nextjs/server';
import {
	cartAmountSchema,
	imageSchema,
	productIdSchema,
	productSchema,
	reviewSchema,
	salesSchema,
	uuidSchema,
	validateFormFields,
	validateWithZodSchema,
} from './schemas';
import { deleteImage, uploadImage } from './supabase';
import { assertValidImageContent } from './image-validation';



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

type StoreAuthUser = {
	id: string;
	firstName: string | null;
	username: string | null;
	imageUrl: string;
	emailAddresses: Array<{ emailAddress: string }>;
};

const createSessionUser = (userId: string): StoreAuthUser => ({
	id: userId,
	firstName: null,
	username: null,
	imageUrl: '',
	emailAddresses: [],
});

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

const getAuthUser = async (): Promise<StoreAuthUser> => {
  const { userId } = await auth();
  if (!userId) redirect('/store_14');

  return createSessionUser(userId);
};

const getAuthUserProfile = async (): Promise<StoreAuthUser> => {
  const sessionUser = await getAuthUser();

  try {
    const user = await currentUser();
    if (user) {
      return {
        id: user.id,
        firstName: user.firstName,
        username: user.username,
        imageUrl: user.imageUrl,
        emailAddresses: user.emailAddresses.map((email) => ({
          emailAddress: email.emailAddress,
        })),
      };
    }
  } catch (error) {
    console.warn('Clerk currentUser lookup failed; using session user id.', error);
  }

  return sessionUser;
};

const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/store_14');
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : 'an error occurred',
  };
};

const productFields = ['name', 'company', 'featured', 'price', 'description'];
const createProductFields = [...productFields, 'image'];
const updateProductFields = ['id', ...productFields];
const updateProductImageFields = ['id', 'url', 'image'];
const deleteProductFields = ['id'];
const addToCartFields = ['productId', 'amount'];
const removeCartItemFields = ['id'];
const favoriteFields = ['productId', 'favoriteId', 'pathname'];
const reviewFields = ['productId', 'rating', 'comment'];
const deleteReviewFields = ['reviewId'];
const salesFields = ['email', 'products', 'orderTotal', 'tax', 'shipping', 'isPaid'];

const getSafeStorePathname = (pathname: string) => {
	if (!pathname.startsWith('/store_14')) return '/store_14/products_14';
	if (pathname.startsWith('//')) return '/store_14/products_14';
	return pathname;
};



export const createProductAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAdminUser();
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, createProductFields);
		const rawData = Object.fromEntries(formData);
		const file = formData.get('image') as File;
		const normalizedData = {
			...rawData,
			featured: formData.get('featured') === 'on',
		};
		const validatedFields = validateWithZodSchema(productSchema, normalizedData);
		const validatedFile = validateWithZodSchema(imageSchema, { image: file });
		await assertValidImageContent(validatedFile.image);
		const image = await uploadImage(validatedFile.image);

		await prisma.product.create({
			data: {
				...validatedFields,
				image,
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
	if (!prisma) return [];

	const orders = await prisma.order.findMany({
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
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, deleteProductFields);
		const { id: productId } = validateWithZodSchema(productIdSchema, {
			id: formData.get('id'),
		});
		const product = await prisma.product.delete({ where: { id: productId } });
		await deleteImage(product.image);
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
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, updateProductFields);
		const { id: productId } = validateWithZodSchema(productIdSchema, {
			id: formData.get('id'),
		});
		const rawData = Object.fromEntries(formData);
		const normalizedData = {
			...rawData,
			featured: formData.get('featured') === 'on',
		};
		const validatedFields = validateWithZodSchema(productSchema, normalizedData);
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

export const updateProductImageAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	await getAdminUser();

	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, updateProductImageFields);
		const { id: productId } = validateWithZodSchema(productIdSchema, {
			id: formData.get('id'),
		});
		const product = await prisma.product.findUnique({ where: { id: productId } });
		if (!product) throw new Error('Product not found');
		const image = formData.get('image') as File;
		const validatedFile = validateWithZodSchema(imageSchema, { image });
		await assertValidImageContent(validatedFile.image);
		const fullPath = await uploadImage(validatedFile.image);

		await prisma.product.update({
			where: { id: productId },
			data: { image: fullPath },
		});
		await deleteImage(product.image);
		revalidatePath(`/store_14/admin_14/products_14/${productId}/edit`);
		revalidatePath('/store_14/admin_14/products_14');
		return { message: 'Product image updated successfully' };
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

	return prisma.cart.update({
		where: { id: cartId },
		data: { numItemsInCart, cartTotal, tax, shipping, orderTotal },
		include: includeProductClause,
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
		validateFormFields(formData, addToCartFields);
		const productId = formData.get('productId') as string;
		validateWithZodSchema(productIdSchema, { id: productId });
		const amount = validateWithZodSchema(
			cartAmountSchema,
			formData.get('amount') || 1,
		);
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
		validateFormFields(formData, removeCartItemFields);
		const cartItemId = formData.get('id') as string;
		validateWithZodSchema(uuidSchema, cartItemId);
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
		validateWithZodSchema(uuidSchema, cartItemId);
		const validatedAmount = validateWithZodSchema(cartAmountSchema, amount);
		const cart = await fetchOrCreateCart({ userId: user.id, errorOnFailure: true });
		if (!prisma) throw new Error('Prisma client is not initialized');
		await prisma.cartItem.updateMany({
			where: { id: cartItemId, cartId: cart.id },
			data: { amount: validatedAmount },
		});
		await updateCart(cart.id);
		revalidatePath('/store_14/cart_14');
		return { message: 'Cart updated' };
	} catch (error) {
		return renderError(error);
	}
};

// ---------------- FAVORITES ----------------

// Returns the favorite id for a product if the signed-in user has favorited it.
// Guests (or a missing db) get null so the button can show a sign-in prompt.
export const fetchFavoriteId = async ({
	productId,
}: {
	productId: string;
}): Promise<string | null> => {
	const { userId } = await auth();
	if (!userId || !prisma) return null;
	const favorite = await prisma.favorite.findFirst({
		where: { productId, clerkId: userId },
		select: { id: true },
	});
	return favorite?.id ?? null;
};

export const toggleFavoriteAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	const productId = formData.get('productId') as string;
	const favoriteId = formData.get('favoriteId') as string;
	const pathname = getSafeStorePathname(
		(formData.get('pathname') as string) || '/store_14/products_14',
	);
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, favoriteFields);
		validateWithZodSchema(productIdSchema, { id: productId });
		if (favoriteId) validateWithZodSchema(uuidSchema, favoriteId);
		if (favoriteId) {
			await prisma.favorite.deleteMany({
				where: { id: favoriteId, clerkId: user.id },
			});
		} else {
			await fetchProduct(productId);
			await prisma.favorite.create({
				data: { productId, clerkId: user.id },
			});
		}
		revalidatePath(pathname);
		return {
			message: favoriteId ? 'removed from favorites' : 'added to favorites',
		};
	} catch (error) {
		return renderError(error);
	}
};

export const fetchUserFavorites = async () => {
	const user = await getAuthUser();
	if (!prisma) return [];
	return prisma.favorite.findMany({
		where: { clerkId: user.id },
		include: { product: true },
		orderBy: { createdAt: 'desc' },
	});
};

// ---------------- REVIEWS ----------------

export const createReviewAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAuthUserProfile();
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, reviewFields);
		const rawData = Object.fromEntries(formData);
		const validatedFields = validateWithZodSchema(reviewSchema, rawData);
		await fetchProduct(validatedFields.productId);
		const authorName =
			user.firstName ??
			user.username ??
			user.emailAddresses[0]?.emailAddress ??
			'Store customer';
		const authorImageUrl = user.imageUrl || '/window.svg';

		const existingReview = await prisma.review.findFirst({
			where: {
				clerkId: user.id,
				productId: validatedFields.productId,
			},
			select: { id: true },
		});

		if (existingReview) throw new Error('You already reviewed this product');

		await prisma.review.create({
			data: {
				...validatedFields,
				authorName,
				authorImageUrl,
				clerkId: user.id,
			},
		});
		revalidatePath(`/store_14/products_14/${validatedFields.productId}`);
		revalidatePath('/store_14/reviews_14');
		return { message: 'Review submitted successfully' };
	} catch (error) {
		return renderError(error);
	}
};

export const fetchProductReviews = async (productId: string) => {
	if (!prisma) return [];
	return prisma.review.findMany({
		where: { productId },
		orderBy: { createdAt: 'desc' },
	});
};

export const fetchProductRating = async (productId: string) => {
	if (!prisma) return { rating: '0.0', count: 0 };

	const result = await prisma.review.groupBy({
		by: ['productId'],
		_avg: { rating: true },
		_count: { rating: true },
		where: { productId },
	});

	return {
		rating: result[0]?._avg.rating?.toFixed(1) ?? '0.0',
		count: result[0]?._count.rating ?? 0,
	};
};

export const fetchProductReviewsByUser = async () => {
	const user = await getAuthUser();
	if (!prisma) return [];

	return prisma.review.findMany({
		where: { clerkId: user.id },
		select: {
			id: true,
			rating: true,
			comment: true,
			product: {
				select: {
					id: true,
					image: true,
					name: true,
				},
			},
		},
		orderBy: { createdAt: 'desc' },
	});
};

export const deleteReviewAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAuthUser();
	const reviewId = formData.get('reviewId') as string;

	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, deleteReviewFields);
		validateWithZodSchema(uuidSchema, reviewId);
		const review = await prisma.review.findFirst({
			where: {
				id: reviewId,
				clerkId: user.id,
			},
			select: { productId: true },
		});

		if (!review) throw new Error('Review not found');

		await prisma.review.delete({ where: { id: reviewId } });
		revalidatePath('/store_14/reviews_14');
		revalidatePath(`/store_14/products_14/${review.productId}`);
		return { message: 'Review deleted successfully' };
	} catch (error) {
		return renderError(error);
	}
};

export const findExistingReview = async (userId: string, productId: string) => {
	if (!prisma) return null;
	return prisma.review.findFirst({
		where: {
			clerkId: userId,
			productId,
		},
	});
};

// ---------------- SALES (ORDERS) ----------------

export const createOrderAction = async (
	_prevState: { message: string },
	_formData: FormData,
): Promise<{ message: string }> => {
	void _prevState;
	void _formData;

	const user = await getAuthUserProfile();
	let orderId: string | null = null;
	let cartId: string | null = null;

	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});
		const currentCart = await updateCart(cart.id);
		if (currentCart.numItemsInCart === 0) throw new Error('Cart is empty');

		await prisma.order.deleteMany({
			where: {
				clerkId: user.id,
				isPaid: false,
			},
		});

		const order = await prisma.order.create({
			data: {
				clerkId: user.id,
				products: currentCart.numItemsInCart,
				orderTotal: currentCart.orderTotal,
				tax: currentCart.tax,
				shipping: currentCart.shipping,
				email: user.emailAddresses[0]?.emailAddress ?? 'customer@example.com',
			},
		});

		orderId = order.id;
		cartId = currentCart.id;
	} catch (error) {
		return renderError(error);
	}

	redirect(`/store_14/checkout_14?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
	const user = await getAuthUser();
	if (!prisma) return [];

	return prisma.order.findMany({
		where: {
			clerkId: user.id,
			isPaid: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

export const createSalesAction = async (
	_prevState: { message: string },
	formData: FormData,
): Promise<{ message: string }> => {
	const user = await getAdminUser();
	try {
		if (!prisma) throw new Error('Prisma client is not initialized');
		validateFormFields(formData, salesFields);
		const rawData = Object.fromEntries(formData);
		const normalizedData = {
			...rawData,
			isPaid: formData.get('isPaid') === 'on',
		};
		const validatedFields = validateWithZodSchema(salesSchema, normalizedData);
		await prisma.order.create({
			data: {
				...validatedFields,
				clerkId: user.id,
			},
		});
	} catch (error) {
		return renderError(error);
	}
	revalidatePath('/store_14/admin_14/sales_14');
	redirect('/store_14/admin_14/sales_14');
};

// ---------------- DASHBOARD ----------------

export type DashboardStats = {
	ordersCount: number;
	totalSales: number;
	productsSold: number;
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
	await getAdminUser();
	if (!prisma) return { ordersCount: 0, totalSales: 0, productsSold: 0 };

	const aggregate = await prisma.order.aggregate({
		where: { isPaid: true },
		_count: { id: true },
		_sum: { orderTotal: true, products: true },
	});

	return {
		ordersCount: aggregate._count.id ?? 0,
		totalSales: aggregate._sum.orderTotal ?? 0,
		productsSold: aggregate._sum.products ?? 0,
	};
};

export type ChartDatum = {
	date: string;
	amount: number;
};

export const fetchChartData = async (): Promise<ChartDatum[]> => {
	await getAdminUser();
	if (!prisma) return [];

	const date = new Date();
	date.setMonth(date.getMonth() - 6);
	const sixMonthsAgo = date;

	const orders = await prisma.order.groupBy({
		by: ['createdAt'],
		where: { isPaid: true, createdAt: { gte: sixMonthsAgo } },
		_sum: { orderTotal: true },
		orderBy: { createdAt: 'asc' },
	});

	const formatter = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
	});

	return orders.map((order) => ({
		date: formatter.format(order.createdAt),
		amount: order._sum.orderTotal ?? 0,
	}));
};
