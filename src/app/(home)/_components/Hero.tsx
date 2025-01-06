import Image from "next/image";
import heroImage from "@/assets/hero.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 px-6 py-8 text-center md:flex-row md:text-start lg:gap-12">
      <div className="max-w-prose space-y-3">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Build Your Dream Resume with AI
        </h1>
        <p className="text-lg text-muted-foreground">
          Craft professional resumes in minutes with our AI-powered builder.
        </p>
        <div className="mt-4 flex">
          <Button
            asChild
            variant="modernHover"
            size="lg"
            className="w-full md:w-auto"
          >
            <Link href="/create-resume">Get Started for Free</Link>
          </Button>
        </div>
      </div>
      <div>
        <Image
          src={heroImage}
          alt="hero image"
          width={500}
          height={500}
          className="dark:bg-white"
        />
      </div>
    </section>
  );
}
