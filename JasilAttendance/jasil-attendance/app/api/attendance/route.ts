import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const start = searchParams.get('start'); // YYYY-MM-DD
  const end = searchParams.get('end');     // YYYY-MM-DD

  if (!start || !end) {
    return NextResponse.json({ error: 'start, end required' }, { status: 400 });
  }

  // Ambil user dari JWT cookie (httpOnly)
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const pengguna = await prisma.pengguna.findUnique({
    where: { id: user.id },
    select: { id: true, nama: true, pin: true, jamMasuk: true, jamKeluar: true, toleransiMenit: true },
  });

  if (!pengguna) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const records = await prisma.presensi.findMany({
    where: {
      idPengguna: pengguna.id,
      tanggalPresensi: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
    orderBy: { tanggalPresensi: 'asc' },
    select: {
      tanggalPresensi: true,
      jamMasuk: true,
      jamKeluar: true,
      status: true,
    },
  });

  // Helper: format Date (1970-01-01T...Z) → "HH:mm"
  const fmtTime = (d: Date | null): string | null => {
    if (!d) return null;
    return d.toISOString().slice(11, 16);
  };

  const data = records.map((r) => ({
    tanggal: r.tanggalPresensi.toISOString().slice(0, 10),
    jamMasuk: fmtTime(r.jamMasuk),
    jamKeluar: fmtTime(r.jamKeluar),
    status: r.status,
  }));

  return NextResponse.json({
    user: { nama: pengguna.nama, pin: pengguna.pin },
    shift: {
      jamMasuk: fmtTime(pengguna.jamMasuk),
      jamKeluar: fmtTime(pengguna.jamKeluar),
      toleransiMenit: pengguna.toleransiMenit,
    },
    data,
  });
}