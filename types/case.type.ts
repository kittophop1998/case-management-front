import { CreateCaseSchema } from "@/schemas";
import z from "zod";

export type CaseType = z.infer<typeof CreateCaseSchema>;

export type CaseTypeText = "Inquiry" | "None Inquiry";

export type CaseDisposition = {
  main: string;
  subs: string[];
};
export type CaseDetailsType = {
  caseGroup: string;
  caseTypeId: string;
  caseType: string;
  caseId: string;
  createdBy: string;
  createdDate: string;
  verifyStatus: string;
  channel: string;
  priority: string;
  reasonCode: string;
  dueDate: string;
  status: string;
  currentQueue: string;
  caseDescription: string;
  allocateToQueueTeam: string;
  dispositions: CaseDisposition[];
};
export type CaseDataType = {
  aeonId: string;
  caseGroup: string;
  code: string;
  casePriority: string;
  caseType: string;
  closedDate: string;
  createdBy: string;
  createdDate: string;
  currentQueue: string;
  currentUser: string;
  customerId: string;
  customerName: string;
  receivedFrom: string;
  slaDate: string;
  status: string;
};
