import type { Metadata } from 'next';
import Navbar_14 from './_components/NavbarShopNode_14';

export const metadata: Metadata = {
  title: 'Midterm Exam - Shop',
  description: 'Midterm exam project - E-commerce shop',
};

export default function MidtermLayout({
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
