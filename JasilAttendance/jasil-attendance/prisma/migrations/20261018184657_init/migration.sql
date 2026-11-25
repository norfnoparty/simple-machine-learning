-- CreateEnum
CREATE TYPE "Role" AS ENUM ('EMPLOYEE', 'HRD', 'MANAGER');

-- CreateEnum
CREATE TYPE "StatusPengajuan" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "departemen" (
    "id_departemen" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "departemen_pkey" PRIMARY KEY ("id_departemen")
);

-- CreateTable
CREATE TABLE "pengguna" (
    "id_pengguna" SERIAL NOT NULL,
    "id_departemen" INTEGER,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "jabatan" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "pengguna_pkey" PRIMARY KEY ("id_pengguna")
);

-- CreateTable
CREATE TABLE "presensi" (
    "id_presensi" SERIAL NOT NULL,
    "id_pengguna" INTEGER NOT NULL,
    "tanggal_presensi" DATE NOT NULL,
    "jam_masuk" TIME NOT NULL,
    "jam_keluar" TIME,

    CONSTRAINT "presensi_pkey" PRIMARY KEY ("id_presensi")
);

-- CreateTable
CREATE TABLE "cuti_izin" (
    "id_cuti_izin" SERIAL NOT NULL,
    "id_pengguna" INTEGER NOT NULL,
    "jenis_cuti_izin" TEXT NOT NULL,
    "tanggal_mulai" DATE NOT NULL,
    "tanggal_selesai" DATE NOT NULL,
    "alasan" TEXT NOT NULL,
    "status" "StatusPengajuan" NOT NULL DEFAULT 'PENDING',
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bukti_url" TEXT,

    CONSTRAINT "cuti_izin_pkey" PRIMARY KEY ("id_cuti_izin")
);

-- CreateTable
CREATE TABLE "lembur" (
    "id_lembur" SERIAL NOT NULL,
    "id_pengguna" INTEGER NOT NULL,
    "tanggal_lembur" DATE NOT NULL,
    "jam_mulai" TIME NOT NULL,
    "jam_selesai" TIME,
    "deskripsi" TEXT NOT NULL,
    "status" "StatusPengajuan" NOT NULL DEFAULT 'PENDING',
    "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lembur_pkey" PRIMARY KEY ("id_lembur")
);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_email_key" ON "pengguna"("email");

-- AddForeignKey
ALTER TABLE "pengguna" ADD CONSTRAINT "pengguna_id_departemen_fkey" FOREIGN KEY ("id_departemen") REFERENCES "departemen"("id_departemen") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presensi" ADD CONSTRAINT "presensi_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuti_izin" ADD CONSTRAINT "cuti_izin_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lembur" ADD CONSTRAINT "lembur_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE CASCADE ON UPDATE CASCADE;
