'use client'
import { LoginSchemas } from '@/scheams'
import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter } from 'next/router'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Form, FormField } from '../ui/form'
import { TextField } from '../molecules/form/text-field'
import { FormError } from '../molecules/form-error'
import { Button } from '../ui/button'
import { PasswordField } from '../molecules/form/password-field'
// import generateToken from '@/lib/utils/generateToken'
import { loginUser } from '@/actions/login'
import { setAccessToken, setRefreshToken } from '@/services/api'
import { useRouter } from 'next/navigation'
export const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const form = useForm<z.infer<typeof LoginSchemas>>({
    resolver: zodResolver(LoginSchemas),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const onSubmit = async (value: z.infer<typeof LoginSchemas>) => {
    setError('')
    startTransition(async () => {
      try {
        const res = await loginUser({
          username: value.username,
          password: value.password
        })
        if (!res) {
          throw new Error('Invalid response from server')
        }
        if (res.error) {
          throw new Error(res.error)
        }
        if (res.accessToken && res.refreshToken) {
          setAccessToken(res.accessToken)
          setRefreshToken(res.refreshToken)
          router.push('/dashboard')
        }
        // Optionally, you can redirect or perform other actions here
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-4'>
          <TextField
            loading={isPending}
            form={form}
            name='username'
            label=''
            prependInnerIcon={
              <span className='icon'>🔑</span> // Replace with actual icon component
            }
            placeholder='Username'
          />
          <PasswordField
            prependInnerIcon={
              <span className='icon'>🔑</span> // Replace with actual icon component
            }
            loading={isPending}
            form={form}
            name='password'
            label=''
            placeholder='Password'
          />
        </div>
        <div className='h-[3rem]'>
          <FormError message={error} />
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
