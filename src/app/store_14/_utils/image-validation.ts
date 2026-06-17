export const IMAGE_ACTION_BODY_LIMIT_BYTES = 1024 * 1024;
export const IMAGE_MAX_UPLOAD_SIZE = 900 * 1024;
export const IMAGE_TARGET_UPLOAD_SIZE = 850 * 1024;
export const IMAGE_MAX_DIMENSION = 1600;

export const IMAGE_ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export const IMAGE_ACCEPT_ATTRIBUTE = IMAGE_ACCEPTED_TYPES.join(',');
export const IMAGE_ACCEPTED_LABEL = 'JPEG, PNG, or WebP';

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function isAcceptedImageType(type: string) {
  return IMAGE_ACCEPTED_TYPES.includes(
    type as (typeof IMAGE_ACCEPTED_TYPES)[number]
  );
}

export function getImageTypeError(file: File | null | undefined) {
  if (!file || file.size === 0) return 'Image is required';
  if (!isAcceptedImageType(file.type)) {
    return `Please choose a ${IMAGE_ACCEPTED_LABEL} image.`;
  }
  return '';
}

export function getImageUploadError(file: File | null | undefined) {
  const typeError = getImageTypeError(file);
  if (typeError) return typeError;
  if (file && file.size > IMAGE_MAX_UPLOAD_SIZE) {
    return `Image must be less than ${formatFileSize(
      IMAGE_MAX_UPLOAD_SIZE
    )} after compression.`;
  }
  return '';
}
