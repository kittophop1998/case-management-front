import { ObjPermission, PermissionKeyType } from "@/types/permission.type";

// TODO: CHANGE THIS LOGIC
export default function checkIsPermissionExist(
  key: PermissionKeyType,
  permissions: ObjPermission[]
): boolean {
  if (!permissions?.length) {
    return false;
  }
  if (!key) {
    return false;
  }
  const found = permissions.find((element) => element.id === key);
  return !!found;
}
