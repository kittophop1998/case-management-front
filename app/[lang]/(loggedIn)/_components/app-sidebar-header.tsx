'use client'

import Image from 'next/image'
import * as React from 'react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar'
import { Typography } from '@/components/common/typography'

export function AppSidebarHeader() {
  const { isMobile, toggleSidebar } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground pointer-events-none'
        >
          {/* <SidebarTrigger asChild> */}
          <Image
            src='/eaon-icon.png'
            alt='Case Management Icon'
            width={55}
            height={55}
            className='size-10 object-cover rounded-sm cursor-pointer pointer-events-auto'
            onClick={() => {
              // if (isMobile) {
              toggleSidebar()
              // }
            }}
          />
          {/* </SidebarTrigger> */}

          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>{/*  */}</span>
            <span className='truncate'>
              <Typography>Case Management</Typography>
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
