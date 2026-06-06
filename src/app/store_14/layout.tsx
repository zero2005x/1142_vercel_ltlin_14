import type { Metadata } from "next";
import NavbarStore_14 from "./_components/navbar/NavbarStore_14";
import Container from "./_components/global/Container";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "TKU Store",
};

export default function StoreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavbarStore_14 />
      <Container className="py-10">{children}</Container>
      <Toaster position="bottom-right" richColors />
    </>
  );
}
