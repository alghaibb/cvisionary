import { z } from "zod";
import { emailSchema } from "@/schemas/shared/email-schema";

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;