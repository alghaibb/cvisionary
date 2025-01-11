import { ResumeValues } from "@/schemas";
import { Prisma } from "@prisma/client";

export interface CreateResumeProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
  projects: true,
  references: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude
}>;