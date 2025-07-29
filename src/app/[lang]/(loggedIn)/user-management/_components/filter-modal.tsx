import { RadioField } from '@/components/common/form/radio'
import { SelectField } from '@/components/common/form/select-field'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { statuses } from '@/const/mockup'
import { useGetDropdownQuery } from '@/features/system/systemApiSlice'
import { FilterUsersDialogSchemas } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface FilterModalProps {
  setStatus: (status: boolean | null) => void
  setRole: (role: string | null) => void
  setTeam: (team: string | null) => void
  setCenter: (center: string | null) => void
  status: boolean | null
  role: string | null
  team: string | null
  center: string | null
  isPending?: boolean // Optional prop to indicate loading state
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}
export const FilterUsersModal = ({
  setStatus,
  setRole,
  setTeam,
  setCenter,
  status,
  role,
  team,
  center,
  isPending = false,
  isOpen,
  setIsOpen
}: FilterModalProps) => {
  const onSubmit = (value: z.infer<typeof FilterUsersDialogSchemas>) => {
    console.log('Filter values:', value)
    setStatus(value.status)
    setRole(value.role)
    setTeam(value.team)
    setCenter(value.center)
    setIsOpen(false)
  }
  const { data: dataDropdown, isLoading: isLoadingDropdown } = useGetDropdownQuery()

  const form = useForm<z.infer<typeof FilterUsersDialogSchemas>>({
    resolver: zodResolver(FilterUsersDialogSchemas),
    defaultValues: {
      role: role,
      team: team,
      center: center,
      status: status
    }
  })
  useEffect(() => {
    console.log('Filter errors:', form.formState.errors)
    console.log('Filter values:', form.getValues())
  }, [form.formState.errors])
  return (
    <Modal isOpen={isOpen} title='Filter' className='max-w-sm'>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <RadioField
            loading={isPending}
            form={form}

            items={statuses}
            valueName='id'
            labelName='name'

            name='status'
            label='Status'
            className='flex '
          />
          <SelectField
            loading={isPending}
            form={form}
            name='role'
            label='Role'
            placeholder='All'
            items={dataDropdown?.data.roles || []}
            valueName='id'
            labelName='name'
          />
          <SelectField
            loading={isPending}
            form={form}
            name='team'
            label='Team'
            placeholder='All'
            items={dataDropdown?.data.teams || []}
            valueName='id'
            labelName='name'
          />
          <SelectField
            loading={isPending}
            form={form}
            name='center'
            label='Center'
            placeholder='All'
            items={dataDropdown?.data.centers || []}
            valueName='id'
            labelName='name'
          />
          <Button className='w-full'>Filter</Button>
        </form>
      </Form>
    </Modal>
  )
}
