import { getSession } from "./session";
import { redirect } from "next/navigation";

export function withAuth(handler: () => Promise<JSX.Element>) {
  return async function () {
    const session = await getSession();

    if (!session) {
      redirect("/login");
    }

    return handler();
  }
}