'use client';
import { Typography } from "@/components/common/typography";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { AccessControlClientPage } from "./_components/access-control-client-page";
import { Suspense } from "react";
import LoadingPage from "@/components/loading-page";
import ApiLogTable from "./_components/api-log-table";

export default function AccessControlPage() {
  return (
    <CardPageWrapper classNameCard="space-y-3 mt-6">
      <Typography variant="h6" >
        API Log List
      </Typography>
      <ApiLogTable />
    </CardPageWrapper>
  )
}