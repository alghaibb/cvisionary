import { z } from "zod";
import { educationSchema } from "./education-schema";
import { generalInfoSchema, optionalString } from "./general-info-schema";
import { personalInfoSchema } from "./personal-info-schema";
import { skillsSchema } from "./skills-schema";
import { summarySchema } from "./summary-schema";
import { workExperienceSchema } from "./work-experience-schema";
import { projectSchema } from "./project-schema";
import { referenceSchema } from "./reference-schema";

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
  ...summarySchema.shape,
  ...projectSchema.shape,
  ...referenceSchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "resumePhoto"> & {
  id?: string;
  resumePhoto?: File | string | null;
}