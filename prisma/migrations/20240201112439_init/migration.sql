/*
  Warnings:

  - Added the required column `isCharge` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Field` ADD COLUMN `isCharge` INTEGER NOT NULL;
