"use server";

import bcrypt from "bcryptjs";
import { loginSchema, LoginValues } from "@/schemas";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getUserByEmail } from "@/utils/db/user";
import { signIn } from "@/auth";

export async function login(values: LoginValues) {
  try {
    // Validate login data
    const validatedData = loginSchema.parse(values);
    const { email, password } = validatedData;

    // Lowercase email for consistent storage
    const lowercaseEmail = email.toLowerCase();

    // Check if user exists
    const existingUser = await getUserByEmail(lowercaseEmail);

    if (!existingUser || !existingUser.password) {
      return { error: "Incorrect email or password." };
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password as string);

    if (!isPasswordCorrect) {
      return { error: "Incorrect email or password." };
    }

    await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    redirect("/resumes");

  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Failed to login:", error);
    return { error: "Failed to login. Please try again." };
  }
}