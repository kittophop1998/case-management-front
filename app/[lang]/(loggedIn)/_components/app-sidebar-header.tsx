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
          className=' data-[state=open]:text-sidebar-accent-foreground pointer-events-none'
        >
          {/* <SidebarTrigger asChild> */}
          {/* <div className='relative'> */}
          <Image
            src='/eaon-icon.png'
            alt='Case Management Icon'
            width={55}
            height={55}
            // className='size-10 object-cover rounded-sm cursor-pointer pointer-events-auto hover:opacity-80 hover:grayscale-40 grey group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:h-full duration-0'
            className='data-[state=open]:bg-sidebar-accent object-cover rounded-sm cursor-pointer pointer-events-auto hover:opacity-80 hover:grayscale-40 grey w-[2.718rem] h-[2.718rem] duration-0 mx-[0.35rem]'
            // 2.718
            onClick={() => {
              // if (isMobile) {
              toggleSidebar()
              // }
            }}
          />
          {/* hover:grayscale-75 hover:brightness-90 */}
          {/* <PanelLeftIcon className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60' color='#AEAEB2' size={30} /> */}
          {/* </div> */}
          {/* </SidebarTrigger> */}

          <div className='grid flex-1 text-left text-sm leading-tight'>
            {/* <span className=''></span> */}
            <span className='truncate'>
              <Typography className='font-bold text-[#45464E]' textStyle='poppins'>Case Management</Typography>
              {/* <Typography >Case Management</Typography> */}
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu >
  )
}
