import { redirectAfterLoginByRole, userRoles } from "@/const/user-config";
import { UserRolesType } from "@/types/user.type";

function getInitPathByRole(
  currentPath: string,
  currentRole: UserRolesType,
  tagDebug = ""
): string {
  // return "";
  console.log("getInitPathByRole.call()", tagDebug, currentPath, currentRole);
  if (currentPath.includes("/login")) {
    let path = redirectAfterLoginByRole[currentRole];
    if (!path) {
      throw new Error(`No redirect path defined for role ${currentRole}`);
    }
    return path;
  } else {
    if (!userRoles.includes(currentRole)) {
      throw new Error("Invalid role");
    }
  }
  throw new Error(
    `No redirect path defined for role ${currentRole} in current path ${currentPath}`
  );
}
export default getInitPathByRole;
