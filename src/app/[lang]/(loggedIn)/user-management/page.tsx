'use client'
import { Typography } from '@/components/common/typography'
import BtnFilter from '@/components/common/btn-filter'
import CardPageWrapper from '@/components/common/card-page-warpper'
import InputFilter from '@/components/common/input-filter'
import { UserType } from '@/types/user.type'
import { TableUserManagement } from './_components/table'
import {
  DialogDetails,
  DialogDetailsRef
} from './_components/dialog-user-details'
import { BtnAddUser } from './_components/btn-add-user'
import { useEffect, useRef, useState } from 'react'
// import { DialogImportUser } from './_components/dialog-import-user'
import { ExcelUploadDialog } from './_components/upload-excel-test/excel-upload-dialog'
import { useUsers } from '@/hooks/user/useUsers'
import { FilterUsersModal } from './_components/filter-modal'
import { getErrorMessageAPI } from '@/lib/utils/get-error-message-api'

export default function UserManagementPage() {
  const dialogDetailsRef = useRef<DialogDetailsRef>(null)
  const [modalImportUser, setModalImportUser] = useState(false)
  const [modalUserDetails, setModalUserDetails] = useState(false)
  const {
    usersTable,
    isLoading,
    isError,
    error,
    isSuccess,
    getUsers,
    state: { page, limit, status, role, team, center, sort, order, searchText },
    setSate: {
      setPage,
      setLimit,
      setStatus,
      setRole,
      setTeam,
      setCenter,
      setSort,
      setOrder,
      setSearchText
    }
  } = useUsers()

  // return <div>UserManagementPage</div>


  if (isError) {
    return <div>{getErrorMessageAPI(error.data.message)}</div>
  }

  const openDialogEditUser = (user: UserType) => {
    dialogDetailsRef.current?.setDefaultUser(user)
    setModalUserDetails(true)
  }

  const openDialogCreateUser = () => {
    dialogDetailsRef.current?.setDefaultUser(null)
    setModalUserDetails(true)
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
          <BtnFilter />
        </div>
        <TableUserManagement
          setSort={setSort}
          setOrder={setOrder}
          isLoading={isLoading}
          usersTable={usersTable}
          openDialogEditUser={openDialogEditUser}
        />
      </CardPageWrapper>
      <DialogDetails
        ref={dialogDetailsRef}
        open={modalUserDetails}
        onClose={() => setModalUserDetails(false)}
      />
      <ExcelUploadDialog open={modalImportUser} setOpen={setModalImportUser} />
      <FilterUsersModal
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
