/*
  Warnings:

  - You are about to drop the column `hospital_branch_id` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "hospital_branch_id",
DROP COLUMN "refresh_token";
