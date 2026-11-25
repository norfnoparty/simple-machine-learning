-- CreateEnum
CREATE TYPE "StatusPresensi" AS ENUM ('HADIR', 'TERLAMBAT', 'TIDAK_HADIR', 'CUTI_IZIN', 'TANPA_CLOCK_OUT');

-- AlterTable
ALTER TABLE "pengguna" ADD COLUMN     "id_shift" INTEGER;

-- AlterTable
ALTER TABLE "presensi" ADD COLUMN     "id_shift" INTEGER,
ADD COLUMN     "status" "StatusPresensi" NOT NULL DEFAULT 'HADIR';

-- CreateTable
CREATE TABLE "shift" (
    "id_shift" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jam_masuk" TIME NOT NULL,
    "jam_keluar" TIME NOT NULL,
    "toleransi_menit" INTEGER NOT NULL DEFAULT 15,
    "id_departemen" INTEGER,

    CONSTRAINT "shift_pkey" PRIMARY KEY ("id_shift")
);

-- AddForeignKey
ALTER TABLE "shift" ADD CONSTRAINT "shift_id_departemen_fkey" FOREIGN KEY ("id_departemen") REFERENCES "departemen"("id_departemen") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pengguna" ADD CONSTRAINT "pengguna_id_shift_fkey" FOREIGN KEY ("id_shift") REFERENCES "shift"("id_shift") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presensi" ADD CONSTRAINT "presensi_id_shift_fkey" FOREIGN KEY ("id_shift") REFERENCES "shift"("id_shift") ON DELETE SET NULL ON UPDATE CASCADE;
