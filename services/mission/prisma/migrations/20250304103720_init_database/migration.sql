-- CreateEnum
CREATE TYPE "MissionStatus" AS ENUM ('Pending', 'Progress', 'Completed', 'Close', 'Cancel');

-- CreateEnum
CREATE TYPE "MissionType" AS ENUM ('SAR', 'MarineSAR', 'HlcMarinSAR', 'MERT', 'MarinEMS', 'HlcMS', 'EMS', 'MarineMERT', 'HlcMERT');

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "status" "MissionStatus" NOT NULL DEFAULT 'Pending',
    "type" "MissionType" NOT NULL,
    "title" TEXT NOT NULL,
    "case_number" TEXT,
    "description" TEXT,
    "end_date" TIMESTAMP(3),
    "address" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "utm" TEXT NOT NULL,
    "mgrs" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "delete_date" TIMESTAMP(3),

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mission_title_key" ON "Mission"("title");
