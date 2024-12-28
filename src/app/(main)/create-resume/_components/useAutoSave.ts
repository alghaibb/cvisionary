import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/schemas";
import { useEffect, useState } from "react";

export default function useAutoSave(resumeData: ResumeValues) {
  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [lastSaved, setLastSaved] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function saveResume() {
      setIsSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setLastSaved(structuredClone(debouncedResumeData));
      setIsSaving(false);
    }

    const hasChanges = JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSaved);

    if (hasChanges && debouncedResumeData && !isSaving) {
      saveResume();
    }
  }, [debouncedResumeData, isSaving, lastSaved]);

  return {
    isSaving,
    hasChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSaved)
  };
}