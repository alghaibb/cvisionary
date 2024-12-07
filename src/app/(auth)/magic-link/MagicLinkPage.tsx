import { Button } from "@/components/ui/button";
import MagicLinkForm from "./MagicLinkForm";
import Link from "next/link";

export default function MagicLinkPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Magic Link</h1>
        <p className="text-sm text-muted-foreground">
          Enter a valid email to receive a magic link.
        </p>
      </div>
      <MagicLinkForm />
      <div className="mt-4 flex items-center justify-center text-sm md:mt-0">
        <p className="text-muted-foreground">
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
