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

export type DialogDetailsRef = {
  setDefaultUser: (user: UserType | null) => void
}
interface DialogDetailsProps {
  open: boolean
  userId: string | null
  onClose: () => void
}
const emptyUser: z.infer<typeof CreateEditUserSchema> = {
  "id": "",// Agent ID
  "userName": "",// Agent Name
  "email": "",// Domain Name
  "team": "",// Team
  "operatorId": "",// Operator ID
  "centerId": "",// Center
  "roleId": "",// Role
  "isActive": true// Status
}

export const DialogDetails = forwardRef<DialogDetailsRef, DialogDetailsProps>(
  ({
    open = false,
    userId = null,
    onClose
  }, ref) => {

    const [mode, setMode] = useState<'create' | 'edit'>('create')
    const form = useForm<z.infer<typeof CreateEditUserSchema>>({
      resolver: zodResolver(CreateEditUserSchema)
    })

    // Fetch user data if editing
    const { data: userData, isLoading: isLoadingForm, error: errorGet } = useGetUserMutation(userId!, {
      skip: !userId, // skip fetching if creating
    })
    const [createUser, { error: errorCreate, isLoading: isLoadingCreate }] = useCreateUserMutation()
    const [editUser, { error: errorEdit, isLoading: isLoadingEdit }] = useEditUserMutation()

    useEffect(() => {
      if (userData) {
        form.reset(userData)
      } else {
        form.reset(emptyUser)
      }
    }, [userData, form.reset])

    const onSubmit = async (userData: z.infer<typeof CreateEditUserSchema>) => {
      try {
        if (userId) {
          await editUser({ id: userId, data: userData }).unwrap()
        } else {
          await createUser(userData).unwrap()
        }
        onClose()
      } catch (err) {
        console.error('Error saving user:', err)
      }
    }

    useEffect(() => {
      if (userId) {
        setMode('edit')
      } else {
        setMode('create')
      }
    }, [userId])
    // const [isLoadingForm, startLoadingForm] = useTransition()


    // useImperativeHandle(ref, () => ({
    //   setDefaultUser: async user => {
    //     if (user) {
    //       setMode('edit')
    //       form.reset(emptyUser)
    //       startLoadingForm(async () => {
    //         const userDetails = await getUserDetails(user.id)
    //         form.reset(userDetails)
    //       })
    //     } else {
    //       setMode('create')
    //       form.reset(emptyUser)
    //     }
    //   }
    // }))
    // const getUserDetails = async (
    //   uID: string
    // ): Promise<z.infer<typeof CreateEditUserSchema>> => {
    //   return new Promise(resolve => {
    //     setTimeout(() => {
    //       resolve({
    //         id: uID,
    //         userName: 'john.doe',
    //         email: 'john.doe@example.com',
    //         team: '4',
    //         isActive: true,
    //         roleId: '4',
    //         operatorId: '4',
    //         centerId: '4'
    //       })
    //     }, 3000)
    //   })
    // }
    if (!open) return null
    return (
      <Modal
        isOpen={open}
        title={mode === 'create' ? 'Add Individual User' : 'Select Update'}
      >
        <FormUserDetails
          isLoadingForm={isLoadingForm}
          mode={mode}
          onClose={onClose}
          form={form}
          onSubmit={onSubmit}
          isPendingSubmit={isLoadingCreate || isLoadingEdit}
          error={errorCreate || errorEdit || errorGet || undefined}
        />
      </Modal>
    )
  }
)


