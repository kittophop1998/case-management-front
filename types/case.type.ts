import { CreateCaseSchema } from "@/schemas";
import z from "zod";

export type CaseType = z.infer<typeof CreateCaseSchema>;

export type CaseTypeText = "Inquiry" | "None Inquiry";
