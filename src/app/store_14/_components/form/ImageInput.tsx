'use client';

import { type ChangeEvent, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  IMAGE_ACCEPT_ATTRIBUTE,
  IMAGE_ACCEPTED_LABEL,
  IMAGE_MAX_UPLOAD_SIZE,
} from '../../_utils/image-validation';
import {
  prepareImageForUpload,
  replaceInputFile,
} from '../../_utils/image-compression';

type ImageStatus = {
  type: 'idle' | 'processing' | 'success' | 'error';
  message: string;
};

function ImageInput() {
  const name = 'image';
  const [status, setStatus] = useState<ImageStatus>({
    type: 'idle',
    message: '',
  });

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) {
      setStatus({ type: 'idle', message: '' });
      return;
    }

    setStatus({
      type: 'processing',
      message:
        file.size > IMAGE_MAX_UPLOAD_SIZE
          ? 'Compressing image...'
          : 'Checking image...',
    });

    try {
      const result = await prepareImageForUpload(file);
      replaceInputFile(input, result.file);
      setStatus({ type: 'success', message: result.message });
    } catch (error) {
      input.value = '';
      setStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to prepare this image.',
      });
    }
  };

  return (
    <div className='mb-2'>
      <Label htmlFor={name} className='capitalize'>
        Image
      </Label>
      <Input
        id={name}
        name={name}
        type='file'
        required
        accept={IMAGE_ACCEPT_ATTRIBUTE}
        aria-invalid={status.type === 'error'}
        data-compress-image='true'
        onChange={handleChange}
      />
      <p
        className={`mt-1 text-xs ${
          status.type === 'error' ? 'text-destructive' : 'text-muted-foreground'
        }`}
        aria-live='polite'
      >
        {status.message ||
          `${IMAGE_ACCEPTED_LABEL}. Large images are compressed automatically.`}
      </p>
    </div>
  );
}
export default ImageInput;
