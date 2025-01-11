import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "../steps";
import { FileUserIcon, PenLineIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateResumeFooterProps {
  currentStep: string;
  setCurrentStepsteps: (step: string) => void;
  showMobilePreview: boolean;
  setShowMobilePreview: (show: boolean) => void;
  isSaving: boolean;
}

export default function CreateResumeFooter({
  currentStep,
  setCurrentStepsteps,
  showMobilePreview,
  setShowMobilePreview,
  isSaving,
}: CreateResumeFooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  )?.key;

  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  )?.key;

  return (
    <footer className="w-full border-t px-3 py-5">
      <div className="mx-auto flex max-w-7xl flex-col flex-wrap justify-between gap-3 md:flex-row">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="w-full md:w-fit"
            onClick={
              previousStep ? () => setCurrentStepsteps(previousStep) : undefined
            }
            disabled={!previousStep}
          >
            Previous Step
          </Button>
          <Button
            className="w-full md:w-fit"
            onClick={nextStep ? () => setCurrentStepsteps(nextStep) : undefined}
            disabled={!nextStep}
            variant="gooeyLeft"
          >
            Next Step
          </Button>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowMobilePreview(!showMobilePreview)}
          className="md:hidden"
          title={showMobilePreview ? "Show form" : "Show resume preview"}
        >
          {showMobilePreview ? (
            <PenLineIcon size={16} />
          ) : (
            <FileUserIcon size={16} />
          )}
        </Button>
        <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
          <Button variant="outline" asChild className="w-full md:w-fit">
            <Link href="/resumes">Close</Link>
          </Button>
          <p
            className={cn(
              "flex items-center gap-1 text-muted-foreground transition-opacity duration-300",
              isSaving ? "opacity-100" : "opacity-0",
            )}
          >
            Saving
            <span className="flex items-center">
              <span className="animate-dot">.</span>
              <span className="animate-dot [animation-delay:0.2s]">.</span>
              <span className="animate-dot [animation-delay:0.4s]">.</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
