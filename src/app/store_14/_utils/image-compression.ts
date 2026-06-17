'use client';

import {
  formatFileSize,
  getImageTypeError,
  IMAGE_MAX_DIMENSION,
  IMAGE_MAX_UPLOAD_SIZE,
  IMAGE_TARGET_UPLOAD_SIZE,
} from './image-validation';

type PrepareImageResult = {
  file: File;
  changed: boolean;
  message: string;
};

const QUALITY_STEPS = [0.82, 0.74, 0.66, 0.58, 0.5, 0.42];
const DIMENSION_STEPS = [IMAGE_MAX_DIMENSION, 1400, 1200, 1000, 800, 640];
const OUTPUT_TYPE = 'image/webp';

function getOutputName(fileName: string) {
  const baseName =
    fileName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-z0-9_-]+/gi, '-')
      .replace(/^-+|-+$/g, '') || 'product-image';

  return `${baseName}.webp`;
}

function loadImage(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new window.Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unable to read this image. Please choose another one.'));
    };

    image.src = url;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Unable to compress this image.'));
          return;
        }
        resolve(blob);
      },
      OUTPUT_TYPE,
      quality
    );
  });
}

async function renderCompressedFile(
  image: HTMLImageElement,
  sourceFile: File,
  maxDimension: number,
  quality: number
) {
  const largestSide = Math.max(image.naturalWidth, image.naturalHeight);
  const scale = Math.min(1, maxDimension / largestSide);
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) throw new Error('Unable to prepare this image.');

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const blob = await canvasToBlob(canvas, quality);

  return new File([blob], getOutputName(sourceFile.name), {
    type: OUTPUT_TYPE,
    lastModified: Date.now(),
  });
}

export function replaceInputFile(input: HTMLInputElement, file: File) {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  input.files = dataTransfer.files;
}

export async function prepareImageForUpload(
  file: File
): Promise<PrepareImageResult> {
  const typeError = getImageTypeError(file);
  if (typeError) throw new Error(typeError);

  if (file.size <= IMAGE_MAX_UPLOAD_SIZE) {
    return {
      file,
      changed: false,
      message: `Image accepted (${formatFileSize(file.size)}).`,
    };
  }

  const image = await loadImage(file);
  let bestFile: File | null = null;

  for (const dimension of DIMENSION_STEPS) {
    for (const quality of QUALITY_STEPS) {
      const candidate = await renderCompressedFile(
        image,
        file,
        dimension,
        quality
      );

      if (!bestFile || candidate.size < bestFile.size) {
        bestFile = candidate;
      }

      if (candidate.size <= IMAGE_TARGET_UPLOAD_SIZE) {
        return {
          file: candidate,
          changed: true,
          message: `Image compressed from ${formatFileSize(
            file.size
          )} to ${formatFileSize(candidate.size)}.`,
        };
      }
    }
  }

  if (!bestFile || bestFile.size > IMAGE_MAX_UPLOAD_SIZE) {
    throw new Error(
      `Image is still too large after compression. Please choose a smaller image.`
    );
  }

  return {
    file: bestFile,
    changed: true,
    message: `Image compressed from ${formatFileSize(
      file.size
    )} to ${formatFileSize(bestFile.size)}.`,
  };
}

export async function prepareImageInputForUpload(input: HTMLInputElement) {
  const file = input.files?.[0];
  if (!file) return null;

  const result = await prepareImageForUpload(file);
  replaceInputFile(input, result.file);

  return result;
}
