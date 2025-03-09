-- CreateEnum
CREATE TYPE "TypeVehicle" AS ENUM ('Car', 'Helicopter', 'Ship');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TypeVehicle" NOT NULL,
    "number_code" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "delete_date" TIMESTAMP(3),

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);
