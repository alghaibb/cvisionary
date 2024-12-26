import { Button } from "@/components/ui/button";
import { Circle, Square, Squircle } from "lucide-react";

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
  function handleClick() {
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
