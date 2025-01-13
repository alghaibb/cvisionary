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
    <main className="mx-auto w-full max-w-3xl space-y-6 px-6 py-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Billing</h1>
        <p className="mt-2 text-gray-500">
          Manage your subscription details and plan.
        </p>
      </header>

      <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Current Plan
        </h2>
        <p className="mt-4 text-lg">
          <span className="font-medium text-gray-700">Plan:</span>{" "}
          <span className="font-bold text-gray-800">
            {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
          </span>
        </p>
        {priceInfo && (
          <p className="mt-1 text-sm text-gray-600">
            ${priceInfo.unit_amount ? priceInfo.unit_amount / 100 : "N/A"} per{" "}
            {priceInfo.recurring?.interval}
          </p>
        )}
        {subscription?.stripeCancelAtPeriodEnd && (
          <p className="mt-2 text-sm text-red-600">
            Your subscription will be canceled on{" "}
            {formatDate(subscription.stripeCurrentPeriodEnd, "MMM dd, yyyy")}.
          </p>
        )}

        <div className="mt-6">
          {subscription ? (
            <ManageSubscriptionButton />
          ) : (
            <GetSubscriptionButton />
          )}
        </div>
      </section>
    </main>
  );
}
