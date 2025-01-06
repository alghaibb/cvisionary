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

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const premiumFeatures = FEATURES.filter((feature) => feature.isPremium);
  const premiumPlusFeatures = premiumFeatures.filter(
    (feature) => feature.title === "AI-Generated Resume Sections",
  );

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="lg:max-w-2xl">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle className="mb-6 text-center">
            Upgrade to Premium
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <div className="flex flex-col items-center space-y-6 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
          {/* Premium Plan */}
          <div className="flex flex-col w-full px-4 space-y-5 sm:w-1/2">
            <h3 className="text-lg font-bold text-center sm:text-left">
              Premium
            </h3>
            <p className="text-sm text-center text-muted-foreground sm:text-left">
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
                    <CheckIcon className="text-green-500 size-4" />
                    <span>{feature.title}</span>
                  </li>
                ))}
              <li className="flex items-center space-x-2">
                <CheckIcon className="text-green-500 size-4" />
                <span>Create up to 10 resumes</span>
              </li>
            </ul>
            <Button variant="secondary" className="w-full sm:w-auto">
              Upgrade to Premium
            </Button>
          </div>

          {/* Separator */}
          <Separator
            orientation="horizontal"
            className="block w-full sm:hidden"
          />
          <Separator
            orientation="vertical"
            className="hidden h-full sm:block"
          />

          {/* Premium Plus Plan */}
          <div className="flex flex-col w-full px-4 space-y-5 sm:w-1/2">
            <div className="flex items-center justify-center space-x-2">
              <SparkleIcon className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">
                Premium Plus
              </h3>
            </div>
            <p className="text-sm text-center text-muted-foreground sm:text-left">
              Get everything in Premium, plus:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {premiumPlusFeatures.map((feature) => (
                <li key={feature.title} className="flex items-center space-x-2">
                  <CheckIcon className="text-green-500 size-4" />
                  <span>{feature.title}</span>
                </li>
              ))}
              <li className="flex items-center space-x-2">
                <CheckIcon className="text-green-500 size-4" />
                <span>Unlimited resumes</span>
              </li>
            </ul>
            <Button variant="shine" className="w-full sm:w-auto">
              Upgrade to Premium Plus
            </Button>
          </div>
        </div>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
