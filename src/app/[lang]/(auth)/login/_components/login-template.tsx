import { Typography } from '@/components/common/typography'
import { Card } from '@/components/ui/card'
import { LoginForm } from './login-form'
import Image from 'next/image'

export const LoginTemplate = async () => {
  return (
    <Card className='max-w-[380px] w-full p-6'>
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
