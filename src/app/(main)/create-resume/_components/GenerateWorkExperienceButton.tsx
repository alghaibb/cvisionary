import { Button, LoadingButton } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  generateWorkExperienceSchema,
  GenerateWorkExperienceValues,
  WorkExperience,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { WandSparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { generateWorkExperience } from "../forms/actions";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

interface GenerateWorkExperienceButtonProps {
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

export default function GenerateWorkExperienceButton({
  onWorkExperienceGenerated,
}: GenerateWorkExperienceButtonProps) {
  const [showInputDialog, setShowInputDialog] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        type="button"
        onClick={() => setShowInputDialog(true)}
        aria-label="Open Generate Work Experience Dialog"
      >
        <div className="flex items-center gap-3">
          <WandSparklesIcon size={16} />
          Smart AI Generator
        </div>
      </Button>
      <GenerateWorkExperienceDialog
        open={showInputDialog}
        onOpenChange={setShowInputDialog}
        onWorkExperienceGenerated={(workExperience) => {
          onWorkExperienceGenerated(workExperience);
          setShowInputDialog(false);
        }}
      />
    </>
  );
}

interface GenerateWorkExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkExperienceGenerated: (workExperience: WorkExperience) => void;
}

function GenerateWorkExperienceDialog({
  open,
  onOpenChange,
  onWorkExperienceGenerated,
}: GenerateWorkExperienceDialogProps) {
  const { toast } = useToast();

  const form = useForm<GenerateWorkExperienceValues>({
    resolver: zodResolver(generateWorkExperienceSchema),
    defaultValues: {
      description: "",
    },
  });

  async function onSubmit(values: GenerateWorkExperienceValues) {
    try {
      const res = await generateWorkExperience(values);
      onWorkExperienceGenerated(res);
    } catch (error) {
      console.error("Error generating work experience:", error);
      toast({
        variant: "destructive",
        description: "Failed to generate work experience. Please try again.",
      });
    }
  }

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Generate Work Experience</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            Describe your work experience and we&apos;ll generate a description
            for you.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={`E.g. "from Apr 2020 to present I worked as a software engineer at Google, my tasks were: ..."`}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              className="w-full md:w-auto"
            >
              {form.formState.isSubmitting
                ? "Generating..."
                : "Generate Work Experience"}
            </LoadingButton>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
