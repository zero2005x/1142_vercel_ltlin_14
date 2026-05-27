"use client";

import { LucideCircleUserRound } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

const UserIcon_14 = () => {
  const { isSignedIn, user } = useUser();

  if (isSignedIn && user?.imageUrl) {
    return (
      <Image
        src={user.imageUrl}
        alt={user.fullName ?? user.username ?? "user avatar"}
        width={24}
        height={24}
        className="h-6 w-6 rounded-full object-cover"
      />
    );
  }

  return <LucideCircleUserRound className="w-6 h-6" />;
};

export default UserIcon_14;