import { LucideIcon } from "lucide-react";

export type UserRole = "employee" | "hrd" | "bod" ;

export type SidebarItem = {
  name: string;
  badge?: number; // Opsional, jika ada badge yang ingin ditampilkan
  href: string;
  icon: LucideIcon;
  section?: string; // Opsional jika kamu butuh penanda section
};

export type SidebarGroupType = {
  title?: string;     // Judul grup, misalnya "Main Menu" atau "Settings"
  items: SidebarItem[]; // Array yang berisi item-item di atas
};

export interface SidebarProps {
  groups?: SidebarGroupType[]; // Bisa kosong untuk halaman login
  userRole?: UserRole;
  userName?: string;
  userPin?: string | number;
}

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  section: string;
  badge?: number;
};

export interface NavConfig {
  section: string;
  items: NavItem[];
}