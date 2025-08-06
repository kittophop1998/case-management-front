const userRoles = [
  "Admin",
  "User",
  "Staff",
  "AsstManager Up",
  "Supervisor",
] as const;
function getInitPathByRole(
  currentPath: string,
  currentRole: "Admin" | "User" | "Staff" | "AsstManager Up" | "Supervisor",
  tagDebug = ""
): string {
  // return "";
  console.log("getInitPathByRole.call()", tagDebug, currentPath, currentRole);
  if (currentPath.includes("/login")) {
    switch (currentRole) {
      case "Admin":
      case "Staff":
        return "/user-management";
      // return "/user-management";
      case "User":
        return "/case-management";
      // return "/case-management";
      case "AsstManager Up":
        return "/assistant-management";
      case "Supervisor":
        return "/supervisor-management";
      default:
        throw new Error(`Invalid role ${currentRole}`);
      // return "";
    }
  } else {
    if (!userRoles.includes(currentRole)) {
      throw new Error("Invalid role");
      // return "/th/login";
    }
  }
  return "";
}
export default getInitPathByRole;
