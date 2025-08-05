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
import { useEffect, useMemo, useRef, useState } from 'react'
import { ExcelUploadDialog } from './_components/upload-excel-test/excel-upload-dialog'
import { useUsers } from '@/hooks/user/useUsers'
import { FilterUsersModal } from './_components/filter-modal'
import { getErrorMessageAPI } from '@/lib/utils/get-error-message-api'
import { dialogAlert } from '@/components/common/dialog-alert'
import { useTable } from '@/hooks/use-table'
import { DataTable, Header } from '@/components/common/table'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { ChipIsActive } from '@/components/common/chipIsActive'
import { Button } from '@/components/ui/button'
import { SquarePen } from 'lucide-react'

export default function UserManagementPage() {
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const dialogDetailsRef = useRef<DialogDetailsRef>(null)
  const [modalImportUser, setModalImportUser] = useState(false)
  const columnHelper = createColumnHelper<UserType>()
  const openDialogEditUser = (user: UserType) => {
    dialogDetailsRef.current?.setDefaultUser(user)
  }
  const columns = useMemo<ColumnDef<UserType, any>[]>(() => [
    columnHelper.accessor('agentId', {
      header: ({ column }) => <Header label='Id' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('username', {
      header: ({ column }) => <Header label='Name' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('email', {
      header: ({ column }) => <Header label='Domain Name' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('role.name', {
      header: ({ column }) => <Header label='Role' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
    }),
    columnHelper.accessor('team.name', {
      header: ({ column }) => <Header label='Team' sortAble column={column} />,
      cell: info => <div>{info.getValue()}</div>
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
    getUsers,
    triggerFetch,
    state: { status, role, team, center, searchText },
    setState: {
      setPage,
      setLimit,
      setStatus,
      setRole,
      setTeam,
      setCenter,
      setSearchText
    }
  } = useUsers({
    columns
  })

  const openDialogCreateUser = () => {
    dialogDetailsRef.current?.setDefaultUser(null)
  }

  return (
    <div>
      <div className='flex justify-end mb-3 mt-3'>
        <BtnAddUser
          onOpenDialogCreateUser={() => openDialogCreateUser()}
          onOpenDialogImportUser={() => setModalImportUser(true)}
        />
      </div>
      <CardPageWrapper>
        <div className='flex gap-3 mb-3'>
          <Typography variant='h3' as='p'>
            User Lists
          </Typography>
          <div className='flex-1' />
          <InputFilter setValue={setSearchText} value={searchText} />
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
        isOpen={isOpenFilter}
        setIsOpen={setIsOpenFilter}
        setRole={setRole}
        setStatus={setStatus}
        setTeam={setTeam}
        setCenter={setCenter}
        status={status}
        role={role}
        team={team}
        center={center}
      />
    </div>
  )
}
