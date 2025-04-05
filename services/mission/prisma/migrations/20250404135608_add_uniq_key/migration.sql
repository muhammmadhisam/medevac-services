/*
  Warnings:

  - A unique constraint covering the columns `[mission_id,user_id]` on the table `Joiner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Joiner_mission_id_user_id_key" ON "Joiner"("mission_id", "user_id");
