"use client";

import { usePathname } from "next/navigation";
import NavbarMain_14 from "./NavbarMain_14";

export function ConditionalNavbar_14() {
  const pathname = usePathname();
  if (pathname.startsWith("/store_14")) return null;
  return <NavbarMain_14 />;
}

export function ConditionalMain_14({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/store_14")) return <>{children}</>;
  return (
    <main className="mx-auto w-full max-w-6xl px-8 py-4">{children}</main>
  );
}
