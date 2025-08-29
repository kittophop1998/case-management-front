import { PermissionKeyType } from "@/types/permission.type";

type RouteMeta = {
  path: string;
  name: string;
  sidebar?: string;
  permission?: PermissionKeyType[];
  showInSidebar?: boolean;
  breadcrumbs?: {
    name: string;
    goto?: string;
  }[];
};

export const routeMeta: RouteMeta[] = [
  {
    path: "/",
    name: "Case Management",
    showInSidebar: false,
    sidebar: "Case Management",
  },
  {
    path: "/case-management",
    name: "Case Management",
    sidebar: "Case Management",
    permission: ["view.case"],
    breadcrumbs: [
      { name: "Case Management" },
    ],
  },
  {
    path: "/customer/search",
    name: "Search Customer",
    sidebar: "Customer Dashboard",
    permission: ["search.customer"],
    showInSidebar: false,
    breadcrumbs: [
      { name: "Search Customer" },
    ],
  },
  {
    path: "/customer/dashboard",
    name: "Customer Dashboard",
    sidebar: "Customer Dashboard",
    breadcrumbs: [
      { name: "Search Customer", goto: "/customer/search" },
      { name: "Customer Dashboard" },
    ],
  },
  {
    path: "/customer/dashboard/note",
    name: "Note List",
    sidebar: "Customer Dashboard",
    showInSidebar: false,
    breadcrumbs: [
      { name: "Search Customer", goto: "/customer/search" },
      { name: "Customer Dashboard", goto: "/customer/dashboard" },
      { name: "Note List" },
    ],
  },
  {
    path: "/inquiry-log",
    name: "Inquiry Log",
    sidebar: "Inquiry Log",
    permission: ["view.inquirylog"],
  },
  {
    path: "/report",
    name: "Report",
    sidebar: "Report",
    permission: ["view.report"],
  },
  {
    path: "/settings",
    name: "Settings",
    sidebar: "Settings",
    permission: ["view.setting"],
    breadcrumbs: [{ name: "Settings" }],
  },
  {
    path: "/user-management",
    name: "User Management",
    sidebar: "User Management",
    permission: ["view.user"],
    breadcrumbs: [{ name: "User" }],
  },
  {
    path: "/access-control",
    name: "Access Control",
    sidebar: "Access Control",
    permission: ["view.accesscontrol"],
    breadcrumbs: [{ name: "Access Control" }],
  },
  {
    path: "/queue-management",
    name: "Queue Management",
    sidebar: "Queue Management",
    permission: ["view.queue"],
  },
];

export const path2name = Object.fromEntries(
  routeMeta.map(({ path, name }) => [path, name])
);

export const path2sidebar = Object.fromEntries(
  routeMeta
    .filter(r => r.sidebar)
    .map(({ path, sidebar }) => [path, sidebar!])
);

export const path2ClientPath = Object.fromEntries(
  routeMeta
    .filter(r => r.breadcrumbs)
    .map(({ path, breadcrumbs }) => [path, breadcrumbs!])
);

export const navMain = routeMeta
  .filter(r => r.sidebar && r.showInSidebar !== false)
  .map(({ name, path, permission }) => ({
    title: name,
    url: path,
    permission,
  }));

