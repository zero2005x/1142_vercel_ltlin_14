"use client";

import Link from "next/link";
import UserIcon_14 from "./UserIcon_14";
import { LuAlignLeft } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links, linksAdmin } from "./links";

type StoreSignInOutProps = {
  isAdminUser: boolean;
};

const StoreSignInOut_14 = ({ isAdminUser }: StoreSignInOutProps) => {
  const { isSignedIn } = useUser();

  console.log("isSignedIn", isSignedIn);
  console.log("isAdminUser", isAdminUser);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="gap-2">
          <LuAlignLeft className="h-5 w-5" />
          <UserIcon_14 />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          {links.map((link) => (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={link.href} className="capitalize">
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {isAdminUser && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Admin</DropdownMenuLabel>
              {linksAdmin.map((link) => (
                <DropdownMenuItem key={link.href} asChild>
                  <Link href={link.href} className="capitalize">
                    {link.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}

        {!isSignedIn && (
          <>
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              <SignInButton mode="modal">
                <button type="button" className="w-full text-left">
                  Sign In
                </button>
              </SignInButton>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              <SignUpButton mode="modal">
                <button type="button" className="w-full text-left">
                  Register
                </button>
              </SignUpButton>
            </DropdownMenuItem>
          </>
        )}

        {isSignedIn && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="gap-2"
                onSelect={(event) => event.preventDefault()}
              >
                <UserButton />
                <span>Account</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              <SignOutButton>
                <button type="button" className="w-full text-left">
                  Sign Out
                </button>
              </SignOutButton>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StoreSignInOut_14;
