-- AlterTable
ALTER TABLE "Mission" ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "lat" DROP NOT NULL,
ALTER COLUMN "long" DROP NOT NULL,
ALTER COLUMN "utm" DROP NOT NULL,
ALTER COLUMN "mgrs" DROP NOT NULL;

-- CreateTable
CREATE TABLE "SubMission" (
    "id" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "vehicle_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "delete_date" TIMESTAMP(3),

    CONSTRAINT "SubMission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubMissioTag" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_mission_id" TEXT NOT NULL,
    "date_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "delete_date" TIMESTAMP(3),

    CONSTRAINT "SubMissioTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SubMission_patient_id_mission_id_vehicle_id_idx" ON "SubMission"("patient_id", "mission_id", "vehicle_id");

-- CreateIndex
CREATE INDEX "SubMission_patient_id_mission_id_idx" ON "SubMission"("patient_id", "mission_id");

-- CreateIndex
CREATE INDEX "SubMission_patient_id_idx" ON "SubMission"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubMission_patient_id_mission_id_vehicle_id_key" ON "SubMission"("patient_id", "mission_id", "vehicle_id");

-- CreateIndex
CREATE INDEX "SubMissioTag_title_idx" ON "SubMissioTag"("title");

-- CreateIndex
CREATE INDEX "SubMissioTag_sub_mission_id_idx" ON "SubMissioTag"("sub_mission_id");

-- CreateIndex
CREATE UNIQUE INDEX "SubMissioTag_title_sub_mission_id_key" ON "SubMissioTag"("title", "sub_mission_id");

-- CreateIndex
CREATE INDEX "Mission_id_idx" ON "Mission"("id");

-- CreateIndex
CREATE INDEX "Mission_status_idx" ON "Mission"("status");

-- CreateIndex
CREATE INDEX "Mission_title_idx" ON "Mission"("title");

-- CreateIndex
CREATE INDEX "Mission_create_date_idx" ON "Mission"("create_date");

-- AddForeignKey
ALTER TABLE "SubMission" ADD CONSTRAINT "SubMission_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMissioTag" ADD CONSTRAINT "SubMissioTag_sub_mission_id_fkey" FOREIGN KEY ("sub_mission_id") REFERENCES "SubMission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
