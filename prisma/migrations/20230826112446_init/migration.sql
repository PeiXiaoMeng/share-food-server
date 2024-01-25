/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Area` table. All the data in the column will be lost.
  - Added the required column `img` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Area` DROP COLUMN `imgUrl`,
    ADD COLUMN `img` VARCHAR(191) NOT NULL;
