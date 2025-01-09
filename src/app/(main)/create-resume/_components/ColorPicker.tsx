import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useSubscriptionPlan } from "@/providers/SubscriptionPlanProvider";
import { canUseCustomization } from "@/utils/permissions";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Color, ColorChangeHandler, ChromePicker } from "react-color";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);
  const subscriptionPlan = useSubscriptionPlan();
  const premiumModal = usePremiumModal();

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Change resume color"
          aria-label="Change resume color"
          className="flex items-center gap-2"
          onClick={() => {
            if (!canUseCustomization(subscriptionPlan)) {
              premiumModal.setOpen(true);
              return;
            }
            setShowPopover(true);
          }}
        >
          <PaletteIcon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="border-none bg-transparent shadow-none"
        align="start"
      >
        <ChromePicker color={color} onChange={onChange} disableAlpha />
      </PopoverContent>
    </Popover>
  );
}
