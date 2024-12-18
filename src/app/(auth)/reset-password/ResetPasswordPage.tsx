import { Button } from "@/components/ui/button";
import ResetPasswordForm from "./ResetPasswordForm";
import Link from "next/link";
import { Suspense } from "react";
import { ResetPasswordSkeleton } from "./_components/ResetPasswordSkeleton";
import { Separator } from "@/components/ui/separator";

export default function ResetPasswordPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-bold">Reset Your Password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your new password and confirm it to reset your account password.
        </p>
        <Separator />
      </div>
      <Suspense fallback={<ResetPasswordSkeleton />}>
        <ResetPasswordForm />
      </Suspense>

      <div className="mt-6 flex flex-col items-center justify-center text-sm md:mt-0 md:flex-row">
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
