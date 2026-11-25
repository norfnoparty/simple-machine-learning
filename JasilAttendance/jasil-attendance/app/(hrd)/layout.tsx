import React from 'react'
import Aside from '@/components/Aside'
import type { UserRole } from '@/types/sidebar'

export default function HRDlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
    <Aside userRole="hrd"/>
        <main className="pl-64 min-h-screen">
          {children}
        </main>
    </div>
  )
}

