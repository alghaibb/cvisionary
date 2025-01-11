import { ResumeValues } from "@/schemas";
import { ResumeServerData } from "@/types/create-resume";

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    resumePhoto: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    projects: data.projects.map((proj) => ({
      title: proj.title || undefined,
      description: proj.description || undefined,
      githubUrl: proj.githubUrl || undefined,
      demoUrl: proj.demoUrl || undefined,
      techStack: proj.techStack || [],
    })),
    references: data.references.map((ref) => ({
      name: ref.name || undefined,
      email: ref.email || undefined,
      phone: ref.phone || undefined,
      company: ref.company || undefined,
      position: ref.position || undefined,
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
  }
}