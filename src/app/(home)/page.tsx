import Features from "./_components/Features";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import Pricing from "./_components/Pricing";

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
    </main>
  );
}
