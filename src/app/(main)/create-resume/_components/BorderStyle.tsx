import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";
import { useSubscriptionPlan } from "@/providers/SubscriptionPlanProvider";
import { canUseCustomization } from "@/utils/permissions";
import usePremiumModal from "@/hooks/usePremiumModal";

export const BorderStyles = {
  SQUARE: "square",
  SQUIRCLE: "squircle",
  CIRCLE: "circle",
};

const borderStyles = Object.values(BorderStyles);

interface BorderStyleProps {
  borderStyle: string | undefined;
  onChange: (borderStyle: string) => void;
}

export default function BorderStyle({
  borderStyle,
  onChange,
}: BorderStyleProps) {
  const premiumModal = usePremiumModal();
  const subscriptionPlan = useSubscriptionPlan();

  function handleClick() {
    if (!canUseCustomization(subscriptionPlan)) {
      premiumModal.setOpen(true);
      return;
    }

    const currentIndex = borderStyle ? borderStyles.indexOf(borderStyle) : 0;
    const nextIndex = (currentIndex + 1) % borderStyles.length;
    onChange(borderStyles[nextIndex]);
  }

  const Icon =
    borderStyle === "square"
      ? Square
      : borderStyle === "circle"
        ? Circle
        : Squircle;

  return (
    <Button
      variant="outline"
      size="icon"
      title="Change border style"
      onClick={handleClick}
    >
      <Icon size={16} />
    </Button>
  );
}
