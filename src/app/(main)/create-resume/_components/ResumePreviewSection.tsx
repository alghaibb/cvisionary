import ResumePreview from "@/components/ResumePreview";
import { ResumeValues } from "@/schemas";
import ColorPicker from "./ColorPicker";
import BorderStyle from "./BorderStyle";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) {
  return (
    <div className="relative hidden w-1/2 group md:flex">
      <div className="absolute flex flex-col flex-none gap-3 p-4 transition-opacity opacity-50 left-1 top-1 group-hover:opacity-100 lg:left-3 lg:top-3 xl:opacity-100">
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyle
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle: borderStyle })
          }
        />
      </div>
      <div className="flex justify-center w-full p-3 overflow-y-auto bg-secondary">
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
        />
      </div>
    </div>
  );
}
