import { createClient } from '@supabase/supabase-js';

const bucket = 'main-bucket';

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

export const uploadImage = async (image: File) => {
  const supabase = getSupabase();
  const timestamp = Date.now();
  const newName = `${timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: '3600' });
  if (!data) throw new Error('Image upload failed');
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};

export const deleteImage = (url: string) => {
  if (!url.startsWith('http') || !url.includes('.supabase.co/')) return null;
  const supabase = getSupabase();
  const imageName = url.split('/').pop();
  if (!imageName) throw new Error('Invalid URL');
  return supabase.storage.from(bucket).remove([imageName]);
};
