import type { Metadata } from 'next';
import Navbar_14 from './components/Navbar_14';

export const metadata: Metadata = {
  title: 'Next.js Introduction',
  description: 'Given for basic understanding of Next.js',
};

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar_14 />
      <main className='max-w-3xl mx-auto py-4'>{children}</main>
    </>
  );
}
