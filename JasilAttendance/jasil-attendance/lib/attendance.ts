import { prisma } from '@/lib/prisma';
import { StatusPresensi } from '@prisma/client';

export type PunchResult =
  | { ok: true; action: 'CHECK_IN' | 'CHECK_OUT'; nama: string; jam: string; status: StatusPresensi; note?: string }
  | { ok: false; reason: string };

// @db.Time / @db.Date: kirim Date yang komponen UTC-nya = jam/tanggal yang diinginkan,
// supaya tidak bergeser oleh timezone lokal server.
function toDateOnly(moment: Date) {
  return new Date(Date.UTC(moment.getFullYear(), moment.getMonth(), moment.getDate()));
}

function toTimeOnly(moment: Date) {
  return new Date(
    Date.UTC(1970, 0, 1, moment.getHours(), moment.getMinutes(), moment.getSeconds())
  );
}

function fmt(moment: Date) {
  // Nilai dari @db.Time dibaca Prisma sebagai 1970-01-01T<hh>:<mm>:<ss>Z,
  // jadi komponen yang benar adalah UTC — bukan lokal (server WIB akan geser +7).
  return moment.toISOString().slice(11, 19);
}

function timeToMinutes(t: Date): number {
  // t adalah 1970-01-01T<hh>:<mm>:<ss>Z — ambil jam:menit UTC
  return t.getUTCHours() * 60 + t.getUTCMinutes();
}

function calculateStatus(
  jamMasuk: Date,
  jamKeluar: Date | null,
  shiftJamMasuk: Date,
  shiftJamKeluar: Date,
  toleransiMenit: number
): StatusPresensi {
  const masuk = timeToMinutes(jamMasuk);
  const shiftMasuk = timeToMinutes(shiftJamMasuk);
  const shiftKeluar = timeToMinutes(shiftJamKeluar);

  // Keterlambatan: jam masuk > jam masuk shift + toleransi
  if (masuk > shiftMasuk + toleransiMenit) {
    return 'TERLAMBAT';
  }

  // Belum clock-out: jika jamKeluar null dan sekarang sudah lewat jam keluar shift
  // (ini dicek di query harian, bukan di recordPunch real-time)
  if (!jamKeluar) {
    return 'HADIR'; // status sementara, akan di-update lewat job/cron
  }

  // Clock-out sebelum jam keluar shift = PULANG_CEPAT
  const keluar = timeToMinutes(jamKeluar);
  if (keluar < shiftKeluar) {
    return 'PULANG_CEPAT';
  }

  return 'HADIR';
}

/**
 * Catat satu punch dari mesin.
 * status: "0" = check-in, "1" = check-out (konvensi ZKTeco ATTLOG).
 */
export async function recordPunch({
  pin,
  at,
  status,
}: {
  pin: string;
  at: Date;
  status: string;
}): Promise<PunchResult> {
  if (Number.isNaN(at.getTime())) return { ok: false, reason: `Waktu tidak valid: ${at}` };

  const pengguna = await prisma.pengguna.findUnique({
    where: { pin },
    select: { id: true, nama: true, jamMasuk: true, jamKeluar: true, toleransiMenit: true },
  });

  if (!pengguna) return { ok: false, reason: `PIN ${pin} tidak terdaftar` };

  // Fallback kalau user belum punya jam kerja di DB
  const shiftJamMasuk = pengguna.jamMasuk ?? toTimeOnly(new Date('1970-01-01T08:00:00Z'));
  const shiftJamKeluar = pengguna.jamKeluar ?? toTimeOnly(new Date('1970-01-01T17:00:00Z'));
  const toleransiMenit = pengguna.toleransiMenit ?? 15;

  const tanggalPresensi = toDateOnly(at);
  const jam = toTimeOnly(at);

  const existing = await prisma.presensi.findFirst({
    where: { idPengguna: pengguna.id, tanggalPresensi },
    select: { id: true, jamMasuk: true, jamKeluar: true, status: true },
  });

  // ---------- CHECK IN ----------
  if (status === '0') {
    if (existing) {
      // Punch kedua di hari yang sama: pertahankan jam masuk paling awal.
      if (existing.jamMasuk && existing.jamMasuk <= jam) {
        return {
          ok: true,
          action: 'CHECK_IN',
          nama: pengguna.nama,
          jam: fmt(existing.jamMasuk),
          status: existing.status,
          note: 'sudah check-in, jam masuk dipertahankan',
        };
      }
      // Jam baru lebih awal: update jamMasuk, hitung ulang status
      const newStatus = calculateStatus(jam, existing.jamKeluar, shiftJamMasuk, shiftJamKeluar, toleransiMenit);
      await prisma.presensi.update({
        where: { id: existing.id },
        data: { jamMasuk: jam, status: newStatus },
      });
      return { ok: true, action: 'CHECK_IN', nama: pengguna.nama, jam: fmt(jam), status: newStatus, note: 'jam masuk diperbarui' };
    }

    // Baru pertama kali check-in hari ini
    const newStatus = calculateStatus(jam, null, shiftJamMasuk, shiftJamKeluar, toleransiMenit);
    try {
      await prisma.presensi.create({
        data: {
          idPengguna: pengguna.id,
          tanggalPresensi,
          jamMasuk: jam,
          status: newStatus,
        },
      });
    } catch (error) {
      // Device retry paralel: unique constraint (idPengguna, tanggalPresensi) yang menahan.
      if ((error as { code?: string }).code === 'P2002') {
        return { ok: true, action: 'CHECK_IN', nama: pengguna.nama, jam: fmt(jam), status: newStatus, note: 'duplikat diabaikan' };
      }
      throw error;
    }
    return { ok: true, action: 'CHECK_IN', nama: pengguna.nama, jam: fmt(jam), status: newStatus };
  }

  // ---------- CHECK OUT ----------
  if (status === '1') {
    if (!existing) return { ok: false, reason: `PIN ${pin} belum check-in hari ini` };

    if (existing.jamKeluar && existing.jamKeluar >= jam) {
      return {
        ok: true,
        action: 'CHECK_OUT',
        nama: pengguna.nama,
        jam: fmt(existing.jamKeluar),
        status: existing.status,
        note: 'sudah check-out, jam keluar dipertahankan',
      };
    }

    // Update jamKeluar, hitung ulang status
    const newStatus = calculateStatus(existing.jamMasuk!, jam, shiftJamMasuk, shiftJamKeluar, toleransiMenit);
    await prisma.presensi.update({
      where: { id: existing.id },
      data: { jamKeluar: jam, status: newStatus },
    });
    return { ok: true, action: 'CHECK_OUT', nama: pengguna.nama, jam: fmt(jam), status: newStatus };
  }

  return { ok: false, reason: `Status punch tidak didukung: ${status}` };
}