/*
  Warnings:

  - You are about to drop the column `type` on the `Mission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Mission" DROP COLUMN "type";

-- DropEnum
DROP TYPE "MissionType";
