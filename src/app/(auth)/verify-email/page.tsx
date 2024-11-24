import VerifyEmailPage from "./VerifyEmailPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default function Page() {
  return <VerifyEmailPage />;
}
