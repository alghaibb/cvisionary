import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import SocialLoginButtons from "@/app/(auth)/(oauth)/_components/SocialLoginButtons";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-start md:text-center">
          Login
        </h1>
        <p className="text-sm text-start text-muted-foreground md:text-center">
          Enter your credentials to access your account.
        </p>
        <p className="text-xs font-semibold tracking-widest text-center uppercase text-muted-foreground">
          OR
        </p>
        <Separator />
      </div>
      <div className="mb-6 space-y-6 text-center">
        <SocialLoginButtons />
        <Separator />
        <div className="flex flex-col items-center justify-center mt-4 text-sm md:mt-0 md:flex-row">
          <p className="text-muted-foreground">
            Prefer to continue with email?
          </p>
          <Button asChild variant="linkHover2" type="button" className="-ml-3">
            <Link href="/magic-link">Click here</Link>
          </Button>
        </div>
      </div>
      <Separator />
      <LoginForm />
      <div className="flex items-center justify-center mt-4 text-sm md:mt-0">
        <p className="text-muted-foreground">Don&apos;t have an account? </p>
        <Button asChild variant="linkHover2" type="button">
          <Link href="/create-account" className="-ml-3">
            Create one
          </Link>
        </Button>
      </div>
    </div>
  );
}
