'use client'
import { ButtonCancel } from '@/components/common/btn-cancle'
import { FormError } from '@/components/common/form-error'
import { RadioField } from '@/components/common/form/radio'
import { SelectField } from '@/components/common/form/select-field'
import { TextField } from '@/components/common/form/text-field'
import { Typography } from '@/components/common/typography'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { centers, roles, statuses, teams } from '@/const/mockup'
import { useGetDropdownQuery } from '@/features/system/systemApiSlice'
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

  // const onSubmitTest = async (value: z.infer<typeof CreateEditUserSchema>) => {
  //   console.log('Form submitted with values:', value)
  // }

  const username = form.watch('username')
  const { data: dataDropdown, isLoading: isLoadingDropdown } = useGetDropdownQuery()

  return (
    <div>
      <Typography variant='body2' className='mb-4'>
        {mode === 'create' ? 'Agent Information' : username}
      </Typography>
      {isLoadingForm ? 'Loading...' : ''}
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
                  name='agentId'
                  label='Agent ID'
                  placeholder='Agent ID'
                />
                <TextField
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  name='username'
                  label='Agent Name'
                  placeholder='Name'
                />
                <TextField
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  name='email'
                  label='Domain Name'
                  placeholder='Domain Name'
                />
                <TextField
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  name='operatorId'
                  label='Operator ID'
                  placeholder='Operator ID'
                />
              </>
            )}
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={dataDropdown?.data?.roles || []}
              name='roleId'
              label='Role'
              placeholder='Select'
              valueName='id'
              labelName='name'
            />
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={dataDropdown?.data?.teams || []}
              name='team'
              label='Team'
              placeholder='Select'
              valueName='id'
              labelName='name'
            />
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={dataDropdown?.data?.centers || []}
              name='centerId'
              label='Center'
              placeholder='Select'
              valueName='id'
              labelName='name'
            />
            <div />
            <div className={cn(mode === 'create' ? '' : 'order-first')}>
              <RadioField
                loading={isPendingSubmit || isLoadingForm}
                form={form}
                items={statuses}
                name='isActive'
                label='Status'
                className='flex '
                valueName='id'
                labelName='name'
              />
            </div>
          </div>
          <FormError message={error} />
          <div className='flex justify-end gap-3'>
            <ButtonCancel onClick={onClose} />
            {isPendingSubmit ? 'isPendingSubmit-true' : ''}
            {isLoadingForm ? 'isLoadingForm-true' : ''}
            <Button type='submit' disabled={isPendingSubmit || isLoadingForm}>
              {mode === 'create' ? 'Add' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
