import {
  useGetUsersMutation,
  GetUsersRequest,
} from "@/features/users/usersApiSlice";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "../use-table";

export const useUsers = ({ columns = [] }: { columns: any[] }) => {
  const [status, setStatus] = useState<boolean | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [team, setTeam] = useState<string | null>(null);
  const [center, setCenter] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [numberTrickerFetch, setNumberTrickerFetch] = useState<number>(1);
  const [fetchUsers, { data, isLoading, isError, error, isSuccess }] =
    useGetUsersMutation();
  const dataList: any[] = useMemo(() => data?.data || [], [data]);

  const getUsers = async (params: GetUsersRequest) => {
    console.log("getUsers.call()", params);
    try {
      const result = await fetchUsers(params).unwrap();
      console.log("Fetched users:", result);
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
      agentId: "agent_id",
      role_name: "role",
      team_name: "team",
      center_name: "center",
      isActive: "is_active",
    },
  });
  const triggerFetch = () => {
    console.log("triggerFetch called");
    // TODO:change this to lazy
    setNumberTrickerFetch((prev) => prev + 1);
  };

  const defaultData = {
    data: [],
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  };

  useEffect(() => {
    getUsers({
      page,
      limit,
      status,
      role,
      team,
      center,
      sort,
      searchText,
    });
  }, [
    page,
    limit,
    status,
    role,
    team,
    center,
    sort,
    searchText,
    numberTrickerFetch,
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
      team,
      center,
      sort,
      searchText,
    },
    setState: {
      setPage,
      setLimit,
      setStatus,
      setRole,
      setTeam,
      setCenter,
      setSearchText,
    },
  };
};
