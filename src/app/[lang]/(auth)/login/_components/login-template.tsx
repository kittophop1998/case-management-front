import { Typography } from '@/components/common/typography'
import { Card } from '@/components/ui/card'
import { LoginForm } from './login-form'
import Image from 'next/image'
// import { cookies } from 'next/headers'


export const LoginTemplate = async () => {
  // const cookieStore = await cookies()
  // const access_token = cookieStore.get('access_token')
  return (
    <Card className='max-w-md w-full p-6'>
      {/* {access_token} */}
      <Image
        src='/eaon-icon.png'
        alt={'eaon-icon.png'}
        className='object-cover mx-auto'
        width={100}
        height={100}
      />
      <Typography variant='h3' as='h3' className='text-center'>
        Case Management
      </Typography>
      <Typography variant='caption' className='text-center mb-4'>
        Login to your account
      </Typography>
      <LoginForm />
    </Card>
  )
}
