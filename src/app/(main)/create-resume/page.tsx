import { withAuth } from "@/utils/withAuth";
import { Metadata } from "next";
import CreateResume from "./CreateResume";

export const metadata: Metadata = {
  title: "Create Your Resume",
};

export default withAuth(async function Page() {
  return <CreateResume />;
});
