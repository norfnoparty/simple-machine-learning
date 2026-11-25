"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { RefreshCw } from "lucide-react";

// Komponen UI dari project

export default function RiwayatPage() {
  // State untuk data riwayat (akan di-load dari API atau state local dulu)
    const [riwayat, setRiwayat] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fungsi load data (placeholder dulu)
    const loadRiwayat = async () => {
        setIsLoading(true);
        // TODO: Panggil API /api/attendance/riwayat nanti
        // const res = await fetch("/api/attendance/riwayat");
        // const data = await res.json();
        // setRiwayat(data);
        setIsLoading(false);
    };

    // Load data saat komponen mount
    useEffect(() => {
        loadRiwayat();
    }, []);

    const dashboardData ={
        historySchedule: [
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
            {date: "12 Sep 2026", checkin:"08.02", checkout:"17.00", status:"tepat waktu", durasi:"24 Menit"},
        ],
    };

    return (
    <>
    <main className="flex-1 min-h-screen">
        <header className="top-header">
            <h1 className="page-title">Riwayat Absensi</h1>
        </header>
        <div className="content-body">
            <div className="stats-grid">
                <div className="section-card">
                    <div className="section-header">
                        <h2 className="section-title items-center">Riwayat</h2>
                    </div>
                    <table className="data-table">
                    <thead>
                        <tr>
                            <th>Tanggal</th>
                            <th>Check In</th>
                            <th>Check In</th>
                            <th>Status</th>
                            <th>Durasi Telat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dashboardData.historySchedule.map((item, i) => (
                        <tr key={i}>
                            <td>{item.date}</td>
                            <td>{item.checkin}</td>
                            <td>{item.checkout}</td>
                            <td><span className="status-badge success">Tepat waktu</span></td>
                            <td>{item.durasi}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>

                </div>
            </div>
        </div>
    </main>     
    </>
    );
}