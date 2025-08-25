'use client'

import {
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { AppBar } from './_components/app-bar'
import { Suspense, useEffect, useState } from 'react'
import LoadingPage from '@/components/loading-page'

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
          <Suspense fallback={<LoadingPage />}>
            {children}
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
