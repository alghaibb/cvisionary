"use server";

import prisma from "@/lib/prisma";
import { ResendOTPSchema, ResendOTPValues } from "@/schemas";
import { generateVerificationCode, deleteVerificationOTPByUserId } from "@/utils/token";
import { resendVerifyAccountEmail } from "@/utils/sendEmails";
import { getUserByEmail } from "@/utils/db/user";

export async function resendOTP(values: ResendOTPValues) {
  try {
    const validatedData = ResendOTPSchema.parse(values);
    const { email } = validatedData;

    const lowercaseEmail = email.toLowerCase();

    const existingUser = await getUserByEmail(lowercaseEmail);
    if (!existingUser) {
      return { success: "If you have an account with us, you will receive an email with instructions on how to reset your password." };
    }

    // Check rate limit (1-minute cooldown)
    const lastOTP = await prisma.verificationOTP.findFirst({
      where: { userId: existingUser.id, reason: "resend" },
      orderBy: { createdAt: "desc" },
    });

    if (lastOTP && new Date().getTime() - lastOTP.createdAt.getTime() < 60 * 1000) {
      const remainingTime = Math.ceil(
        (60 * 1000 - (new Date().getTime() - lastOTP.createdAt.getTime())) /
        1000
      );
      return {
        error: `Please wait ${remainingTime} seconds before requesting a new OTP.`,
      };
    }

    // Delete existing OTPs
    await deleteVerificationOTPByUserId(existingUser.id);

    // Generate new OTP
    const otp = await generateVerificationCode(existingUser.email, "resend");


    // Send email
    await resendVerifyAccountEmail(existingUser.email, otp);

    return { success: "If you have an account with us, you will receive an email with instructions on how to reset your password." };

  } catch (error) {
    console.error("Error resending OTP:", error);
    return { error: "Failed to resend OTP. Please try again later." };
  }
}