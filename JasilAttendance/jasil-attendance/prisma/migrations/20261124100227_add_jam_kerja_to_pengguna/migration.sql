/*
  Warnings:

  - You are about to drop the column `id_shift` on the `pengguna` table. All the data in the column will be lost.
  - You are about to drop the column `id_shift` on the `presensi` table. All the data in the column will be lost.
  - You are about to drop the `shift` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "StatusPresensi" ADD VALUE 'PULANG_CEPAT';

-- DropForeignKey
ALTER TABLE "pengguna" DROP CONSTRAINT "pengguna_id_shift_fkey";

-- DropForeignKey
ALTER TABLE "presensi" DROP CONSTRAINT "presensi_id_shift_fkey";

-- DropForeignKey
ALTER TABLE "shift" DROP CONSTRAINT "shift_id_departemen_fkey";

-- AlterTable
ALTER TABLE "pengguna" DROP COLUMN "id_shift",
ADD COLUMN     "jam_keluar" TIME NOT NULL DEFAULT '17:00:00',
ADD COLUMN     "jam_masuk" TIME NOT NULL DEFAULT '08:00:00',
ADD COLUMN     "toleransi_menit" INTEGER NOT NULL DEFAULT 15;

-- AlterTable
ALTER TABLE "presensi" DROP COLUMN "id_shift";

-- DropTable
DROP TABLE "shift";