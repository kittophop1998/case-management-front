'use client'
import { ButtonCancel } from '@/components/common/btn-cancle'
import { FormError } from '@/components/common/form-error'
import { RadioField } from '@/components/common/form/Radio'
import { SelectField } from '@/components/common/form/select-field'
import { TextField } from '@/components/common/form/text-field'
import { Typography } from '@/components/common/typography'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { UserSchemas } from '@/schemas'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
interface FormUserDetailsProps {
  form: ReturnType<typeof useForm<z.infer<typeof UserSchemas>>>
  mode: 'create' | 'edit'
  onClose: () => void
  isLoadingForm: boolean
}
export const FormUserDetails = ({
  form,
  mode,
  onClose,
  isLoadingForm
}: FormUserDetailsProps) => {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const onSubmit = async (value: z.infer<typeof UserSchemas>) => {
    console.log('Form submitted with values:', value)
    setError('')
    startTransition(async () => {
      try {
        console.log('Form submitted with values:', value)
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }
    })
  }
  const userName = form.watch('name')
  return (
    <div>
      <Typography variant='body2' className='mb-4'>
        {mode === 'create' ? 'Agent Information' : userName}
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
                  loading={isPending || isLoadingForm}
                  form={form}
                  name='agentID'
                  label='Agent ID'
                  placeholder='Agent ID'
                />
                <TextField
                  loading={isPending || isLoadingForm}
                  form={form}
                  name='name'
                  label='Agent Name'
                  placeholder='Name'
                />
                <TextField
                  loading={isPending || isLoadingForm}
                  form={form}
                  name='domainName'
                  label='Domain Name'
                  placeholder='Domain Name'
                />
                <TextField
                  loading={isPending || isLoadingForm}
                  form={form}
                  name='operatorID'
                  label='Operator ID'
                  placeholder='Operator ID'
                />
              </>
            )}
            <SelectField
              loading={isPending || isLoadingForm}
              form={form}
              items={[
                { value: 'Admin', label: 'Admin' },
                { value: 'User', label: 'User' },
                { value: 'Guest', label: 'Guest' }
              ]}
              name='role'
              label='Role'
              placeholder='Select'
            />
            <SelectField
              loading={isPending || isLoadingForm}
              form={form}
              items={[
                { value: 'Team A', label: 'Team A' },
                { value: 'Team B', label: 'Team B' },
                { value: 'Team C', label: 'Team C' }
              ]}
              name='team'
              label='Team'
              placeholder='Select'
            />
            <SelectField
              loading={isPending || isLoadingForm}
              form={form}
              items={[
                { value: 'BKK', label: 'BKK' },
                { value: 'CNX', label: 'CNX' },
                { value: 'HKT', label: 'HKT' }
              ]}
              name='center'
              label='Center'
              placeholder='Select'
            />
            <div />
            <div className={cn(mode === 'create' ? '' : 'order-first')}>
              <RadioField
                loading={isPending || isLoadingForm}
                form={form}
                items={[
                  { value: true, label: 'Active' },
                  { value: false, label: 'Inactive' }
                ]}
                name='status'
                label='Status'
                className='flex '
              />
            </div>
          </div>
          <FormError message={error} />
          <div className='flex justify-end gap-3'>
            <ButtonCancel onClick={onClose} />
            <Button type='submit' disabled={isPending || isLoadingForm}>
              {mode === 'create' ? 'Add' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
