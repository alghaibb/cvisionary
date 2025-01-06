"use client";

import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export default function CreateResumeButton({
  canCreate,
}: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button asChild className="flex gap-2 mx-auto w-fit">
        <Link href="/create-resume">
          <PlusSquare size={16} />
          Create A New Resume
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="flex gap-2 mx-auto w-fit"
    >
      <PlusSquare size={16} />
      Create A New Resume
    </Button>
  );
}
