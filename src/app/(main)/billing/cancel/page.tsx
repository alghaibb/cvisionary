import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex h-[60vh] flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-red-700">Payment Cancelled</h1>
        <p className="mt-4">
          Your payment was not completed. If this was a mistake, you can try
          again or reach out to us for assistance.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/billing">Try Again</Link>
          </Button>
        </div>
      </div>
      <footer className="text-sm">
        Looking for help?
        <Button asChild variant="linkHover2" className="-ml-2">
          <Link href="/contact-us">Contact us</Link>
        </Button>
      </footer>
    </main>
  );
}
