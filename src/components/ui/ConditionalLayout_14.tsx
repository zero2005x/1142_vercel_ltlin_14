"use client";

import { usePathname } from "next/navigation";
import NavbarMain_14 from "./NavbarMain_14";

const STANDALONE_PREFIXES = ["/store_14", "/quiz2_14", "/final_14"];

export function ConditionalNavbar_14() {
  const pathname = usePathname();
  if (STANDALONE_PREFIXES.some((prefix) => pathname.startsWith(prefix)))
    return null;
  return <NavbarMain_14 />;
}

export function ConditionalMain_14({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (STANDALONE_PREFIXES.some((prefix) => pathname.startsWith(prefix)))
    return <>{children}</>;
  return (
    <main className="mx-auto w-full max-w-6xl px-8 py-4">{children}</main>
  );
}
