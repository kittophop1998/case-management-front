'use client'
import { Typography } from "@/components/common/typography";
import { TableAccessControl } from "./_components/table-access-control";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { DialogEditAccessControl } from "./_components/dialog-edit-access-control";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { permissionApiSlice, useLazyGetTableQuery } from "@/features/permission/permissionApiSlice";
import { useLazyGetMeQuery } from "@/features/auth/authApiSlice";
import { useEffect, useRef, useState, useMemo } from "react";
import { set } from "zod";
import { useTable } from "@/hooks/use-table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable, SortableHeader } from "@/components/common/table";
import BtnEdit from "@/components/common/btn-edit";
import { CheckIsActive } from "@/components/common/check-is-active";

export default function DashboardPage({
}: Readonly<{
}>) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const { data: ddData, isLoading: isDDLoading } = useGetDropdownQuery();
  const [getTable, { data: permissionTableData, isLoading: isPermissionTableLoading }] = useLazyGetTableQuery();
  const columnHelper = createColumnHelper<any>()
  const roles = ddData?.data?.roles || [];
  const columns = useMemo<ColumnDef<any, any>[]>(() => {
    return [
      columnHelper.accessor('label', {
        header: ({ column }) => <SortableHeader column={column} label='Permission' />,
        cell: info => <div>{info.getValue()}</div>
      }),
      ...(roles.map(role =>
        columnHelper.accessor(`roles.${role.name}`, {
          header: ({ column }) => <SortableHeader column={column} label={role.name} />,
          cell: info => {
            const isActive = info.row.original.roles.includes(role.name)
            return (
              <div>
                <CheckIsActive isActive={isActive} />
              </div>
            )
          }
        })
      )),
      columnHelper.accessor('action', {
        header: ({ column }) => <SortableHeader column={column} label='Permission Key' className='w-[3rem]' />,
        cell: info =>
          <div className='w-[3rem]'>
            <BtnEdit onClick={() => setObjEdit(info.row.original)} />
          </div>
      }),
    ]
  }, [roles])
  const { table, sort, order, page, limit, setPage, setLimit } = useTable({
    data: permissionTableData?.data || [],
    columns: columns,
  })
  useEffect(() => {
    getTable({
      page,
      limit,
      sort,
      order,
    })
  }, [page, limit, sort, order])

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
        <DataTable
          loading={false}
          table={table}
          page={permissionTableData?.page ?? 1}
          limit={permissionTableData?.limit ?? 10}
          total={permissionTableData?.total ?? 0}
          totalPages={permissionTableData?.totalPages ?? 0}
          setPage={setPage}
          setLimit={setLimit}
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

