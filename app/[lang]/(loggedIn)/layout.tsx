'use client'

import {
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar'
import { AppSidebar } from './_components/app-sidebar'
import { AppBar } from './_components/app-bar'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <SidebarProvider>
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
