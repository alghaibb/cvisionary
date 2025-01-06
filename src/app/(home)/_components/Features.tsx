import { FEATURES } from "@/lib/constants";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function Features() {
  return (
    <section className="bg-muted px-6 py-16">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
          Why Choose Us?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Discover the powerful features of our AI resume builder.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.title}
              className={`flex flex-col items-center space-y-4 text-center ${
                index === FEATURES.length - 1
                  ? "col-span-full lg:col-start-2 lg:col-end-4"
                  : ""
              }`}
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={32}
                height={32}
                className="dark:invert"
              />
              <div className="flex flex-col items-center space-y-2">
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                {feature.isPremium && (
                  <Badge className="cursor-default hover:bg-primary dark:text-secondary-foreground">
                    Premium
                  </Badge>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
