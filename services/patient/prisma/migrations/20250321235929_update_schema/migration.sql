-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "allergy_drug" TEXT,
ADD COLUMN     "allergy_food" TEXT,
ADD COLUMN     "congenital_disease" TEXT;

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "symptom_details" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "patient_id" TEXT NOT NULL,
    "chief_complaint" TEXT NOT NULL,
    "present_illness" TEXT NOT NULL,
    "teatment" TEXT NOT NULL,
    "create_by" TEXT,
    "update_by" TEXT,
    "physical_status" TEXT,
    "triage_lavel" TEXT,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "element_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "image" TEXT,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "create_by" TEXT,
    "update_by" TEXT,
    "patient_id" TEXT,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StationPatient" (
    "id" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "description" TEXT,
    "patient_id" TEXT NOT NULL,
    "in_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "out_date" TIMESTAMP(3),
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),

    CONSTRAINT "StationPatient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teatment" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "chief_complaint" TEXT NOT NULL,
    "present_illness" TEXT NOT NULL,
    "physical_status" TEXT,
    "triage_lavel" TEXT,
    "patient_id" TEXT NOT NULL,
    "create_by" TEXT,
    "update_by" TEXT,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),

    CONSTRAINT "Teatment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_patient_id_key" ON "History"("patient_id");

-- CreateIndex
CREATE INDEX "History_id_patient_id_idx" ON "History"("id", "patient_id");

-- CreateIndex
CREATE INDEX "Exam_id_create_by_update_by_idx" ON "Exam"("id", "create_by", "update_by");

-- CreateIndex
CREATE INDEX "Exam_patient_id_idx" ON "Exam"("patient_id");

-- CreateIndex
CREATE INDEX "StationPatient_id_patient_id_idx" ON "StationPatient"("id", "patient_id");

-- CreateIndex
CREATE INDEX "StationPatient_station_idx" ON "StationPatient"("station");

-- CreateIndex
CREATE UNIQUE INDEX "Teatment_patient_id_key" ON "Teatment"("patient_id");

-- CreateIndex
CREATE INDEX "Teatment_id_patient_id_idx" ON "Teatment"("id", "patient_id");

-- CreateIndex
CREATE INDEX "Patient_id_idx" ON "Patient"("id");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StationPatient" ADD CONSTRAINT "StationPatient_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teatment" ADD CONSTRAINT "Teatment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
