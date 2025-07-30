'use client'
import { FormUserDetails } from './form-user-details'
import { Modal } from '@/components/common/Modal'
import { useEffect, useState, useTransition } from 'react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { UserType } from '@/types/user.type'
import { CreateEditUserSchema } from '@/schemas'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateUserMutation, useEditUserMutation, useGetUserMutation } from '@/features/users/usersApiSlice'
import { checkPassword } from '@/components/common/dialog-check-password'

export type DialogDetailsRef = {
  setDefaultUser: (user: UserType | null) => void
}
interface DialogDetailsProps {

  getUsers: () => void

}
const emptyUser: z.infer<typeof CreateEditUserSchema> = {
  "id": "",// Agent ID
  "username": "",// Agent Name
  "email": "",// Domain Name
  "teamId": "",// Team
  "operatorId": '',// Operator ID
  "agentId": "",// Agent ID
  "centerId": "",// Center
  "roleId": "",// Role
  "isActive": true// Status
}

export const DialogDetails = forwardRef<DialogDetailsRef, DialogDetailsProps>(
  ({
    getUsers
  }, ref) => {
    const [fetchUser, { isLoading: isLoadingForm, error: errorGet, isSuccess }] =
      useGetUserMutation()
    const [open, setOpen] = useState(false)

    const [mode, setMode] = useState<'create' | 'edit'>('create')
    const form = useForm<z.infer<typeof CreateEditUserSchema>>({
      resolver: zodResolver(CreateEditUserSchema)
    })

    useEffect(() => {
      console.log('All errors:', form.formState.errors)
      console.log('All errors:', form.getValues())
    }, [form.formState.errors])

    const [createUser, { error: errorCreate, isLoading: isLoadingCreate }] = useCreateUserMutation()
    const [editUser, { error: errorEdit, isLoading: isLoadingEdit }] = useEditUserMutation()
    const onSubmit = async (userData: z.infer<typeof CreateEditUserSchema>) => {
      console.log('Form submitted with values:', mode, userData)

      try {
        switch (mode) {
          case 'edit':
            const password = await checkPassword()
            if (!password) return // กดยกเลิก หรือกรอกผิด
            await editUser({ id: userData.id, data: userData }).unwrap()
            // alert('User updated successfully')
            break;
          case 'create':
            await createUser(userData).unwrap()
            alert('User created successfully')
            break;
          default:
            throw new Error('Invalid mode')
        }
        setOpen(false)
        await getUsers()
      } catch (err) {
        console.error('Error saving user:', err)
      }
    }

    useImperativeHandle(ref, () => ({
      setDefaultUser: async user => {
        console.log('setDefaultUser called with user:', user)
        if (user) {
          setMode('edit')
          form.reset(emptyUser)
          const userDetails = await fetchUser(user.id).unwrap()
          console.log('Fetched user details:', userDetails)
          const userAPI = userDetails.data
          const updateForm = {
            id: userAPI.id,
            username: userAPI.username,
            email: userAPI.email,
            teamId: userAPI.team.id,
            agentId: `${userAPI.agentId}`,
            operatorId: `${userAPI.operatorId}`,
            centerId: userAPI.center.id,
            roleId: userAPI.role.id, // Assuming role is an object with an id
            isActive: userAPI.isActive
          }
          console.log('updateForm :', updateForm)
          form.reset(updateForm)
        } else {
          setMode('create')
          form.reset(emptyUser)
        }
        setOpen(true)

      }
    }))
    if (!open) return null
    return (
      <Modal
        isOpen={open}
        title={mode === 'create' ? 'Add Individual User' : 'Select Update'}
      >
        <FormUserDetails
          isLoadingForm={isLoadingForm}
          mode={mode}
          onClose={() => setOpen(false)}
          form={form}
          onSubmit={onSubmit}
          isPendingSubmit={isLoadingCreate || isLoadingEdit}
          error={errorCreate || errorEdit || errorGet || undefined}
        />
      </Modal>
    )
  }
)


