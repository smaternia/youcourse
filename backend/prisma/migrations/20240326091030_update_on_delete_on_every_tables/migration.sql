-- DropForeignKey
ALTER TABLE `course` DROP FOREIGN KEY `Course_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `Member_course_id_fkey`;

-- DropForeignKey
ALTER TABLE `member` DROP FOREIGN KEY `Member_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `roadmap` DROP FOREIGN KEY `Roadmap_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `Video_admin_id_fkey`;

-- DropForeignKey
ALTER TABLE `video` DROP FOREIGN KEY `Video_course_id_fkey`;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Member` ADD CONSTRAINT `Member_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Roadmap` ADD CONSTRAINT `Roadmap_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
