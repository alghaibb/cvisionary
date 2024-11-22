import { InputOTPForm } from "@/components/otp-input";
import InputWithConfirmPassword from "@/components/password-input";


export default function Home() {
  return (
    <div>
      <InputWithConfirmPassword />
      <InputOTPForm />
    </div>
  );
}
