import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import { CreateResumeProps } from "@/types/create-resume";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";

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
    { title: "Summary", component: SummaryForm, key: "summary" },
  ];