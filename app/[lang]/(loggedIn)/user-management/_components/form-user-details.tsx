'use client'
import { ButtonCancel } from '@/components/button/btn-cancle'
import { FormError } from '@/components/form/form-error'
import { RadioField } from '@/components/form/radio'
import { SelectField } from '@/components/form/select-field'
import { TextField } from '@/components/form/text-field'
import { Typography } from '@/components/common/typography'
import { Form } from '@/components/ui/form'
import { statuses } from '@/const/mockup'
import { useGetDropdownQuery } from '@/features/system/systemApiSlice'
import { cn } from '@/lib/utils'
import { CreateEditUserSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Button } from '@/components/common/Button'
import { getErrorText } from '@/services/api'

interface FormUserDetailsProps {
  form: ReturnType<typeof useForm<z.infer<typeof CreateEditUserSchema>>>
  mode: 'create' | 'edit'
  onClose: () => void
  isLoadingForm: boolean
  onSubmit: (value: z.infer<typeof CreateEditUserSchema>) => void
  isPendingSubmit?: boolean
  error: string | null
}

export const FormUserDetails = ({
  form,
  mode,
  onClose,
  isLoadingForm,
  onSubmit,
  isPendingSubmit = false,
  error = null
}: FormUserDetailsProps) => {
  const name = form.watch('name')
  const { data: dataDropdown, isLoading: isLoadingDropdown } = useGetDropdownQuery()
  return (
    <div>
      <Typography variant='body2' className='mb-4'>
        {mode === 'create' ? 'User Information' : name}
      </Typography>
      {isLoadingForm ? 'Loading...' : ''}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div
            className={cn(
              'grid  gap-4',
              // mode === 'create' ? 'grid-cols-2' : 'grid-cols-1'
              'grid-cols-2'
            )}
          >
            {/* {mode === 'create' && ( */}
            {/* <> */}
            <TextField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              name='username'
              label='Username'
              placeholder='Enter Username'
              reqired
            />
            <TextField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              name='name'
              label='Name'
              placeholder='Enter Name'
              reqired
            />
            <TextField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              name='staffId'
              label='Staff ID'
              placeholder='Enter Staff ID'

            />
            <TextField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              name='email'
              label='Email'
              placeholder='Enter Email'
              reqired
            />
            <TextField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              name='operatorId'
              label='Operator ID'
              placeholder='Enter Operator ID'
              reqired
            />
            {/* </> */}
            {/* )} */}
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={dataDropdown?.data?.roles || []}
              name='roleId'
              label='Role'
              placeholder='Enter Role'
              valueName='id'
              labelName='name'
              reqired
            />
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={dataDropdown?.data?.sections || []}
              name='sectionId'
              label='Section'
              placeholder='Enter Section'
              valueName='id'
              labelName='name'
              reqired
            />
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={dataDropdown?.data?.departments || []}
              name='departmentId'
              label='Department'
              placeholder='Enter Department'
              valueName='id'
              reqired
              labelName='name'
            />
            <SelectField
              loading={isPendingSubmit || isLoadingForm}
              form={form}
              items={dataDropdown?.data?.centers || []}
              name='centerId'
              label='Center'
              placeholder='Enter Center'
              valueName='id'
              labelName='name'
              reqired
            />
            <div />
            {/* <div className={cn(mode === 'create' ? '' : 'order-first')}> */}
            {
              mode === 'create' ? null : <>
                <RadioField
                  // disableList={mode === 'create' ? [false] : undefined}
                  loading={isPendingSubmit || isLoadingForm}
                  form={form}
                  items={statuses}
                  name='isActive'
                  label='Status'
                  className='flex'
                  valueName='id'
                  labelName='name'
                  reqired
                />
              </>
            }

            {/* </div> */}
          </div>
          {/* {JSON.stringify(form.error)} */}
          {!!error && <FormError message={getErrorText(error)} />}

          <div className='flex justify-end gap-3'>
            <ButtonCancel onClick={onClose} className='w-[100px]' />
            <Button
              type='submit'
              loading={isPendingSubmit || isLoadingForm}
              disabled={!form.formState.isDirty}
              // className={cn(mode === 'create' ? 'w-[100px]' : 'w-full')}
              className={'w-[100px]'}
            >
              {mode === 'create' ? 'Add' : 'Update'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
