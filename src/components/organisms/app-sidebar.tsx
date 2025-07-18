'use client'
import * as React from 'react'
import { GalleryVerticalEnd, Settings2 } from 'lucide-react'

import { AppSidebarMenu } from '../molecules/app-sidebar-menu'
import { AppSidebarUserSection } from './app-sidebar-user-section'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Customer Dashboard',
      url: 'customer-dashboard',
      icon: GalleryVerticalEnd
    },
    {
      title: 'Case Management',
      url: '/case-management',
      icon: GalleryVerticalEnd
    },
    {
      title: 'Inquiry Log',
      url: '/inquiry-log',
      icon: GalleryVerticalEnd
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: GalleryVerticalEnd
    }
  ]
}

export function AppSidebar ({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <AppSidebarUserSection />
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarMenu items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
