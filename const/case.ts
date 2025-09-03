import { CaseType } from "@/types/case.type";

export const emptyCaseNoneInquiry: CaseType = {
  caseTypeText: "None Inquiry",
  customerId: "",
  caseTypeId: "",
  caseDescription: "",
  caseNote: [""],
  customerName: "",
  channel: "",
  priority: "",
  reasonCode: "",
  dueDate: "",
  allocateToQueueTeam: "",
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
