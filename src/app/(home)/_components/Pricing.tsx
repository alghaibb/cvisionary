"use client";

import { createCheckoutSession } from "@/components/premium/actions";
import { LoadingButton } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { env } from "@/env";
import { useToast } from "@/hooks/use-toast";
import {
  FREE_TIER_FEATURES,
  PREMIUM_PLUS_FEATURES,
  PREMIUM_TIER_FEATURES,
} from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Start building your resume for free with basic features.",
    features: FREE_TIER_FEATURES,
    cta: "Get Started",
    isPremium: false,
    stripePriceId: "",
  },
  {
    name: "Premium",
    price: "$9.95/mo",
    description: "Unlock advanced features to make your resume stand out.",
    features: [...FREE_TIER_FEATURES, ...PREMIUM_TIER_FEATURES],
    cta: "Get Premium",
    isPremium: true,
    stripePriceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
  },
  {
    name: "Premium Plus",
    price: "$19.95/mo",
    description: "For professionals who need the full package.",
    features: [
      ...FREE_TIER_FEATURES,
      ...PREMIUM_TIER_FEATURES,
      ...PREMIUM_PLUS_FEATURES,
    ],
    cta: "Go Premium Plus",
    isPremium: true,
    stripePriceId: env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY,
  },
];

export default function Pricing() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleSubscription(priceId?: string, planName?: string) {
    if (!session) {
      router.push("/login");
      return;
    }

    if (!priceId) {
      toast({
        variant: "destructive",
        description: "Invalid plan selected. Please try again.",
      });
      return;
    }

    setLoadingPlan(planName || null);
    try {
      const res = await createCheckoutSession(priceId);
      window.location.href = res;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to redirect to Stripe checkout.",
      });
    } finally {
      setLoadingPlan(null);
    }
  }
  return (
    <section className="py-16 text-center bg-muted">
      <div className="px-6 mx-auto max-w-7xl">
        <h2 className="mb-8 text-4xl font-bold">Choose Your Plan</h2>
        <p className="mb-12 text-lg">
          Start for free or upgrade to unlock powerful features.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col ${plan.isPremium ? "border-primary shadow-lg" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-xl font-semibold text-primary">
                  {plan.price}
                </CardDescription>
                <p className="mt-2 text-sm">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="text-primary">✔</span> {feature.title}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex items-end mt-auto">
                <LoadingButton
                  variant={plan.isPremium ? "shine" : "default"}
                  className="w-full"
                  onClick={() =>
                    plan.isPremium
                      ? handleSubscription(plan.stripePriceId, plan.name)
                      : (window.location.href = "/resumes")
                  }
                  loading={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name
                    ? `Processing ${plan.name}`
                    : plan.cta}
                </LoadingButton>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
