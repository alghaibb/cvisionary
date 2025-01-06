"use client";

import { FOOTER_LINKS } from "@/lib/constants";
import FooterCopyright from "./FooterCopyright";
import Link from "next/link";

export default function FooterItems() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex flex-wrap justify-center gap-6">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </div>
      <FooterCopyright />
    </div>
  );
}
