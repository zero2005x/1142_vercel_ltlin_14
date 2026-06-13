'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import { LuCopy, LuMail } from 'react-icons/lu';
import { Button } from '@/components/ui/button';

function ShareButton_14({ productId, name }: { productId: string; name: string }) {
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    setShareLink(`${window.location.origin}/store_14/products_14/${productId}`);
  }, [productId]);

  const encodedLink = encodeURIComponent(shareLink);
  const encodedName = encodeURIComponent(name);

  const copyLink = async () => {
    if (!shareLink) return;
    try {
      await navigator.clipboard.writeText(shareLink);
      toast('Product link copied');
    } catch {
      toast('Unable to copy link');
    }
  };

  return (
    <div className='flex items-center gap-2'>
      <Button type='button' size='icon' variant='outline' onClick={copyLink}>
        <LuCopy />
        <span className='sr-only'>Copy link</span>
      </Button>
      <Button asChild size='icon' variant='outline'>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedLink}&text=${encodedName}`}
          target='_blank'
          rel='noreferrer'
        >
          <FaTwitter />
          <span className='sr-only'>Share on Twitter</span>
        </a>
      </Button>
      <Button asChild size='icon' variant='outline'>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedLink}`}
          target='_blank'
          rel='noreferrer'
        >
          <FaLinkedin />
          <span className='sr-only'>Share on LinkedIn</span>
        </a>
      </Button>
      <Button asChild size='icon' variant='outline'>
        <a href={`mailto:?subject=${encodedName}&body=${encodedLink}`}>
          <LuMail />
          <span className='sr-only'>Share by email</span>
        </a>
      </Button>
    </div>
  );
}

export default ShareButton_14;
