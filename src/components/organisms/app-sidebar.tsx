'use client'
import * as React from 'react'
import { GalleryVerticalEnd, Settings2 } from 'lucide-react'

import { AppSidebarMenuList } from './app-sidebar-menu-list'
import { AppSidebarUserSection } from './app-sidebar-user-section'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import CaseManagementIcon from '@public/icons/Case Management.svg'
import InquiryLogIcon from '@public/icons/Inquiry Log.svg'
import ReportIcon from '@public/icons/Report.svg'
import SettingIcon from '@public/icons/Setting.svg'
import CustomerDashboardIcon from '@public/icons/Customer Dashboard.svg'

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
      icon: CustomerDashboardIcon
    },
    {
      title: 'Case Management',
      url: '/case-management',
      icon: CaseManagementIcon
    },
    {
      title: 'Inquiry Log',
      url: '/inquiry-log',
      icon: InquiryLogIcon
    },
    {
      title: 'Report',
      url: '/report',
      icon: ReportIcon
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: SettingIcon
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
        <AppSidebarMenuList items={data.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
