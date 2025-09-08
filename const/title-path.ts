import { PermissionKeyType } from "@/types/permission.type";

// type RouteMeta = {
//   path: string;
//   name: string;
//   sidebar?: string;
//   permission?: PermissionKeyType[];
//   showInSidebar?: boolean;
//   breadcrumbs?: {
//     name: string;
//     goto?: string;
//   }[];
// };

// export const routeMeta: RouteMeta[] = [
//   {
//     path: "/",
//     name: "Case Management",
//     showInSidebar: false,
//     sidebar: "Case Management",
//   },
//   {
//     path: "/case-management",
//     name: "Case Management",
//     sidebar: "Case Management",
//     permission: ["view.case"],
//     breadcrumbs: [
//       { name: "Case Management" },
//     ],
//   },
//   {
//     path: "/customer/search",
//     name: "Search Customer",
//     sidebar: "Customer Dashboard",
//     permission: ["search.customer"],
//     showInSidebar: false,
//     breadcrumbs: [
//       { name: "Search Customer" },
//     ],
//   },
//   {
//     path: "/customer/dashboard",
//     name: "Customer Dashboard",
//     sidebar: "Customer Dashboard",
//     breadcrumbs: [
//       { name: "Search Customer", goto: "/customer/search" },
//       { name: "Customer Dashboard" },
//     ],
//   },
//   {
//     path: "/customer/dashboard/note",
//     name: "Note List",
//     sidebar: "Customer Dashboard",
//     showInSidebar: false,
//     breadcrumbs: [
//       { name: "Search Customer", goto: "/customer/search" },
//       { name: "Customer Dashboard", goto: "/customer/dashboard" },
//       { name: "Note List" },
//     ],
//   },
//   {
//     path: "/inquiry-log",
//     name: "Inquiry Log",
//     sidebar: "Inquiry Log",
//     permission: ["view.inquirylog"],
//   },
//   {
//     path: "/report",
//     name: "Report",
//     sidebar: "Report",
//     permission: ["view.report"],
//   },
//   {
//     path: "/settings",
//     name: "Settings",
//     sidebar: "Settings",
//     permission: ["view.setting"],
//     breadcrumbs: [{ name: "Settings" }],
//   },
//   {
//     path: "/user-management",
//     name: "User Management",
//     sidebar: "User Management",
//     permission: ["view.user"],
//     breadcrumbs: [{ name: "User" }],
//   },
//   {
//     path: "/access-control",
//     name: "Access Control",
//     sidebar: "Access Control",
//     permission: ["view.accesscontrol"],
//     breadcrumbs: [{ name: "Access Control" }],
//   },
//   {
//     path: "/queue-management",
//     name: "Queue Management",
//     sidebar: "Queue Management",
//     permission: ["view.queue"],
//     breadcrumbs: [
//       { name: "Queue Management", goto: "/queue-management"},
//     ],
//   },
// ];

// export const path2name = Object.fromEntries(
//   routeMeta.map(({ path, name }) => [path, name])
// );

// export const path2sidebar = Object.fromEntries(
//   routeMeta
//     .filter(r => r.sidebar)
//     .map(({ path, sidebar }) => [path, sidebar!])
// );

// export const path2ClientPath = Object.fromEntries(
//   routeMeta
//     .filter(r => r.breadcrumbs)
//     .map(({ path, breadcrumbs }) => [path, breadcrumbs!])
// );

// export const navMain = routeMeta
//   .filter(r => r.sidebar && r.showInSidebar !== false)
//   .map(({ name, path, permission }) => ({
//     title: name,
//     url: path,
//     permission,
//   }));

export const path2name: Record<string, string> = {
  // default
  "/": " Case Management",
  // 1st level
  "/settings": "User Management",
  "/user-management": "User Management",
  "/access-control": "Access Control",
  "/report": "Report",
  "/inquiry-log": "Inquiry Log",
  "/queue-management": "Queue Management",
  // 2nd level
  "/case/management": "Case Management",
  "/customer/search": "Search Customer",
  "/customer/dashboard": "Customer Dashboard",
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
    "/queue-management": [
      {
        name: "Queue Management",
        goto: "",
      },
    ],
    "/queue-management/[id]": [
      {
        name: "Queue Management",
        goto: "",
      },
      {
        name: ":Queue Details",
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
  "/queue-management": "Queue Management",
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
  {
    title: "Queue Management",
    url: "/queue-management",
    permission: ["view.queue"],
  },
];
