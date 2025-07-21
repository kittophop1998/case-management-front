import { Typography } from "@/components/common/typography";
import BtnFilter from "@/components/molecules/btn-filter";
import CardPageWrapper from "@/components/molecules/card-page-warpper";
import InputFilter from "@/components/molecules/input-filter";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/user";
import { UserPlus } from "lucide-react";
import { TableUserManagement } from "./_components/table";
import { DialogDetails } from "./_components/dialog-details";


export default async function UserManagementPage() {
  const data: UserType[] = []

  for (let i = 0; i < 110; i++) {
    data.push({
      id: `${i + 1}`,
      name: `User ${i + 1}`,
      role: i % 2 === 0 ? "Admin" : "User",
      team: `Team ${i % 3 + 1}`,
      center: `Center ${i % 2 + 1}`,
      status: i % 2 === 0 ? "Active" : "Inactive",
    });
  }
  return (
    <div>
      <div className="flex justify-end mb-3 mt-3">
        <Button className="bg-black text-white">
          <UserPlus />
          Add User
        </Button>
      </div>
      <CardPageWrapper>
        <div className="flex gap-3 mb-3">
          <Typography variant="h3" as="p">
            User Lists
          </Typography>
          <div className="flex-1"></div>
          <InputFilter />
          <BtnFilter />
        </div>
        <TableUserManagement data={data} />
      </CardPageWrapper>
      <DialogDetails />
    </div>
  )
}
