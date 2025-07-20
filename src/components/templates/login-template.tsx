import { Typography } from '../atoms/typography'
import { LoginForm } from '../organisms/login-form'
import Image from 'next/image'
import { Card } from '../ui/card'

export const LoginTemplate = () => {
  return (
    <Card className='max-w-md w-full p-6'>
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
