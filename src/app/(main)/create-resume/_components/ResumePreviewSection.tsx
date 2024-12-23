import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/schemas";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="hidden w-1/2 md:flex">
      <div className="flex justify-center w-full p-3 overflow-y-auto bg-secondary">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
