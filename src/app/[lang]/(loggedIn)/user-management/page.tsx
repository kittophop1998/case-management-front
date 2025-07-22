'use client';
import { Typography } from "@/components/common/typography";
import BtnFilter from "@/components/common/btn-filter";
import CardPageWrapper from "@/components/common/card-page-warpper";
import InputFilter from "@/components/common/input-filter";
import { UserType } from "@/types/user";
import { TableUserManagement } from "./_components/table";
import { DialogDetails, DialogDetailsRef } from "./_components/dialog-user-details";
import { BtnAddUser } from "./_components/btn-add-user";
import { useRef, useState } from "react";
import { DialogImportUser } from "./_components/dialog-import-user";
import { ExcelUploadDialog } from "./_components/upload-excel-test/excel-upload-dialog";

export default function UserManagementPage() {
  const dialogDetailsRef = useRef<DialogDetailsRef>(null);
  const [modalImportUser, setModalImportUser] = useState(false);
  const [modalUserDetails, setModalUserDetails] = useState(false);

  const data: UserType[] = []
  for (let i = 0; i < 110; i++) {
    data.push({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      role: i % 2 === 0 ? "Admin" : "User",
      team: `Team ${i % 3 + 1}`,
      center: `Center ${i % 2 + 1}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
    });
  }

  const openDialogEditUser = (user: UserType) => {
    dialogDetailsRef.current?.setDefaultUser(user);
    setModalUserDetails(true)
  }

  const openDialogCreateUser = () => {
    dialogDetailsRef.current?.setDefaultUser(null);
    setModalUserDetails(true)
  }

  return (
    <div>
      <div className="flex justify-end mb-3 mt-3">
        <BtnAddUser
          onOpenDialogCreateUser={() => openDialogCreateUser()}
          onOpenDialogImportUser={() => setModalImportUser(true)}
        />
      </div>
      <CardPageWrapper>
        <div className="flex gap-3 mb-3">
          <Typography variant="h3" as="p">
            User Lists
          </Typography>
          <div className="flex-1"></div>
          <InputFilter />
          <BtnFilter />
        </div>
        <TableUserManagement data={data} openDialogEditUser={openDialogEditUser} />
      </CardPageWrapper>
      <DialogDetails
        ref={dialogDetailsRef}
        open={modalUserDetails}
        onClose={() => setModalUserDetails(false)}
      />
      <DialogImportUser
        open={modalImportUser}
        onClose={() => setModalImportUser(false)}
      />
      <ExcelUploadDialog />

    </div>
  )
}
