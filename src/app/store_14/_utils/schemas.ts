import { z, ZodSchema } from 'zod';
import {
  formatFileSize,
  IMAGE_MAX_UPLOAD_SIZE,
  isAcceptedImageType,
} from './image-validation';

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  company: z.string(),
  featured: z.coerce.boolean(),
  price: z.coerce.number().int().min(0, {
    message: 'price must be a positive number.',
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.trim().split(/\s+/).length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: 'description must be between 10 and 1000 words.',
    }
  ),
});

export const imageSchema = z.object({
  image: validateImageFile(),
});

function validateImageFile() {
  return z
    .instanceof(File)
    .refine((file) => file.size > 0, 'Image is required')
    .refine(
      (file) => isAcceptedImageType(file.type),
      'Please choose a JPEG, PNG, or WebP image.'
    )
    .refine(
      (file) => file.size <= IMAGE_MAX_UPLOAD_SIZE,
      `Image must be less than ${formatFileSize(
        IMAGE_MAX_UPLOAD_SIZE
      )} after compression.`
    );
}

export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((error) => error.message);
    throw new Error(errors.join(', '));
  }
  return result.data;
}

export const reviewSchema = z.object({
  productId: z.string().min(1, {
    message: 'Product ID cannot be empty',
  }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
  comment: z
    .string()
    .min(10, { message: 'Comment must be at least 10 characters long' })
    .max(1000, { message: 'Comment must be at most 1000 characters long' }),
});

export const salesSchema = z.object({
  email: z.string().email({
    message: 'a valid email is required.',
  }),
  products: z.coerce.number().int().min(1, {
    message: 'products must be at least 1.',
  }),
  orderTotal: z.coerce.number().int().min(0, {
    message: 'order total must be a positive number.',
  }),
  tax: z.coerce.number().int().min(0).default(0),
  shipping: z.coerce.number().int().min(0).default(0),
  isPaid: z.coerce.boolean().default(false),
});
