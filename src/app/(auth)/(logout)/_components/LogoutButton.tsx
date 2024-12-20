"use client";

import { LoadingButton } from "@/components/ui/button";
import { useTransition } from "react";
import { logout } from "../actions";

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(() => {
      logout();
    });
  }

  return (
    <LoadingButton
      onClick={handleClick}
      loading={isPending}
      disabled={isPending}
      variant="gooeyLeft"
      className={className}
    >
      {isPending ? "Logging out..." : "Log Out"}
    </LoadingButton>
  );
}
