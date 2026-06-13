import type { Metadata } from 'next';
import '../globals.css';

import NavbarQuiz2_14 from './_components/navbar/NavbarQuiz2_14';

import Container from './_components/global/Container';

import { Toaster } from '@/components/ui/sonner';

import localFont from 'next/font/local';

const geistLocalFont = localFont({
  src: '../_assets/fonts/geist.woff2',
  display: 'swap',
});

const geistMonoLocalFont = localFont({
  src: '../_assets/fonts/geist-mono.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next.js Introduction',
  description: 'Given for basic understanding of Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistLocalFont.className} ${geistMonoLocalFont.className}`}>
      <NavbarQuiz2_14 />
      <Container className='py-4'>{children}</Container>
      <Toaster />
    </div>
  );
}
