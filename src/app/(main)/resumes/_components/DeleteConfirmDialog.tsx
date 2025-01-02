import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-modal";
import { Button, LoadingButton } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { deleteResume } from "../actions";

interface DeleteConfirmDialogProps {
  resumeId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DeleteConfirmDialog({
  resumeId,
  open,
  onOpenChange,
}: DeleteConfirmDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  async function handleDelete() {
    startTransition(async () => {
      try {
        await deleteResume(resumeId);
        onOpenChange(false);
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          description: "Failed to delete resume",
        });
      }
    });
  }

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Delete resume?</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            This will permanently delete this resume. This action cannot be
            undone.
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <ResponsiveModalFooter className="flex flex-col items-center justify-center mt-4 space-y-4 md:mt-0 md:flex-row md:space-y-0">
          <LoadingButton
            variant="destructive"
            onClick={handleDelete}
            loading={isPending}
            disabled={isPending}
            className="w-full md:w-fit"
          >
            {isPending ? "Deleting resume..." : "Delete Resume"}
          </LoadingButton>
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="w-full md:w-fit"
          >
            Cancel
          </Button>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
