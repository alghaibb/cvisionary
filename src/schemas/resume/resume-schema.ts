import { z } from "zod";
import { generalInfoSchema, personalInfoSchema } from "@/schemas";

export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
})

export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "resumePhoto"> & {
  id?: string;
  resumePhoto?: File | string | null;
}