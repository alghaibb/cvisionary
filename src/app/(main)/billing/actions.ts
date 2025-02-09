"use server";

import { getSession } from "@/utils/session";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { env } from "@/env";

export async function createCustomerPortalSession() {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    throw new Error("Unauthorized");
  }

  const userSubscription = await prisma.userSubscription.findUnique({
    where: { userId: user.id },
    select: { stripeCustomerId: true },
  });

  if (!userSubscription?.stripeCustomerId) {
    throw new Error("Stripe customer ID not found for the user");
  }

  const stripeCustomerId = userSubscription.stripeCustomerId;

  if (!stripeCustomerId) {
    throw new Error("Stripe customer ID not found for the user");
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${env.NEXT_PUBLIC_BASE_URL}/billing`,
  });

  if (!portalSession.url) {
    throw new Error("Stripe portal session URL not found");
  }

  return portalSession.url;
}