import { UserRolesType } from "@/types/user.type";

export const userRoles: UserRolesType[] = [
  "Admin",
  "Staff",
  "Supervisor",
  "AsstManager Up",
  "System",
  "CMS Admin",
];

export const redirectAfterLoginByRole: Record<UserRolesType, string> = {
  Admin: "/dashboard",
  System: "/dashboard",
  Staff: "/dashboard",
  User: "/dashboard",
  "AsstManager Up": "/dashboard",
  Supervisor: "/dashboard",
  "CMS Admin": "/dashboard",
};
