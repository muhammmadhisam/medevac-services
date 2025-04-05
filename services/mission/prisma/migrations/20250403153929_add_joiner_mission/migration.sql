-- CreateTable
CREATE TABLE "Joiner" (
    "id" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),

    CONSTRAINT "Joiner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryJoiner" (
    "id" TEXT NOT NULL,
    "mission_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),

    CONSTRAINT "HistoryJoiner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Joiner_mission_id_user_id_idx" ON "Joiner"("mission_id", "user_id");

-- CreateIndex
CREATE INDEX "Joiner_user_id_idx" ON "Joiner"("user_id");

-- CreateIndex
CREATE INDEX "HistoryJoiner_mission_id_user_id_idx" ON "HistoryJoiner"("mission_id", "user_id");

-- CreateIndex
CREATE INDEX "HistoryJoiner_user_id_idx" ON "HistoryJoiner"("user_id");

-- CreateIndex
CREATE INDEX "HistoryJoiner_mission_id_idx" ON "HistoryJoiner"("mission_id");

-- AddForeignKey
ALTER TABLE "Joiner" ADD CONSTRAINT "Joiner_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryJoiner" ADD CONSTRAINT "HistoryJoiner_mission_id_fkey" FOREIGN KEY ("mission_id") REFERENCES "Mission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
