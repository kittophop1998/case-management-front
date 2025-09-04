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
