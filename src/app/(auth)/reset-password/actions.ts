"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { resetPasswordSchema, ResetPasswordValues } from "@/schemas";
import { deleteResetPasswordToken } from "@/utils/token";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getUserByResetPasswordToken } from "@/utils/db/user";

export async function resetPassword(values: ResetPasswordValues, token: string) {
  try {
    // Validate input data using Zod schema
    const validatedData = resetPasswordSchema.parse(values);
    const { newPassword, confirmNewPassword } = validatedData;

    // Ensure passwords match
    if (newPassword !== confirmNewPassword) {
      return { error: "Passwords do not match." };
    }


    // Fetch the reset password token and associated user
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: { token },
      include: { user: true },
    });

    // Find user by reset password token
    const user = await getUserByResetPasswordToken(token);

    // Ensure user cannot use the old password as the new password
    if (await bcrypt.compare(newPassword, user?.password as string)) {
      return { error: "You cannot use the old password as the new password." };
    }


    if (!resetPasswordToken || !resetPasswordToken.user) {
      return { error: "Invalid or expired token." };
    }

    // Check if the token is expired
    if (resetPasswordToken.expiresAt < new Date()) {
      await deleteResetPasswordToken(resetPasswordToken.id); // Delete expired token
      return { error: "Token has expired. Please request a new password reset link." };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await prisma.user.update({
      where: { id: resetPasswordToken.userId },
      data: { password: hashedPassword },
    });

    // Delete the reset password token after successful password update
    await deleteResetPasswordToken(resetPasswordToken.token);

    // Redirect to the login page
    redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Error resetting password:", error);
    return { error: "Failed to reset password. Please try again later." };
  }
}
