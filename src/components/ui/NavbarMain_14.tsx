import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from './button';
import { Store } from 'lucide-react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

const NavbarMain_14 = () => {
  return (
    <div className='flex items-center justify-around mx-auto py-4 bg-amber-100 dark:bg-gray-700'>
      <Link href='/'>
        <div className='text-[18px]'>TKUdemo</div>
      </Link>

      <Menubar className='w-68'>

        {/* ── Demo ── */}
        <MenubarMenu>
          <MenubarTrigger>Demo</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>Basic</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/counter_14'>Counter</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href='/tours_14'>Tours</Link>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>Database</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/supabase_14'>Supabase</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href='/user_db_14'>User DB</Link>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>Grocery</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/grocery_14'>Grocery Local</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href='/grocery_db_14'>Grocery DB</Link>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
          </MenubarContent>
        </MenubarMenu>

        {/* ── Quiz1 ── */}
        <MenubarMenu>
          <MenubarTrigger>Quiz1</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>Quiz1_14</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/quiz1_14'>Overview</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href='/quiz1_14/blog_14'>Blog Local</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href='/quiz1_14/blog_db_14'>Blog DB</Link>
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>

        {/* ── Midterm ── */}
        <MenubarMenu>
          <MenubarTrigger>Midterm</MenubarTrigger>
          <MenubarContent className='w-44'>
            <MenubarGroup>
              <MenubarLabel>Mid_14</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/mid_14'>Homepage</Link>
              </MenubarItem>
              <MenubarItem asChild>
                <Link href='/mid_14/static'>Static</Link>
              </MenubarItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>Exam</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/exam/midterm'>Shop</Link>
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>

        {/* ── Quiz2 ── */}
        <MenubarMenu>
          <MenubarTrigger>Quiz2</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>Quiz2_14</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/quiz2_14'>Overview</Link>
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>

        {/* ── Final ── */}
        <MenubarMenu>
          <MenubarTrigger>Final</MenubarTrigger>
          <MenubarContent className='w-44'>
            <MenubarGroup>
              <MenubarLabel>Final_14</MenubarLabel>
              <MenubarItem asChild>
                <Link href='/final_14'>Homepage</Link>
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>

      </Menubar>

      <div className='flex items=center gap-4'>
        <Link href='/store_14'>
        <Button variant='outline'><Store></Store></Button></Link>
      </div>


      <ModeToggle />

      <div className='flex items-center gap-2'>
        <Show when='signed-out'>
          <SignInButton />
          <SignUpButton>
            <button className='bg-[#6c47ff] text-white rounded-full font-medium text-sm h-9 px-4 cursor-pointer'>
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when='signed-in'>
          <UserButton />
        </Show>
      </div>
    </div>
  );
};

export default NavbarMain_14;
