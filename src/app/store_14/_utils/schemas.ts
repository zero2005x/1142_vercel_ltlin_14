import { z, ZodSchema } from 'zod';
import {
  formatFileSize,
  IMAGE_MAX_UPLOAD_SIZE,
  isAcceptedImageType,
} from './image-validation';

const maxProductPrice = 10_000_000;
const controlCharacterPattern = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const unsafeHtmlPattern =
  /<\s*\/?\s*(script|iframe|object|embed|link|meta|style|svg|math|form|input|button)|javascript:|data:text\/html|on\w+\s*=/i;

const safeText = (field: string) =>
  z
    .string()
    .trim()
    .refine(
      (value) => !controlCharacterPattern.test(value),
      `${field} contains invalid control characters.`
    )
    .refine(
      (value) => !unsafeHtmlPattern.test(value),
      `${field} contains unsafe HTML or script content.`
    );

export const productSchema = z.object({
  name: safeText('name')
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  company: safeText('company')
    .min(2, {
      message: 'company must be at least 2 characters.',
    })
    .max(100, {
      message: 'company must be less than 100 characters.',
    }),
  featured: z.coerce.boolean(),
  price: z.coerce
    .number()
    .int()
    .min(0, {
      message: 'price must be a positive number.',
    })
    .max(maxProductPrice, {
      message: `price must be less than ${maxProductPrice}.`,
    }),
  description: safeText('description')
    .max(5000, {
      message: 'description must be less than 5000 characters.',
    })
    .refine(
      (description) => {
        const wordCount = description.trim().split(/\s+/).filter(Boolean).length;
        return wordCount >= 10 && wordCount <= 1000;
      },
      {
        message: 'description must be between 10 and 1000 words.',
      }
    ),
});

export const productIdSchema = z.object({
  id: z.string().uuid({
    message: 'Invalid product id.',
  }),
});

export const productImageUpdateSchema = z.object({
  id: z.string().uuid({
    message: 'Invalid product id.',
  }),
  url: z
    .string()
    .url({
      message: 'Invalid product image URL.',
    })
    .refine((url) => url.includes('.supabase.co/'), {
      message: 'Invalid product image URL.',
    }),
});

export function validateFormFields(
  formData: FormData,
  allowedFields: string[]
) {
  const allowedFieldSet = new Set(allowedFields);
  const unexpectedFields = Array.from(formData.keys()).filter(
    (key) => !key.startsWith('$ACTION_') && !allowedFieldSet.has(key)
  );

  if (unexpectedFields.length > 0) {
    throw new Error(`Unexpected form fields: ${unexpectedFields.join(', ')}`);
  }
}

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
