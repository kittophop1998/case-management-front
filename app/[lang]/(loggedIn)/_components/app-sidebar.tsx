import * as React from 'react'

import { AppSidebarMenuList } from './app-sidebar-menu-list'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { AppSidebarHeader } from './app-sidebar-header'



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <>
      <Sidebar collapsible='icon' {...props}>
        <SidebarHeader>
          <AppSidebarHeader />
        </SidebarHeader>
        <SidebarContent className='mt-6'>
          <AppSidebarMenuList />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
