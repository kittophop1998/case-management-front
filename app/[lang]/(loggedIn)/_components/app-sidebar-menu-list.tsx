'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Collapsible } from '@/components/ui/collapsible'
import { Typography } from '@/components/common/typography'

import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'

import {
  navMain,
  path2sidebar
} from '@/const/title-path'

import { useGetMeQuery } from '@/features/authApiSlice'

import CaseManagementIcon from '@/public/icons/Case Management.svg'
import InquiryLogIcon from '@/public/icons/Inquiry Log.svg'
import ReportIcon from '@/public/icons/Report.svg'
import SettingIcon from '@/public/icons/Setting.svg'
import CustomerDashboardIcon from '@/public/icons/Customer Dashboard.svg'

// -----------------------------------------------------------------------------
// Variants
// -----------------------------------------------------------------------------

const sidebarMenuButtonVariants = cva('', {
  variants: {
    active: {
      false: '',
      true: 'bg-[#7461cf] text-white hover:bg-[#7461cf]/90 hover:text-white',
    },
  },
})

const sidebarMenuIconVariants = cva('', {
  variants: {
    active: {
      false: 'stroke-black hover:stroke-black/90',
      true: 'stroke-white hover:stroke-white/90',
    },
  },
})

// -----------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------

const title2icon: Record<string, React.ComponentType<any>> = {
  'Search Customer': CustomerDashboardIcon,
  'Case Management': CaseManagementIcon,
  'Report': ReportIcon,
  'Settings': SettingIcon,
  'User Management': SettingIcon,
  'Access Control': SettingIcon,
  'Queue Management': SettingIcon,
}

const getTitleFromPath = (pathSegments: string[]): string => {
  return (
    path2sidebar?.[`/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`] ||
    path2sidebar?.[`/${pathSegments[2]}/${pathSegments[3]}`] ||
    path2sidebar?.[`/${pathSegments[2]}`] ||
    path2sidebar['/']
  )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AppSidebarMenuList() {
  const { data: meApi } = useGetMeQuery()
  const me = useMemo(() => meApi?.data || null, [meApi])

  const [myPermissions, setMyPermissions] = useState<string[]>([])

  useEffect(() => {
    if (me?.permissions) {
      setMyPermissions(me.permissions.map((p: any) => p.key))
    }
  }, [me])

  const pathname = usePathname()
  const pathSegments = pathname.split('/')
  const currentTitle = getTitleFromPath(pathSegments)

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navMain.map(item => {
          // Permission Check
          if (item?.permission?.length) {
            const hasAccess = item.permission.some(p => myPermissions.includes(p))
            if (!hasAccess) return null
          }

          const isActive = currentTitle === item.title
          const Icon = title2icon[item.title]

          return (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    'h-[3rem] gap-3',
                    sidebarMenuButtonVariants({ active: isActive })
                  )}
                  tooltip={item.title}
                >
                  <Link href={`/th${item.url}`} prefetch={false}>
                    {Icon && (
                      <Icon
                        className={cn(
                          'w-20 h-20',
                          sidebarMenuIconVariants({ active: isActive })
                        )}
                      />
                    )}
                    <Typography>{item.title}</Typography>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
