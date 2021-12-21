/*
  Warnings:

  - A unique constraint covering the columns `[progress]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tasks_progress_key" ON "tasks"("progress");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_progress_fkey" FOREIGN KEY ("progress") REFERENCES "progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
