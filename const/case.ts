import { CaseType } from "@/types/case.type";

export const emptyCaseNoneInquiry: CaseType = {
  caseTypeText: "None Inquiry",
  customerId: "",
  caseTypeId: "",
  caseDescription: "",
  caseNote: [""],
  customerName: "",
  channel: "IVR",
  priority: "",
  reasonCode: "",
  dueDate: "",
  allocateToQueueTeam: "",
  emails: [
    {
      form: "CMS@aeon.co.th",
      emailSubject: "(REF1234567890) Change Passport",
      date: "12 Aug 2025",
    },
    {
      form: "unns@gamail.com",
      emailSubject: "RE:(REF1234567890) Change Passport",
      date: "12 Aug 2025",
    },
  ],
  form: "",
  to: "",
  cc: "",
  bcc: "",
  subject: "",
  template: "",
  mailText: "",
  files: [{ name: "" }, { name: "" }],
};
export const emptyCaseInquiry: CaseType = {
  caseTypeText: "Inquiry", // fix discriminator
  priority: "Normal", // fix discriminator
  customerName: "",
  customerId: "",
  dispositionMains: [],
  dispositionSubs: [],
  dispositionMainId: "",
  dispositionSubId: "",
  caseNote: [""],
  caseDescription: "",
  caseTypeId: "",
  productId: "",
};

export const caseStatusConfig = {
  created: {
    text: "Created",
    // className: "bg-[#D1FAE5] text-black",
    className: "bg-[#FEEBEE], text-[#E31B0C]",
  },
  progress: {
    text: "In Progress",
    className: "text-[#5570F1]",
  },
  waiting: {
    text: "Waiting",
    className: "bg-[#FFFBE6] text-[black]",
    // className: "bg-[#FEEBEE], text-[#E31B0C]",
  },
  approved: {
    text: "Created",
    className: "bg-[#32936F] text-[#519C66]",
    // className: "bg-[#FEEBEE], text-[#E31B0C]",
  },
  closed: {
    text: "Closed",
    className: "bg-[#FEEBEE] text-[#E31B0C]",
    // className: "bg-[#FEEBEE], text-[#E31B0C]",
  },
  resolved: {
    text: "Resolved",
    className: "bg-[#FEEBEE] text-[#E31B0C]",
    // className: "bg-[#FEEBEE], text-[#E31B0C]",
  },

  // pending: {
  //   text: "Pending",
  //   className: "bg-[#FFFBE6] text-black",
  // },
  // draft: {
  //   text: "Draft",
  //   className: "bg-[#E0F2FE] text-black",
  // },

  // escalated: {
  //   text: "Escalated",
  //   className: "bg-[#F3F4F6] text-black",
  // },
  // approved: {
  //   text: "Approved",
  //   className: "bg-[#F3F4F6] text-black",
  // },
  // rejected: {
  //   text: "Rejected",
  //   className: "bg-[#F3F4F6] text-black",
  // },
  // canceled: {
  //   text: "Canceled",
  //   className: "bg-[#F3F4F6] text-black",
  // },
  // cancel: {
  //   text: "Canceled",
  //   className: "bg-[#F3F4F6] text-black",
  // },
};

export const priorityStatusConfig = {
  High: {
    text: "High",
    className: "bg-[#FEEBEE] text-[#E31B0C]",
  },
  Medium: {
    text: "Medium",
    className: "bg-yellow-400 text-black",
  },
  Low: {
    text: "Low",
    className: "bg-green-600 text-white",
  },
  Normal: {
    text: "Normal",
    className: "bg-green-600/10 text-green-600",
  },
};

export const priorityStatusOptions = [
  { label: "High", value: "High" },
  { label: "Normal", value: "Normal" },
];
