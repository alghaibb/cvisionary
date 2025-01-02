import { getSession } from "./session";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export function withAuth(
  handler: (props: { user: User }) => Promise<JSX.Element>
) {
  return async function () {
    const session = await getSession();

    if (!session || !session.user || !session.user.id) {
      redirect("/login");
    }

    return handler({ user: session.user });
  };
}
