import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Page() {
  return (
    <main className="px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-center text-3xl font-bold lg:text-4xl">
          Terms of Service
        </h1>
        <p className="text-center text-sm text-muted-foreground">
          Last Updated: <span className="font-medium">January 6, 2025</span>
        </p>

        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Welcome to CVisionary!</h2>
            <p className="text-sm text-muted-foreground">
              Thank you for choosing CVisionary as your trusted platform for
              creating professional resumes with ease and precision. These Terms
              of Service outline the rules and guidelines for using our website
              and services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground">
              By accessing or using our services, you agree to be bound by these
              Terms of Service and our{" "}
              <Button asChild variant="link" className="m-0 inline p-0">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </Button>
              . If you do not agree, please refrain from using CVisionary.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">2. User Responsibilities</h2>
            <p className="text-sm text-muted-foreground">
              You are responsible for maintaining the confidentiality of your
              account credentials and ensuring that all activities under your
              account comply with these Terms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">3. Prohibited Activities</h2>
            <p className="text-sm text-muted-foreground">You agree not to:</p>
            <ul className="list-disc space-y-2 pl-6 text-sm text-muted-foreground">
              <li>Use the service for any unlawful purposes.</li>
              <li>Distribute viruses or malicious software.</li>
              <li>Engage in activities that disrupt the service or servers.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">
              4. Subscription and Payments
            </h2>
            <p className="text-sm text-muted-foreground">
              Certain features require a paid subscription. Payments are
              processed securely via our payment provider. By subscribing, you
              agree to our billing policies and refund terms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">
              5. Limitation of Liability
            </h2>
            <p className="text-sm text-muted-foreground">
              CVisionary is not liable for any direct, indirect, incidental, or
              consequential damages arising from the use of our services.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">6. Termination</h2>
            <p className="text-sm text-muted-foreground">
              We reserve the right to suspend or terminate your account for
              violation of these Terms or other applicable policies.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">7. Changes to Terms</h2>
            <p className="text-sm text-muted-foreground">
              We may update these Terms of Service from time to time. Continued
              use of CVisionary constitutes your acceptance of the revised
              terms.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">8. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              If you have any questions about these Terms, please contact us at{" "}
              <Button asChild variant="link" className="m-0 inline p-0">
                <Link href="/contact-us">Contact Us</Link>
              </Button>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
