// lib/attendance-api.ts
export async function fetchAttendance(pin: string, start: string, end: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/attendance?pin=${pin}&start=${start}&end=${end}`, {
    cache: 'no-store', // atau 'force-cache' + revalidate
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}