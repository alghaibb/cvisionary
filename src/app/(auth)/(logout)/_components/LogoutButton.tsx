"use client";

import { LoadingButton } from "@/components/ui/button";
import { useTransition } from "react";
import { logout } from "../actions";

export default function LogoutButton() {
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
    >
      {isPending ? "Logging out..." : "Logout"}
    </LoadingButton>
  );
}
