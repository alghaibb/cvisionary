import { Button } from "@/components/ui/button";
import ForgotPasswordForm from "./ForgotPasswordForm";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold">
          Forgot Your Password?
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your registered email to receive a password reset link.
        </p>
        <Separator />
      </div>
      <ForgotPasswordForm />
      <div className="mt-4 flex items-center justify-center text-sm md:mt-0">
        <p className="text-muted-foreground">Remember your password?</p>
        <Button asChild variant="linkHover2" type="button">
          <Link href="/login" className="-ml-3">
            Log In here
          </Link>
        </Button>
      </div>
    </div>
  );
}
