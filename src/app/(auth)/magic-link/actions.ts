"use server";

import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendMagicLinkEmail } from "@/utils/sendEmails";
import { magicLinkSchema, MagicLinkValues } from "@/schemas";
import { getUserByEmail } from "@/utils/db/user";

export async function sendMagicLink(values: MagicLinkValues) {
  try {
    const validatedData = magicLinkSchema.parse(values);
    const { firstName, lastName, email } = validatedData;

    const lowerCaseEmail = email.toLowerCase();

    // Check if user exists
    let user = await getUserByEmail(lowerCaseEmail);

    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email: lowerCaseEmail,
        },
      });
    }

    // Check for existing magic link
    const existingMagicLink = await prisma.magicLink.findUnique({
      where: { identifier: lowerCaseEmail },
    });

    let token: string;

    if (existingMagicLink && existingMagicLink.expiresAt > new Date()) {
      // If a valid magic link exists, reuse it
      token = existingMagicLink.token;
    } else {
      // Otherwise, create a new magic link
      token = crypto.randomBytes(32).toString("hex");

      // Delete the old magic link if it exists
      if (existingMagicLink) {
        await prisma.magicLink.delete({
          where: { id: existingMagicLink.id },
        });
      }

      await prisma.magicLink.create({
        data: {
          token,
          identifier: lowerCaseEmail,
          expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
        },
      });
    }

    await sendMagicLinkEmail(email, token);

    return { success: "If that email exists, we will send a magic link to it." };
  } catch (error) {
    console.error("Error sending magic link", error);
    return { error: "Failed to send the magic link. Please try again." };
  }
}
