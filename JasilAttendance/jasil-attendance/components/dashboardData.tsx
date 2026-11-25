import React from 'react'
import { DashboardDataProps } from '@/types/dashboardData'

export default function dashboardData({dashboard}: DashboardDataProps) {
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
    dashboardData
  )
}
