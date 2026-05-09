'use client';

import { Link } from "lucide-react";
import LogoStore_14 from "./LogoStore_14";
import ModeToggle from "./ModeToggle";
import { Button } from "@/components/ui/button";


const NavbarStore_14 = () => {
  return (
    <div className='flex items-center justify-around mx-auto py-4 bg-amber-100 dark:bg-gray-700'>
      <LogoStore_14 />
      <div className="flex items-center gap-4">
        <Link href='/'>
          <Button variant='secondary'  className='text-[18px]'>TKUdemo</Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavbarStore_14;