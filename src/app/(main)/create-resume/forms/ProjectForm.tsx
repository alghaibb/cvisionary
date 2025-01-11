import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema, ProjectValues } from "@/schemas";
import { CreateResumeProps } from "@/types/create-resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export default function ProjectForm({
  resumeData,
  setResumeData,
}: CreateResumeProps) {
  const form = useForm<ProjectValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects:
        resumeData.projects?.map((project) => ({
          ...project,
          techStack: project.techStack || [],
        })) || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        projects: values.projects?.filter((proj) => proj !== undefined) || [],
      });
    });

    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Add your projects to include in your resume.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <ProjectItem
              id={field.id}
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}

          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  title: "",
                  description: "",
                  githubUrl: "",
                  demoUrl: "",
                  techStack: [],
                })
              }
            >
              Add Project
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface ProjectItemProps {
  id: string;
  form: UseFormReturn<ProjectValues>;
  index: number;
  remove: (index: number) => void;
}

function ProjectItem({ form, index, remove }: ProjectItemProps) {
  return (
    <div className="space-y-4 rounded-lg border bg-background p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Project {index + 1}</h3>
        <Button
          variant="basic"
          size="icon"
          onClick={() => remove(index)}
          title="Remove Project"
        >
          <X size={16} />
        </Button>
      </div>

      <FormField
        control={form.control}
        name={`projects.${index}.title`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Project Title" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <FormField
        control={form.control}
        name={`projects.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Describe your project."
                className="overflow-hidden"
                style={{ height: "auto" }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <FormField
        control={form.control}
        name={`projects.${index}.githubUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>GitHub URL</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="https://github.com/username/repo"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <FormField
        control={form.control}
        name={`projects.${index}.demoUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Demo URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="https://demo.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <FormField
        control={form.control}
        name={`projects.${index}.techStack`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tech Stack</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="e.g., React, Next.js, Node.js, Python, AWS, Project Management"
                value={field.value?.join(", ") || ""}
                onChange={(e) => {
                  const skills = e.target.value
                    .split(",")
                    .map((skill) => skill.trim());
                  field.onChange(skills);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
