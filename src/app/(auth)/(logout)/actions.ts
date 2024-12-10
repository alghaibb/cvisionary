"use server";

import { getSession } from "@/utils/session";
import { signOut } from "@/auth";

export async function logout() {
  const session = getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  await signOut({ redirect: true, redirectTo: "/login" });
}
