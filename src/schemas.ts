import * as z from 'zod'

export const LoginSchemas = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required')
})

export const FilterUsersDialogSchemas = z.object({
  role: z.number().nullable(),
  team: z.string().nullable(),
  center: z.number().nullable(),
  status: z.boolean().nullable()
})

export const UserSchema = z.object({
  "id": z.string().min(1, 'Agent ID is required'),
  "username": z.string().min(1, 'Agent Name is required'),
  "email": z.string().min(1, 'Domain Name is required').email('Invalid email format'),
  "team": z.string().min(1, 'Team is required'),
  "operatorId": z.string().min(1, 'Operator ID is required'),
  "centerId": z.string().min(1, 'Center is required'),
  "roleId": z.string().min(1, 'Role is required'),
  "isActive": z.boolean('Status is required')
})

export const CreateEditUserSchema = z.object({

  "id": z.string().nullable(),
  "username": z.string().min(1, 'Agent Name is required'),
  "email": z.string().min(1, 'Domain Name is required').email('Invalid email format'),
  "team": z.string().min(1, 'Team is required'),
  "centerId": z.string().min(1, 'Center is required'),
  "roleId": z.string().min(1, 'Role is required'),
  "isActive": z.boolean('Status is required'),
  // 
  "agentId": z.string().min(1, 'Agent ID is required').regex(/^\d+$/, 'Agent ID must contain only numbers'),
  "operatorId": z.string().min(1, 'Operator ID is required').regex(/^\d+$/, 'Operator ID must contain only numbers'),

})

// "operatorId": z.string().min(1, 'Operator ID is required').regex(/^\d+$/, 'Operator ID must contain only numbers'),
