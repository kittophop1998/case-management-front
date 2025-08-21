import { boolean } from "zod";
import { Promotion } from "./promotion.type";
export type CustomerResApiInfo = {
  nationalId: string;
  customerNameEng: string;
  customerNameTh: string;
  mobileNO: string;
  mailToAddress: string;
  mailTo: string;
};

export type CustomerResApiProfile = {
  blockMedia: string;
  consentForCollectUse: string;
  consentForDisclose: string;
  customerSentiment: string;
  dayPastDue: string;
  eStatementSentStatus: string;
  errorSystem: string;
  gender: string;
  lastCardApplyDate: string;
  lastEStatementSentDate: string;
  lastIncomeUpdate: string;
  lastIncreaseCreditLimitUpdate: string;
  lastOverdueDate: string;
  lastReduceCreditLimitUpdate: string;
  maritalStatus: string;
  paymentStatus: string;
  phoneNoLastUpdateDate: string;
  statementChannel: string;
  suggestedAction: string;
  typeOfJob: string;
};

export type CustomerCustsegment = {
  sweetheart: string;
  complaintLevel: string;
  customerGroup: string;
  complaintGroup: string;
  customerType: string;
  memberStatus: string;
  customerSegment: string;
  updateData: string;
};
export type CustomerSuggestion = {
  suggestCards: string[];
  suggestPromotions: Promotion[];
};

export type CustomerCombine = {
  info: CustomerResApiInfo | undefined;
  profile: CustomerResApiProfile | undefined;
  custsegment: CustomerCustsegment | undefined;
  suggestion: CustomerSuggestion | undefined;
};
export type CustomerDataType =
  | "profile"
  | "info"
  | "custsegment"
  | "suggestion";
export type CustomerCombineLoading = Record<CustomerDataType, boolean>;
