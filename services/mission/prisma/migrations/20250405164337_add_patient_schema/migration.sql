-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Patient_mission_id_patient_id_idx" ON "Patient"("mission_id", "patient_id");

-- CreateIndex
CREATE INDEX "Patient_patient_id_idx" ON "Patient"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_mission_id_patient_id_key" ON "Patient"("mission_id", "patient_id");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
