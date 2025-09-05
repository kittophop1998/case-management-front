import { CreateCaseSchema } from "@/schemas";
import z from "zod";

export type CaseType = z.infer<typeof CreateCaseSchema>;

export type CaseTypeText = "Inquiry" | "None Inquiry";

export type CaseDetailsType = {
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
};
