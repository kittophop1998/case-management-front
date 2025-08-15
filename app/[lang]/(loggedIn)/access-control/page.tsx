'use client'
import { Typography } from "@/components/common/typography";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { useLazyGetTableQuery } from "@/features/permission/permissionApiSlice";
import { useEffect, useRef, useState, useMemo } from "react";
import { useTable } from "@/hooks/use-table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable, Header } from "@/components/common/table";
import BtnEdit from "@/components/button/btn-edit";
import { CheckIsActive } from "@/components/common/check-is-active";
import { SearchSection } from "./_components/search-section";
import { Button } from "@/components/common/Button";
import { Undo2 } from "lucide-react";
// AccessControlPage.whyDidYouRender = true




export default function AccessControlPage({
}: Readonly<{
}>) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [form, setForm] = useState<Record<string, Boolean>>({})
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false)
  const [search, setSearch] = useState({
    department: '',
    section: '',
    text: ''
  });
  const { data: ddData } = useGetDropdownQuery();
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
            const isFormActive = !!form[`${role.name}$$$${info.row.original.name}`]
            const realActive = isActive || isFormActive
            return (
              <div onClick={() => handleClickChange(role.name, info.row.original.name, !realActive)} >
                <CheckIsActive isActive={realActive} className={realActive ? 'cursor-pointer' : ''} />
              </div>
            )
          }
        })
      )),
    ]
  }, [roles, form])
  const [getTable, { data: dataTable }] = useLazyGetTableQuery();
  const memoizedData = useMemo(() => dataTable?.data || [], [dataTable]);
  const { table, sort, page, limit, setPage, setLimit } = useTable({
    data: memoizedData,
    columns,
  })
  const handleClickChange = (role, action, value) => {
    setIsFormDirty(true)
    console.log(`handleClickChange`, role, action, value)
    setForm((current) => {
      return {
        ...current,
        [`${role}$$$${action}`]: value
      }
    })
  }
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
  console.count(`rerender`)
  return (
    <CardPageWrapper classNameCard="space-y-3 mt-6">
      <Typography >
        Manage Access Control
      </Typography>
      <Typography variant="body2">
        Select Department and Section for Manage Access Function
      </Typography>
      <SearchSection
        search={search}
        setSearch={setSearch}
      />
      <div className="flex">
        <div className="w-[clamp(300px,100%,342px)]">
          <Typography>Department: -</Typography>
        </div>
        <div className="w-[clamp(300px,100%,342px)]">
          <Typography>Section:  -</Typography>
        </div>
        <div className="flex-1" />
        {
          isEdit ?
            <>
              {isFormDirty ? <Button variant='black'>
                Save
              </Button> :
                <Button variant='black' onClick={() => { setIsEdit((current => !current)) }}>
                  <Undo2 />
                  Back
                </Button>
              }


            </> :
            <>
              <BtnEdit onClick={() => { setIsEdit((current => !current)) }} variant="black" text='Edit' className={isEdit ? 'bg-primary' : ''} />
            </>
        }
      </div>

      <Typography variant="body2">
        Function: {dataTable?.total || 0}
      </Typography>

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
  )
}

