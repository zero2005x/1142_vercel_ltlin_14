'use client';

import {
  type FormEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { actionFunction } from '../../_utils/types';
import { prepareImageInputForUpload } from '../../_utils/image-compression';

const initialState = {
  message: '',
};

function FormContainer({
  action,
  children,
}: {
  action: actionFunction;
  children: React.ReactNode;
}) {
  const [state, formAction] = useActionState(action, initialState);
  const [isPreparingImage, setIsPreparingImage] = useState(false);
  const isImageReadyRef = useRef(false);
  const isPreparingImageRef = useRef(false);

  useEffect(() => {
    if (state.message) {
      toast(state.message);
    }
  }, [state]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (isPreparingImageRef.current) {
      event.preventDefault();
      return;
    }

    if (isImageReadyRef.current) {
      isImageReadyRef.current = false;
      return;
    }

    const form = event.currentTarget;
    const imageInputs = Array.from(
      form.querySelectorAll<HTMLInputElement>(
        'input[type="file"][data-compress-image="true"]'
      )
    ).filter((input) => input.files?.[0]);

    if (imageInputs.length === 0) return;

    event.preventDefault();
    isPreparingImageRef.current = true;
    setIsPreparingImage(true);

    try {
      for (const input of imageInputs) {
        await prepareImageInputForUpload(input);
      }
      isImageReadyRef.current = true;
      form.requestSubmit();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Unable to prepare image.'
      );
    } finally {
      isPreparingImageRef.current = false;
      setIsPreparingImage(false);
    }
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      aria-busy={isPreparingImage}
    >
      {children}
    </form>
  );
}
export default FormContainer;
