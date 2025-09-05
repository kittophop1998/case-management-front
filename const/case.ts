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
  pending: {
    text: "Pending",
    className: "bg-[#FFFBE6] text-black",
  },
  draft: {
    text: "Draft",
    className: "bg-[#E0F2FE] text-black",
  },
  created: {
    text: "Created",
    className: "bg-[#D1FAE5] text-black",
  },
  escalated: {
    text: "Escalated",
    className: "bg-[#F3F4F6] text-black",
  },
  approved: {
    text: "Approved",
    className: "bg-[#F3F4F6] text-black",
  },
  rejected: {
    text: "Rejected",
    className: "bg-[#F3F4F6] text-black",
  },
  canceled: {
    text: "Canceled",
    className: "bg-[#F3F4F6] text-black",
  },
  cancel: {
    text: "Canceled",
    className: "bg-[#F3F4F6] text-black",
  },
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
