/*
  Warnings:

  - You are about to drop the column `progress` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `progress_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_progress_fkey";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "progress",
ADD COLUMN     "progress_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_progress_id_fkey" FOREIGN KEY ("progress_id") REFERENCES "progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
