import { RadioField } from '@/components/common/form/radio'
import { SelectField } from '@/components/common/form/select-field'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FilterUsersDialogSchemas } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

interface FilterModalProps {
  setStatus: (status: boolean | null) => void
  setRole: (role: number | null) => void
  setTeam: (team: string | null) => void
  setCenter: (center: number | null) => void
  status: boolean | null
  role: number | null
  team: string | null
  center: number | null
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
  const form = useForm<z.infer<typeof FilterUsersDialogSchemas>>({
    resolver: zodResolver(FilterUsersDialogSchemas),
    defaultValues: {
      role: role,
      team: team,
      center: center,
      status: status
    }
  })
  return (
    <Modal isOpen={isOpen} title='Filter' className='max-w-sm'>
      <Form {...form}>
        <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
          <RadioField
            loading={isPending}
            form={form}
            items={[
              { value: true, label: 'Active' },
              { value: false, label: 'Inactive' }
            ]}
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
            items={[
              { value: 1, label: 'Admin' },
              { value: 2, label: 'User' }
            ]}
            valueName='value'
            labelName='label'
          />
          <SelectField
            loading={isPending}
            form={form}
            name='team'
            label='Team'
            placeholder='All'
            items={[
              { value: 'team1', label: 'Team 1' },
              { value: 'team2', label: 'Team 2' }
            ]}
            valueName='value'
            labelName='label'
          />
          <SelectField
            loading={isPending}
            form={form}
            name='center'
            label='Center'
            placeholder='All'
            items={[
              { value: 1, label: 'Center 1' },
              { value: 2, label: 'Center 2' }
            ]}
            valueName='value'
            labelName='label'
          />
          <Button className='w-full'>Filter</Button>
        </form>
      </Form>
    </Modal>
  )
}
