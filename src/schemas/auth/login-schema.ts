import { z } from "zod";
import { emailSchema } from "../shared/email-schema";
import { passwordSchema } from "../shared/password-schema";

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginValues = z.infer<typeof loginSchema>;