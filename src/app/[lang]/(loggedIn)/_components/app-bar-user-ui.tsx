import Card from '@/components/common/card'
import { Typography } from '@/components/common/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Type } from 'react-feather'
import { useRouter } from 'next/navigation'
import { useGetMeQuery, useLogoutMutation } from '@/features/auth/authApiSlice'
import { UserProfileType } from '@/types/user.type'

interface UserAvatarProps {
  userUrl: string
  username: string
}
const UserAvatar = ({ userUrl, username }: UserAvatarProps) => {
  return (
    <Avatar className='h-[2.5rem] w-[2.5rem]'>
      <AvatarImage src={userUrl} />
      <AvatarFallback className='bg-primary/10'>
        {username?.[0] ?? ''}
        {username?.[1] ?? ''}
      </AvatarFallback>
    </Avatar>
  )
}

const PopupUserUI = ({ user }: { user: UserProfileType }) => {
  const [logoutMutation, { isLoading: isLoadingLogout, isError: isLogoutError, error: logoutError }] = useLogoutMutation();

  const router = useRouter()
  const username = user.name ?? 'Unknown User'
  const userEmail = user.email ?? 'Unknown Email'
  const userUrl = ''
  const userRole = user.role?.name ?? 'Unknown Role'
  const userCenter = user.center?.name ?? 'Unknown Center'

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
  return (
    <div>
      <Typography>Profile</Typography>
      <div className='flex gap-3 py-3'>
        <UserAvatar userUrl={userUrl} username={username} />
        <div>
          <Typography>{username}</Typography>
          <Typography variant='caption'>{userEmail}</Typography>
        </div>
        <div className='flex-1'></div>
        <Typography variant='caption'>
          {userRole}/{userCenter}
        </Typography>
      </div>
      <div className='flex justify-between'>
        {/* <Button variant='link' className='px-0'>
          Reset Password
        </Button> */}
        <div></div>
        <Button variant='outline' onClick={handleLogout} disabled={isLoadingLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

export const AppbarUserUI = () => {
  const { data: me, isLoading: isLoadingGetMe, refetch: refetchMe, isError: isGetMeError } = useGetMeQuery()
  if (!me) return null
  // const me: UserProfileType = data
  const username = me?.name ?? 'Unknown User'
  //   return <PopupUserUI />
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="outline">Open popover</Button> */}
        <div className='flex items-center gap-2'>
          <Avatar className='h-[2.5rem] w-[2.5rem]'>
            <AvatarImage src='https://github.com/shadcn.psng' />
            <AvatarFallback className='bg-primary/10'>
              {username?.[0] ?? ''}
              {username?.[1] ?? ''}
            </AvatarFallback>
          </Avatar>
          <Typography>{username}</Typography>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[23rem] mx-2'>
        <PopupUserUI user={me} />
      </PopoverContent>
    </Popover>
  )
}
