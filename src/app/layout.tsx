import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const jost = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | CVisionary",
    absolute: "CVisionary",
  },
  description: "CVisionary is a platform for creating and sharing CVs.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${jost.className} antialiased`}>{children}</body>
      </html>
    </SessionProvider>
  );
}
