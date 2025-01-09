import { SubscriptionPlan } from "./subscription";

export function canCreateResume(
  subscriptionPlan: SubscriptionPlan,
  currentResumeCount: number
) {
  const maxResumeMap: Record<SubscriptionPlan, number> = {
    free: 2,
    premium: 5,
    premium_plus: Infinity,
  }

  const maxResumes = maxResumeMap[subscriptionPlan]

  return currentResumeCount < maxResumes
}

export function canUseAITools(subscriptionPlan: SubscriptionPlan) {
  return subscriptionPlan !== "free" && subscriptionPlan !== "premium"
}

export function canUseCustomization(subscriptionPlan: SubscriptionPlan) {
  return subscriptionPlan === "premium" || subscriptionPlan === "premium_plus"
}