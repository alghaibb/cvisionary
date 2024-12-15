"use client";

import { usePathname } from "next/navigation";
import { NO_HEADER_FOOTER_ROUTES, NAVIGATION_LINKS } from "@/lib/constants";
import { User } from "@prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import LogoutButton from "@/app/(auth)/(logout)/_components/LogoutButton";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import MobileNav from "./MobileNav";

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
    <nav className="flex items-center justify-between p-9">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" width={40} height={40} priority />
        <span className="text-2xl font-semibold tracking-tighter md:text-3xl">
          CVisionary
        </span>
      </Link>

      <MobileNav user={user} />

      {/* Desktop Nav */}
      <div className="items-center hidden gap-4 md:flex">
        {NAVIGATION_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            <Button asChild variant="linkHover2">
              <span>{link.label}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div className="items-center hidden gap-4 md:flex">
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Welcome, {user.firstName}
            </p>
            <LogoutButton />
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
