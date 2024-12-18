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
import LogoutButton from "@/app/(auth)/(logout)/_components/LogoutButton";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function UserButton({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{user.firstName[0].toUpperCase()}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 p-2 space-y-2">
        <div className="p-2 text-sm text-muted-foreground">
          Welcome,{" "}
          <span className="font-medium dark:text-foreground">
            {user.firstName}
          </span>
          !
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link
            href="/account"
            className="px-2 py-2 cursor-pointer hover:bg-muted"
          >
            <Settings size={16} className="mr-2" />
            Manage Account
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton className="w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
