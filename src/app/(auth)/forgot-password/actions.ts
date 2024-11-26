"use server";

import { getUserByEmail } from "@/utils/db/user";
import { sendResetPasswordEmail } from "@/utils/sendEmails";
import { forgotPasswordSchema, ForgotPasswordValues } from "@/schemas";
import { generateResetPasswordToken } from "@/utils/token";

export async function forgotPassword(values: ForgotPasswordValues) {
  try {
    // Validate data
    const validatedData = forgotPasswordSchema.parse(values);
    const { email } = validatedData;

    const lowercaseEmail = email.toLowerCase();

    const existingUser = await getUserByEmail(lowercaseEmail);
    if (!existingUser) {
      return { success: "If you have an account with us, you will receive an email with instructions on how to reset your password." };
    }

    const resetPasswordToken = await generateResetPasswordToken(existingUser.email);

    await sendResetPasswordEmail(
      lowercaseEmail,
      existingUser.firstName,
      resetPasswordToken as string,
    );

    return { success: "If you have an account with us, you will receive an email with instructions on how to reset your password." }
  } catch (error) {
    console.error("Failed to send reset password email:", error);
    return { error: "Failed to send reset password email. Please try again." };
  }
}