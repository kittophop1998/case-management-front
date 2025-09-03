import { CreateCase } from "@/schemas";
import z from "zod";

export type CaseType = z.infer<typeof CreateCase>;

export type CaseTypeText = "Inquiry" | "None Inquiry";
