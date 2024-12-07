import VerifyMagicLinkPage from "./VerifyMagicLinkPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Magic Link",
};

export default function Page() {
  return <VerifyMagicLinkPage />;
}
