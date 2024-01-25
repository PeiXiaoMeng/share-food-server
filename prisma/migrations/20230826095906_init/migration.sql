/*
  Warnings:

  - Added the required column `img` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Area` ADD COLUMN `img` VARCHAR(255) NOT NULL;
