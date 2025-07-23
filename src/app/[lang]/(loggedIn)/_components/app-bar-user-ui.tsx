import Card from '@/components/common/card'
import { Typography } from '@/components/common/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Type } from 'react-feather'

interface UserAvatarProps {
  userUrl: string
  userName: string
}
const UserAvatar = ({ userUrl, userName }: UserAvatarProps) => {
  return (
    <Avatar className='h-[2.5rem] w-[2.5rem]'>
      <AvatarImage src={userUrl} />
      <AvatarFallback className='bg-primary/10'>
        {userName?.[0] ?? ''}
        {userName?.[1] ?? ''}
      </AvatarFallback>
    </Avatar>
  )
}

const PopupUserUI = () => {
  const userName = 'Phaphum Pattana'
  const userEmail = 'phaphump@aeon.co.th'
  const userUrl = 'https://github.com/shadcn.psng'
  const userRole = 'Supervisor'
  const userCenter = 'BKK'
  return (
    <div>
      <Typography>Profile</Typography>
      <div className='flex gap-3 py-3'>
        <UserAvatar userUrl={userUrl} userName={userName} />
        <div>
          <Typography>{userName}</Typography>
          <Typography variant='caption'>{userEmail}</Typography>
        </div>
        <div className='flex-1'></div>
        <Typography variant='caption'>
          {userRole}/{userCenter}
        </Typography>
      </div>
      <div className='flex justify-between'>
        <Button variant='link' className='px-0'>
          Reset Password
        </Button>
        <Button variant='outline'>Logout</Button>
      </div>
    </div>
  )
}

export const AppbarUserUI = () => {
  const userName = 'Phaphum Pattana'
  //   return <PopupUserUI />
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="outline">Open popover</Button> */}
        <div className='flex items-center gap-2'>
          <Avatar className='h-[2.5rem] w-[2.5rem]'>
            <AvatarImage src='https://github.com/shadcn.psng' />
            <AvatarFallback className='bg-primary/10'>
              {userName?.[0] ?? ''}
              {userName?.[1] ?? ''}
            </AvatarFallback>
          </Avatar>
          <Typography>{userName}</Typography>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[23rem]'>
        <PopupUserUI />
      </PopoverContent>
    </Popover>
  )
}
