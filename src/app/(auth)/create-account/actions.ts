"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { sendVerifyAccountEmail } from "@/utils/sendEmails";
import { generateVerificationCode } from "@/utils/token";
import { getUserByEmail } from "@/utils/db/user";
import { createAccountSchema, CreateAccountValues } from "@/schemas";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function createAccount(values: CreateAccountValues) {
  try {
    // Validate data with Zod schema
    const validatedData = createAccountSchema.parse(values);

    const { firstName, lastName, email, password } = validatedData;

    // Lowercase email for consistent storage
    const lowercaseEmail = email.toLowerCase();

    // Check if email is already in use
    const existingUser = await getUserByEmail(lowercaseEmail);
    if (existingUser) {
      return { error: "The email is already in use. Please try logging in or resetting your password." };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: lowercaseEmail,
        password: hashedPassword,
      },
    });

    // Generate a verification code
    const verificationCode = await generateVerificationCode(lowercaseEmail, "account_creation");

    // Send the verification email
    await sendVerifyAccountEmail(lowercaseEmail, verificationCode);

    // Redirect to the verify email page
    redirect("/verify-email");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Failed to create account:", error);
    return { error: "Failed to create account. Please try again." };
  }
}
