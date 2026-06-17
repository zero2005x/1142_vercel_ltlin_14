import { z, ZodSchema } from 'zod';

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
  image: z.string().min(5, {
    message: 'image must be at least 5 characters.',
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 3 && wordCount <= 1000;
    },
    {
      message: 'description must be between 3 and 1000 words.',
    }
  ),
});

export const shop2Schema = z.object({
  pname: z
    .string()
    .min(2, {
      message: 'name must be at least 2 characters.',
    })
    .max(100, {
      message: 'name must be less than 100 characters.',
    }),
  cat_id: z.coerce
    .number()
    .int()
    .min(1, {
      message: 'category id must be between 1 and 5.',
    })
    .max(5, {
      message: 'category id must be between 1 and 5.',
    }),
  price: z.coerce.number().min(0, {
    message: 'price must be a positive number.',
  }),
  img_url: z.string(),
  remote_img_url: z.string(),
});

export const blogSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'title must be at least 2 characters.',
    })
    .max(100, {
      message: 'title must be less than 100 characters.',
    }),
  category: z.string(),
  featured: z.coerce.boolean(),
  img: z.string().min(5, {
    message: 'image must be at least 5 characters.',
  }),
  remote_img: z.string().min(5, {
    message: 'image must be at least 5 characters.',
  }),
  descrip: z.string().refine(
    (descrip) => {
      const wordCount = descrip.split(' ').length;
      return wordCount >= 3 && wordCount <= 1000;
    },
    {
      message: 'description must be between 3 and 1000 words.',
    }
  ),
});

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.issues.map((error) => error.message);
    throw new Error(errors.join(','));
  }
  return result.data;
}
