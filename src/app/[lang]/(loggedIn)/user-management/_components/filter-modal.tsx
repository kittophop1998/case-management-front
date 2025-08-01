'use client'

import { RadioField } from '@/components/common/form/radio'
import { SelectField } from '@/components/common/form/select-field'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { statuses } from '@/const/mockup'
import { useGetDropdownQuery } from '@/features/system/systemApiSlice'
import { FilterUsersDialogSchemas } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
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
  isPending?: boolean
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const seeAllObj = {
  id: null,
  name: 'All'
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
  const defaultValues: z.infer<typeof FilterUsersDialogSchemas> = {
    role,
    team,
    center,
    status
  }

  const form = useForm<z.infer<typeof FilterUsersDialogSchemas>>({
    resolver: zodResolver(FilterUsersDialogSchemas),
    defaultValues
  })

  const { data: dataDropdown } = useGetDropdownQuery()

  const onSubmit = (values: z.infer<typeof FilterUsersDialogSchemas>) => {
    setStatus(values.status)
    setRole(values.role)
    setTeam(values.team)
    setCenter(values.center)
    setIsOpen(false)
  }

  const clearFilter = () => {
    setStatus(null)
    setRole(null)
    setTeam(null)
    setCenter(null)
    form.reset(defaultValues)
  }

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues)
    }
  }, [isOpen, role, team, center, status])

  return (
    <Modal isOpen={isOpen} title='Filter' className='max-w-sm'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <RadioField
            form={form}
            name='status'
            label='Status'
            className='flex'
            valueName='id'
            labelName='name'
            loading={isPending}
            items={[seeAllObj, ...statuses]}
          />
          <SelectField
            form={form}
            name='role'
            label='Role'
            placeholder='All'
            valueName='id'
            labelName='name'
            loading={isPending}
            items={[seeAllObj, ...(dataDropdown?.data?.roles || [])]}
          />
          <SelectField
            form={form}
            name='team'
            label='Team'
            placeholder='All'
            valueName='id'
            labelName='name'
            loading={isPending}
            items={[seeAllObj, ...(dataDropdown?.data?.teams || [])]}
          />
          <SelectField
            form={form}
            name='center'
            label='Center'
            placeholder='All'
            valueName='id'
            labelName='name'
            loading={isPending}
            items={[seeAllObj, ...(dataDropdown?.data?.centers || [])]}
          />
          <div className='flex gap-2 justify-end'>
            <Button onClick={clearFilter} className='bg-transparent border border-primary text-primary hover:text-white'>Clear</Button>
            <Button type='submit'>Filter</Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
