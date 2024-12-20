import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import { CreateResumeProps } from "@/types/create-resume";

export const steps: {
  title: string;
  component: React.ComponentType<CreateResumeProps>;
  key: string;
}[] = [
    { title: "General Information", component: GeneralInfoForm, key: "general-info" },
    { title: "Personal Information", component: PersonalInfoForm, key: "personal-info" },
  ];