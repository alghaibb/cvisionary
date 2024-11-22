import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter");

export const confirmPasswordSchema = z.string();

export type PasswordValues = z.infer<typeof passwordSchema>;
export type ConfirmPasswordValues = z.infer<typeof confirmPasswordSchema>;