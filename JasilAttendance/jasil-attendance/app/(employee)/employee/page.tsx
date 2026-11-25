'use client';

import useSWR from 'swr';
import { format } from 'date-fns';

export default function DashboardPage() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const firstDay = format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd');

  // API baca JWT dari cookie httpOnly secara otomatis — tidak perlu kirim PIN
  const { data, error, isLoading } = useSWR(
    `/api/attendance?start=${firstDay}&end=${today}`,
    (url) => fetch(url).then(r => r.json()),
    { refreshInterval: 60_000 }
  );

  if (isLoading) return <div className="loading">Memuat...</div>;
  if (error || data?.error === 'Unauthorized') return <div className="error">Silakan login ulang</div>;
  if (data?.error) return <div className="error">{data.error}</div>;

  // DEBUG: tampilkan raw data di console
  console.log('API response:', data);
  console.log('today:', today);

  // Konfigurasi data dashboard
  const todayRecord = data?.data?.find((d: { tanggal: string; jamMasuk: string; jamKeluar: string; status: string }) => d.tanggal === today);
  const jamMasuk = todayRecord?.jamMasuk ?? '--:--';
  const jamKeluar = todayRecord?.jamKeluar ?? '--:--';
  const status = todayRecord?.status ?? 'BELUM_ABSEN';
  const lateMinutes = todayRecord && status === 'TERLAMBAT'
  ? hitungLateMinutes(todayRecord.jamMasuk, data?.shift?.jamMasuk, data?.shift?.toleransiMenit ?? 15)
  : 0;


  return (
    <>
      <main className="flex-1 min-h-screen">
        <header className="top-header">
          <h1 className="page-title">Dashboard</h1>
          {/* Tombol notifikasi, avatar dsb bisa dipanggil dari sini */}
        </header>

        <div className="content-body">
          <div className="stats-grid">
            {/* Clock In Card */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Clock In Hari Ini</span>
              </div>
              <div className="stat-value">{jamMasuk}</div>
              <div className="status-badge warning">Terlambat {lateMinutes} menit</div>
            </div>

            {/* Clock Out Card */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Clock Out Hari Ini</span>
              </div>
              <div className="stat-value">{jamKeluar}</div>
              <div className="status-badge success">{status}</div>
            </div>

            {/* Kuota Cuti */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Sisa Kuota Cuti Tahunan</span>
              </div>
              <div className="quota-value">{} / {} Hari</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>

          {/* Jadwal Lembur */}
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">Jadwal Lembur Bulan Ini</h2>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Jam</th>
                  <th>Keterangan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>{}</td>
                    <td>{}</td>
                    <td>{}</td>
                    <td><span className="status-badge pending">Dijadwalkan</span></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

function hitungLateMinutes(jamMasuk: string, shiftMasuk: string, toleransi: number): number {
  const [h, m] = jamMasuk.split(':').map(Number);
  const [sh, sm] = shiftMasuk.split(':').map(Number);
  const masuk = h * 60 + m;
  const shift = sh * 60 + sm;
  return Math.max(0, masuk - shift - toleransi);
}