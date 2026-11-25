// app/api/biometric/iclock/cdata/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json(); // ZKTeco kirim JSON

    // Log untuk debugging
    console.log('📱 Biometric payload:', JSON.stringify(payload, null, 2));

    // Handle format ZKTeco (bisa beda tergantung firmware)
    // Contoh format yang umum:
    // { "pin": "102", "deviceId": "K40-001", "time": "2026-10-20 08:30:00", "type": "0" }

    const { pin, deviceId, time, type } = payload;

    if (!pin || !time) {
      return NextResponse.json({ error: 'Pin atau time kosong' }, { status: 400 });
    }

    // Cari user berdasarkan PIN (asumsi: PIN = id pengguna atau field terpisah)
    const user = await prisma.pengguna.findFirst({
      where: { id: parseInt(pin) } // Atau where: { pin: pin } kalau ada field pin
    });

    if (!user) {
      console.log(`❌ User dengan PIN ${pin} tidak ditemukan`);
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    const timestamp = new Date(time);
    const dateOnly = new Date(timestamp);
    dateOnly.setHours(0, 0, 0, 0);

    if (type === '0' || type === 'check_in') {
      // CHECK-IN
      const existing = await prisma.presensi.findFirst({
        where: { idPengguna: user.id, tanggalPresensi: dateOnly }
      });

      if (existing) {
        return NextResponse.json({ message: 'Sudah check-in hari ini' }, { status: 200 });
      }

      await prisma.presensi.create({
        data: {
          idPengguna: user.id,
          tanggalPresensi: dateOnly,
          jamMasuk: timestamp,
        }
      });

      return NextResponse.json({ success: true, message: 'Check-in recorded' }, { status: 201 });
    }
    else if (type === '1' || type === 'check_out') {
      // CHECK-OUT
      const presensi = await prisma.presensi.findFirst({
        where: { idPengguna: user.id, tanggalPresensi: dateOnly, jamKeluar: null }
      });

      if (!presensi) {
        return NextResponse.json({ error: 'Belum check-in hari ini' }, { status: 400 });
      }

      await prisma.presensi.update({
        where: { id: presensi.id },
        data: { jamKeluar: timestamp }
      });

      return NextResponse.json({ success: true, message: 'Check-out recorded' }, { status: 200 });
    }

    return NextResponse.json({ error: 'Type tidak valid' }, { status: 400 });

  } catch (error) {
    console.error('Biometric error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}