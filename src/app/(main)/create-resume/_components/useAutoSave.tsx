import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { ResumeValues } from "@/schemas";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import saveResume from "../actions";
import { Button } from "@/components/ui/button";
import { fileReplacer } from "@/utils/resume/fileReplacer";

export default function useAutoSave(resumeData: ResumeValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSaved, setLastSaved] = useState(structuredClone(resumeData));

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newResume = structuredClone(debouncedResumeData);

        const updatedResume = await saveResume({
          ...newResume,
          ...(JSON.stringify(lastSaved.resumePhoto, fileReplacer) ===
            JSON.stringify(newResume.resumePhoto, fileReplacer) && {
            resumePhoto: undefined,
          }),
          id: resumeId,
        });

        setResumeId(updatedResume.id);
        setLastSaved(newResume);

        if (searchParams.get("resumeId") !== updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          description: (
            <div className="space-y-3">
              <p>Could not save your resume.</p>
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                Retry
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    const hasChanges =
      JSON.stringify(debouncedResumeData, fileReplacer) !==
      JSON.stringify(lastSaved, fileReplacer);

    if (hasChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    isSaving,
    lastSaved,
    isError,
    resumeId,
    searchParams,
    toast,
  ]);

  return {
    isSaving,
    hasChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSaved),
  };
}
