import { Typography } from '@/components/common/typography'
import { Button } from '@/components/common/Button'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useRouter } from 'next/navigation'
import { useGetMeQuery, useLogoutMutation, authApiSlice } from '@/features/auth/authApiSlice'
import { UserProfileType } from '@/types/user.type'
import { useDispatch } from 'react-redux'
import { useMemo, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { BtnClose } from '@/components/button/btn-close'
import Image from 'next/image'
import usePermission from '@/hooks/use-permission'

const PopupUserUI = ({ user, onClose }: { user: UserProfileType, onClose: () => void }) => {
  const dispatch = useDispatch()
  const [logoutMutation, { isLoading: isLoadingLogout, isError: isLogoutError, error: logoutError }] = useLogoutMutation();
  const router = useRouter()
  const name = user.name ?? 'Unknown User'
  const userEmail = user.email ?? 'Unknown Email'
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
    <div className='w-[clamp(300px,100%,423px)]'>
      <div className='flex justify-between'>
        <Typography variant='subH3Medium'>Profile</Typography>
        <BtnClose onClick={onClose} />
      </div>
      <div className='flex gap-3 py-3'>
        {/* <AvatarUser img={userUrl} /> */}
        <Image
          src="/placeholder-user-img-colorfull.png"
          alt="placeholder-user-img-colorfull.png"
          className="object-cover mx-auto"
          width={40}
          height={40}
        />
        <div className='flex-1'>
          <Typography variant='body2'>{name}</Typography>
          <div className='flex justify-between'>
            <Typography variant='body2grey' className=''>{userEmail}</Typography>
            <Typography variant='caption'>
              {userRole}/{userCenter}
            </Typography>
          </div>
        </div>
      </div>
      <Separator className='mb-3' />
      <div className='flex justify-end'>
        <Button variant='outline-primary' onClick={handleLogout} disabled={isLoadingLogout} className='w-[120px]'>
          Logout
        </Button>
      </div>
    </div>
  )
}

export const AppBarUserUI = () => {
  const { data: meApi, isLoading: isLoadingGetMe, refetch: refetchMe, isError: isGetMeError } = useGetMeQuery()
  const me = useMemo(() => meApi?.data || null, [meApi]);
  // const { myPermission } = usePermission()
  const [openPopup, setOpenPopup] = useState(false)
  if (!me) return null
  const name = me?.name ?? 'Unknown User'
  // if (!myPermission?.['view.profile']) return null
  return (
    <Popover open={openPopup} onOpenChange={setOpenPopup} modal>
      <PopoverTrigger asChild>
        <div className='flex items-center gap-2'>
          {/* <AvatarUser size='2' /> */}
          <Image
            src="/placeholder-user-img-colorfull.png"
            alt="placeholder-user-img-colorfull.png"
            className="object-cover mx-auto"
            width={32}
            height={32}
          />
          <Typography>{name}</Typography>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-[23rem] mx-2' onPointerDownOutside={(e) => {
        e.preventDefault() // prevent closing
      }}>
        <PopupUserUI user={me} onClose={() => setOpenPopup(false)} />
      </PopoverContent>
    </Popover>
  )
}
