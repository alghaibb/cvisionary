"use client";

import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrums from "./_components/Breadcrums";
import CreateResumeFooter from "./_components/CreateResumeFooter";
import { useState } from "react";
import { ResumeValues } from "@/schemas";
import ResumePreviewSection from "./_components/ResumePreviewSection";

export default function CreateResume() {
  const [resumeData, setResumeData] = useState<ResumeValues>({});

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
    <div className="flex flex-col grow">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Create A New Resume</h1>
        <p className="text-sm text-muted-foreground">
          Start by following the instructions below to create your new resume.
          Your resume will be saved automatically as you make changes.
        </p>
      </header>
      <main className="relative grow">
        <div className="absolute top-0 bottom-0 flex w-full">
          <div className="w-full p-3 mt-6 space-y-6 overflow-y-auto md:w-1/2">
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
          />
        </div>
      </main>
      <CreateResumeFooter
        currentStep={currentStep}
        setCurrentStepsteps={setStep}
      />
    </div>
  );
}
