import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { getSession } from "@/utils/session";
import { Metadata } from "next";
import Stripe from "stripe";
import GetSubscriptionButton from "./_components/GetSubscriptionButton";
import { formatDate } from "date-fns";
import ManageSubscriptionButton from "./_components/ManageSubscriptionButton";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const session = await getSession();
  const userId = session?.user.id;

  if (!userId) {
    return null;
  }

  const subscription = await prisma.userSubscription.findUnique({
    where: { userId },
  });

  const priceInfo = subscription
    ? await stripe.prices.retrieve(subscription.stripePriceId, {
        expand: ["product"],
      })
    : null;

  return (
    <main className="w-full px-3 py-6 mx-auto space-y-6 max-w-7xl">
      <h1 className="text-3xl font-bold">Billing</h1>
      <p className="flex gap-1">
        Your current plan:
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your subscription will be canceled on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd, "MMM dd, yyyy")}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <GetSubscriptionButton />
      )}
    </main>
  );
}
