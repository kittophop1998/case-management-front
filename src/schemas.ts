import * as z from "zod";

export const LoginSchemas = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});

export const RegisterSchemas = z
  .object({
    username: z
      .string()
      .min(6, { message: "Name must be at least 6 characters long." })
      .trim(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.",
      })
      .trim(),
    confirmPassword: z.string().trim(),
    dateOfBirth: z.date({ message: "Date of birth is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });



export const UserSchemas = z.object({
  agentID: z.string().min(1, "Agent ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.enum(["Admin", "User"], "Role is required"),
  team: z.string().min(1, "Team is required"),
  center: z.string().min(1, "Center is required"),
  status: z.enum(["Active", "Inactive"], "Status is required"),
});