"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
      <div className="max-w-lg p-6">
        <h1 className="text-3xl font-bold text-primary">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Oops! The page you are looking for doesn&apos;t exist or has been
          moved.
        </p>
      </div>

      <div className="flex flex-col items-center mt-6 space-y-4">
        <Button variant="gooeyLeft" size="lg" asChild>
          <Link href="/">Go Back to Homepage</Link>
        </Button>
        <Button variant="linkHover2" size="sm" onClick={() => router.back()}>
          Return to Previous Page
        </Button>
      </div>
    </div>
  );
}
