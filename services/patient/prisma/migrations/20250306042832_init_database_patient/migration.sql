-- CreateEnum
CREATE TYPE "GroupBlood" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "qr_number" TEXT,
    "age" INTEGER,
    "birthday" TEXT,
    "id_card" TEXT,
    "tel" TEXT,
    "address" TEXT,
    "group_blood" "GroupBlood",
    "image" TEXT,
    "image_id_card" TEXT,
    "create_by" TEXT,
    "update_by" TEXT,
    "date_time_died" TIMESTAMP(3),
    "date_time_go_home" TIMESTAMP(3),
    "date_time_lost" TIMESTAMP(3),
    "date_time_refer" TIMESTAMP(3),
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "delete_date" TIMESTAMP(3),

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);
