import PremiumModal from "@/components/premium/PremiumModal";
import SubscriptionPlanProvider from "@/providers/SubscriptionPlanProvider";
import { getSession } from "@/utils/session";
import { getUserSubscription } from "@/utils/subscription";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  const userSubscriptionPlan = await getUserSubscription(userId);

  return (
    <SubscriptionPlanProvider userSubscription={userSubscriptionPlan}>
      <div className="flex flex-col min-h-screen">
        {children}
        <PremiumModal />
      </div>
    </SubscriptionPlanProvider>
  );
}
