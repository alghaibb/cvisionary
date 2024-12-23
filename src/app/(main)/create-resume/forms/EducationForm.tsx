import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { educationSchema, EducationValues } from "@/schemas";
import { CreateResumeProps } from "@/types/create-resume";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripHorizontal, X } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";

export default function EducationForm({
  resumeData,
  setResumeData,
}: CreateResumeProps) {
  const form = useForm<EducationValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        educations:
          values.educations?.filter((edu) => edu !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "educations",
  });

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your educational qualifications to include in your resume.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          {fields.map((field, index) => (
            <EducationItem
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
                  degree: "",
                  school: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              Add Education
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface EducationItemProps {
  form: UseFormReturn<EducationValues>;
  index: number;
  remove: (index: number) => void;
}

function EducationItem({ form, index, remove }: EducationItemProps) {
  return (
    <div className="p-4 space-y-4 border rounded-lg shadow-sm bg-background">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripHorizontal className="w-4 h-4 cursor-grab text-muted-foreground" />
          <h3 className="text-lg font-semibold">Education {index + 1}</h3>
        </div>
        <Button
          variant="basic"
          size="icon"
          onClick={() => remove(index)}
          title="Remove Education"
        >
          <X size={16} />
        </Button>
      </div>

      <FormField
        control={form.control}
        name={`educations.${index}.degree`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Bachelor of Computer Science" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <FormField
        control={form.control}
        name={`educations.${index}.school`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Monash University" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      <div className="flex flex-col gap-3 md:grid md:grid-cols-2">
        <FormField
          control={form.control}
          name={`educations.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <DatePicker
                  value={
                    field.value?.slice(0, 10)
                      ? new Date(field.value)
                      : undefined
                  }
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                  placeholder="Select a start date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`educations.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <DatePicker
                  value={
                    field.value?.slice(0, 10)
                      ? new Date(field.value)
                      : undefined
                  }
                  onChange={(date) =>
                    field.onChange(date?.toISOString().split("T")[0])
                  }
                  placeholder="Select an end date"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription className="col-span-2 text-center md:text-left">
          Leave the <span className="font-semibold">end date</span> empty if you
          are currently studying
        </FormDescription>
      </div>
    </div>
  );
}
