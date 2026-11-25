import React from 'react'
import { UserRole } from '@/types/sidebar'
import Aside from '@/components/Aside'

export default function ManagerialLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pl-64 min-h-screen bg-background flex flex-col">
      <Aside userRole={'bod' as UserRole} />
      <main className="flex min-h-screen">
        {children}
      </main>
    </div>
  )
}