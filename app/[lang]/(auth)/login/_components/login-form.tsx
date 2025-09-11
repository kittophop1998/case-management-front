'use client'
import { FormProvider } from 'react-hook-form'
import Lock from '@/public/icons/Lock.svg'
import Email from '@/public/icons/Email.svg'
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
            prependInnerIcon={<Email className='size-[1.25rem]' />}
            placeholder='Username'
            className='bg-[#f6f7fb] border-0 h-[3.25rem]'
          />
          <PasswordField
            prependInnerIcon={<Lock className='size-[1.25rem]' />}
            loading={isLoadingLogin}
            form={form}
            name='password'
            label=''
            placeholder='Password'
            className='bg-[#f6f7fb]  border-0 h-[3.25rem]'
          />
        </div>
        <div className='h-[5rem] flex items-center justify-center'>
          {loginError ? (
            <FormError message={loginError} />
          ) : (
            <Typography variant='caption2' className='text-center' >
              Enter your username and password to log in
            </Typography>
          )}
        </div>
        <div className="flex justify-center items-center">
          <Button
            loading={isLoadingLogin}
            type="submit"
            className="h-[3.625rem] w-[11.25rem] text-xl  rounded-xl bg-[#5570F1]"
          >
            Login
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
