import { Suspense } from "react";
import { VerifyMagicLinkSkeleton } from "./_components/VerifyMagicLinkSkeleton";
import VerifyMagicLink from "./VerifyMagicLink";
import { Separator } from "@/components/ui/separator";

export default function VerifyMagicLinkPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold">Verify Your Magic Link</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We are validating your link. Please wait a moment.
        </p>
        <Separator />
      </div>
      <Suspense fallback={<VerifyMagicLinkSkeleton />}>
        <VerifyMagicLink />
      </Suspense>
    </div>
  );
}
