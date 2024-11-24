import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-start text-2xl font-semibold md:text-center">
          Login
        </h1>
        <p className="text-start text-sm text-muted-foreground md:text-center">
          Enter your credentials to access your account.
        </p>
      </div>
      <LoginForm />
      <div className="mt-4 flex items-center justify-center text-sm md:mt-0">
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
