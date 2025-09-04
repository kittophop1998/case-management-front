import * as z from "zod";

export const LoginSchemas = z.object({
  username: z
    .string()
    .min(1, "username is required")
    .regex(
      /^[A-Za-z0-9]+$/,
      "username must be English letters or numbers only"
    ),
  password: z.string().min(1, "password is required"),
});

export const ConfirmPasswordSchemas = z.object({
  password: z.string().min(1, "password is required"),
});

export const FilterUsersDialogSchemas = z.object({
  role: z.string().nullable(),
  section: z.string().nullable(),
  center: z.string().nullable(),
  status: z.boolean().nullable(),
  department: z.string().nullable(),
});

export const UserSchema = z.object({
  id: z.string().min(1, "Staff ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  section: z.string().min(1, "Section is required"),
  operatorId: z.string().min(1, "Operator ID is required"),
  centerId: z.string().min(1, "Center is required"),
  roleId: z.string().min(1, "Role is required"),
  isActive: z.boolean("Status is required"),
});

export const CreateEditUserSchema = z.object({
  id: z.string().nullable(),
  username: z
    .string()
    .min(1, "Username is required")
    .regex(
      /^[A-Za-z0-9]+$/,
      "username must be English letters or numbers only"
    ),
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  sectionId: z.string().min(1, "Section is required"),
  centerId: z.string().min(1, "Center is required"),
  roleId: z.string().min(1, "Role is required"),
  isActive: z.boolean("Status is required"),
  staffId: z.union([
    z.string().regex(/^\d+$/, "Staff ID must contain only numbers"), // digits only
    z.literal(""), // allow empty string
  ]),
  operatorId: z
    .string()
    .min(1, "Operator ID is required")
    .regex(/^\d+$/, "Operator ID must contain only numbers"),
  // queueId: z.string().min(1, "Queue is required"),
  departmentId: z.string().min(1, "Queue is required"),
});

// "operatorId": z.string().min(1, 'Operator ID is required').regex(/^\d+$/, 'Operator ID must contain only numbers'),
export const SettingAccessControlSchema = z.object({
  permission: z.string().min(1, "Permission Key is required"),
  roles: z.array(z.string().min(1, "Role is required")),
});

export const CreateNoteSchemas = z.object({
  customerId: z.string().min(1, "Customer Id is required"),
  noteTypeId: z.string().min(1, "Note Type is required"),
  note: z.string().min(1, "Note is required"),
});

export const NewNoteSchema = z.object({
  type: z
    .string()
    .nullable()
    .refine((val) => val && val.length > 0, {
      message: "Type is required",
    }),
  text: z.string().min(1, "Note is required"),
});

export const CreateQueue = z.object({
  id: z.string().nullable(),
  queueName: z.string().min(1, "Queue Name is required"),
  queueDescription: z.string().min(1, "Queue Description is required"),
});

//
//
//
//
//

// if caseTypeText ==='None Inquiry' then use NewCaseSchema if caseTypeText === 'Inquiry' then use NewCaseNoneInquirySchema
// export const NewCaseSchema = z.object({
//   caseTypeText: z.string().min(1, "Case Text is required"), //auto
//   customerId: z.string().optional(), //query
//   caseTypeId: z.string().min(1, "Case Type is required"), //auto
//   caseDescription: z.string(),
//   caseNote: z.array(z.any()).min(1, "At least one case note is required"), // TODO z.any() change this to z.string() const { fields, append, remove } = useFieldArray({control, name: "caseNote",}); got error in this line
//   //
//   dispositionMainId: z.string().min(1, "Main Disposition Stamp is required"),
//   dispositionSubId: z.string().min(1, "Sub Disposition Stamp is required"),
//   dispositionMains: z.array(z.string()),
//   dispositionSubs: z.array(z.string()),
//   productId: z.string().min(1, "Product is required"),
//   //
// });
// High;

export const CreateCaseNoneInquirySchema = z
  .object({
    caseTypeText: z.literal("None Inquiry"), // fix discriminator
    customerId: z.string().optional(),
    customerName: z.string().min(1, "Customer Name is required"),
    caseTypeId: z.string().min(1, "Case Type is required"),
    caseDescription: z.string().min(1, "Case Description is required"),
    caseNote: z.array(z.string()).min(1, "At least one case note is required"),
    channel: z.string().min(1, "Channel is required"),
    priority: z.string().min(1, "Priority is required"),
    reasonCode: z.string().optional(),
    dueDate: z.string().min(1, "Due Date is required"),
    allocateToQueueTeam: z
      .string()
      .min(1, "Allocate To Queue Team is required"),
    // mockup key
    emails: z.array(z.any()),
    form: z.string().min(1, "Form is required"),
    to: z.string().min(1, "To is required"),
    cc: z.string().min(1, "CC is required"),
    bcc: z.string().min(1, "Bcc is required"),
    subject: z.string().min(1, "Subject is required"),
    template: z.string().min(1, "Template is required"),
    mailText: z.string(),
    files: z.array(z.any()),
  })
  .superRefine((data, ctx) => {
    if (data.priority === "High" && !data.reasonCode) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["reasonCode"],
        message: "Reason Code is required when Priority is High",
      });
    }
  });

export const CreateCaseInquirySchema = z.object({
  caseTypeText: z.literal("Inquiry"), // fix discriminator
  customerName: z.string(),
  customerId: z.string().optional(),
  caseTypeId: z.string().min(1, "Case Type is required"),
  caseDescription: z.string(),
  caseNote: z.array(z.string()).min(1, "At least one case note is required"),
  dispositionMainId: z.string().min(1, "Main Disposition Stamp is required"),
  dispositionSubId: z.string().min(1, "Sub Disposition Stamp is required"),
  dispositionMains: z.array(z.string()),
  dispositionSubs: z.array(z.string()),
  productId: z.string().min(1, "Product is required"),
});

export const CreateCaseSchema = z.discriminatedUnion("caseTypeText", [
  CreateCaseInquirySchema,
  CreateCaseNoneInquirySchema,
]);
