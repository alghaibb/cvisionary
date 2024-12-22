import { z } from "zod";
import { optionalString } from "./general-info-schema";

export const summarySchema = z.object({
  summary: optionalString,
});

export type SummaryValues = z.infer<typeof summarySchema>;