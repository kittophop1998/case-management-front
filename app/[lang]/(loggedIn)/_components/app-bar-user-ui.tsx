import Card from '@/components/common/card'
import { Typography } from '@/components/common/typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Type } from 'react-feather'
import { useRouter } from 'next/navigation'
import { useGetMeQuery, useLogoutMutation, authApiSlice } from '@/features/auth/authApiSlice'
import { UserProfileType } from '@/types/user.type'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AvatarUser } from '@/components/user/avatar'

const PopupUserUI = ({ user }: { user: UserProfileType }) => {
  const dispatch = useDispatch()
  const [logoutMutation, { isLoading: isLoadingLogout, isError: isLogoutError, error: logoutError }] = useLogoutMutation();
  const router = useRouter()
  const name = user.name ?? 'Unknown User'
  const userEmail = user.email ?? 'Unknown Email'
  const userUrl = ''
  const userRole = user.role?.name ?? 'Unknown Role'
  const userCenter = user.center?.name ?? 'Unknown Center'

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap()
      await dispatch(authApiSlice.util.resetApiState())

      // await refetchMe()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }
  return (
    <div>
      <Typography>Profile</Typography>
      <div className='flex gap-3 py-3'>
        <AvatarUser img={userUrl} />
        <div>
          <Typography>{name}</Typography>
          <Typography variant='caption'>{userEmail}</Typography>
        </div>
        <div className='flex-1'></div>
        <Typography variant='caption'>
          {userRole}/{userCenter}
        </Typography>
      </div>
      <div className='flex justify-between'>
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
  const name = me?.name ?? 'Unknown User'
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* <Button variant="outline">Open popover</Button> */}
        <div className='flex items-center gap-2'>
          <AvatarUser size='2' />
          <Typography>{name}</Typography>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[23rem] mx-2'>
        <PopupUserUI user={me} />
      </PopoverContent>
    </Popover>
  )
}
