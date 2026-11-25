"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, ClipboardList, User, Activity, CheckSquare, Clock, LogOut, Eye, ChartNoAxesCombined, FileUp} from "lucide-react";
import { SidebarProps } from "@/types/sidebar";
import { NavItem, UserRole } from "@/types/sidebar";
import { useState } from "react";

export default function Sidebar({ userRole = "employee", userName = "Riyadh", userPin = "101" }: SidebarProps) {
  const [loading, setLoading] = useState(false);
  
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: 'POST'
      });
      // Kalo berhasil langung redirect ke login
      window.location.href = '/login'

    } catch (error) {
      console.error('Logout error: ', error);
    } finally {
      setLoading(false);
    }
  } 

  const pathname = usePathname();

  // Konfigurasi menu per role (sesuai prototipe)
  const navConfigs: Record<UserRole, { section: string; items: NavItem[] }[]> = {
    employee: [
      {
        section: "Menu Utama", 
      items: [
        { name: "Dashboard", href: "/employee", icon: Home, section: "Menu Utama" },
        { name: "Riwayat Absensi", href: "/employee/riwayat", icon: ClipboardList, section: "Menu Utama" },
        { name: "Cuti & Izin", href: "/employee/cuti", icon: User, section: "Menu Utama" },
        { name: "Jadwal Lembur", href: "/employee/lembur", icon: Clock, section: "Menu Utama" },
        { name: "Profil Saya", href: "/employee/profil", icon: User, section: "Akun" }
      ]
  
      },
    ],
    hrd: [
      {
        section: "Menu Utama",
        items: [
        { name: "Overview", href: "/hrd", icon: Activity, section: "Dashboard" },
        { name: "Data Karyawan", href: "/hrd/karyawan", icon: User, section: "Dashboard" },
        { name: "Live Monitoring", href: "/hrd/live", icon: Eye, section: "Kehadiran" },
        { name: "Analitik & Tren", href: "/hrd/analitik", icon: ChartNoAxesCombined, section: "Kehadiran" },
        { name: "Persetujuan", href: "/hrd/approval", icon: CheckSquare, section: "Manajemen" },
        { name: "Ploting Lembur", href: "/hrd/lembur", icon: Clock, section: "Manajemen" },
        { name: "Export Laporan", href: "/hrd/laporan", icon: FileUp, section: "Manajemen" },
        ]
      }
    ],
    bod: [
      {
        section: "Menu Utama",
        items: [
          { name: "Overview", href: "/bod", icon: Activity, section: "Dashboard" },
          { name: "Live Monitoring", href: "/bod/live", icon: Eye, section: "Tim Saya" },
          { name: "Analitik & Tren", href: "/bod/analitik", icon: ChartNoAxesCombined, section: "Tim Saya" },
          { name: "Lembur", href: "/bod/lembur", icon: Clock, section: "Tim Saya" },
          { name: "Profil Saya", href: "/bod/profil", icon: User, section: "Akun" }

        ]
      }
    ],
  };


  return (
    <aside className="w-64 h-screen bg-slate-50 border-r border-slate-200 flex flex-col justify-between p-4 fixed left-0 top-0 z-40 text-slate-700">
      <div className="space-y-1">
        <div className="flex items-center justify-center p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img src="/jasil-logo.png" alt="Logo Jasil" width={150} height={32} />
          </Link>
        </div>

        <div className="bg-slate-100 border border-slate-200/80 rounded-2xl p-3 flex items-center gap-2">
          <div className="space-y-0.5 overflow-hidden">
            <h4 className="text-sm font-bold text-slate-900 truncate">
              {userName}
            </h4>
            <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              {userRole} - PIN: {userPin}
            </p>
          </div>
        </div>

        <nav className="space-y-6">
                  {navConfigs[userRole].map((group, idx) => (
                    <div key={idx} className="space-y-2">
                      <h5 className="text-[11px] font-bold text-slate-400 tracking-wider px-3">
                        {group.section}
                      </h5>
                      <div className="space-y-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                                isActive ? "bg-[#cc0000] !text-white shadow-md shadow-red-500/20" : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                              )}
                            >
                              <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-500")} />
                              {item.name}{item.badge && <span className="nav-badge"> {item.badge} </span>}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>
      </div>

      <div className="space-y-3 pt-4 border-t border-slate-200/60">
        <button 
          type="button"
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all"
          onClick={handleLogout}
          disabled={loading}
        >
          <LogOut className="w-4 h-4 text-slate-400" />
          {loading ? "Keluar...": 'Logout' }
        </button>
      </div>
    </aside>
  );
}
