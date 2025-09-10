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
import { cn } from '@/lib/utils'

export function AppSidebarHeader() {
  const { isMobile, toggleSidebar } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className=' data-[state=open]:text-sidebar-accent-foreground pointer-events-none'
        >
          <Image
            src='/eaon-icon.png'
            alt='Case Management Icon'
            width={55}
            height={55}
            unoptimized
            className={cn('w-[2.718rem] h-[2.718rem] group-data-[collapsible=icon]:mx-[0.35rem]', 'pointer-events-auto hover:opacity-80 hover:grayscale-40', 'object-cover rounded-sm cursor-pointer   ')}
            onClick={() => {
              toggleSidebar()
            }}
          />
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate'>
              <Typography className='font-bold text-[#45464E]' textStyle='poppins'>Case Management</Typography>
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
