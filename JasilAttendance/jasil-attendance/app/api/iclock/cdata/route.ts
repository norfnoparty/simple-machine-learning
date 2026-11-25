import { prisma } from '@/lib/prisma';
import { recordPunch } from '@/lib/attendance';
import { NextRequest, NextResponse } from 'next/server';

/**
 * ZKTeco ADMS push protocol (plain text, bukan JSON).
 *
 * Handshake:
 *   GET /iclock/cdata?SN=xxx&options=all&pushver=2.2.14
 *   -> "GET OPTION FROM: xxx\nStamp=...\nOpStamp=..."  (minimal: OK)
 *
 * Push attendance:
 *   POST /iclock/cdata?SN=xxx&table=ATTLOG&Stamp=9999
 *   body: PIN \t YYYY-MM-DD HH:mm:ss \t status \t verify \t workcode \t ... \r\n
 *         (bisa banyak baris sekaligus)
 *   -> "OK: <jumlah baris diterima>"
 *
 * status: 0 = check-in, 1 = check-out
 */

const DEVICE_ID = 'K40-PRO';

export async function GET(req: NextRequest) {
  const sn = req.nextUrl.searchParams.get('SN') ?? 'unknown';
  const options = req.nextUrl.searchParams.get('options');

  if (options) {
    // Handshake: device menanyakan konfigurasi. Balas minimal supaya device mau push.
    return new NextResponse(`GET OPTION FROM: ${sn}\nStamp=9999\nOpStamp=9999\nErrorDelay=30\nDelay=10\nTransFlag=1111000000\nRealtime=1\nEncrypt=0\n`, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Device polling: tidak ada command yang perlu dikirim.
  return new NextResponse('OK', { headers: { 'Content-Type': 'text/plain' } });
}

export async function POST(req: NextRequest) {
  const sn = req.nextUrl.searchParams.get('SN') ?? DEVICE_ID;
  const table = req.nextUrl.searchParams.get('table');
  const raw = await req.text();

  if (table && table.toUpperCase() !== 'ATTLOG') {
    // OPERLOG, ATTPHOTO, dll: terima tapi jangan proses.
    await prisma.webhookLog.create({
      data: { deviceId: sn, payload: { table, raw: raw.slice(0, 2000) }, status: 'IGNORED', processedAt: new Date() },
    });
    return new NextResponse('OK', { headers: { 'Content-Type': 'text/plain' } });
  }

  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  let accepted = 0;
  const errors: string[] = [];

  for (const line of lines) {
    const cols = line.split('\t');
    const [pin, waktu, status] = cols;

    if (!pin || !waktu || status === undefined) {
      errors.push(`kolom kurang: ${line.slice(0, 80)}`);
      continue;
    }

    // "2026-10-20 08:30:00" -> Date (dibaca sebagai waktu lokal server)
    const at = new Date(waktu.replace(' ', 'T'));

    try {
      const result = await recordPunch({ pin: pin.trim(), at, status: status.trim() });
      if (result.ok) accepted++;
      else errors.push(result.reason);
    } catch (error) {
      errors.push(`PIN ${pin}: ${(error as Error).message}`);
    }
  }

  await prisma.webhookLog.create({
    data: {
      deviceId: sn,
      payload: { table: table ?? 'ATTLOG', raw: raw.slice(0, 2000), accepted, errors },
      status: errors.length === 0 ? 'SUCCESS' : accepted > 0 ? 'PARTIAL' : 'ERROR',
      errorMessage: errors.length ? errors.join('; ').slice(0, 1000) : null,
      processedAt: new Date(),
    },
  });

  // Device menganggap push gagal kalau balasan bukan "OK: n".
  return new NextResponse(`OK: ${accepted}`, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
