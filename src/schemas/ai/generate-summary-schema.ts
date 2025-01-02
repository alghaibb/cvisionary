import { z } from "zod";
import { optionalString } from "../resume/general-info-schema";
import { workExperienceSchema } from "../resume/work-experience-schema";
import { educationSchema } from "../resume/education-schema";
import { skillsSchema } from "../resume/skills-schema";

export const generateSummartySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillsSchema.shape,
});

export type GenerateSummaryValues = z.infer<typeof generateSummartySchema>;