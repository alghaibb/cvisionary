"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import Link from "next/link";
import { CreditCard, LogOut, Settings } from "lucide-react";
import { signOut } from "next-auth/react";

export default function UserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{user.firstName[0].toUpperCase()}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 space-y-2 p-2">
        <div className="p-2 text-sm text-muted-foreground">
          Welcome,{" "}
          <span className="font-medium text-foreground dark:text-foreground">
            {user.firstName}!
          </span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/account"
            className="cursor-pointer px-2 py-2 hover:bg-muted"
          >
            <Settings size={16} className="mr-2" />
            Manage Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/billing"
            className="cursor-pointer px-2 py-2 hover:bg-muted"
          >
            <CreditCard size={16} className="mr-2" />
            Billing
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer px-2 py-2 hover:bg-muted"
        >
          <LogOut size={16} className="mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
