function getInitPathByRole(
  currentPath: string,
  currentRole: "Admin" | "User" | "Staff" | "AsstManager Up" | "Supervisor",
  tagDebug = ""
): string {
  // return "";
  console.log("getInitPathByRole.call()", tagDebug, currentPath, currentRole);
  if (currentPath.includes("/login")) {
    switch (currentRole) {
      case "Staff":
        return "/th/user-management";
      // return "/user-management";
      case "User":
        return "/th/case-management";
      // return "/case-management";
      case "AsstManager Up":
        return "/th/assistant-management";
      case "Supervisor":
        return "/th/supervisor-management";
      default:
        return "";
    }
  } else {
    if (!["Admin", "User"].includes(currentRole)) {
      return "/th/login";
      // return "/login";
    }
  }
  return "";
}
export default getInitPathByRole;
