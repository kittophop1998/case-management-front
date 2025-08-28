'use client'
import { Typography } from '@/components/common/typography'
import BtnFilter from '@/components/button/btn-filter'
import CardPageWrapper from '@/components/common/card-page-warpper'
import InputFilter from '@/components/common/input-filter'
import { UserType } from '@/types/user.type'
import { memo, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
// import { useUsers } from '@/hooks/user/useUsers'
import { DataTable, Header } from '@/components/common/table'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import { ChipIsActive } from '@/components/common/chipIsActive'
import { Button } from '@/components/ui/button'
import { SquarePen } from 'lucide-react'
import Container from '@/components/common/containter'
import usePermission from '@/hooks/use-permission'
import { DialogDetails, DialogDetailsRef } from '@/app/[lang]/(loggedIn)/user-management/_components/dialog-user-details'
import { BtnAddUser } from '@/app/[lang]/(loggedIn)/user-management/_components/btn-add-user'
import { ExcelUploadDialog } from '@/app/[lang]/(loggedIn)/user-management/_components/upload-excel-test/excel-upload-dialog'
import { FilterUsersModal } from '@/app/[lang]/(loggedIn)/user-management/_components/filter-modal'
import { GetUsersRequest, useLazyGetUsersQuery } from '@/features/usersApiSlice'
import { useTable } from '@/hooks/use-table'
import { TableType } from '@/types/table.type'
import { ApiResponse } from '@/types/api.type'
import { clone, isSame } from '@/lib/utils/object'
import { se } from 'date-fns/locale'
const defaultData = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
};
export const useUsersBackend = () => {
    const [
        fetchUsers,
        { currentData: data, isLoading, isError, error, isSuccess },
    ] = useLazyGetUsersQuery();
    const dataList: any[] = useMemo(() => data?.data || [], [data]);
    console.count(`useUsersBackend`)
    return {
        fetchUsers,
        dataList,
        data,
        isLoading,
        isError,
        error,
    }
};
let ITEM_PER_PAGE = 10;
let DEFAULT_PAGE = 1
export const useUsersFontend = (initialData: UserType[] = []) => {
    const filterMemo = useRef({
        status: true,
        role: null,
        section: null,
        center: null,
        sort: null,
        searchText: null,
        department: null,
        queueId: null,
        isNotInQueue: false
    })
    const [deletedUsers, setDeletedUsers] = useState<UserType[]>([])
    const [newDataset, setNewDataset] = useState<UserType[]>([])
    const [initialDatasetMemo, setInitialDatasetMemo] = useState<UserType[]>([])
    const [allDataset, setAllDataset] = useState<UserType[]>([])
    useEffect(() => {
        if (isSame(initialDatasetMemo, initialData)) return
        console.log(`initialDatasetMemo :`, initialDatasetMemo)
        setInitialDatasetMemo(initialData)
    }, [initialData]);

    useEffect(() => {
        const newAllDataset = [...newDataset, ...initialDatasetMemo]
        if (isSame(allDataset, newAllDataset)) return
        console.log(`initialDatasetMemo.current :`, initialDatasetMemo, `newDataset.current:`, newDataset.current)
        setAllDataset(newAllDataset)
    }, [initialDatasetMemo, newDataset]);

    const [data, setData] = useState({
        data: [],
        page: DEFAULT_PAGE,
        limit: ITEM_PER_PAGE,
        total: 0,
        totalPages: 1,
    });
    const dataList = useMemo(() => data.data, [data]);

    const fetchUsers = ({
        page,
        limit,
        status,
        role,
        section,
        center,
        sort,
        searchText,
        department,
        queueId,
        isNotInQueue
    }: GetUsersRequest) => {
        filterMemo.current = {
            page,
            limit,
            status,
            role,
            section,
            center,
            sort,
            searchText,
            department,
            queueId,
            isNotInQueue
        }
        let filtered = allDataset.filter(user => {

            return (
                (status === null || user.isActive === status) &&
                (role === null || user.role.id === role) &&
                (section === null || user.section.id === section) &&
                (center === null || user.center.id === center) &&
                // (sort === null || user.sort === sort) &&
                (searchText === null || `${user.name}`.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) &&
                (department === null || user.department.id === department)
                // (queueId === null || user.queue === queueId) &&
                // (isNotInQueue === false || user.inQueue === isNotInQueue)
            );
        });
        setData({
            // data: allDataset,
            data: filtered.slice((page - 1) * limit, page * limit),
            page: page,
            limit: ITEM_PER_PAGE,
            total: filtered.length,
            totalPages: Math.ceil(filtered.length / ITEM_PER_PAGE),
        })
    }
    const triggerFetch = () => {
        fetchUsers(
            filterMemo.current
        )
    }
    useEffect(() => {
        triggerFetch()
    }, [allDataset]);

    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState(false)

    const handleDeleteDataset = async (users: UserType[]) => {
        let cloneDeletedUsers = clone(deletedUsers);
        let cloneNewDataset = clone(newDataset);
        for (const user of users) {
            const foundIndex = cloneNewDataset.findIndex(u => isSame(u, user));
            if (foundIndex === -1) {
                cloneDeletedUsers.push(user)
            } else {
                cloneNewDataset.splice(foundIndex, 1);
            }
        }
        setDeletedUsers(cloneDeletedUsers);
        setNewDataset(cloneNewDataset);
    }
    const handleAddDataset = async (users: UserType[]) => {
        let cloneDeletedUsers = clone(deletedUsers);
        let cloneNewDataset = clone(newDataset);
        for (const user of users) {
            const foundIndex = cloneDeletedUsers.findIndex(u => isSame(u, user));
            if (foundIndex !== -1) {
                cloneDeletedUsers.splice(foundIndex, 1);
            } else {
                const foundIndex = cloneNewDataset.findIndex(u => isSame(u, user));
                if (foundIndex === -1) { cloneNewDataset.push(user); }
            }
        }
        setDeletedUsers(cloneDeletedUsers);
        setNewDataset(cloneNewDataset);
    }
    return {
        fetchUsers,
        dataList,
        data,
        isLoading,
        isError,
        error,
        handleDeleteDataset,
        handleAddDataset,
    }
};
// export const useUsersBackend = ({ columns = [], defaultFilter = {} }: { columns: any[]; defaultFilter?: any }) => {
//     // Initialize state with default filter values

//     const [
//         fetchUsers,
//         { currentData: data, isLoading, isError, error, isSuccess },
//     ] = useLazyGetUsersQuery();
//     const dataList: any[] = useMemo(() => data?.data || [], [data]);

//     return {
//         table,
//         usersTable: isError ? defaultData : data || defaultData,
//         isLoading,
//         isSuccess,
//         isError,
//         error,
//         triggerFetch,
//         state: {
//             page,
//             limit,
//             status,
//             role,
//             section,
//             center,
//             sort,
//             searchText,
//             department,
//         },
//         setState: {
//             setPage,
//             setLimit,
//             setStatus,
//             setRole,
//             setSection,
//             setCenter,
//             setSearchText,
//             setDepartment,
//         },
//     };
// };


interface UseUsersTableProps {
    prependColumns?: ColumnDef<UserType, any>[]
    appendColumns?: ColumnDef<UserType, any>[]
    editUser?: boolean
    dataList: UserType[]
    data: ApiResponse<UserType[]> | undefined,
    defaultFilter: any,
    fetchUsers: (filter: GetUsersRequest) => Promise<TableType<UserType>>,
    isError: boolean
}
const useUserManagement = ({
    prependColumns = [],
    appendColumns = [],
    editUser = false,
    dataList,
    data,
    defaultFilter = {},
    fetchUsers,
    isError
}: UseUsersTableProps) => {
    const { myPermission } = usePermission()
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [modalImportUser, setModalImportUser] = useState(false)
    // 
    const dialogDetailsRef = useRef<DialogDetailsRef>(null)
    const openDialogEditUser = (user: UserType) => {
        dialogDetailsRef.current?.setDefaultUser(user)
    }
    const openDialogCreateUser = () => {
        dialogDetailsRef.current?.setDefaultUser(null)
    }
    // 
    const columnHelper = createColumnHelper<UserType>()
    const columns = useMemo<ColumnDef<UserType, any>[]>(() => [
        ...prependColumns,
        columnHelper.accessor('username', {
            header: ({ column }) => <Header label='Username' sortAble column={column} />,
            cell: info => <div>{info.getValue()}</div>,
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
            cell: info => <ChipIsActive isActive={info.getValue()} />,
            meta: {
                headerClass: 'w-[5rem]'
            }
        }),
        ...((editUser && myPermission?.["edit.user"]) ? [columnHelper.display({
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
            },
            meta: {
                headerClass: 'w-[3rem]'
            }

        }),
        ] : []),
        ...appendColumns


    ], [openDialogEditUser, myPermission, prependColumns, appendColumns, editUser])

    const [status, setStatus] = useState<boolean | null>(defaultFilter.status || true);
    const [role, setRole] = useState<string | null>(defaultFilter.role || null);
    const [department, setDepartment] = useState<string | null>(defaultFilter.department || null);
    const [section, setSection] = useState<string | null>(defaultFilter.section || null);
    const [center, setCenter] = useState<string | null>(defaultFilter.center || null);
    const [queueId, setQueueId] = useState<string | null>(defaultFilter.queueId || null);
    const [isNotInQueue, setIsNotInQueue] = useState<boolean | null>(defaultFilter.isNotInQueue || null);
    const [searchText, setSearchText] = useState(defaultFilter.searchText || "");
    const { table, sort, page, limit, setPage, setLimit } = useTable({
        data: dataList,
        columns: columns,
        mapSortingName: {
            role_name: "role",
            section_name: "section",
            department_name: "department",
            center_name: "center",
            isActive: "is_active",
        },
    });
    const triggerFetch = async () => {
        await fetchUsers({
            page,
            limit,
            status,
            role,
            section,
            center,
            sort,
            searchText,
            department,
            queueId,
            isNotInQueue
        })?.unwrap();
    };
    useEffect(() => {
        triggerFetch();
    }, [
        page,
        limit,
        status,
        role,
        section,
        center,
        sort,
        searchText,
        department,
        queueId,
        isNotInQueue
    ]);
    return {
        openDialogCreateUser,
        myPermission,
        setSearchText,
        searchText,
        setIsOpenFilter,
        // isLoading,
        table,
        usersTable: isError ? defaultData : data || defaultData,
        setModalImportUser,
        setPage,
        setLimit,
        dialogDetailsRef,
        triggerFetch,
        modalImportUser,
        department,
        setDepartment,
        isOpenFilter,
        setRole,
        setStatus,
        setSection,
        setCenter,
        role,
        section,
        center,
        status,
        columns
    }
}

export const UsersTable = memo(({ addUser = false, editUser = false, MoreActions, prependColumns = [], appendColumns = [],
    defaultFilter = {},
    fetchUsers,
    dataList,
    data,
    isLoading,
    isError,
    error
}: UsersTableProps) => {
    const {
        openDialogCreateUser,
        myPermission,
        setSearchText,
        searchText,
        setIsOpenFilter,
        table,
        usersTable,
        setModalImportUser,
        setPage,
        setLimit,
        dialogDetailsRef,
        triggerFetch,
        modalImportUser,
        department,
        setDepartment,
        isOpenFilter,
        setRole,
        setStatus,
        setSection,
        setCenter,
        role,
        section,
        center,
        status,
        columns
    } = useUserManagement(
        {
            prependColumns,
            appendColumns,
            editUser,
            dataList,
            data,
            isLoading,
            isError,
            error,
            fetchUsers
        }
    )

    return (
        < >
            {(addUser && myPermission?.["add.user"]) &&
                <Container className='mb-0 pb-0'>
                    <div className='flex justify-end mt-4'>
                        <BtnAddUser
                            onOpenDialogCreateUser={() => openDialogCreateUser()}
                            onOpenDialogImportUser={() => setModalImportUser(true)}
                        />
                    </div>
                </Container>
            }
            <CardPageWrapper className='mt-6'>
                <div className='flex items-center gap-3 mb-4'>
                    <Typography variant='h6' >
                        User Lists
                    </Typography>
                    <div className='flex-1' />
                    <InputFilter setValue={setSearchText} value={searchText} placeholder='Search by Username, Name' className='w-[243px] h-[1.81rem] rounded-[4px]' />
                    <BtnFilter onClick={() => setIsOpenFilter(true)} />
                    {MoreActions && MoreActions}
                </div>
                <DataTable
                    loading={isLoading}
                    table={table}
                    page={usersTable?.page ?? 1}
                    limit={usersTable?.limit ?? 10}
                    total={usersTable?.total ?? 0}
                    totalPages={usersTable?.totalPages ?? 0}
                    setPage={setPage}
                    setLimit={setLimit}
                />
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
            </CardPageWrapper>
        </>
    )
})







interface UsersTableProps extends UseUsersTableProps {
    addUser?: boolean,
    MoreActions?: ReactNode,
    // useUsers: typeof useUsersBackend | typeof useUsersFontend

}