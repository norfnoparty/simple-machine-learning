// app/(employee)/layout.tsx
import { ReactNode } from "react";
import { UserRole } from "@/types/sidebar";
import Aside from "@/components/Aside";


export default function EmployeeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
    <Aside userRole="employee" userName="Dimas Prasetyo" userPin="102" />
    <main className="pl-64 min-h-screen">
            {children}   
    </main>
    </div>
  );
}