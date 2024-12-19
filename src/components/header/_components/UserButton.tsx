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
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function UserButton({ user }: { user: User }) {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{user.firstName[0].toUpperCase()}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 space-y-2 p-2">
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

        <DropdownMenuItem
          onClick={toggleTheme}
          className="cursor-pointer px-2 py-2 hover:bg-muted"
        >
          {resolvedTheme === "dark" ? (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Dark Mode
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton className="w-full" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
