"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  NO_HEADER_FOOTER_ROUTES,
  MOBILE_NAVIGATION_LINKS,
  FOOTER_LINKS,
} from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { User } from "@prisma/client";
import LogoutButton from "@/app/(auth)/(logout)/_components/LogoutButton";
import { Separator } from "../ui/separator";
import ThemeToggle from "../ThemeToggle";

export default function MobileNav({ user }: { user?: User }) {
  const pathname = usePathname();
  const cleanPathname = pathname.split("?")[0];

  const shouldHideNavbar = NO_HEADER_FOOTER_ROUTES.some((route) =>
    cleanPathname.startsWith(route),
  );

  if (shouldHideNavbar) return null;

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open mobile navigation</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-3/4 sm:max-w-sm">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            {" "}
            Main navigation for the site
          </SheetDescription>
          {user ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <p className="font-medium">Welcome, {user.firstName}!</p>
              <Separator />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <p className="font-medium">Welcome, Guest!</p>
              <Separator />
            </div>
          )}
          <nav className="space-y-4">
            {MOBILE_NAVIGATION_LINKS.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link href={link.href} className="block font-medium">
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-4">
            {user ? (
              <SheetClose asChild>
                <LogoutButton />
              </SheetClose>
            ) : (
              <>
                <SheetClose asChild>
                  <Button asChild variant="outline">
                    <Link href="/login">Log In</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild variant="gooeyLeft">
                    <Link href="/create-account">Create An Account</Link>
                  </Button>
                </SheetClose>
              </>
            )}
          </div>
          <footer className="mt-8 space-y-2 border-t border-muted pt-4">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-muted-foreground dark:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle className="w-fit bg-background dark:bg-background" />
          </footer>
        </SheetContent>
      </Sheet>
    </div>
  );
}
