'use client'

import {
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { AppBar } from './_components/app-bar'
import { useEffect, useState } from 'react'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {//md
        setOpen(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return (
    <div>
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <AppSidebar />
        <SidebarInset className='bg-[#f4f5fa]'>
          <AppBar />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
