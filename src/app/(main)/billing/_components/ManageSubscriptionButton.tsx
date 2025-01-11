"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { LoadingButton } from "@/components/ui/button";
import { createCustomerPortalSession } from "../actions";

export default function ManageSubscriptionButton() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const res = await createCustomerPortalSession();
      window.location.href = res;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to manage subscription",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      {loading ? "Managing Subscription" : "Manage Subscription"}
    </LoadingButton>
  );
}
