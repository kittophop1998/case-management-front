'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"


export default function CaseManagementTrackingTab() {
  const form = useForm();
  return (
    <FormProvider {...form}>
      <form>
        <CardPageWrapper className="mt-4"> <h1>Tracking Tab</h1></CardPageWrapper>
      </form>
    </FormProvider>
  )
}