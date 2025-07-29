'use client'
import { ButtonCancel } from '@/components/common/btn-cancle'
import { FormError } from '@/components/common/form-error'
import { RadioField } from '@/components/common/form/Radio'
import { SelectField } from '@/components/common/form/select-field'
import { TextField } from '@/components/common/form/text-field'
import { Typography } from '@/components/common/typography'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { centers, roles, statuses, teams } from '@/const/mockup'
import { cn } from '@/lib/utils'
import { CreateEditUserSchema } from '@/schemas'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface FormUserDetailsProps {
  form: ReturnType<typeof useForm<z.infer<typeof CreateEditUserSchema>>>
  mode: 'create' | 'edit'
  onClose: () => void
  isLoadingForm: boolean
  onSubmit: (value: z.infer<typeof CreateEditUserSchema>) => void
  isPendingSubmit?: boolean
  error?: string
}
export const FormUserDetails = ({
  form,
  mode,
  onClose,
  isLoadingForm,
  onSubmit,
  isPendingSubmit = false,
  error = undefined
}: FormUserDetailsProps) => {
  // const [error, setError] = useState<string | undefined>('')
  // const [isPending, startTransition] = useTransition()

  // const onSubmit = async (value: z.infer<typeof CreateEditUserSchema>) => {
  //   console.log('Form submitted with values:', value)
  //   setError('')
  //   startTransition(async () => {
  //     try {
  //       console.log('Form submitted with values:', value)
  //     } catch (error: unknown) {
  //       if (error instanceof Error) {
  //         setError(error.message)
  //       }
  //     }
  //   })
  // }
  const username = form.watch('userName')
  return (
    <div>
      <Typography variant='body2' className='mb-4'>
        {mode === 'create' ? 'Agent Information' : username}
      </Typography>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div
            className={cn(
              'grid  gap-4 ',
              mode === 'create' ? 'grid-cols-2' : 'grid-cols-1'
            )}
          >
            {mode === 'create' && (
              <>
                <TextField
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  name='id'
                  label='Agent ID'
                  placeholder='Agent ID'
                />
                <TextField
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  name='name'
                  label='Agent Name'
                  placeholder='Name'
                />
                <TextField
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  name='domainName'
                  label='Domain Name'
                  placeholder='Domain Name'
                />
                <TextField
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  name='operatorID'
                  label='Operator ID'
                  placeholder='Operator ID'
                />
              </>
            )}
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={roles}
              name='role'
              label='Role'
              placeholder='Select'
            />
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={teams}
              name='team'
              label='Team'
              placeholder='Select'
            />
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={centers}
              name='center'
              label='Center'
              placeholder='Select'
            />
            <div />
            <div className={cn(mode === 'create' ? '' : 'order-first')}>
              <RadioField
                loading={isPendingSubmit || isLoadingForm}
                form={form}
                items={statuses}
                name='status'
                label='Status'
                className='flex '
              />
            </div>
          </div>
          <FormError message={error} />
          <div className='flex justify-end gap-3'>
            <ButtonCancel onClick={onClose} />
            <Button type='submit' disabled={isPendingSubmit || isLoadingForm}>
              {mode === 'create' ? 'Add' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
