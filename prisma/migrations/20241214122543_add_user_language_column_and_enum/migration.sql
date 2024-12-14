-- CreateEnum
CREATE TYPE "UserLanguage" AS ENUM ('UK', 'EN', 'FR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "language" "UserLanguage";
