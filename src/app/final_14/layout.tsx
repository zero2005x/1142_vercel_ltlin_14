import type { Metadata } from 'next';

import NavbarFinal_14 from './_components/navbar/NavbarFinal_14';
import Container from './_components/global/Container';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Next.js Introduction',
  description: 'Given for basic understanding of Next.js',
};

export default function Final14Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarFinal_14 />
      <Container className='py-4'>{children}</Container>
      <Toaster />
    </>
  );
}
