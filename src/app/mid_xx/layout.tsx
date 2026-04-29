import type { Metadata } from 'next';

import Navbar_xx from './_components/NavbarShopNode_xx';

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
    <html lang='en'>
      <body
        className={`${geistLocalFont.className} ${geistMonoLocalFont.className} antialiased`}
      >
        <Navbar_xx />
        <main className='max-w-3xl mx-auto py-4'>{children}</main>
      </body>
    </html>
  );
}
