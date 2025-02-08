/*
  Warnings:

  - Added the required column `site` to the `Recording` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recording" ADD COLUMN     "site" TEXT NOT NULL;
