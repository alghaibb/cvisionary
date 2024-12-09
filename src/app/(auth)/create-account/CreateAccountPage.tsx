import { Button } from "@/components/ui/button";
import RegisterForm from "./CreateAccountForm";
import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-start md:text-center">
          Create An Account
        </h1>
        <p className="text-sm text-start text-muted-foreground md:text-center">
          Enter your details to create an account. Shortly after, you&apos;ll be
          redirected to enter the OTP (one time password) sent to your email to
          verify your account.
        </p>
      </div>
      <RegisterForm />
      <div className="flex items-center justify-center mt-4 text-sm md:mt-0">
        <p className="text-muted-foreground">Already have an account? </p>
        <Button asChild variant="linkHover2" type="button">
          <Link href="/login" className="-ml-3">
            Log In here
          </Link>
        </Button>
      </div>
    </div>
  );
}
