import { CreateResumeProps } from "@/types/create-resume";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";
import ProjectForm from "./forms/ProjectForm";
import ReferenceForm from "./forms/ReferenceForm";

export const steps: {
  title: string;
  component: React.ComponentType<CreateResumeProps>;
  key: string;
}[] = [
    { title: "General Information", component: GeneralInfoForm, key: "general-info" },
    { title: "Personal Information", component: PersonalInfoForm, key: "personal-info" },
    { title: "Work Experience", component: WorkExperienceForm, key: "work-experience" },
    { title: "Education", component: EducationForm, key: "education" },
    { title: "Skills", component: SkillsForm, key: "skills" },
    { title: "Projects", component: ProjectForm, key: "projects" },
    { title: "References", component: ReferenceForm, key: "references" },
    { title: "Summary", component: SummaryForm, key: "summary" },
  ];