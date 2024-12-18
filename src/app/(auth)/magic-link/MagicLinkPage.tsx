import { Button } from "@/components/ui/button";
import MagicLinkForm from "./MagicLinkForm";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function MagicLinkPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-start text-2xl font-semibold md:text-center">
          Log In with Magic Link
        </h1>
        <p className="text-start text-sm text-muted-foreground md:text-center">
          Enter a valid email to receive a magic link.
        </p>
        <Separator />
      </div>
      <MagicLinkForm />
      <div className="mt-4 flex flex-col items-center justify-center text-sm md:mt-0 md:flex-row md:space-y-0">
        <p className="text-center text-muted-foreground md:text-left">
          Prefer to log in with a password?
        </p>
        <Button asChild variant="linkHover2" type="button">
          <Link href="/login" className="-ml-3">
            Log In here
          </Link>
        </Button>
      </div>
    </div>
  );
}
