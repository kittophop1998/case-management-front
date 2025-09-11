import { redirectAfterLoginByRole, userRoles } from "@/const/user-config";
import { lang } from "@/services/api";
import { UserRolesType } from "@/types/user.type";
interface GetInitPathByRoleOptionProps {
  forceGo?: boolean;
}
function getInitPathByRole(
  currentPath: string,
  currentRole: UserRolesType,
  option: GetInitPathByRoleOptionProps = {}
): string {
  if (currentPath.includes(`${lang}/login`) || !!option?.forceGo) {
    let path = redirectAfterLoginByRole[currentRole];
    if (!path) {
      throw new Error(`No redirect path defined for role '${currentRole}'`);
    }
    return `/${lang}/${path}`;
  } else {
    if (!userRoles.includes(currentRole)) {
      throw new Error("Invalid role");
    }
  }
  throw new Error(
    `No redirect path defined for role '${currentRole}' in current path '${currentPath}'`
  );
}
export default getInitPathByRole;
