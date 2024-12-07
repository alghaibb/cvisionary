"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { validateMagicLink } from "./actions";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function VerifyMagicLink() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    async function handleMagicLink() {
      if (!token) {
        setError(error);
        return;
      }

      try {
        const { success, error } = await validateMagicLink(token);
        if (error) {
          setError(error);
          return;
        } else if (success) {
          router.push("/resume");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.";
        setError(errorMessage);
      }
    }

    handleMagicLink();
  }, [token, router, error]);

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <Separator />

        <div className="flex flex-col justify-between md:flex-row">
          <Button asChild variant="gooeyLeft">
            <Link href="/magic-link">Send another magic link</Link>
          </Button>

          <Button asChild variant="linkHover2">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <LoadingSpinner size="small" />;
}
