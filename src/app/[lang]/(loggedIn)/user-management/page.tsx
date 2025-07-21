import { Typography } from "@/components/atoms/typography";
import BtnFilter from "@/components/molecules/btn-filter";
import CardPageWrapper from "@/components/molecules/card-page-warpper";
import InputFilter from "@/components/molecules/input-filter";
import { TableUserManagement } from "@/components/organisms/table-user-management";
import { UserType } from "@/types/user";


export default async function UserManagementPage() {
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Team",
      accessorKey: "team",
    },
    {
      header: "Center",
      accessorKey: "center",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      header: "",
      accessorKey: "actions",
    },
  ];

  const data: UserType[] = [

  ];
  for (let i = 0; i < 110; i++) {
    data.push({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      role: i % 2 === 0 ? "Admin" : "User",
      team: `Team ${i % 3 + 1}`,
      center: `Center ${i % 2 + 1}`,
      status: i % 2 === 0,
    });
  }

  return (
    // 15
    <CardPageWrapper>
      <div className="flex gap-3">
        <Typography variant="h3" as="p">
          User Management
        </Typography>
        <div className="flex-1"></div>
        <div>
          <InputFilter />
        </div>
        <div>
          <BtnFilter />
        </div>
      </div>
      <TableUserManagement
        columns={columns}
        data={data}
      />
    </CardPageWrapper>
  )
}
