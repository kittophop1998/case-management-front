import { TableType } from "./table.type";

export type RolesType =
  | "Supervisor"
  | "Manager"
  | "Admin"
  | "Agent"
  | "Staff"
  | "Support"
  | "Staff";
export type AccessControlPermissionType = string;
export type AccessControlType = {
  permission: string;
  label: string;
  roles: RolesType[];
};
export type AccessControlTableType = TableType<AccessControlType>;
