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
  "id": z.string().min(1, 'Agent ID is required').regex(/^\d+$/, 'Agent ID must contain only numbers'),
  "userName": z.string().min(1, 'Agent Name is required'),
  "email": z.string().min(1, 'Domain Name is required').email('Invalid email format'),
  "team": z.string().min(1, 'Team is required'),
  "operatorId": z.string().min(1, 'Operator ID is required'),
  "centerId": z.string().min(1, 'Center is required'),
  "roleId": z.string().min(1, 'Role is required'),
  "isActive": z.boolean('Status is required')
})


//{
//     "id": "12337",
//     "username": "Janet Adebayo",
//     "email": "Janet@exam.com",
//     "team": "Inbound",
//     "operatorId": "1233",
//     "centerId": "BKK",
//     "roleId": "AGENT",
//     "isActive": true
// }



// id: z.number().nullable().optional(),
// username: z.string().min(1, 'Username is required'),
// name: z.string().min(1, 'Name is required'),
// email: z.string().email('Invalid email address'),
// team: z.string().min(1, 'Team is required'),
// isActive: (z.boolean(), 'Status is required'),
// center: z.object({
//   id: z.number().nullable(),
//   name: z.string().min(1)
// }, 'Center is required'),
// role: z.object({
//   id: z.number().nullable(),
//   name: z.string().min(1)
// }, 'Role is required')