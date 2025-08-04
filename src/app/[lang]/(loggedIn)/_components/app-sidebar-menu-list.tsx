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
import { Typography } from '@/components/common/typography'
import { path2sidebar } from '@/const/title-path'
import { useGetMeQuery } from '@/features/auth/authApiSlice'
import { useEffect, useState } from 'react'
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
const mappingActive = (pathNameArr: string[]) => {
  return path2sidebar?.[`/${pathNameArr[2]}/${pathNameArr[3]}/${pathNameArr[4]}`] || path2sidebar?.[`/${pathNameArr[2]}/${pathNameArr[3]}`] || path2sidebar?.[`/${pathNameArr[2]}`] || path2sidebar['/']
}
export function AppSidebarMenuList({
  items
}: {
  items: {
    title: string
    url: string
    icon: any
  }[]
}) {
  const { data: me, isLoading: isLoadingGetMe } = useGetMeQuery()
  const [myPermissions, setMyPermissions] = useState<string[]>([])
  useEffect(() => {
    let myPermissions = []
    if (me?.role?.permissions) {
      for (const element of me?.role?.permissions || []) {
        myPermissions.push(element.key)
      }
      setMyPermissions(myPermissions)
      // setMyPermissions(me.data.permissions.map((p: any) => p.name))
    }
  }, [me])
  const router = useRouter()
  const pathname = usePathname()
  const pathNameArr = pathname.split('/')
  const title = mappingActive(pathNameArr)

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map(item => {
          if (item?.permission?.length) {
            const hasCommon = item.permission.some(item => myPermissions.includes(item));
            console.log('hasCommon', hasCommon, item.permission, myPermissions)
            if (!hasCommon) {
              return null
            }
          }
          return (
            <Collapsible
              key={item.title}
              asChild
              className='group/collapsible'
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  className={cn(
                    'h-[3rem] gap-3',
                    sidebarMenuButtonVariants({
                      // active: pathname.includes(item.url)
                      active: title === item.title

                    })
                  )}
                  tooltip={item.title}
                  onClick={() => router.push(item.url)}
                >
                  <item.icon
                    className={cn(
                      'w-20 h-20',
                      sidebarMenuIconVariants({
                        // active: pathname.includes(item.url)
                        active: title === item.title
                      })
                    )}
                  />
                  <Typography>
                    {item.title}
                    {/* {JSON.stringify(myPermissions)} */}
                    {/* {title === item.title ? 't':'f'} */}

                  </Typography>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
