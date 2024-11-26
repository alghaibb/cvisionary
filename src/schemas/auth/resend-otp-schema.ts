import { z } from "zod";
import { emailSchema } from "../shared/email-schema";

export const ResendOTPSchema = z.object({
  email: emailSchema,
});

export type ResendOTPValues = z.infer<typeof ResendOTPSchema>;