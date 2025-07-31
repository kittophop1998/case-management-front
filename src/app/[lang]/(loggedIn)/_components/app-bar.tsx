'use client'
import Container from '@/components/common/containter'
import { Typography } from '@/components/common/typography'
import { Separator } from '@/components/ui/separator'
import HomeIcon from '@public/icons/Home.svg'
import { AppbarUserUI } from './app-bar-user-ui'
import { SwitchLanguage } from './switch-language'
import { Notification } from './notification'


import { usePathname } from 'next/navigation'
import { path2clientpath, path2name } from '@/const/mockup'
import { cn } from '@/lib/utils'


const getTitle = (pathNameArr: string[]) => {
  return path2name?.[`/${pathNameArr[0]}/${pathNameArr[1]}/${pathNameArr[2]}`] || path2name?.[`/${pathNameArr[0]}/${pathNameArr[1]}`] || path2name?.[`/${pathNameArr[0]}`] || path2name['/']
}
const getClientPath = (pathNameArr: string[]) => {
  return path2clientpath?.[`/${pathNameArr[0]}/${pathNameArr[1]}/${pathNameArr[2]}`] || path2clientpath?.[`/${pathNameArr[0]}/${pathNameArr[1]}`] || path2clientpath?.[`/${pathNameArr[0]}`] || path2clientpath['/']
}
export function AppBar() {

  const pathname = usePathname()
  const pathNameArr = pathname.split('/')
  pathNameArr.shift();
  pathNameArr.shift();

  const title = getTitle(pathNameArr)
  const clientPath = getClientPath(pathNameArr)

  return (
    <header className='bg-white shrink-0 items-center gap-2 transition-[width,height] ease-linear '>
      <Container className='flex justify-between items-center'>
        <Typography variant='h3' as='p'>
          {title}
        </Typography>
        <div className='flex items-center gap-4 py-3'>
          <SwitchLanguage />
          <Notification />
          <AppbarUserUI />
        </div>
      </Container>
      <Separator />
      <Container className='flex gap-2 items-center py-1'>
        <HomeIcon className='inline-block w-4 h-4' />
        {/* <Typography variant='caption' as='p'>
          /
        </Typography> */}
        {/* <Typography variant='caption' as='p'>
          Access Control
        </Typography> */}
        {clientPath?.map((item, index) => (
          <>
            <Typography variant='caption' as='p'>
              /
            </Typography>
            <Typography key={index} variant='caption' as='p'>
              <span className={cn(!item.goto ? '' : 'text-blue-600 hover:underline cursor-pointer', '')}>{item.name}</span>
            </Typography>
          </>
        ))}
      </Container>
    </header>
  )
}
