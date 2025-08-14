'use client'
import Container from '@/components/common/containter'
import { Typography } from '@/components/common/typography'
import { Separator } from '@/components/ui/separator'
import HomeIcon from '@/public/icons/Home.svg'
import { AppbarUserUI } from './app-bar-user-ui'
import { SwitchLanguage } from './switch-language'
import { Notification } from './notification'


import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { path2clientpath, path2name } from '@/const/title-path'
import { SidebarTrigger } from '@/components/ui/sidebar'


const getTitle = (pathArr: string[]) => {
  return path2name?.[`/${pathArr[2]}/${pathArr[3]}/${pathArr[4]}`] || path2name?.[`/${pathArr[2]}/${pathArr[3]}`] || path2name?.[`/${pathArr[2]}`] || path2name['/']
}
const getClientPath = (pathArr: string[]) => {
  return path2clientpath?.[`/${pathArr[2]}/${pathArr[3]}/${pathArr[4]}`] || path2clientpath?.[`/${pathArr[2]}/${pathArr[3]}`] || path2clientpath?.[`/${pathArr[2]}`] || path2clientpath['/']
}
export function AppBar() {

  const pathname = usePathname()
  const pathArr = pathname.split('/')
  const title = getTitle(pathArr)
  const clientPath = getClientPath(pathArr)

  return (
    <header className='bg-white shrink-0 items-center gap-2 transition-[width,height] ease-linear '>
      <Container className='flex items-center'>
        <SidebarTrigger className='block md:hidden' />
        <Typography variant='subH3Medium' as='p'>
          {title}
        </Typography>
        <div className='flex-1' />
        <div className='flex items-center gap-6 py-3'>
          <div className='flex items-center gap-2'>
            <SwitchLanguage />
            <Notification />
          </div>
          <AppbarUserUI />
        </div>
      </Container>
      <Separator />
      <Container className='flex gap-2 items-center py-1'>
        <HomeIcon className='inline-block w-4 h-4' />
        {clientPath?.map((item, index) => (
          <div className='flex gap-2' key={index}>
            <Typography variant='caption' as='p'>
              /
            </Typography>
            <Typography key={'title' + index} variant='caption' as='p'>
              <span className={cn(!item.goto ? '' : 'text-blue-600 hover:underline cursor-pointer', '')}>{item.name}</span>
            </Typography>
          </div>
        ))}
      </Container>
    </header>
  )
}
