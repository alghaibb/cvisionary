import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "../steps";

interface CreateResumeFooterProps {
  currentStep: string;
  setCurrentStepsteps: (step: string) => void;
}

export default function CreateResumeFooter({
  currentStep,
  setCurrentStepsteps,
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
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild className="w-full md:w-fit">
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0"></p>
        </div>
      </div>
    </footer>
  );
}
