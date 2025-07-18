'use client'

import { Separator } from '../ui/separator'
import { Typography } from '../atoms/typography'
import HomeIcon from '@public/icons/Home.svg'

export function UserAppBar () {
  return (
    <header className='bg-white shrink-0 items-center gap-2 transition-[width,height] ease-linear '>
      <div className='p-4'>
        <Typography variant='h3' as='p'>
          Access Control
        </Typography>
      </div>
      <Separator />
      <div className='px-4 flex gap-3 items-center py-1'>
        <HomeIcon className='inline-block w-4 h-4' />
        <Typography variant='caption' as='p'>
          /
        </Typography>
        <Typography variant='caption' as='p'>
          Access Control
        </Typography>
      </div>
    </header>
  )
}
