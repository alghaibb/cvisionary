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
  triggerText: string;
  children: React.ReactNode;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  title,
  description,
  triggerText,
  children,
}) => {
  return (
    <Modal>
      <ResponsiveModalTrigger asChild>
        <Button variant="linkHover2">{triggerText}</Button>
      </ResponsiveModalTrigger>
      <ResponsiveModalContent>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>{title}</ResponsiveModalTitle>
          <ResponsiveModalDescription>{description}</ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <div className="mt-4">{children}</div>
      </ResponsiveModalContent>
    </Modal>
  );
};

export default ResponsiveModal;
