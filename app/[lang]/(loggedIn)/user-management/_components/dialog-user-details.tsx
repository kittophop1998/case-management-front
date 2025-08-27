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
import { useCreateUserMutation, useEditUserMutation, useGetUserMutation } from '@/features/usersApiSlice'
import { checkPassword } from '@/components/common/dialog-check-password'
import { dialogAlert } from '@/components/common/dialog-alert'
import { cn } from '@/lib/utils'
import { getErrorText } from '@/services/api'

export type DialogDetailsRef = {
  setDefaultUser: (user: UserType | null) => void
}
interface DialogDetailsProps {

  getUsers: () => void

}
const emptyUser: z.infer<typeof CreateEditUserSchema> = {
  "id": "",// Staff ID
  "username": "",// Name
  "name": "",// Name
  "email": "",// Domain Name
  "sectionId": "",// Section
  "operatorId": '',// Operator ID
  "staffId": "",// Staff ID
  "centerId": "",// Center
  "roleId": "",// Role
  "isActive": true,// Status
  "departmentId": '',// Department
  // "queueId": "",// Queue ID

}

export const DialogDetails = forwardRef
  <DialogDetailsRef, DialogDetailsProps>
  (
    (
      {
        getUsers
      }, ref
    ) => {
      const [fetchUser, { isLoading: isLoadingForm, error: errorGet, isSuccess }] =
        useGetUserMutation()
      const [createUser, { error: errorCreate, isLoading: isLoadingCreate }] = useCreateUserMutation()
      const [editUser, { error: errorEdit, isLoading: isLoadingEdit }] = useEditUserMutation()

      const [displayError, setDisplayError] = useState<string | null>(null)

      useEffect(() => {
        const err = errorCreate || errorEdit || errorGet
        if (err) {
          const message = getErrorText(err)
          setDisplayError(message)
        }
      }, [errorCreate, errorEdit, errorGet])

      const [open, setOpen] = useState(false)
      const [hidden, setHidden] = useState(false)
      const [mode, setMode] = useState<'create' | 'edit'>('create')
      const form = useForm<z.infer<typeof CreateEditUserSchema>>({
        resolver: zodResolver(CreateEditUserSchema)
      })
      const onSubmit = async (userData: z.infer<typeof CreateEditUserSchema>) => {
        try {
          switch (mode) {
            case 'edit':
              if (!userData?.id) {
                throw new Error('Invalid data userData?.id is null')
              }
              setHidden(true)
              const password = await checkPassword()
              setHidden(false)

              if (!password) return // กดยกเลิก หรือกรอกผิด
              await editUser({ id: userData.id, data: userData }).unwrap()
              dialogAlert(true)
              break;
            case 'create':
              await createUser(userData).unwrap()
              dialogAlert(true)
              break;
            default:
              throw new Error('Invalid mode')
          }
          setOpen(false)
          await getUsers()
        } catch (err) {
          console.log('Error saving user:', err)
        }
      }

      useImperativeHandle(ref, () => ({
        setDefaultUser: async user => {
          if (user) {
            setMode('edit')
            form.reset(emptyUser)
            const userDetails = await fetchUser(user.id).unwrap()
            if (!userDetails?.data) return
            const userAPI = userDetails.data
            const updateForm = {
              id: userAPI.id,
              username: userAPI.username,
              name: userAPI.name,
              email: userAPI.email,
              sectionId: userAPI.section.id,
              staffId: userAPI.staffId === null ? '' : `${userAPI.staffId}`,
              operatorId: `${userAPI.operatorId}`,
              centerId: userAPI.center.id,
              roleId: userAPI.role.id, // Assuming role is an object with an id
              departmentId: `${userAPI.department.id}`,
              isActive: userAPI.isActive
            }
            form.reset(updateForm)
          } else {
            setMode('create')
            form.reset(emptyUser)
          }
          setDisplayError(null)
          setOpen(true)

        }
      }))
      if (!open) return null
      return (
        <Modal
          isOpen={open}
          title={mode === 'create' ? 'Add Individual User' : 'Select Update'}
          className={cn('w-[clamp(300px,80%,608px)]', hidden && 'hidden')} //min-h-[400px]
        >
          <FormUserDetails
            isLoadingForm={isLoadingForm}
            mode={mode}
            onClose={() => setOpen(false)}
            form={form}
            onSubmit={onSubmit}
            isPendingSubmit={isLoadingCreate || isLoadingEdit}
            error={displayError}
          />
        </Modal>
      )
    }
  )


