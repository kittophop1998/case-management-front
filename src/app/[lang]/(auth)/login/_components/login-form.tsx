'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
// import { setAccessToken, setRefreshToken } from '@/services/api'
import { useRouter } from 'next/navigation'
import { loginUser } from '@/actions/login'
import { LoginSchemas } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import Lock from '@public/icons/Lock.svg'
import Email from '@public/icons/Email.svg'
import { Form } from '@/components/ui/form'
import { TextField } from '@/components/common/form/text-field'
import { Button } from '@/components/ui/button'
import { PasswordField } from '@/components/common/form/password-field'
import { Typography } from '@/components/common/typography'
import { FormError } from '@/components/common/form-error'
import useAuth from '@/hooks/use-auth'

export const LoginForm = () => {
  // const router = useRouter()
  // const [error, setError] = useState<string | undefined>('')
  // const [isPending, startTransition] = useTransition()
  // const form = useForm<z.infer<typeof LoginSchemas>>({
  //   resolver: zodResolver(LoginSchemas),
  //   defaultValues: {
  //     username: '',
  //     password: ''
  //   }
  // })
  // const onSubmit = async (value: z.infer<typeof LoginSchemas>) => {
  //   setError('')
  //   startTransition(async () => {
  //     try {
  //       const res = await loginUser({
  //         username: value.username,
  //         password: value.password
  //       })
  //       if (!res) {
  //         throw new Error('Invalid response from server')
  //       }
  //       if (res.error) {
  //         throw new Error(res.error)
  //       }
  //       if (res.accessToken && res.refreshToken) {
  //         // setAccessToken(res.accessToken)
  //         // setRefreshToken(res.refreshToken)
  //         router.push('/customer-dashboard')
  //       }
  //       // Optionally, you can redirect or perform other actions here
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         setError(error.message)
  //       }
  //     }
  //   })
  // }
  const { login: {
    login: onSubmit,
    isLoadingLogin: isPending,
    formLogin: form,
    isLoginError: isError,
    loginError: error
  } } = useAuth()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-4'>
          <TextField
            loading={isPending}
            form={form}
            name='username'
            label=''
            prependInnerIcon={<Email />}
            placeholder='Username'
          />
          <PasswordField
            prependInnerIcon={<Lock />}
            loading={isPending}
            form={form}
            name='password'
            label=''
            placeholder='Password'
          />
        </div>
        <div className='h-[3rem]'>
          {isError ? (
            <FormError message={error.data.message} />
          ) : (
            <Typography variant='caption' className='text-center p-3'>
              Enter your domain and password to log in”
            </Typography>
          )}
        </div>
        {/* TODO: SET COLOR */}
        <Button
          disabled={isPending}
          type='submit'
          className='w-full bg-[#5570f1] hover:bg-[#5570f1]/90 text-white'
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
//
//
