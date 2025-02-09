import { Button } from "@/components/ui/button";
import RegisterForm from "./CreateAccountForm";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import SocialLoginButtons from "@/app/(auth)/(oauth)/_components/SocialLoginButtons";

export default function CreateAccountPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-start text-2xl font-semibold md:text-center">
          Create An Account with Us
        </h1>
        <p className="text-start text-sm text-muted-foreground md:text-center">
          Enter your details to create an account. Shortly after, you&apos;ll be
          redirected to enter the OTP (one-time password) sent to your email to
          verify your account.
        </p>
        <Separator />
      </div>

      {/* Social Login Options */}
      <div className="mb-6 space-y-6 text-center">
        <SocialLoginButtons
          buttonConfig={{
            facebookText: "Create Account with Facebook",
            googleText: "Create Account with Google",
            googleLoadingText: "Creating Account with Google...",
            facebookLoadingText: "Creating Account with Facebook...",
          }}
        />
        <Separator />
        <div className="mt-4 flex flex-col items-center justify-center text-sm md:mt-0 md:flex-row">
          <p className="text-muted-foreground">
            Prefer to continue with email?
          </p>
          <Button asChild variant="linkHover2" type="button" className="-ml-3">
            <Link href="/magic-link">Click here</Link>
          </Button>
        </div>
      </div>
      <Separator className="my-6 md:my-0" />

      {/* Registration Form */}
      <RegisterForm />

      <div className="mt-4 flex items-center justify-center text-sm md:mt-0">
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
