'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Collapsible } from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { Typography } from '@/components/common/typography'
import { navMain, path2sidebar } from '@/const/title-path'
import { useGetMeQuery } from '@/features/auth/authApiSlice'
import { useEffect, useMemo, useState } from 'react'
import CaseManagementIcon from '@/public/icons/Case Management.svg'
import InquiryLogIcon from '@/public/icons/Inquiry Log.svg'
import ReportIcon from '@/public/icons/Report.svg'
import SettingIcon from '@/public/icons/Setting.svg'
import CustomerDashboardIcon from '@/public/icons/Customer Dashboard.svg'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

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


const title2icon: Record<string, React.ComponentType<any>> = {
  'Customer Dashboard': CustomerDashboardIcon,
  'Case Management': CaseManagementIcon,
  'Inquiry Log': InquiryLogIcon,
  Report: ReportIcon,
  Settings: SettingIcon,
  'User Management': SettingIcon,
  'Access Control': SettingIcon,
  'Queue Management': SettingIcon
}

function Items() {
  return <></>
}


export function AppSidebarMenuList({ }) {
  const { data: meApi, isLoading: isLoadingGetMe } = useGetMeQuery()
  const me = useMemo(() => meApi?.data || null, [meApi]);

  const [myPermissions, setMyPermissions] = useState<string[]>([])
  useEffect(() => {
    let myPermissions = []
    if (me?.permissions) {
      for (const element of me?.permissions || []) {
        myPermissions.push(element.key)
      }
      setMyPermissions(myPermissions)
    }
  }, [me])
  const pathname = usePathname()
  const pathNameArr = pathname.split('/')
  const title = mappingActive(pathNameArr)

  return (
    <SidebarGroup>
      <SidebarMenu>
        {/* <> */}
        {/* {isLoadingGetMe ?
            <>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => <> <Skeleton key={item} className='h-12 mb-[1px] w-full rounded-md' /></>)}

            </>
            :
            <> */}
        {
          navMain.map(item => {
            if (item?.permission?.length) {
              const hasCommon = item.permission.some(item => myPermissions.includes(item));
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
                    asChild
                    className={cn(
                      'h-[3rem] gap-3',
                      sidebarMenuButtonVariants({
                        active: title === item.title
                      })
                    )}
                    tooltip={item.title}
                  >
                    <Link href={`/th${item.url}`}
                      prefetch={false}
                    >
                      {/* {`/th${item.url}`} */}
                      {(() => {
                        const Icon = title2icon[item.title]
                        return (
                          <Icon
                            className={cn(
                              'w-20 h-20',
                              sidebarMenuIconVariants({ active: title === item.title })
                            )}
                          />
                        )
                      })()}
                      <Typography>
                        {item.title}
                      </Typography>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Collapsible>
            )
          })
        }

        {/* </>
          } */}

        {/* </> */}
      </SidebarMenu>
    </SidebarGroup>
  )
}
