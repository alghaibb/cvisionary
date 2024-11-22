import { z } from "zod";
import { emailSchema } from "../shared/email-schema";
import { passwordSchema } from "../shared/password-schema";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[a-zA-Z]+$/, "First name can only contain letters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[a-zA-Z]+$/, "Last name can only contain letters"),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
})
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      })
    }
  });

export type RegisterValues = z.infer<typeof registerSchema>;
