import Link from "next/link";
import LogoStore_14 from "./LogoStore_14";
import ModeToggle from "./ModeToggle";
import { Button } from "@/components/ui/button";
import StoreSignInOutAuth_14 from "./StoreSignInOutAuth_14";
import NavSearch_14 from "./NavSearch_14";
import CartButton_14 from "./CartButton_14";

const NavbarStore_14 = () => {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <LogoStore_14 />
        <NavSearch_14 />
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link href="/store_14">TKUdemo</Link>
          </Button>
          <CartButton_14 />
          <ModeToggle />
          
          <StoreSignInOutAuth_14 />
        </div>
      </div>
    </nav>
  );
};

export default NavbarStore_14;
