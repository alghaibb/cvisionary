import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

// Function to get session from prisma using session token
export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token"
  );

  if (!sessionToken) return null;

  // Get session from prisma
  const session = await prisma.session.findUnique({
    where: { sessionToken: sessionToken.value }
  });

  return session;
}