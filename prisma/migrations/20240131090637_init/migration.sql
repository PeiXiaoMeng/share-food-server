/*
  Warnings:

  - Added the required column `status` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Field` ADD COLUMN `status` INTEGER NOT NULL;
