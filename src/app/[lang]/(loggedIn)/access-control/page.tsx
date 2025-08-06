'use client'
import { Typography } from "@/components/common/typography";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { DialogEditAccessControl } from "./_components/dialog-edit-access-control";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { useLazyGetTableQuery } from "@/features/permission/permissionApiSlice";
import { useEffect, useRef, useState, useMemo } from "react";
import { useTable } from "@/hooks/use-table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable, Header } from "@/components/common/table";
import BtnEdit from "@/components/button/btn-edit";
import { CheckIsActive } from "@/components/common/check-is-active";
import Container from "@/components/common/containter";

export default function DashboardPage({
}: Readonly<{
}>) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const { data: ddData, isLoading: isDDLoading } = useGetDropdownQuery();
  const columnHelper = createColumnHelper<any>()
  const roles = ddData?.data?.roles || [];
  const columns = useMemo<ColumnDef<any, any>[]>(() => {
    return [
      columnHelper.accessor('name', {
        header: ({ column }) => <Header column={column} label='Permission' sortAble />,
        cell: info => <div>{info.getValue()}</div>
      }),
      ...(roles.map(role =>
        columnHelper.accessor(`roles.${role.name}`, {
          header: ({ column }) => <Header column={column} label={role.name} sortAble />,
          cell: info => {
            const isActive = (info?.row?.original?.roles || []).includes(role.name)
            return (
              <div>
                <CheckIsActive isActive={isActive} />
              </div>
            )
          }
        })
      )),
      columnHelper.accessor('action', {
        header: ({ column }) => <Header column={column} label='Permission Key' className='w-[3rem]' />,
        cell: info =>
          <div className='w-[3rem]'>
            <BtnEdit onClick={() => setObjEdit(info.row.original)} />
          </div>
      }),
    ]
  }, [roles])
  // 
  const [getTable, { data: dataTable, isLoading: isPermissionTableLoading }] = useLazyGetTableQuery();
  const { table, sort, page, limit, setPage, setLimit } = useTable({
    data: dataTable?.data || [],
    columns,
  })
  useEffect(() => {
    getTable({
      page,
      limit,
      sort,
    })
  }, [page, limit, sort])

  const dialogRef = useRef<any>(null)
  const setObjEdit = (obj: any) => {
    setDialogOpen(true)
    dialogRef.current?.setDefaultForm({
      ...obj,
      roles: obj.roles || [],
    })
  }
  return (
    <>
      <Container>
        <Typography className="my-3">All Function: {dataTable?.data?.length || 0}</Typography>
      </Container>
      <CardPageWrapper>
        <Typography className='mb-4'>Manage Access Lists</Typography>
        <DataTable
          loading={false}
          table={table}
          page={dataTable?.page ?? 1}
          limit={dataTable?.limit ?? 10}
          total={dataTable?.total ?? 0}
          totalPages={dataTable?.totalPages ?? 0}
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
          })
        }}
        accessControlData={{}}
      />
    </>
  )
}

