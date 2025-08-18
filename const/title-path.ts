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
        name: "settings",
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
        name: "access-control",
        goto: "",
      },
    ],
    "/report": [
      {
        name: "report",
        goto: "",
      },
    ],
    "/inquiry-log": [
      {
        name: "inquiry-log",
        goto: "",
      },
    ],
    // 2nd level
    "/case/management": [
      {
        name: "case-management",
        goto: "",
      },
    ],
    "/customer/search": [
      {
        name: "customer-search",
        goto: "",
      },
    ],
    "/customer/dashboard": [
      {
        name: "customer-search",
        goto: "/customer/search",
      },
      {
        name: "customer-dashboard",
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
  },
  {
    title: "Inquiry Log",
    url: "/inquiry-log",
  },
  {
    title: "Report",
    url: "/report",
  },
  {
    title: "Settings",
    url: "/settings",
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
