import { Resend } from "resend";
import {
  VerifyAccountEmail,
  ResetPasswordEmail,
  ResendOTPEmail,
} from "@/components/emails";
import { getUserByEmail } from "@/utils/db/user";
import { env } from "@/env";

const resend = new Resend(env.RESEND_API_KEY);

/**
 * Sends an email using Resend.
 * @param to - Recipient's email address.
 * @param subject - Subject of the email.
 * @param reactComponent - React email component to send.
 */
async function sendEmail(
  to: string,
  subject: string,
  reactComponent: JSX.Element,
) {
  try {
    await resend.emails.send({
      from: "no-reply@codewithmj.com",
      to,
      subject,
      react: reactComponent,
    });
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw new Error("Email sending failed.");
  }
}

/**
 * Sends a verification email with OTP to the user.
 * @param email - User's email.
 * @param otp - One-time password.
 */
export const sendVerifyAccountEmail = async (email: string, otp: string) => {
  const user = await getUserByEmail(email);
  if (!user || !user.firstName) {
    throw new Error("User not found or missing first name.");
  }

  const emailComponent = (
    <VerifyAccountEmail otp={otp} userFirstname={user.firstName} />
  );
  await sendEmail(email, "Verify your account", emailComponent);
};

/**
 * Sends a reset password email with a reset token to the user.
 * @param email - User's email.
 * @param token - Reset password token.
 */
export const sendResetPasswordEmail = async (
  email: string,
  firstName: string,
  token: string,
) => {
  const user = await getUserByEmail(email);
  const userFirstName = user?.firstName || firstName;

  const resetPasswordLink = `${env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  const emailComponent = (
    <ResetPasswordEmail
      firstName={userFirstName}
      resetPasswordLink={resetPasswordLink}
    />
  );
  await sendEmail(email, "Reset your password", emailComponent);
};

/**
 * Resends the verification email with OTP to the user.
 * @param email - User's email.
 * @param otp - One-time password.
 */
export const resendVerifyAccountEmail = async (email: string, otp: string) => {
  const user = await getUserByEmail(email);
  if (!user || !user.firstName) {
    throw new Error("User not found or missing first name.");
  }

  const emailComponent = (
    <ResendOTPEmail otp={otp} userFirstname={user.firstName} />
  );

  await sendEmail(email, "Resend OTP", emailComponent);
};
