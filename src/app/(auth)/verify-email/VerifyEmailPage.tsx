import VerifyEmailForm from "./VerifyEmailForm";

export default function VerifyEmailPage() {
  return (
    <div>
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Verify Your Email</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit OTP sent to your email to verify your account.
        </p>
      </div>
      <VerifyEmailForm />
    </div>
  );
}
