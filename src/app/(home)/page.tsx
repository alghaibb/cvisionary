import Features from "./_components/Features";
import Hero from "./_components/Hero";
import Pricing from "./_components/Pricing";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Hero />
      <Features />
      <Pricing />
    </main>
  );
}
