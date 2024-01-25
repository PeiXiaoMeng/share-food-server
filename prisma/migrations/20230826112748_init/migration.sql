/*
  Warnings:

  - You are about to drop the column `url` on the `Area` table. All the data in the column will be lost.
  - Added the required column `introduce` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Area` DROP COLUMN `url`,
    ADD COLUMN `introduce` VARCHAR(191) NOT NULL;
