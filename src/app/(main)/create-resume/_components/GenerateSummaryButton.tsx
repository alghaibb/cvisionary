import { LoadingButton } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ResumeValues } from "@/schemas";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { generateSummary } from "../forms/actions";
import { useSubscriptionPlan } from "@/providers/SubscriptionPlanProvider";
import { canUseAITools } from "@/utils/permissions";
import usePremiumModal from "@/hooks/usePremiumModal";

interface GenerateSummaryButtonProps {
  resumeData: ResumeValues;
  onSummaryGenerated: (summary: string) => void;
}

export default function GenerateSummaryButton({
  resumeData,
  onSummaryGenerated,
}: GenerateSummaryButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const premiumModal = usePremiumModal();
  const subscriptionPlan = useSubscriptionPlan();

  async function handleClick() {
    if (!canUseAITools(subscriptionPlan)) {
      premiumModal.setOpen(true);
      return;
    }
    try {
      setLoading(true);
      const res = await generateSummary(resumeData);
      onSummaryGenerated(res);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to generate summary. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <LoadingButton
      loading={loading}
      disabled={loading}
      type="button"
      onClick={handleClick}
      variant="shine"
    >
      {loading ? (
        "Generating Summary..."
      ) : (
        <>
          <WandSparklesIcon className="mr-2 h-5 w-5" />
          Generate Summary
        </>
      )}
    </LoadingButton>
  );
}
