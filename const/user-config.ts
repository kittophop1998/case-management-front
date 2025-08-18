import { UserRolesType } from "@/types/user.type";

export const userRoles: UserRolesType[] = [
  "Admin",
  "Staff",
  "Supervisor",
  "AsstManager Up",
  "System",
  "System",
  "CMS Admin",
];

export const redirectAfterLoginByRole: Record<UserRolesType, string> = {
  Admin: "/user-management",
  System: "/user-management",
  Staff: "/user-management",
  User: "/case-management",
  "AsstManager Up": "/assistant-management",
  Supervisor: "/supervisor-management",
  "CMS Admin": "/user-management",
};
