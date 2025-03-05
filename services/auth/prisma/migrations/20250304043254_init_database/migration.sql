-- CreateEnum
CREATE TYPE "RoleUsers" AS ENUM ('RootAdmin', 'Admin', 'User');

-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('Pending', 'Activate', 'Block');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'Pending',
    "role" "RoleUsers" NOT NULL DEFAULT 'User',
    "email" TEXT,
    "address" TEXT,
    "phone_number" TEXT,
    "career" TEXT,
    "id_card" TEXT,
    "image" TEXT,
    "hospital_branch_id" TEXT,
    "refresh_token" TEXT,
    "create_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "update_date" TIMESTAMP(3),
    "delete_date" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreRefreshToken" (
    "id" TEXT NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreRefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE INDEX "Users_username_idx" ON "Users"("username");

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users"("id");

-- CreateIndex
CREATE INDEX "Users_id_username_idx" ON "Users"("id", "username");

-- CreateIndex
CREATE UNIQUE INDEX "StoreRefreshToken_user_id_key" ON "StoreRefreshToken"("user_id");

-- CreateIndex
CREATE INDEX "StoreRefreshToken_refresh_token_idx" ON "StoreRefreshToken"("refresh_token");

-- CreateIndex
CREATE INDEX "StoreRefreshToken_id_idx" ON "StoreRefreshToken"("id");

-- AddForeignKey
ALTER TABLE "StoreRefreshToken" ADD CONSTRAINT "StoreRefreshToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
