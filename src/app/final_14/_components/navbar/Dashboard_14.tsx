'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

import Link from 'next/link';

import { LuAlignLeft } from 'react-icons/lu';
import UserIcon_14 from './UserIcon_14';

import { linksAdmin } from './links';

const Dashboard_14 = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon_14 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          {linksAdmin.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className='w-full capitalize'>
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dashboard_14;
