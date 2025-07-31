'use client'
import { Typography } from "@/components/common/typography";
import { TableAccessControl } from "./_components/table-access-control";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { DialogEditAccessControl } from "./_components/dialog-edit-access-control";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { permissionApiSlice, useLazyGetTableQuery } from "@/features/permission/permissionApiSlice";
import { useLazyGetMeQuery } from "@/features/auth/authApiSlice";
import { useEffect, useRef, useState } from "react";
import { set } from "zod";

export default function DashboardPage({
  // params
}: Readonly<{
  // params: Promise<{ lang: 'en' | 'th' }>
}>) {
  // const { lang } = await params
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(10)
  const [sort, setSort] = useState<string | null>(null)
  const [order, setOrder] = useState<'asc' | 'desc' | null>(null)
  const { data: ddData, isLoading: isDDLoading } = useGetDropdownQuery();
  // const { data: permissionTableData, isLoading: isPermissionTableLoading } = permissionApiSlice();
  const [getTable, { data: permissionTableData, isLoading: isPermissionTableLoading }] = useLazyGetTableQuery();

  useEffect(() => {
    getTable({
      page,
      limit,
      sort,
      order,
    })
  }, [page, limit, sort, order])
  const roles = ddData?.data?.roles || [];
  const dialogRef = useRef<any>(null)
  const setObjEdit = (obj: any) => {
    setDialogOpen(true)
    dialogRef.current?.setDefaultForm(obj)

  }
  return (
    <>
      <Typography className="my-3">All Function: {permissionTableData?.data?.length || 0}</Typography>
      <CardPageWrapper>
        <Typography className='mb-4'>Manage Access Lists</Typography>
        <TableAccessControl
          isLoading={false}
          roles={roles}
          onClickEdit={setObjEdit}
          objTable={
            permissionTableData || {
              data: [],
              page: 1,
              limit: 10,
              total: 0,
              totalPages: 0
            }
          }
          openDialogEditUser={
            (obj) => { }
          }
          setSort={setSort}
          setOrder={setOrder}
          setPage={setPage}
          setLimit={setLimit}
          sort={sort}
          order={order}
          page={page}
          limit={limit}
          isLoading={isPermissionTableLoading}
          isError={false}
          error={null}


        />
      </CardPageWrapper>
      <DialogEditAccessControl
        ref={dialogRef}
        roles={roles}
        isOpen={dialogOpen}
        onClose={() => {
          setDialogOpen(false)
        }}
        afterSubmit={() => {
          getTable({
            page,
            limit,
            sort,
            order,
          })
        }}
        accessControlData={{}}
      />
    </>
  )
}
