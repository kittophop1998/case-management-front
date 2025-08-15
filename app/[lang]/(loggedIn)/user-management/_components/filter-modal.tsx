'use client'

import { RadioField } from '@/components/form/radio'
import { SelectField } from '@/components/form/select-field'
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
import { ComboboxField } from '@/components/form/combo-field'

interface FilterModalProps {
  setStatus: (status: boolean | null) => void
  setRole: (role: string | null) => void
  setSection: (section: string | null) => void
  setCenter: (center: string | null) => void
  setDepartment: (department: string | null) => void
  department: string | null
  status: boolean | null
  role: string | null
  section: string | null
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
  setSection,
  setCenter,
  setDepartment,
  department,
  status,
  role,
  section,
  center,
  isPending = false,
  isOpen,
  setIsOpen
}: FilterModalProps) => {
  const defaultValues: z.infer<typeof FilterUsersDialogSchemas> = {
    role,
    section,
    center,
    status,
    department
  }

  const form = useForm<z.infer<typeof FilterUsersDialogSchemas>>({
    resolver: zodResolver(FilterUsersDialogSchemas),
    defaultValues
  })

  const { data: dataDropdown } = useGetDropdownQuery()

  const onSubmit = (values: z.infer<typeof FilterUsersDialogSchemas>) => {
    setStatus(values.status)
    setRole(values.role)
    setSection(values.section)
    setCenter(values.center)
    setDepartment(values.department)
    setIsOpen(false)
  }

  const clearFilter = () => {
    form.reset({
      status: true,
      role: null,
      section: null,
      center: null,
      department: null
    })
  }

  useEffect(() => {
    if (isOpen) {
      form.reset(defaultValues)
    }
  }, [isOpen])
  return (
    <Modal isOpen={isOpen} title='Filter' className='max-w-[317px]' onClose={() => { setIsOpen(false) }}>
      {/* {JSON.stringify(seeData)} */}
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
          <ComboboxField
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
            name='section'
            label='Section'
            placeholder='All'
            valueName='id'
            labelName='name'
            loading={isPending}
            items={[seeAllObj, ...(dataDropdown?.data?.sections || [])]}
          />
          <SelectField
            form={form}
            name='department'
            label='Department'
            placeholder='All'
            valueName='id'
            labelName='name'
            loading={isPending}
            items={[seeAllObj, ...(dataDropdown?.data?.departments || [])]}
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
            <Button type='button' onClick={clearFilter} className='bg-transparent border border-primary text-primary'>Clear</Button>
            <Button type='submit' >Filter</Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
