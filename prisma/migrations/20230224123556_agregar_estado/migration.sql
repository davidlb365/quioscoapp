/*
  Warnings:

  - Added the required column `estado` to the `Orden` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orden" ADD COLUMN     "estado" BOOLEAN NOT NULL;
