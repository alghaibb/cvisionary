import { z } from "zod";
import { optionalString } from "./general-info-schema";

export const referenceSchema = z.object({
  references: z.array(z.object({
    name: optionalString,
    email: optionalString,
    phone: optionalString,
    company: optionalString,
    position: optionalString,
  })).optional(),
});

export type ReferenceValues = z.infer<typeof referenceSchema>;

export type Reference = NonNullable<z.infer<typeof referenceSchema>["references"]>[number];