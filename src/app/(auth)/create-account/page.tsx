import CreateAccountPage from "./CreateAccountPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function Page() {
  return <CreateAccountPage />;
}
