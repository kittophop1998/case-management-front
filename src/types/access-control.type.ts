import { TableType } from "./table.type";


export type RolesType = 'Supervisor' | 'Manager' | 'Admin' | 'Agent' | 'Support' | 'Staff';

export type AccessControlType = {
    "permission": string,
    "label": string,
    "roles": RolesType[]
}
export type AccessControlTableType = TableType<AccessControlType>
