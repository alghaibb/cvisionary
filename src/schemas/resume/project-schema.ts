import { z } from "zod";
import { optionalString } from "./general-info-schema";

export const projectSchema = z.object({
  projects: z.array(z.object({
    title: optionalString,
    description: optionalString,
    githubUrl: optionalString,
    demoUrl: optionalString,
    techStack: z.array(optionalString).optional(),
  })).optional(),
});

export type ProjectValues = z.infer<typeof projectSchema>;

export type Project = NonNullable<z.infer<typeof projectSchema>["projects"]>[number];