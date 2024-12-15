"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { NO_HEADER_FOOTER_ROUTES, NAVIGATION_LINKS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { User } from "@prisma/client";
import LogoutButton from "@/app/(auth)/(logout)/_components/LogoutButton";

export default function MobileNav({ user }: { user?: User }) {
  const pathname = usePathname();

  // Clean the pathname to remove query parameters
  const cleanPathname = pathname.split("?")[0];

  // Match the pathname against the routes
  const shouldHideNavbar = NO_HEADER_FOOTER_ROUTES.some((route) =>
    cleanPathname.startsWith(route),
  );

  // If the navbar should be hidden, don't render the mobile nav
  if (shouldHideNavbar) return null;

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
            <span className="sr-only">Open mobile navigation</span>
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-3/4 sm:max-w-sm">
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            {" "}
            Main navigation for the site
          </SheetDescription>
          {user && (
            <div className="flex items-center justify-center py-6">
              <p className="font-medium">Welcome {user.firstName}!</p>
            </div>
          )}
          <nav className="space-y-4">
            {NAVIGATION_LINKS.map((link) => (
              <SheetClose asChild key={link.href}>
                <Link href={link.href} className="block text-lg font-medium">
                  {link.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <div className="flex flex-col gap-4 mt-6">
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
        </SheetContent>
      </Sheet>
    </div>
  );
}
