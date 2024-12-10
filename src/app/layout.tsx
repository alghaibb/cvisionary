import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { getSession } from "@/utils/session";
import "./globals.css";
import Header from "@/components/header/Header";

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
  const session = await getSession();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${jost.className} antialiased`}>
          <Header />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
