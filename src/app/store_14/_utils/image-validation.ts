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
export const IMAGE_SIGNATURE_BYTES = 12;

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

export async function detectImageMimeType(file: File) {
  const bytes = new Uint8Array(
    await file.slice(0, IMAGE_SIGNATURE_BYTES).arrayBuffer()
  );

  const isJpeg = bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (isJpeg) return 'image/jpeg';

  const isPng =
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a;
  if (isPng) return 'image/png';

  const isWebp =
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50;
  if (isWebp) return 'image/webp';

  return null;
}

export async function assertValidImageContent(file: File) {
  const detectedType = await detectImageMimeType(file);

  if (!detectedType) {
    throw new Error('Image content is not a valid JPEG, PNG, or WebP file.');
  }

  if (detectedType !== file.type) {
    throw new Error('Image content does not match the selected file type.');
  }
}
