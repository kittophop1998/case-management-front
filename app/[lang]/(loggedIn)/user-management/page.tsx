'use client'
import { Typography } from '@/components/common/typography'
import BtnFilter from '@/components/button/btn-filter'
import CardPageWrapper from '@/components/common/card-page-warpper'
import InputFilter from '@/components/common/input-filter'
import { UserType } from '@/types/user.type'
import {
  DialogDetails,
  DialogDetailsRef
} from './_components/dialog-user-details'
import { BtnAddUser } from './_components/btn-add-user'
import { useMemo, useRef, useState } from 'react'
import { ExcelUploadDialog } from './_components/upload-excel-test/excel-upload-dialog'
import { useUsers } from '@/hooks/user/useUsers'
import { FilterUsersModal } from './_components/filter-modal'
import { DataTable, Header } from '@/components/common/table'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { ChipIsActive } from '@/components/common/chipIsActive'
import { Button } from '@/components/ui/button'
import { SquarePen } from 'lucide-react'
import Container from '@/components/common/containter'
import usePermission from '@/hooks/use-permission'

const useUsersTable = () => {
  const { myPermission } = usePermission()
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const dialogDetailsRef = useRef<DialogDetailsRef>(null)
  const [modalImportUser, setModalImportUser] = useState(false)
  const columnHelper = createColumnHelper<UserType>()
  const openDialogEditUser = (user: UserType) => {
    dialogDetailsRef.current?.setDefaultUser(user)
  }
  const columns = useMemo<ColumnDef<UserType, any>[]>(() => [
    columnHelper.accessor('username', {
      header: ({ column }) => <Header label='Username' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => <Header label='Name' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('role.name', {
      header: ({ column }) => <Header label='Role' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('section.name', {
      header: ({ column }) => <Header label='Section' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('department.name', {
      header: ({ column }) => <Header label='Department' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('center.name', {
      header: ({ column }) => <Header label='Center' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>,
    }),
    columnHelper.accessor('isActive', {
      header: ({ column }) => <Header label='Status' sortAble column={column} />,
      cell: info => <ChipIsActive isActive={info.getValue()} />,
      meta: {
        headerClass: 'w-[5rem]'
      }
    }),

    ...(myPermission?.["edit.user"] ? [columnHelper.display({
      id: 'actions',
      enableHiding: false,
      size: 10,
      cell: info => {
        const user = info.row.original
        return (
          <div>
            <Button variant='ghost' onClick={() => openDialogEditUser(user)}>
              <SquarePen />
            </Button>
          </div>
        )
      },
      meta: {
        headerClass: 'w-[3rem]'
      }

    }),] : [])

  ], [openDialogEditUser, myPermission])
  const {
    table,
    usersTable,
    triggerFetch,
    isLoading,
    state: { status, role, section, center, searchText,
      department
    },
    setState: {
      setPage,
      setLimit,
      setStatus,
      setRole,
      setSection,
      setCenter,
      setSearchText,
      setDepartment
    }
  } = useUsers({
    columns
  })
  const openDialogCreateUser = () => {
    dialogDetailsRef.current?.setDefaultUser(null)
  }
  return {
    openDialogCreateUser,
    myPermission,
    setSearchText,
    searchText,
    setIsOpenFilter,
    isLoading,
    table,
    usersTable,
    setModalImportUser,
    setPage,
    setLimit,
    dialogDetailsRef,
    triggerFetch,
    modalImportUser,
    department,
    setDepartment,
    isOpenFilter,
    setRole,
    setStatus,
    setSection,
    setCenter,
    role,
    section,
    center
  }
}
export function UserManagementClientPage() {
  return <></>
}
export default function UserManagementPage() {
  const {
    openDialogCreateUser,
    myPermission,
    setSearchText,
    searchText,
    setIsOpenFilter,
    isLoading,
    table,
    usersTable,
    setModalImportUser,
    setPage,
    setLimit,
    dialogDetailsRef,
    triggerFetch,
    modalImportUser,
    department,
    setDepartment,
    isOpenFilter,
    setRole,
    setStatus,
    setSection,
    setCenter,
    role,
    section,
    center
  } = useUsersTable()

  return (
    <div >
      {myPermission?.["add.user"] &&
        <Container className='mb-0 pb-0'>
          <div className='flex justify-end mt-4'>
            <BtnAddUser
              onOpenDialogCreateUser={() => openDialogCreateUser()}
              onOpenDialogImportUser={() => setModalImportUser(true)}
            />
          </div>
        </Container>
      }
      <CardPageWrapper className='mt-6'>
        <div className='flex items-center gap-3 mb-4'>
          <Typography variant='h6' >
            User Lists
          </Typography>
          <div className='flex-1' />
          <InputFilter setValue={setSearchText} value={searchText} placeholder='Search by Username, Name' className='w-[243px] h-[1.81rem] rounded-[4px]' />
          <BtnFilter onClick={() => setIsOpenFilter(true)} />
        </div>
        <DataTable
          loading={isLoading}
          table={table}
          page={usersTable?.page ?? 1}
          limit={usersTable?.limit ?? 10}
          total={usersTable?.total ?? 0}
          totalPages={usersTable?.totalPages ?? 0}
          setPage={setPage}
          setLimit={setLimit}
        />

      </CardPageWrapper>
      <DialogDetails
        ref={dialogDetailsRef}
        getUsers={triggerFetch}
      />
      <ExcelUploadDialog open={modalImportUser} setOpen={setModalImportUser} />
      <FilterUsersModal
        department={department}
        setDepartment={setDepartment}
        isOpen={isOpenFilter}
        setIsOpen={setIsOpenFilter}
        setRole={setRole}
        setStatus={setStatus}
        setSection={setSection}
        setCenter={setCenter}
        status={status}
        role={role}
        section={section}
        center={center}
      />
    </div>
  )
}
