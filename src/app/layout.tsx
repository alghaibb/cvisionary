import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/utils/session";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Jost } from "next/font/google";
import "./globals.css";

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
            <main className="flex min-h-screen flex-col">
              <Header />
              <div className="flex-grow">{children}</div>
              <Footer />
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
