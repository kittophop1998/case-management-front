import { Typography } from '@/components/common/typography'
import { Card } from '@/components/ui/card'
import { LoginForm } from './login-form'
import Image from 'next/image'

export const LoginTemplate = async () => {
  return (
    <div>
      <Card className="max-w-md w-full py-8 px-8 min-h-[400px] flex flex-col">
        <Image
          src="/eaon-icon.png"
          alt="eaon-icon.png"
          className="object-cover mx-auto"
          width={100}
          height={100}
        />
        <Typography variant="h3" as="h3" className="text-center">
          Case Management
        </Typography>
        <Typography variant="caption" className="text-center mb-4">
          Login to your account
        </Typography>
        <LoginForm />
      </Card>

      <div>
        <Typography variant="caption" className="text-base text-white text-center mt-4">
          บริษัท อิออน ธนสินทรัพย์ (ไทยแลนด์) จำกัด (มหาชน)<br />
          AEON Thana Sinsap (Thailand) Public Company Limited
        </Typography>
      </div>
    </div>
  )
}
