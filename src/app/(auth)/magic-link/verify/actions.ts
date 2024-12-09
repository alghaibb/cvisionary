"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { v4 as uuid } from "uuid";

export async function validateMagicLink(token: string) {
  const magicLink = await prisma.magicLink.findUnique({
    where: { token },
  });

  if (!magicLink || magicLink.expiresAt <= new Date()) {
    return { error: "Invalid or expired magic link." };
  }

  // Fetch the user associated with the magic link
  const user = await prisma.user.findUnique({
    where: { email: magicLink.identifier },
  });

  if (!user) {
    throw new Error("User not found.");
  }

  // Verify the user's email if not already verified
  if (!user.emailVerified) {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });
  }

  // Create a session for the user
  const sessionToken = uuid();
  await prisma.session.create({
    data: {
      sessionToken,
      userId: user.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), 
    },
  });



  const cookieKey =
    process.env.NODE_ENV === "production"
      ? "__Secure-authjs.session-token"
      : "next-auth.session-token";

  // Attach the session token to cookies
  (await
    // Attach the session token to cookies
    cookies()).set(cookieKey, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

  // Delete the magic link
  await prisma.magicLink.delete({
    where: { token },
  });

  return {
    success: true,
    redirectUrl: "/resumes",
  };
}
