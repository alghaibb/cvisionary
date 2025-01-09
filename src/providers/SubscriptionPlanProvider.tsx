"use client";

import { SubscriptionPlan } from "@/utils/subscription";
import { useContext, createContext } from "react";

const SubscriptionPlanContext = createContext<SubscriptionPlan | undefined>(
  undefined,
);

interface SubscriptionPlanProviderProps {
  children: React.ReactNode;
  userSubscription: SubscriptionPlan;
}

export default function SubscriptionPlanProvider({
  children,
  userSubscription,
}: SubscriptionPlanProviderProps) {
  return (
    <SubscriptionPlanContext.Provider value={userSubscription}>
      {children}
    </SubscriptionPlanContext.Provider>
  );
}

export function useSubscriptionPlan() {
  const context = useContext(SubscriptionPlanContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptionPlan must be used within a SubscriptionPlanProvider",
    );
  }
  return context;
}
