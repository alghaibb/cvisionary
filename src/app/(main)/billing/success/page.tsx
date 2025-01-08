import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center px-4 py-8 md:h-[40vh]">
      <div className="w-full max-w-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-green-700">
          Payment Successful!
        </h1>
        <p className="mt-4">
          Thank you for your purchase! Enjoy your new subscription and the
          benefits that come with it.
        </p>
        <div className="mt-6">
          <Button asChild variant="outline">
            <Link href="/resumes">Go to Resumes</Link>
          </Button>
        </div>
      </div>
      <footer className="text-sm">
        Need help?
        <Button asChild variant="linkHover2" className="-ml-2">
          <Link href="/contact-us">Contact us</Link>
        </Button>
      </footer>
    </main>
  );
}
