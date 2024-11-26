-- AlterTable
ALTER TABLE "verification_otps" ADD COLUMN     "reason" TEXT NOT NULL DEFAULT 'resend';
