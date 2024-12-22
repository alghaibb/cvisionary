import { z } from "zod";
import { educationSchema, generalInfoSchema, personalInfoSchema, skillsSchema, summarySchema, workExperienceSchema } from "@/schemas";

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "resumePhoto"> & {
  id?: string;
  resumePhoto?: File | string | null;
}