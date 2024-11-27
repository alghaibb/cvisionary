/*
  Warnings:

  - You are about to drop the column `accessToken` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpires` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `idToken` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `sessionState` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `tokenType` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "accessToken",
DROP COLUMN "accessTokenExpires",
DROP COLUMN "idToken",
DROP COLUMN "refreshToken",
DROP COLUMN "sessionState",
DROP COLUMN "tokenType",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "id_token" TEXT,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "token_type" TEXT;
