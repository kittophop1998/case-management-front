import { PermissionKeyType } from "@/types/permission.type";
export const path2name: Record<string, string> = {
  // default
  "/": " Case Management",
  // 1st level
  "/settings": "User Management",
  "/user-management": "User Management",
  "/access-control": "Access Control",
  "/report": "Report",
  "/inquiry-log": "Inquiry Log",
  // 2nd level
  "/case/management": "Case Management",
  "/customer/search": "Search Customer",
  "/customer/dashboard": "Customer Dashboard",
};

export const path2clientpath: Record<string, { name: string; goto: string }[]> =
  {
    // default
    "/": [],
    // 1st level
    "/settings": [
      {
        name: "Settings",
        goto: "",
      },
    ],
    "/user-management": [
      {
        name: "User",
        goto: "",
      },
    ],
    "/access-control": [
      {
        name: "Access Control",
        goto: "",
      },
    ],
    "/report": [
      {
        name: "Report",
        goto: "",
      },
    ],
    "/inquiry-log": [
      {
        name: "Inquiry Iog",
        goto: "",
      },
    ],
    // 2nd level
    "/case/management": [
      {
        name: "Case Management",
        goto: "",
      },
    ],
    "/customer/search": [
      {
        name: "Search Customer",
        goto: "",
      },
    ],
    "/customer/dashboard": [
      {
        name: "Search Customer",
        goto: "/customer/search",
      },
      {
        name: "Customer Dashboard",
        goto: "",
      },
    ],
    // 1102001313257
    "/customer/dashboard/note": [
      {
        name: "Search Customer",
        goto: "/customer/search",
      },
      {
        name: "Customer Dashboard",
        goto: "/customer/dashboard",
      },
      {
        name: "Note List",
        goto: "",
      },
    ],
  };

export const path2sidebar: Record<string, string> = {
  // default
  "/": "",
  // 1st level
  "/settings": "Settings",
  "/case-management": "Case Management",
  "/user-management": "User Management",
  "/access-control": "Access Control",
  "/report": "Report",
  "/inquiry-log": "Inquiry Log",
  // 2nd level
  "/case/management": "Customer Dashboard",
  "/customer/search": "Customer Dashboard",
  "/customer/dashboard": "Customer Dashboard",
};

export const navMain: {
  title: string;
  url: string;
  permission?: PermissionKeyType[];
}[] = [
  {
    title: "Customer Dashboard",
    url: "/customer/search",
    permission: ["search.customer"],
  },
  {
    title: "Case Management",
    url: "/case-management",
    permission: ["view.case"],
  },
  {
    title: "Inquiry Log",
    url: "/inquiry-log",
    permission: ["view.inquirylog"],
  },
  {
    title: "Report",
    url: "/report",
    permission: ["view.report"],
  },
  {
    title: "Settings",
    url: "/settings",
    permission: ["view.setting"],
  },
  {
    title: "User Management",
    url: "/user-management",
    permission: ["view.user"],
  },
  {
    title: "Access Control",
    url: "/access-control",
    permission: ["view.accesscontrol"],
  },
];
