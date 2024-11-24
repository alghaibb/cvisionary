import React from "react";
import {
  ResponsiveModal as Modal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";

interface ResponsiveModalProps {
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  triggerText: string;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  triggerText,
}) => {
  return (
    <Modal>
      <ResponsiveModalTrigger asChild>
        <Button variant="outline" type="button">
          {triggerText}
        </Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>{title}</ResponsiveModalTitle>
          <ResponsiveModalDescription>{description}</ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="flex justify-end mt-4 space-x-2">
          {onCancel && (
            <Button variant="secondary" onClick={onCancel} type="button">
              {cancelText}
            </Button>
          )}
          {onConfirm && (
            <Button variant="destructive" onClick={onConfirm} type="button">
              {confirmText}
            </Button>
          )}
        </div>
      </ResponsiveModalContent>
    </Modal>
  );
};

export default ResponsiveModal;
