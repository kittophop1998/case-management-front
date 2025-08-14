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

export default function UserManagementPage() {
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const dialogDetailsRef = useRef<DialogDetailsRef>(null)
  const [modalImportUser, setModalImportUser] = useState(false)
  const columnHelper = createColumnHelper<UserType>()
  const openDialogEditUser = (user: UserType) => {
    dialogDetailsRef.current?.setDefaultUser(user)
  }
  const columns = useMemo<ColumnDef<UserType, any>[]>(() => [
    // columnHelper.accessor('staffId', {
    //   header: ({ column }) => <Header label='Staff ID' sortAble column={column} />,
    //   cell: info => <div>{info.getValue()}</div>
    // }),
    // columnHelper.accessor('email', {
    //   header: ({ column }) => <Header label='Domain Name' sortAble column={column} />,
    //   cell: info => {
    //     const email = info.getValue()
    //     const domain = email.split('@')[0] || ''
    //     return <div>{domain}</div>
    //   }
    // }),
    columnHelper.accessor('username', {
      header: ({ column }) => <Header label='Username' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
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
      cell: info => <ChipIsActive isActive={info.getValue()} />
    }),
    columnHelper.display({
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
      }
    }),
  ], [openDialogEditUser])
  const {
    table,
    usersTable,
    triggerFetch,
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

  return (
    <div>
      <Container>
        <div className='flex justify-end mb-3 mt-3'>
          <BtnAddUser
            onOpenDialogCreateUser={() => openDialogCreateUser()}
            onOpenDialogImportUser={() => setModalImportUser(true)}
          />
        </div>
      </Container>
      <CardPageWrapper>
        <div className='flex items-center gap-3 mb-3'>
          <Typography variant='h3' as='p'>
            User Lists
          </Typography>
          <div className='flex-1' />
          <InputFilter setValue={setSearchText} value={searchText} placeholder='Search by Username, Name' className='w-[243px]' />
          <BtnFilter onClick={() => setIsOpenFilter(true)} />
        </div>
        <DataTable
          loading={false}
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
