/*
  Warnings:

  - You are about to drop the column `img` on the `Area` table. All the data in the column will be lost.
  - Added the required column `imgUrl` to the `Area` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Area` DROP COLUMN `img`,
    ADD COLUMN `imgUrl` VARCHAR(255) NOT NULL;
