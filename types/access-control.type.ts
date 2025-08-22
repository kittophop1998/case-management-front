import { TableType } from "./table.type";
import { UserRolesType } from "./user.type";

export type AccessControlPermissionType = string;
export type AccessControlType = {
  permission: string;
  label: string;
  roles: UserRolesType[];
};
export type AccessControlTableType = TableType<AccessControlType>;
