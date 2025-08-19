'use client'

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { AppBar } from './_components/app-bar'
import { useEffect, useState } from 'react'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [open, setOpen] = useState(false)
  const [open, setOpen] = useState(true)
  // When screen resizes, default to closed if below md
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
          {/* <div className='w-full h-full'>{children}</div> */}
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
