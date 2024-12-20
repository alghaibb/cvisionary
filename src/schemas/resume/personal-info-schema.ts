import { optionalString } from "./general-info-schema";
import { z } from "zod";

export const personalInfoSchema = z.object({
  resumePhoto: z.custom<File | undefined>()
    .refine(
      (file) => !file || (file instanceof File && file.type.startsWith("image/")),
      "Please upload an image file."
    )
    .refine(file => !file || file.size <= 1024 * 1024 * 4, "File size must be less than 4MB."),
  firstName: optionalString,
  lastName: optionalString,
  jobTitle: optionalString,
  city: optionalString,
  country: optionalString,
  phone: optionalString,
  email: optionalString,
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;