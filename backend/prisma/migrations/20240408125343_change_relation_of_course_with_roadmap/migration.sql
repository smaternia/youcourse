/*
  Warnings:

  - You are about to drop the column `roadmapId` on the `course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_roadmapId_fkey`;

-- AlterTable
ALTER TABLE `course` DROP COLUMN `roadmapId`;

-- CreateTable
CREATE TABLE `_CourseToRoadmap` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CourseToRoadmap_AB_unique`(`A`, `B`),
    INDEX `_CourseToRoadmap_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CourseToRoadmap` ADD CONSTRAINT `_CourseToRoadmap_A_fkey` FOREIGN KEY (`A`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToRoadmap` ADD CONSTRAINT `_CourseToRoadmap_B_fkey` FOREIGN KEY (`B`) REFERENCES `Roadmap`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
