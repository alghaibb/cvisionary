"use client";

import { usePathname } from "next/navigation";
import { NO_HEADER_FOOTER_ROUTES } from "@/lib/constants";
import { User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import LogoutButton from "@/app/(auth)/(logout)/_components/LogoutButton";

export default function Navbar({ user }: { user?: User }) {
  const pathname = usePathname();

  if (NO_HEADER_FOOTER_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between px-4 py-6 border-b border-muted bg-background">
      <Link href="/">
        <Image src={Logo} alt="Logo" width={150} height={150} />
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          // User is logged in
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Welcome, {user.firstName}
            </p>
            <LogoutButton />
          </div>
        ) : (
          // User is not logged in
          <>
            <Button asChild variant="linkHover1">
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
