'use client'
import { Typography } from "@/components/common/typography";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { useGetDropdownQuery } from "@/features/system/systemApiSlice";
import { useEditTableMutation, useLazyGetTableQuery } from "@/features/permission/permissionApiSlice";
import { useEffect, useRef, useState, useMemo } from "react";
import { useTable } from "@/hooks/use-table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable, Header } from "@/components/common/table";
import BtnEdit from "@/components/button/btn-edit";
import { CheckIsActive } from "@/components/common/check-is-active";
import { SearchSection } from "./_components/search-section";
import { Button } from "@/components/common/Button";
import { Search, Undo2 } from "lucide-react";
import { AccessControlPermissionType, RolesType } from "@/types/access-control.type";
import { isDirty } from "zod/v3";
import { FormError } from "@/components/form/form-error";
import { getErrorText } from "@/services/api";
import { checkPassword } from "@/components/common/dialog-check-password";
import { dialogAlert } from "@/components/common/dialog-alert";
import getTextByValueDropdown from "@/lib/utils/get-text-by-value-dropdown";
// AccessControlPage.whyDidYouRender = true




export type DataAccessControl = {
  permission: AccessControlPermissionType;
  roles: RolesType[];
}
export default function AccessControlPage({
}: Readonly<{
}>) {
  const [form, setForm] = useState<Record<AccessControlPermissionType, DataAccessControl>>({})
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
            const formEditPermission = form[`${info.row.original.name}`]
            const isFormEditActive = (formEditPermission?.roles || []).includes(role.name)
            // const isFormActive = formPermission ? formPermission[role.name] : undefined;
            // const isFormActive = form[`${info.row.original.name}`]
            const realActive = formEditPermission === undefined ? isActive : isFormEditActive
            return (
              <div onClick={() => isEdit && handleClickChange(
                // role.name, info.row.original.name, !realActive, {
                // isFormActive,
                // isActive,
                // }
                {
                  original: info.row.original,
                  role: role.name,
                },
                !realActive
              )} >
                <CheckIsActive isActive={realActive} className={isEdit ? 'cursor-pointer' : ''} />
              </div>
            )
          }
        })
      )),
    ]
  }, [roles, form, isEdit])
  const [getTable, { data: dataTable, isFetching, isError, error }] = useLazyGetTableQuery();
  const [edit, { error: errorEdit, isLoading: isLoadingEdit }] = useEditTableMutation()
  const { data: dataDropdown, error: errorDD, isFetching: isFetchingDD, isError: isErrorDD } = useGetDropdownQuery()
  const [displaySearch, setDisplaySearch] = useState<
    {
      department: null | string
      section: null | string
    }
  >({
    department: null,
    section: null,
  })
  useEffect(() => {
    setDisplaySearch({
      department: getTextByValueDropdown(search.department, ddData?.data?.departments),
      section: getTextByValueDropdown(search.section, ddData?.data?.sections),
    })
  }, [search.department, search.section])

  const memoizedData = useMemo(() => dataTable?.data || [], [dataTable]);
  const { table, sort, page, limit, setPage, setLimit } = useTable({
    data: memoizedData,
    columns,
  })

  useEffect(() => {
    const keys = Object.keys(form)
    if (keys.length > 0) {
      setIsFormDirty(true)
    } else {
      setIsFormDirty(false)
    }
  }, [form])

  const handleClickChange = async ({
    original,
    role,
  },
    newValue
  ) => {
    const currentForm = JSON.parse(JSON.stringify(form?.[`${original.name}`] ? form[`${original.name}`] : original))
    if (newValue) {
      currentForm.roles.push(role)
    } else {
      currentForm.roles = currentForm.roles.filter((r: string) => r !== role)
    }
    const dbRoles = [...original.roles].sort()
    const formRoles = [...currentForm.roles].sort()
    const isObjDirty = (JSON.stringify(dbRoles) !== JSON.stringify(formRoles));
    delete currentForm.name

    if (!isObjDirty) {
      setForm((current) => {
        const newForm = { ...current }
        delete newForm[`${original.name}`]
        return newForm
      })
    } else {
      setForm((current) => {
        return {
          ...current,
          [`${original.name}`]: currentForm
        }
      })
    }
    // if (newValue===)
    // if (isActiveDB === newValue) {
    //   setForm((current) => {
    //     const newForm = { ...current }
    //     delete newForm[`${role}$$$${action}`]
    //     return newForm
    //   })
    //   return
    // }
    // setForm((current) => {
    //   return {
    //     ...current,
    //     [`${role}$$$${action}`]: newValue
    //   }
    // })
  }

  useEffect(() => {
    fetchTable()
  }, [page, limit, sort, search])

  const fetchTable = () => {
    if (!search.department || !search.section) {
      return
    }
    getTable({
      page,
      limit,
      sort,
      department: search.department,
      section: search.section,
      text: search.text,
    })
  }

  const handleSave = async () => {
    try {
      if (!search.department || !search.section) {
        alert('Please select department and section')
        return
      }
      const password = await checkPassword()
      if (!password) return // กดยกเลิก หรือกรอกผิด
      let body = []
      for (const key in form) {
        body.push(form[key])
      }
      let resEdit = await edit({
        body: body,
        department: search.department,
        section: search.section
      }).unwrap()
      fetchTable()
      setForm({})
      dialogAlert(true)

    } catch (error) {
      await dialogAlert(false,
        {
          title: '',
          message: error.message,
          confirmText: 'Try again',
          cancelText: 'Try again',
          onConfirm: () => { },
          onCancel: () => { }
        }
      )
    }
  }
  console.count(`rerender`)
  const confirmChangeGroup = async () => {
    if (!isFormDirty) {
      return true
    }
    if (await confirm('You have unsaved changes. Do you want to discard them?')) {
      setForm({})
      return true
    } else {
      return false
    }
  }

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
        confirmChangeGroup={confirmChangeGroup}
        error={errorDD}
        isError={isErrorDD}
        dataDropdown={dataDropdown}
        isFetching={isFetchingDD}
      />
      {!!error && <FormError message={getErrorText(error)} />}
      {
        (!!search.department && !!search.section) ?
          <>
            {
              // isFetching ? <Typography variant="body2">Loading...</Typography> :
              <>
                <div className="flex">
                  <div className="w-[clamp(300px,100%,342px)]">
                    <Typography>Department: {displaySearch.department || '-'}</Typography>
                  </div>
                  <div className="w-[clamp(300px,100%,342px)]">
                    <Typography>Section:   {displaySearch.section || '-'}</Typography>
                  </div>
                  <div className="flex-1" />
                  {
                    isEdit ?
                      <>
                        {isFormDirty ? <Button loading={isLoadingEdit} variant='black' onClick={handleSave}>
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
                  loading={isFetching}
                  table={table}
                  page={dataTable?.page ?? 1}
                  limit={dataTable?.limit ?? 10}
                  total={dataTable?.total ?? 0}
                  totalPages={dataTable?.totalPages ?? 0}
                  setPage={setPage}
                  setLimit={setLimit}
                />
              </>
            }


          </> : <>
            <div className="w-full h-[60%] flex items-center justify-center  opacity-70">
              <div className="space-y-4">
                <div className="flex justify-center ">
                  <Search color="#737373" size={60} />
                </div>
                <Typography className="text-center  text-[#737373]">
                  Please select both Department and Section to view details
                </Typography>
              </div>
            </div>
          </>
      }

    </CardPageWrapper>
  )
}

