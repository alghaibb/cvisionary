import { z } from "zod";
import { optionalString } from "./general-info-schema";

export const workExperienceSchema = z.object({
  workExperiences: z.array(z.object({
    position: optionalString,
    company: optionalString,
    startDate: optionalString,
    endDate: optionalString,
    description: optionalString,
  })).optional(),
});

export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;