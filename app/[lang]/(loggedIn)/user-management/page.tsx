import { ContainerPage } from "@/components/common/card-page-warpper";
import UserManagementPageClient from "./_components/user-management-page";
export default function UserManagementPage() {
  return (
    <>
      <ContainerPage>
        <UserManagementPageClient />
      </ContainerPage>
    </>
  )
}
