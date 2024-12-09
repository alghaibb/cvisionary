import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { NO_HEADER_FOOTER_ROUTES } from "@/lib/constants";
import Navbar from "@/components/Navbar";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | CVisionary",
    absolute: "CVisionary",
  },
  description: "CVisionary is a platform for creating and sharing CVs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  if (NO_HEADER_FOOTER_ROUTES.some((route) => route.test(pathname))) {
    return <>{children}</>;
  }

  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${jost.className} antialiased`}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
