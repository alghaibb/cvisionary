import { ResumeValues } from "@/schemas";

export interface CreateResumeProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}