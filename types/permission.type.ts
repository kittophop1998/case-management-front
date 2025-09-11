export type PermissionKeyType =
  | "add.user"
  | "view.profile"
  | "view.case"
  | "view.custnote"
  | "view.accesscontrol"
  | "add.custnote"
  | "view.user"
  | "add.casenote"
  | "search.customer"
  | "edit.accesscontrol"
  | "edit.case"
  | "edit.user"
  | "add.case"
  | "view.report"
  | "view.setting"
  | "view.inquirylog"
  | "view.queue"
  | "view.api";

export type ObjPermission = {
  id: string;
  key: PermissionKeyType;
  name: string;
};
