"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrums from "./_components/Breadcrums";
import CreateResumeFooter from "./_components/CreateResumeFooter";
import { useState } from "react";
import { ResumeValues } from "@/schemas";
import ResumePreviewSection from "./_components/ResumePreviewSection";
import { cn } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSave from "./_components/useAutoSave";
import { ResumeServerData } from "@/types/create-resume";
import { mapToResumeValues } from "@/utils/resume/mapToResumeValues";

interface CreateResumeProps {
  resumeToEdit?: ResumeServerData | null;
}

export default function CreateResume({ resumeToEdit }: CreateResumeProps) {
  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : {},
  );
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const { isSaving, hasChanges } = useAutoSave(resumeData);

  useUnloadWarning(hasChanges);

  const searchParams = useSearchParams();

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-12 text-center">
        <h1 className="text-2xl font-bold">Create A New Resume</h1>
        <p className="text-sm text-muted-foreground">
          Start by following the instructions below to create your new resume.
          Your resume will be saved automatically as you make changes.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "mt-6 w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showMobilePreview && "hidden",
            )}
          >
            <Breadcrums
              currentStep={currentStep}
              setCurrentStepsteps={setStep}
            />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showMobilePreview && "flex")}
          />
        </div>
      </main>
      <CreateResumeFooter
        currentStep={currentStep}
        setCurrentStepsteps={setStep}
        showMobilePreview={showMobilePreview}
        setShowMobilePreview={setShowMobilePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
