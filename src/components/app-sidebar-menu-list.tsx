'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Collapsible } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Typography } from './common/typography'
const sidebarMenuButtonVariants = cva('', {
  variants: {
    active: {
      false: '',
      true: 'bg-[#7461cf] text-white hover:bg-[#7461cf]/90 hover:text-white'
    }
  }
})
const sidebarMenuIconVariants = cva('', {
  variants: {
    active: {
      false: 'stroke-black hover:stroke-black/90',
      true: 'stroke-white hover:stroke-white/90'
    }
  }
})

export function AppSidebarMenuList({
  items
}: {
  items: {
    title: string
    url: string
    icon: any
  }[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  // const SettingIcon = items[4].icon
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(item => (
          <Collapsible
            key={item.title}
            asChild
            // defaultOpen={item.isActive}
            className='group/collapsible'
          >
            <SidebarMenuItem>
              <SidebarMenuButton
                className={cn(
                  'h-[3rem] gap-3',
                  sidebarMenuButtonVariants({
                    active: pathname.includes(item.url)
                  })
                )}
                tooltip={item.title}
                onClick={() => router.push(item.url)}
              >
                <item.icon
                  className={cn(
                    'w-20 h-20',
                    sidebarMenuIconVariants({
                      active: pathname.includes(item.url)
                    })
                  )}
                />
                <Typography>{item.title}</Typography>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
