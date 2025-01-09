import PremiumModal from "@/components/premium/PremiumModal";
import SubscriptionPlanProvider from "@/providers/SubscriptionPlanProvider";
import { getSession } from "@/utils/session";
import { getUserSubscription } from "@/utils/subscription";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const userSubscriptionPlan = await getUserSubscription(userId);

  return (
    <SubscriptionPlanProvider userSubscription={userSubscriptionPlan}>
      <div className="flex min-h-screen flex-col">
        {children}
        <PremiumModal />
      </div>
    </SubscriptionPlanProvider>
  );
}
