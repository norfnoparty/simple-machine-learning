import { createRequire } from 'node:module';
const require = createRequire('C:/Code/JasilAttendance/jasil-attendance/package.json');
const { recordPunch } = require('./lib/attendance.ts');
const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

const D = '2026-12-20';
const hari = new Date(D);

// Bersihkan dulu
await p.presensi.deleteMany({ where: { tanggalPresensi: hari } });

console.log('=== Test 1: Check-in tepat waktu 08:00 (harus HADIR) ===');
const r1 = await recordPunch({ pin: '102', at: new Date(`${D}T08:00:00`), status: '0' });
console.log(JSON.stringify(r1, null, 2));

console.log('\n=== Test 2: Check-in terlambat 08:20 (harus TERLAMBAT, toleransi 15 menit) ===');
const r2 = await recordPunch({ pin: '103', at: new Date(`${D}T08:20:00`), status: '0' });
console.log(JSON.stringify(r2, null, 2));

console.log('\n=== Test 3: Check-in 08:10 (dalam toleransi, harus HADIR) ===');
const r3 = await recordPunch({ pin: '104', at: new Date(`${D}T08:10:00`), status: '0' });
console.log(JSON.stringify(r3, null, 2));

console.log('\n=== Test 4: Check-out 17:00 ===');
const r4 = await recordPunch({ pin: '102', at: new Date(`${D}T17:00:00`), status: '1' });
console.log(JSON.stringify(r4, null, 2));

// Cek DB
console.log('\n=== DB snapshot ===');
const rows = await p.presensi.findMany({ where: { tanggalPresensi: hari }, include: { pengguna: { select: { pin: true, nama: true } } } });
for (const r of rows) {
  console.log(`${r.pengguna.pin} ${r.pengguna.nama}: status=${r.status}, in=${r.jamMasuk.toISOString().slice(11,19)}, out=${r.jamKeluar?.toISOString().slice(11,19) ?? '-'}`);
}

await p.$disconnect();
