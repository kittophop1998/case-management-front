import {
  useLazyGetUsersQuery,
  GetUsersRequest,
} from "@/features/usersApiSlice";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "../use-table";
const defaultData = {
  data: [],
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};
export const useUsers = ({ columns = [] }: { columns: any[] }) => {
  const [status, setStatus] = useState<boolean | null>(true);
  const [role, setRole] = useState<string | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [center, setCenter] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [
    fetchUsers,
    { currentData: data, isLoading, isError, error, isSuccess },
  ] = useLazyGetUsersQuery();
  const dataList: any[] = useMemo(() => data?.data || [], [data]);

  const getUsers = async (params: GetUsersRequest) => {
    try {
      const result = await fetchUsers(params).unwrap();
      return result;
    } catch (err) {
      console.error("Failed to fetch users:", err);
      throw err;
    }
  };
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
  const triggerFetch = () => {
    getUsers({
      page,
      limit,
      status,
      role,
      section,
      center,
      sort,
      searchText,
      department,
    });
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
  ]);

  return {
    table,
    usersTable: isError ? defaultData : data || defaultData,
    getUsers,
    isLoading,
    isSuccess,
    isError,
    error,
    triggerFetch,
    state: {
      page,
      limit,
      status,
      role,
      section,
      center,
      sort,
      searchText,
      department,
    },
    setState: {
      setPage,
      setLimit,
      setStatus,
      setRole,
      setSection,
      setCenter,
      setSearchText,
      setDepartment,
    },
  };
};
