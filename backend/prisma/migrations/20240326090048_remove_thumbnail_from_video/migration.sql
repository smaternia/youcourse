/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `video` DROP COLUMN `thumbnail`,
    MODIFY `description` TEXT NOT NULL;
