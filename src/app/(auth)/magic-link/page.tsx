import MagicLinkPage from "./MagicLinkPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magic Link",
};

export default function Page() {
  return <MagicLinkPage />;
}
