import { z } from "zod";
import { emailSchema } from "../shared/email-schema";

export const magicLinkSchema = z.object({
  email: emailSchema,
});

export type MagicLinkValues = z.infer<typeof magicLinkSchema>;