"use client";

import usePremiumModal from "@/hooks/usePremiumModal";
import { FEATURES } from "@/lib/constants";
import { CheckIcon, SparkleIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "../ui/responsive-modal";
import { Separator } from "../ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { env } from "@/env";
import { createCheckoutSession } from "./actions";

export default function PremiumModal() {
  const [loading, setLoading] = useState(false);

  const { open, setOpen } = usePremiumModal();
  const { toast } = useToast();

  const premiumFeatures = FEATURES.filter((feature) => feature.isPremium);
  const premiumPlusFeatures = premiumFeatures.filter(
    (feature) => feature.title === "AI-Generated Resume Sections",
  );

  async function handleUpgradeToPremium(priceId: string) {
    try {
      setLoading(true);
      const res = await createCheckoutSession(priceId);
      window.location.href = res;
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <ResponsiveModalContent className="lg:max-w-2xl">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className="mb-6 text-center">
            Upgrade to Premium
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <div className="flex flex-col items-center space-y-6 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
          <div className="flex w-full flex-col space-y-5 px-4 sm:w-1/2">
            <h3 className="text-center text-lg font-bold sm:text-left">
              Premium
            </h3>
            <p className="text-start text-sm text-muted-foreground">
              Unlock the following features:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {premiumFeatures
                .filter(
                  (feature) => feature.title !== "AI-Generated Resume Sections",
                )
                .slice(0, 2)
                .map((feature) => (
                  <li
                    key={feature.title}
                    className="flex items-center space-x-2"
                  >
                    <CheckIcon className="size-4 text-green-500" />
                    <span>{feature.title}</span>
                  </li>
                ))}
              <li className="flex items-center space-x-2">
                <CheckIcon className="size-4 text-green-500" />
                <span>Create up to 5 resumes</span>
              </li>
            </ul>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() =>
                handleUpgradeToPremium(
                  env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
                )
              }
              disabled={loading}
            >
              Upgrade to Premium
            </Button>
          </div>

          <Separator
            orientation="horizontal"
            className="block w-full sm:hidden"
          />
          <Separator
            orientation="vertical"
            className="hidden h-full sm:block"
          />

          <div className="flex w-full flex-col space-y-5 px-4 sm:w-1/2">
            <div className="flex items-center justify-center space-x-2 md:justify-normal">
              <SparkleIcon className="h-5 w-5 text-yellow-500" />
              <h3 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-lg font-bold text-transparent">
                Premium Plus
              </h3>
            </div>
            <p className="text-start text-sm text-muted-foreground">
              Get everything in Premium, plus:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {premiumPlusFeatures.map((feature) => (
                <li key={feature.title} className="flex items-center space-x-2">
                  <CheckIcon className="size-4 text-green-500" />
                  <span>{feature.title}</span>
                </li>
              ))}
              <li className="flex items-center space-x-2">
                <CheckIcon className="size-4 text-green-500" />
                <span>Unlimited resumes</span>
              </li>
            </ul>
            <Button
              variant="shine"
              className="w-full sm:w-auto"
              onClick={() =>
                handleUpgradeToPremium(
                  env.NEXT_PUBLIC_STRIPE_PRICE_ID_PREMIUM_PLUS_MONTHLY,
                )
              }
              disabled={loading}
            >
              Upgrade to Premium Plus
            </Button>
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
