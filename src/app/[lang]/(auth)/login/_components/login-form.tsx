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
import { Button } from '@/components/common/Button'
import { PasswordField } from '@/components/common/form/password-field'
import { Typography } from '@/components/common/typography'
import { FormError } from '@/components/common/form-error'
import useAuth from '@/hooks/use-auth'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { getErrorMessageAPI } from '@/lib/utils/get-error-message-api'

export const LoginForm = () => {
  const { login: {
    login: onSubmit,
    isLoadingLogin: isPending,
    formLogin: form,
    isLoginError: isError,
    loginError: error,

  },
    getMe: {
      isLoadingGetMe
    } } = useAuth()
  // function getErrorMessageAP(error: FetchBaseQueryError | SerializedError | undefined): string | undefined {
  //   throw new Error('Function not implemented.')
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' method='post'>
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
            <FormError message={getErrorMessageAPI(error)} />
          ) : (
            <Typography variant='caption' className='text-center p-3'>
              Enter your domain and password to log in”
            </Typography>
          )}
        </div>
        {/* TODO: SET COLOR */}
        {/* || isLoadingGetMe */}
        <Button
          disabled={isPending}
          loading={isPending}
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
