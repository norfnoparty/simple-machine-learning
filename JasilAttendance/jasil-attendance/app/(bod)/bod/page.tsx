import React from 'react'
import { UserRole } from '@/types/sidebar'
import { TriangleAlert, FileText, ClockAlert, Check } from "lucide-react";


export default function BODPage() {
 const dashboardData = {
    clockIn: "08:24",
    clockOut: "17:05",
    lateMinutes: 24,
    remainingLeave: 9,
    totalLeave: 12,
    overtimeSchedule: [
      { date: "12 Sep 2026", time: "17:00 - 19:00", desc: "Server Migration", status: "Dijadwalkan" },
      { date: "15 Sep 2026", time: "17:00 - 20:00", desc: "Data Backup", status: "Dijadwalkan" },
    ],
  };

  return (
    <>
      <main className="flex-1 min-h-screen">
        <header className="top-header">
          <h1 className="page-title">Overview</h1>
        </header>
        {/* Absensi Pribadi */}
        <div className="content-body">
          {/* Taro content nya disini */}
          <div className="stats-grid">
            {/* Clock in card */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Clock In Hari Ini</span>
              </div>
              <div className="stat-value">{dashboardData.clockIn}</div>
              <div className="status-badge success">Tepat Waktu</div>
            </div>

            {/* Clock out card */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Clock Out Hari Ini</span>
              </div>
              <div className="stat-value">{dashboardData.clockOut}</div>
              <div className="status-badge warning"> Terlambat {dashboardData.lateMinutes} menit</div>
            </div>

            {/* Kuota cuti card */}
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Sisa Kuota Cuti Tahunan</span>
              </div>
              <div className="quota-value">{dashboardData.remainingLeave} / {dashboardData.totalLeave} Hari</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: "75%" }}></div>
              </div>
            </div>
          </div>
            
          {/* Overview Monitoring */}
            <div className="stats-grid">
              {/* Total Karyawan Hadir */}
              <div className="stat-card">
                <div className="stat-header flex items-center justify-between">
                  <span className="stat-label">Total Karyawan Hadir Hari Ini</span>
                  <Check className="text-green-500 w-6 h-6" />
                </div>
                <div className="stat-value">10</div>
                <span className="stat-label">Dari 10 Karyawan</span>
              </div>
              {/* Total Karyawan Terlambat */}
              <div className="stat-card">
                <div className="stat-header flex items-center justify-between">
                  <span className="stat-label"> Terlambat Hari Ini</span>
                  <ClockAlert className="text-red-500 w-6 h-6" />
                </div>
                <div className="stat-value">2</div>
                <span className="stat-label">Dari 10 Karyawan</span>
              </div>
            {/* Total Izin & Cuti */}
              <div className="stat-card">
                <div className="stat-header flex items-center justify-between">
                  <span className="stat-label"> Izin & Cuti Hari Ini</span>
                  <FileText className="text-green-500 w-6 h-6" />
                </div>
                <div className="stat-value">2</div>
                <span className="stat-label">Dari 10 Karyawan</span>
              </div>

            {/* Pending Approval */}
              <div className="stat-card">
                <div className="stat-header flex items-center justify-between">    
                  <span className="stat-label"> Pending Approval</span>
                  <TriangleAlert className="text-orange-500 w-6 h-6" />
                </div>
                <div className="stat-value">2</div>
                <span className="stat-label">Dari 10 Karyawan</span>
              </div>
            </div>            
          </div> 
      </main>
    </>
  )
}