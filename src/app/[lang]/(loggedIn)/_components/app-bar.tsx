'use client'

import Container from '@/components/common/containter'
import { Typography } from '@/components/common/typography'
import { Separator } from '@/components/ui/separator'
import HomeIcon from '@public/icons/Home.svg'
import { AppbarUserUI } from './app-bar-user-ui'
import { SwitchLanguage } from './switch-language'
import { Notification } from './notification'

export function AppBar () {
  return (
    <header className='bg-white shrink-0 items-center gap-2 transition-[width,height] ease-linear '>
      <Container className='flex justify-between items-center'>
        <Typography variant='h3' as='p'>
          Access Control
        </Typography>
        <div className='flex items-center gap-4 py-3'>
          <SwitchLanguage />
          <Notification />
          <AppbarUserUI />
        </div>
      </Container>
      <Separator />
      <Container className='flex gap-3 items-center py-1'>
        <HomeIcon className='inline-block w-4 h-4' />
        <Typography variant='caption' as='p'>
          /
        </Typography>
        <Typography variant='caption' as='p'>
          Access Control
        </Typography>
        {/* </div> */}
      </Container>
    </header>
  )
}
