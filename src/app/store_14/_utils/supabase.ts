import { createClient } from '@supabase/supabase-js';
import { IMAGE_ACCEPTED_TYPES, IMAGE_MAX_UPLOAD_SIZE } from './image-validation';

const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'main-bucket';
const fallbackImageType = 'image/webp';

const getSafeImageName = (name: string) => {
  const extension = name.split('.').pop()?.toLowerCase() || 'webp';
  const baseName =
    name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9_-]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'product-image';

  return `${Date.now()}-${baseName}.${extension}`;
};

const getSupabase = () => {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_KEY ??
    process.env.SUPABASE_SECRET_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    throw new Error('Supabase storage environment variables are not set');
  }

  return createClient(url, key);
};

const ensureBucketExists = async (supabase: ReturnType<typeof getSupabase>) => {
  const { error } = await supabase.storage.getBucket(bucket);
  if (!error) return;

  const isMissingBucket =
    error.statusCode === '404' ||
    error.message.toLowerCase().includes('not found');

  if (!isMissingBucket) {
    throw new Error(`Supabase storage bucket check failed: ${error.message}`);
  }

  const { error: createError } = await supabase.storage.createBucket(bucket, {
    public: true,
    allowedMimeTypes: [...IMAGE_ACCEPTED_TYPES],
    fileSizeLimit: IMAGE_MAX_UPLOAD_SIZE,
  });

  if (createError) {
    throw new Error(
      `Supabase storage bucket "${bucket}" does not exist and could not be created: ${createError.message}`
    );
  }
};

export const uploadImage = async (image: File) => {
  const supabase = getSupabase();
  await ensureBucketExists(supabase);

  const newName = getSafeImageName(image.name);
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image, {
      cacheControl: '3600',
      contentType: image.type || fallbackImageType,
      upsert: false,
    });
  if (error) throw new Error(`Image upload failed: ${error.message}`);
  if (!data) throw new Error('Image upload failed: Supabase returned no data');

  return supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
};

export const deleteImage = (url: string) => {
  if (!url.startsWith('http') || !url.includes('.supabase.co/')) return null;
  const supabase = getSupabase();
  const imageName = decodeURIComponent(url.split('/').pop() || '');
  if (!imageName) throw new Error('Invalid URL');
  return supabase.storage.from(bucket).remove([imageName]);
};
