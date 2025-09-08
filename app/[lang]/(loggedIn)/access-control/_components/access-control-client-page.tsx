'use client'
import { useGetDropdownQuery } from "@/features/systemApiSlice";
import { useEditTableMutation, useLazyGetTableQuery } from "@/features/permissionApiSlice";
import { useEffect, useState, useMemo } from "react";
import { useTable } from "@/hooks/use-table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataTable, Header } from "@/components/common/table";
import BtnEdit from "@/components/button/btn-edit";
import { CheckIsActive } from "@/components/common/check-is-active";
import { SearchSection } from "./search-section";
import { Button } from "@/components/common/Button";
import { Search, Undo2 } from "lucide-react";
import { AccessControlPermissionType } from "@/types/access-control.type";
import { FormError } from "@/components/form/form-error";
import { getErrorText } from "@/services/api";
import { checkPassword } from "@/components/common/dialog-check-password";
import { dialogAlert } from "@/components/common/dialog-alert";
import getTextByValueDropdown from "@/lib/utils/get-text-by-value-dropdown";
import usePermission from "@/hooks/use-permission";
import { UserRolesType } from "@/types/user.type";
import BtnSave from "@/components/button/btn-save";
import { Typography } from "@/components/common/typography";

export type DataAccessControl = {
    permission: AccessControlPermissionType;
    roles: UserRolesType[];
}
const useEditAccessControl = () => {

    const [form, setForm] = useState<Record<AccessControlPermissionType, DataAccessControl>>({})
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isFormDirty, setIsFormDirty] = useState<boolean>(false)

    return { form, setForm, isEdit, setIsEdit, isFormDirty, setIsFormDirty }
}
const useAccessControlTable = () => {
    const [getTable, { data: dataTable, isFetching, isError, error }] = useLazyGetTableQuery();
    const [edit, { error: errorEdit, isLoading: isLoadingEdit }] = useEditTableMutation()
    const { form, setForm, isEdit, setIsEdit, isFormDirty, setIsFormDirty } = useEditAccessControl()
    const { data: ddData } = useGetDropdownQuery();
    const [search, setSearch] = useState<
        {
            department: string;
            section: string;
            text: string;
        }
    >({
        department: '',
        section: '',
        text: ''
    });
    const columnHelper = createColumnHelper<any>()
    const roles = (ddData?.roles || []);
    const columns = useMemo<ColumnDef<any, any>[]>(() => {
        return [
            columnHelper.accessor('name', {
                header: ({ column }) => <Header column={column} label='Permission' sortAble />,
                cell: info => <div>{info.getValue()}</div>
            }),
            ...(roles.filter(role => (role.name !== 'CMS Admin' && role.name !== 'System')).map(role =>
                columnHelper.accessor(`roles.${role.name}`, {
                    header: ({ column }) => <Header column={column} label={role.name} />,
                    cell: info => {
                        const isActive = (info?.row?.original?.roles || []).includes(role.name)
                        const formEditPermission = form[`${info.row.original.name}`]
                        const isFormEditActive = (formEditPermission?.roles || []).includes(role.name as UserRolesType)
                        const realActive = formEditPermission === undefined ? isActive : isFormEditActive
                        return (
                            <div onClick={() => isEdit && handleClickChange(
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
            department: getTextByValueDropdown(search.department, ddData?.departments || []),
            section: getTextByValueDropdown(search.section, ddData?.sections || []),
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

    const handleClickChange = async (
        {
            original,
            role,
        }: {
            role: UserRolesType
            original: {
                name: string
                roles: UserRolesType[]
            }
        },
        newValue: boolean
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

        } catch (error: unknown) {
            if (error instanceof Error) {
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
    return {
        search, setSearch, ddData, columns, form, setForm,
        isEdit, setIsEdit, isFormDirty, setIsFormDirty,
        confirmChangeGroup, errorDD, isErrorDD, dataDropdown, isFetchingDD, error, displaySearch
        , isLoadingEdit, handleSave, dataTable, isFetching, table, page, limit, setPage, setLimit
    }
}

export function AccessControlClientPage() {
    const { search, setSearch, ddData, columns, form, setForm,
        isEdit, setIsEdit, isFormDirty, setIsFormDirty,
        confirmChangeGroup, errorDD, isErrorDD, dataDropdown, isFetchingDD, error, displaySearch
        , isLoadingEdit, handleSave, dataTable, isFetching, table, page, limit, setPage, setLimit } = useAccessControlTable()
    const { myPermission } = usePermission()
    return <>
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
                        <>
                            <div className="flex items-end">
                                <div className="w-[clamp(300px,100%,342px)]">
                                    <Typography className="font-medium">Department: {displaySearch.department || '-'}</Typography>
                                </div>
                                <div className="w-[clamp(300px,100%,342px)]">
                                    <Typography className="font-medium">Section:   {displaySearch.section || '-'}</Typography>
                                </div>
                                {
                                    myPermission?.["edit.accesscontrol"] && <>
                                        <div className="flex-1" />
                                        {
                                            isEdit ?
                                                <>
                                                    {isFormDirty ?
                                                        <BtnSave loading={isLoadingEdit} onClick={handleSave}>
                                                        </BtnSave> :
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
                                    </>
                                }
                            </div>
                            <Typography variant="body2" className="mb-4">
                                Function: {dataTable?.permCount || 0}
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

    </>
}
