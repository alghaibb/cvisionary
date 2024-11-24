import { Button } from "@/components/ui/button";
import RegisterForm from "./CreateAccountForm";
import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-start text-2xl font-semibold md:text-center">
          Create An Account
        </h1>
        <p className="text-start text-sm text-muted-foreground md:text-center">
          Enter your details to create an account. Shortly after, you&apos;ll be
          redirected to enter the OTP (one time password) sent to your email to
          verify your account.
        </p>
      </div>
      <RegisterForm />
      <div className="mt-4 flex items-center justify-center text-sm md:mt-0">
        <p className="text-muted-foreground">Already have an account? </p>
        <Button asChild variant="linkHover2" type="button">
          <Link href="/login" className="-ml-3">
            Login here
          </Link>
        </Button>
      </div>
    </div>
  );
}
