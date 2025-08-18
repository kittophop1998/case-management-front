import { UserRolesType } from "@/types/user.type";

export const userRoles: UserRolesType[] = [
  "Admin",
  "User",
  "Staff",
  "AsstManager Up",
  "Supervisor",
];

export const redirectAfterLoginByRole: Record<UserRolesType, string> = {
  Admin: "/user-management",
  System: "/user-management",
  Staff: "/user-management",
  User: "/case-management",
  "AsstManager Up": "/assistant-management",
  Supervisor: "/supervisor-management",
};
