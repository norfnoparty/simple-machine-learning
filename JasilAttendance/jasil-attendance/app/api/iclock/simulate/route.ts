import { recordPunch } from '@/lib/attendance';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Simulasi data masuk dari mesin ZKTeco — untuk testing tanpa device fisik.
 *
 * POST /api/iclock/simulate
 * { "pin": "102", "time": "2026-10-20 08:30:00", "status": "0" }
 *
 * status: "0" check-in, "1" check-out.
 * Tidak dipakai device asli (device kirim tab-separated ke /api/iclock/cdata).
 */
export async function POST(req: NextRequest) {
  let body: { pin?: string; time?: string; status?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Body harus JSON' }, { status: 400 });
  }

  const { pin, time, status } = body;

  if (!pin || !time || status === undefined) {
    return NextResponse.json(
      { error: 'pin, time, dan status wajib diisi' },
      { status: 400 }
    );
  }

  const at = new Date(time.includes('T') ? time : time.replace(' ', 'T'));

  try {
    const result = await recordPunch({ pin: String(pin), at, status: String(status) });

    await prisma.webhookLog.create({
      data: {
        deviceId: 'SIMULATE',
        payload: { pin, time, status },
        status: result.ok ? 'SUCCESS' : 'ERROR',
        errorMessage: result.ok ? null : result.reason,
        processedAt: new Date(),
      },
    });

    if (!result.ok) {
      return NextResponse.json({ success: false, error: result.reason }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      action: result.action,
      nama: result.nama,
      jam: result.jam,
      status: result.status,
      note: result.note,
    });
  } catch (error) {
    await prisma.webhookLog.create({
      data: {
        deviceId: 'SIMULATE',
        payload: { pin, time, status },
        status: 'ERROR',
        errorMessage: (error as Error).message,
        processedAt: new Date(),
      },
    });
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
