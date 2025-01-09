
import { env } from "@/env";
import prisma from "@/lib/prisma";
import { cache } from "react";

export type SubscriptionPlan = "free" | "premium" | "premium_plus";

export const getUserSubscription = cache(
  async (userId: string): Promise<SubscriptionPlan> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: { userId }
    });

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "free";
    }

    if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY) {
      return "premium";
    }

    if (subscription.stripePriceId === env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY) {
      return "premium_plus";
    }

    throw new Error("Invalid subscription plan");
  }
)