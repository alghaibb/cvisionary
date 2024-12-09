import { getSession } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return <main>Resumes</main>;
}
