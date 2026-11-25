export interface DashboardData {
    dashboard: {
    clockIn: string;
    clockOut: string;
    lateMinutes: number;
    remainingLeave: number;
    totalLeave: number;
    overtimeSchedule: {
        date: string;
        time: string;
        desc: string;
        status: string;
    }
}}



export interface DashboardDataProps {
    dashboard: DashboardData [];
}
