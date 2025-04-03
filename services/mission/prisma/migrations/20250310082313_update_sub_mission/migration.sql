/*
  Warnings:

  - You are about to drop the `SubMissioTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubMissioTag" DROP CONSTRAINT "SubMissioTag_sub_mission_id_fkey";

-- DropTable
DROP TABLE "SubMissioTag";

-- CreateTable
CREATE TABLE "SubMissionTag" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_mission_id" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "delete_date" TIMESTAMP(3),

    CONSTRAINT "SubMissionTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubMissionTag_title_idx" ON "SubMissionTag"("title");

-- CreateIndex
CREATE INDEX "SubMissionTag_sub_mission_id_idx" ON "SubMissionTag"("sub_mission_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubMissionTag_title_sub_mission_id_key" ON "SubMissionTag"("title", "sub_mission_id");

-- AddForeignKey
ALTER TABLE "SubMissionTag" ADD CONSTRAINT "SubMissionTag_sub_mission_id_fkey" FOREIGN KEY ("sub_mission_id") REFERENCES "SubMission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
