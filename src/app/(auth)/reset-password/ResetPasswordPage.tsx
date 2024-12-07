import { Button } from "@/components/ui/button";
import ResetPasswordForm from "./ResetPasswordForm";
import Link from "next/link";
import { Suspense } from "react";
import { ResetPasswordSkeleton } from "./_components/ResetPasswordSkeleton";

export default function ResetPasswordPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold">Reset Your Password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your new password and confirm it to reset your account password.
        </p>
      </div>
      <Suspense fallback={<ResetPasswordSkeleton />}>
        <ResetPasswordForm />
      </Suspense>

      <div className="flex flex-col items-center justify-center mt-6 text-sm md:mt-0 md:flex-row">
        <p className="text-muted-foreground">
          Need to send another reset link?
        </p>
        <Button asChild variant="linkHover2" type="button">
          <Link href="/forgot-password" className="-ml-3">
            Click here
          </Link>
        </Button>
      </div>
    </div>
  );
}
