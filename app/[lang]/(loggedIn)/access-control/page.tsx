import { Typography } from "@/components/common/typography";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { AccessControlClientPage } from "./_components/access-control-client-page";

export default function AccessControlPage() {
  return (
    <CardPageWrapper classNameCard="space-y-3 mt-6">
      <Typography variant="h6" >
        Manage Access Control
      </Typography>
      <Typography variant="body2" className="my-4">
        Select Department and Section for Manage Access Function
      </Typography>
      <AccessControlClientPage />
    </CardPageWrapper>
  )
}

