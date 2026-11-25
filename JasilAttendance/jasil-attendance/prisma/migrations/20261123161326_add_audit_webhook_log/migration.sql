/*
  Warnings:

  - A unique constraint covering the columns `[pin]` on the table `pengguna` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_pengguna,tanggal_presensi]` on the table `presensi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "audit_log" (
    "id_log" SERIAL NOT NULL,
    "id_pengguna" INTEGER NOT NULL,
    "aksi" TEXT,
    "entity_type" TEXT,
    "entity_id" INTEGER,
    "nilai_lama" JSONB,
    "nilai_baru" JSONB,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("id_log")
);

-- CreateTable
CREATE TABLE "webhook_log" (
    "id_log" SERIAL NOT NULL,
    "device_id" TEXT,
    "payload" JSONB NOT NULL,
    "status" TEXT,
    "error_message" TEXT,
    "processed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "webhook_log_pkey" PRIMARY KEY ("id_log")
);

-- CreateIndex
CREATE INDEX "audit_log_id_pengguna_created_at_idx" ON "audit_log"("id_pengguna", "created_at");

-- CreateIndex
CREATE INDEX "audit_log_entity_type_entity_id_idx" ON "audit_log"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "webhook_log_device_id_created_at_idx" ON "webhook_log"("device_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_pin_key" ON "pengguna"("pin");

-- CreateIndex
CREATE UNIQUE INDEX "presensi_id_pengguna_tanggal_presensi_key" ON "presensi"("id_pengguna", "tanggal_presensi");

-- AddForeignKey
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE CASCADE ON UPDATE CASCADE;
