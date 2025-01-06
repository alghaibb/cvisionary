"use client";

import { usePathname } from "next/navigation";
import FooterItems from "./_components/FooterItems";
import { NO_HEADER_FOOTER_ROUTES } from "@/lib/constants";
import { Separator } from "../ui/separator";

export default function Footer() {
  const pathname = usePathname();

  const cleanPathname = pathname.split("?")[0];

  const shouldHideFooter = NO_HEADER_FOOTER_ROUTES.some((route) =>
    cleanPathname.startsWith(route),
  );

  if (shouldHideFooter) {
    return null;
  }

  return (
    <footer className="py-12">
      <Separator className="my-6" />
      <div className="mx-auto max-w-7xl px-6">
        <FooterItems />
      </div>
    </footer>
  );
}
