import * as z from "zod";

export const LoginSchemas = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});

export const ConfirmPasswordSchemas = z.object({
  password: z.string().min(1, "password is required"),
});

export const FilterUsersDialogSchemas = z.object({
  role: z.string().nullable(),
  team: z.string().nullable(),
  center: z.string().nullable(),
  status: z.boolean().nullable(),
});

export const UserSchema = z.object({
  id: z.string().min(1, "Agent ID is required"),
  username: z.string().min(1, "Agent Name is required"),
  email: z
    .string()
    .min(1, "Domain Name is required")
    .email("Invalid email format"),
  team: z.string().min(1, "Team is required"),
  operatorId: z.string().min(1, "Operator ID is required"),
  centerId: z.string().min(1, "Center is required"),
  roleId: z.string().min(1, "Role is required"),
  isActive: z.boolean("Status is required"),
});

export const CreateEditUserSchema = z.object({
  id: z.string().nullable(),
  username: z.string().min(1, "Agent Name is required"),
  email: z
    .string()
    .min(1, "Domain Name is required")
    .email("Invalid email format"),
  teamId: z.string().min(1, "Team is required"),
  centerId: z.string().min(1, "Center is required"),
  roleId: z.string().min(1, "Role is required"),
  isActive: z.boolean("Status is required"),
  //
  agentId: z
    .string()
    .min(1, "Agent ID is required")
    .regex(/^\d+$/, "Agent ID must contain only numbers"),
  operatorId: z
    .string()
    .min(1, "Operator ID is required")
    .regex(/^\d+$/, "Operator ID must contain only numbers"),
  queueId: z.string().min(1, "Queue is required"),
  departmentId: z.string().min(1, "Queue is required"),
});

// "operatorId": z.string().min(1, 'Operator ID is required').regex(/^\d+$/, 'Operator ID must contain only numbers'),

export const SettingAccessControlSchema = z.object({
  permission: z.string().min(1, "Permission Key is required"),
  roles: z.array(z.string().min(1, "Role is required")),
});

export const NewCaseSchema = z.object({
  note: z.string().optional(),
  mainInquiry: z
    .array(
      z.string()
      // z.object({
      //   name: z.string().min(1, "Main Inquiry is required"),
      //   id: z.string().min(1, "Main Inquiry is required"),
      // })
    )
    .optional(),
  supInquiry: z
    .array(
      z.string()
      // z.object({
      //   name: z.string().min(1, "Sup Inquiry is required"),
      //   id: z.string().min(1, "Sup Inquiry is required"),
      // })
    )
    .optional(),
  mainInquiryStamp: z.string().optional(),
  supInquiryStamp: z.string().optional(),
  isDraft: z.boolean().optional(),
});

export const CreateNoteSchemas = z.object({
  type: z
    .string()
    .nullable()
    .refine((val) => val && val.length > 0, {
      message: "Type is required",
    }),
  text: z.string().min(1, "Note is required"),
});
