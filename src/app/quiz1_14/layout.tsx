import type { Metadata } from 'next';
import Navbar_14 from './_components/NavbarQuiz1_14';

export const metadata: Metadata = {
  title: 'Quiz1_14',
  description: 'Given for basic understanding of Next.js',
};

export default function Quiz1_14Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar_14 />
      {children}
    </>
  );
}
