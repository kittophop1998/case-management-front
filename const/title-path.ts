import { PermissionKeyType } from "@/types/permission.type";

export const path2name: Record<string, string> = {
  // default
  "/": " Case Management",
  // 1st level
  "/settings": "User Management",
  "/user-management": "User Management",
  "/access-control": "Access Control",
  "/report": "Report",
  "/queue-management": "Queue Management",
  // 2nd level
  "/case/management": "Case Management",
  "/customer/search": "Search Customer",
  "/customer/dashboard": "Customer Dashboard",
};

const getClientPath = (name: string, link = false) => {
  switch (name) {
    case "Queue Management":
      return {
        name: "Queue Management",
        goto: link ? "/queue-management" : "",
      };
    case "Case Management":
      return {
        name: "Case Management",
        goto: link ? "/case-management" : "",
      };
    case "Search Customer":
      return {
        name: "Search Customer",
        goto: link ? "/customer/search" : "",
      };
    default:
      break;
  }
  return { name: "", goto: "" };
};
export const path2ClientPath: Record<string, { name: string; goto: string }[]> =
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
    "/customer/search": [getClientPath("Search Customer", false)],
    "/customer/dashboard": [
      getClientPath("Search Customer", true),
      {
        name: "Customer Dashboard",
        goto: "",
      },
    ],
    "/customer/dashboard/note": [
      getClientPath("Search Customer", true),
      {
        name: "Customer Dashboard",
        goto: "/customer/dashboard",
      },
      {
        name: "Note List",
        goto: "",
      },
    ],
    "/queue-management": [getClientPath("Queue Management", false)],
    "/queue-management/[id]": [
      getClientPath("Queue Management", true),
      {
        name: ":Queue Details",
        goto: "",
      },
    ],
    "/case-management": [getClientPath("Case Management", false)],
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
  "/queue-management": "Queue Management",
  // 2nd level
  "/case/management": "Search Customer",
  "/customer/search": "Search Customer",
  "/customer/dashboard": "Search Customer",
};

export const navMain: {
  title: string;
  url: string;
  permission?: PermissionKeyType[];
}[] = [
  {
    title: "User Management",
    url: "/user-management",
    permission: ["view.user"],
  },
  {
    title: "Search Customer",
    url: "/customer/search",
    permission: ["search.customer"],
  },
  {
    title: "Case Management",
    url: "/case-management",
    permission: ["view.case"],
  },
  {
    title: "Report",
    url: "/report",
    permission: ["view.report"],
  },
  // {
  //   title: "Settings",
  //   url: "/settings",
  //   permission: ["view.setting"],
  // },

  {
    title: "Access Control",
    url: "/access-control",
    permission: ["view.accesscontrol"],
  },
  {
    title: "Queue Management",
    url: "/queue-management",
    permission: ["view.queue"],
  },
];
