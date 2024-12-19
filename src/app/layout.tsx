import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { getSession } from "@/utils/session";
import "./globals.css";
import Header from "@/components/header/Header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

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
        <body
          className={`${jost.className} mx-auto min-h-screen w-full scroll-smooth bg-background antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-grow">{children}</div>
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
