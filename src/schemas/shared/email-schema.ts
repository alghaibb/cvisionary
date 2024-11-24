import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Please enter a valid email")

export type EmailValues = z.infer<typeof emailSchema>;