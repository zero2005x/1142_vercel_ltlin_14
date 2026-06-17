import Link from 'next/link';
import LogoStore_14 from './LogoStore_14';
import { ModeToggle } from './ModeToggle';
import { Button } from '@/components/ui/button';
import NavSearch_14 from './NavSearch_14';
import Dashboard_14 from './Dashboard_14';

const NavbarFinal_14 = () => {
  return (
    <div className='flex items-center justify-around mx-auto py-4 bg-amber-100 dark:bg-gray-700'>
      <LogoStore_14 />
      <NavSearch_14 />
      <div className='flex items-center gap-4'>
        <Link href='/'>
          <Button variant='secondary'>TKUdemo</Button>
        </Link>
        <ModeToggle />
        <Dashboard_14 />
      </div>
    </div>
  );
};

export default NavbarFinal_14;
