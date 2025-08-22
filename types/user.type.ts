export type UserRolesType =
  | "Admin"
  | "User"
  | "Staff"
  | "AsstManager Up"
  | "Supervisor"
  | "System"
  | "CMS Admin";

export type JsonJoinDetails = {
  id: string;
  name: string;
};
//date '2025-07-24T02:16:42.171159Z'
export type UserType = {
  department: JsonJoinDetails;
  id: string;
  operatorId: number;
  staffId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  username: string;
  name: string;
  email: string;
  section: JsonJoinDetails;
  isActive: boolean;
  center: JsonJoinDetails;
  role: {
    id: string;
    name: UserRolesType;
  };
};

export type UserProfileType = {
  center: JsonJoinDetails;
  createdAt: string;
  deletedAt: null;
  email: string;
  id: string;
  isActive: boolean;
  name: string;
  role: {
    id: string;
    name: UserRolesType;
  };
  // & { Permissions: any[] };
  section: JsonJoinDetails;
  updatedAt: string;
  username: string;
  permissions: any[];
};
