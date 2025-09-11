import { Typography } from '@/components/common/typography'
import { Card } from '@/components/ui/card'
import { LoginForm } from './login-form'
import Image from 'next/image'

export const LoginTemplate = async () => {
  return (
    <div>
      <Card className="px-8 pb-10 pt-12 w-[27.688rem]">
        <Image
          src="/eaon-icon.png"
          alt="eaon-icon.png"
          className="object-cover mx-auto w-[80px] h-[80px]"
          width={100}
          height={100}
        />
        <div className='space-y-2 pt-3 pb-7'>
          <Typography textStyle='poppins' className="text-center text-xl font-medium">
            Case Management
          </Typography>
          <Typography variant='caption2' className='text-center' >
            Login to your account
          </Typography>
        </div>
        <LoginForm />
      </Card>
      <div className='text-white text-center mt-5'>
        <Typography variant='body2' textStyle='roboto'>บริษัท อิออน ธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)</Typography>
        <Typography variant='body2' textStyle='roboto' className='font-medium'>ÆON Thana Sinsap (Thailand) Pubilc Company Limited</Typography>
      </div>
    </div>
  )
}
