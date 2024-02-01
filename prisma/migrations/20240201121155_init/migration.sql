/*
  Warnings:

  - Added the required column `boundNum` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Field` ADD COLUMN `boundNum` INTEGER NOT NULL;
