/*
  Warnings:

  - You are about to drop the column `email` on the `magic_links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[identifier]` on the table `magic_links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `magic_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "magic_links_token_idx";

-- AlterTable
ALTER TABLE "magic_links" DROP COLUMN "email",
ADD COLUMN     "identifier" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "work_experiences" (
    "id" TEXT NOT NULL,
    "position" TEXT,
    "company" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "description" TEXT,
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "magic_links_identifier_key" ON "magic_links"("identifier");

-- CreateIndex
CREATE INDEX "magic_links_token_identifier_idx" ON "magic_links"("token", "identifier");

-- AddForeignKey
ALTER TABLE "work_experiences" ADD CONSTRAINT "work_experiences_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
