'use client'

import { FormProvider } from 'react-hook-form'
import Lock from '@public/icons/Lock.svg'
import Email from '@public/icons/Email.svg'
import { TextField } from '@/components/form/text-field'
import { Button } from '@/components/common/Button'
import { PasswordField } from '@/components/form/password-field'
import useAuth from '@/hooks/use-auth'
import { FormError } from '@/components/form/form-error'
import { Typography } from '@/components/common/typography'

export const LoginForm = () => {
  const { login: {
    login: onSubmit,
    formLogin: form,
    loginError,
    isLoadingLogin
  }
  } = useAuth()
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' method='post'>
        <div className='space-y-4'>
          <TextField
            loading={isLoadingLogin}
            form={form}
            name='username'
            label=''
            prependInnerIcon={<Email />}
            placeholder='Username'
          />
          <PasswordField
            prependInnerIcon={<Lock />}
            loading={isLoadingLogin}
            form={form}
            name='password'
            label=''
            placeholder='Password'
          />
        </div>
        <div className='h-[3rem]'>
          {loginError ? (
            <FormError message={loginError} />
          ) : (
            <Typography variant='caption' className='text-center p-3'>
              Enter your domain and password to log in”
            </Typography>
          )}
        </div>
        <Button
          // disabled={isPending}
          loading={isLoadingLogin}
          type='submit'
          className='w-full bg-[#5570f1] hover:bg-[#5570f1]/90 text-white'
        >
          Login
        </Button>

      </form>
    </FormProvider>
  )
}
