import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

async function main() {
  console.log("🌱 Mulai seed database...");

  // 1️⃣ BUAT DEPARTEMEN
  const dept1 = await prisma.departemen.create({
    data: { nama: "IT & Development" },
  });

  const dept2 = await prisma.departemen.create({
    data: { nama: "Human Resources" },
  });

  const dept3 = await prisma.departemen.create({
    data: { nama: "Finance" },
  });

  console.log("✅ Departemen dibuat:", dept1.id, dept2.id, dept3.id);

  // 2️⃣ BUAT PENGGUNA (KARYAWAN)
  const hashPassword = async (pwd: string) => {
    return bcrypt.hash(pwd, 10);
  };

  const user1 = await prisma.pengguna.create({
      data: {
        nama: "Dimas Prasetyo",
        email: "dimas@jasil.com",
        password: await hashPassword("password123"),
        role: "EMPLOYEE",
        jabatan: "Software Engineer",
        idDepartemen: dept1.id,
        pin: '102',
        jamMasuk: new Date('1970-01-01T08:00:00Z'),
        jamKeluar: new Date('1970-01-01T17:00:00Z'),
        toleransiMenit: 15,
      },
    });

    const user2 = await prisma.pengguna.create({
      data: {
        nama: "Budi Santoso",
        email: "budi@jasil.com",
        password: await hashPassword("password123"),
        role: "EMPLOYEE",
        jabatan: "Frontend Developer",
        idDepartemen: dept1.id,
        pin: '103',
        jamMasuk: new Date('1970-01-01T08:00:00Z'),
        jamKeluar: new Date('1970-01-01T17:00:00Z'),
        toleransiMenit: 15,
      },
    });

    const user3 = await prisma.pengguna.create({
      data: {
        nama: "Siti Nurhaliza",
        email: "siti@jasil.com",
        password: await hashPassword("password123"),
        role: "EMPLOYEE" as Role,
        jabatan: "Backend Developer",
        idDepartemen: dept1.id,
        pin: '104',
        jamMasuk: new Date('1970-01-01T08:00:00Z'),
        jamKeluar: new Date('1970-01-01T17:00:00Z'),
        toleransiMenit: 15,
      },
    });

    // 3️⃣ BUAT HRD OFFICER
    const hrdUser = await prisma.pengguna.create({
      data: {
        nama: "Rini HRD Manager",
        email: "rini@jasil.com",
        password: await hashPassword("password123"),
        role: "HRD" as Role,
        jabatan: "HRD Manager",
        idDepartemen: dept2.id,
        pin: '105',
        jamMasuk: new Date('1970-01-01T08:00:00Z'),
        jamKeluar: new Date('1970-01-01T17:00:00Z'),
        toleransiMenit: 15,
      },
    });

    // 4️⃣ BUAT BOD (Board of Directors)
    const bodUser = await prisma.pengguna.create({
      data: {
        nama: "Direktur Utama",
        email: "direktur@jasil.com",
        password: await hashPassword("password123"),
        role: "BOD" as Role,
        jabatan: "Direktur",
        idDepartemen: dept1.id,
        pin: '106',
        jamMasuk: new Date('1970-01-01T08:00:00Z'),
        jamKeluar: new Date('1970-01-01T17:00:00Z'),
        toleransiMenit: 15,
      },
    });

  console.log("✅ Pengguna dibuat:", user1.id, user2.id, user3.id, hrdUser.id, bodUser.id);

  // 5️⃣ BUAT PRESENSI (ATTENDANCE) - Dummy data untuk hari ini & kemarin
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Hari ini - Dimas (sudah masuk jam 08:30)
  await prisma.presensi.create({
    data: {
      idPengguna: user1.id,
      tanggalPresensi: today,
      jamMasuk: new Date(today.getTime() + 8.5 * 60 * 60 * 1000), // 08:30
      jamKeluar: null, // Belum clock out
    },
  });

  // Hari ini - Budi (masuk 09:00, keluar 17:30)
  await prisma.presensi.create({
    data: {
      idPengguna: user2.id,
      tanggalPresensi: today,
      jamMasuk: new Date(today.getTime() + 9 * 60 * 60 * 1000), // 09:00
      jamKeluar: new Date(today.getTime() + 17.5 * 60 * 60 * 1000), // 17:30
    },
  });

  // Kemarin - Dimas (08:00 - 17:00)
  await prisma.presensi.create({
    data: {
      idPengguna: user1.id,
      tanggalPresensi: yesterday,
      jamMasuk: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000),
      jamKeluar: new Date(yesterday.getTime() + 17 * 60 * 60 * 1000),
    },
  });

  console.log("✅ Presensi dummy dibuat");

  // 6️⃣ BUAT CUTI REQUEST - Dummy
  await prisma.cutiIzin.create({
    data: {
      idPengguna: user1.id,
      jenisCutiIzin: "Annual Leave",
      tanggalMulai: new Date("2026-10-28"),
      tanggalSelesai: new Date("2026-10-30"),
      alasan: "Liburan keluarga",
      status: "PENDING",
    },
  });

  await prisma.cutiIzin.create({
    data: {
      idPengguna: user2.id,
      jenisCutiIzin: "Medical Leave",
      tanggalMulai: new Date("2026-10-29"),
      tanggalSelesai: new Date("2026-10-29"),
      alasan: "Sakit perut",
      status: "APPROVED",
    },
  });

  console.log("✅ Cuti dummy dibuat");

  // 7️⃣ BUAT LEMBUR REQUEST - Dummy
  await prisma.lembur.create({
    data: {
      idPengguna: user3.id,
      tanggalLembur: new Date("2026-10-26"),
      jamMulai: new Date("2026-10-26T18:00:00"),
      jamSelesai: new Date("2026-10-26T21:00:00"),
      deskripsi: "Urgent fix production bug",
      status: "PENDING",
    },
  });

  await prisma.lembur.create({
    data: {
      idPengguna: user1.id,
      tanggalLembur: new Date("2026-10-27"),
      jamMulai: new Date("2026-10-27T19:00:00"),
      jamSelesai: new Date("2026-10-27T22:00:00"),
      deskripsi: "Development sprint completion",
      status: "APPROVED",
    },
  });

  console.log("✅ Lembur dummy dibuat");

  console.log("🎉 Seed selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });