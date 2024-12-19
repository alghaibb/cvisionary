"use client";

import { usePathname } from "next/navigation";
import { NO_HEADER_FOOTER_ROUTES, NAVIGATION_LINKS } from "@/lib/constants";
import { User } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import logo from "@/assets/logo.png";
import MobileNav from "./MobileNav";
import UserButton from "./_components/UserButton";

export default function Navbar({ user }: { user?: User }) {
  const pathname = usePathname();

  // Clean the pathname to remove query parameters
  const cleanPathname = pathname.split("?")[0];

  // Match the pathname against the routes
  const shouldHideNavbar = NO_HEADER_FOOTER_ROUTES.some((route) =>
    cleanPathname.startsWith(route),
  );

  if (shouldHideNavbar) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between p-6 md:p-9">
      <Link href="/" className="flex items-center gap-2">
        <Image src={logo} alt="logo" width={35} height={35} priority />
        <span className="text-2xl font-semibold tracking-tighter md:text-3xl">
          CVisionary
        </span>
      </Link>

      <MobileNav user={user} />

      <div className="items-center hidden gap-4 md:flex">
        {NAVIGATION_LINKS.map((link) => (
          <Button
            asChild
            key={link.href}
            variant="ghost"
            className="hover:bg-background"
          >
            <Link href={link.href}>
              <span>{link.label}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className="items-center hidden gap-4 md:flex">
        {user ? (
          <div className="flex items-center gap-6">
            <UserButton user={user} />
            <Button asChild variant="shine">
              <Link href="/create-resume">Create Resume</Link>
            </Button>
          </div>
        ) : (
          <>
            <Button asChild variant="outline">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild variant="gooeyLeft">
              <Link href="/create-account">Create An Account</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}
