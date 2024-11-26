"use server";

import prisma from "@/lib/prisma";
import { otpSchema, OTPValues } from "@/schemas";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { verifyVerificationOTP, deleteVerificationOTP } from "@/utils/token";

export async function verifyAccount(values: OTPValues) {
  try {
    // Validate data with Zod schema
    const validatedData = otpSchema.parse(values);

    const { otp } = validatedData;

    const { user, error } = await verifyVerificationOTP(otp);

    if (error) {
      return { error };
    }

    if (!user) {
      return { error: "Invalid or expired OTP. Please try again." }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    })

    await deleteVerificationOTP(otp);

    redirect("/login");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error("Something went wrong:", error)
    return { error: "Failed to verify your account. Please try again." }
  }
}