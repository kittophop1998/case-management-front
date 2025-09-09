'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"
import { Typography } from "@/components/common/typography"
import { TextAreaField } from "@/components/form/textarea-field"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Card from "@/components/common/card";
import { useEffect, useState, useMemo } from "react"
import RichTextEditor from "@/components/rich-text-editor"
import { File, SectionEmail, SectionSendEmail } from "@/components/case/section-email"
import { useGetCaseDetailsQuery } from "@/features/caseApiSlice"
import TelephoneCall from '@/public/icons/TelephoneCall.svg'
import { Info } from "@/components/case/info"
import Warning from '@/public/icons/Warning.svg'
import { SelectField } from "@/components/form/select-field"

import { useGetDropdownQuery } from "@/features/systemApiSlice"
import Tiptap from "@/components/common/Tiptap"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTable, Header } from "@/components/common/table"
import { useTable } from "@/hooks/use-table"
import { Button } from "@/components/ui/button";
import { DatePickerFieldInput } from "@/components/form/date-picker"
import { useParams } from 'next/navigation'
import { cva } from "class-variance-authority"
import { useLazyGetTableQuery } from "@/features/queueApiSlice"
import { CustomerInfo } from "@/components/case/section-customer-info"
import { truncate } from "fs"
import { AttachFileSection } from "@/components/case/section-attach-file"
import { SectionCaseInfo } from "@/components/case/section-case-inquiry-info"
import { useDebugLogForm } from "@/hooks/use-debug-log-form"
import { ChangeInfoSection } from "@/components/case/section-change-info"

export default function CaseManagementDetailTab() {
  const form = useForm()
  const params = useParams<{ id: string }>()
  const { id } = params

  const { data: caseDetails, isLoading: isCaseLoading, error: caseError } = useGetCaseDetailsQuery({ id });
  const { data: ddData, isLoading: isDropdownLoading } = useGetDropdownQuery()

  const [isEditMode, setIsEditMode] = useState(false)


  useEffect(() => {
    if (caseDetails && ddData?.reasonCodes) {
      form.reset({
        priority: caseDetails?.priority || "",
        reasonCode: caseDetails?.reasonCode || "",
        caseGroup: caseDetails?.caseGroup || "",
        dueDate: caseDetails?.dueDate || "",
        allocateToQueueTeam: caseDetails?.allocateToQueueTeam || "",
        caseDescription: caseDetails?.caseDescription || ""
      });
    }
  }, [caseDetails, ddData?.reasonCodes, form]);

  const mockTableData = [
    {
      queueId: 1,
      queueName: "ID_210825.pdf",
      queueDescription: "System",
      uploadDate: new Date("12 Aug 2025 21:30:00"),
    },
    {
      queueId: 2,
      queueName: "ID_220825.pdf",
      queueDescription: "Nalan Kacherninin-BKK",
      uploadDate: new Date("12 Aug 2025 21:10:00"),
    },
  ];

  const mockCustomerInfo = {
    nationalId: "CUST123456",
    customerNameEng: "John DoeEN",
    customerNameTh: "John DoeTH",
    mobileNO: "0123456789",
    mailToAddress: "john.doe@example.com",
    mailTo: "john.doe@example.com",
  };

  useDebugLogForm({ form })

  const seeVaue = form.watch()
  return (
    <div>
      {JSON.stringify(seeVaue)}
      <div className="mt-4 flex justify-end gap-2 pr-13">
        <Button
          className="bg-[#5570f1] text-white hover:bg-[#5570f1]/90 hover:text-white"
          variant="outline"
        >
          Take
        </Button>
        {!isEditMode && (
          <Button
            className="bg-[#5570f1] text-white hover:bg-[#5570f1]/90 hover:text-white"
            variant="outline"
            onClick={() => setIsEditMode(true)}
          >
            Edit
          </Button>
        )}
        {isEditMode && (
          <Button
            className="bg-[#0c6d0c] text-white hover:bg-[#5570f1]/90 hover:text-white"
            variant="outline"
            onClick={() => setIsEditMode(false)}
          >
            Save
          </Button>
        )}
        <Button className="bg-[#fd5e5e] text-white hover:bg-[#5570f1]/90 hover:text-white" variant="outline">
          Close
        </Button>
      </div>
      <FormProvider {...form}>
        <form>
          <CardPageWrapper className="mt-4">
            <div className="space-y-4">
              <Card className="rounded-md border border-gray-300 mb-4 shadow-none">
                <CustomerInfo
                  customerInfo={mockCustomerInfo}
                  customerId={'CUST123456'}
                  isSmallMod={true}
                />
              </Card>

              {/* Case Info */}
              <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                <SectionCaseInfo
                  queueAll={queueListData?.data || []}
                  isSmallMod={true}
                  form={form}
                  // form={{}}
                  caseTypeText='None Inquiry'
                  ddData={ddData}
                  mode={isEditMode ? 'edit' : 'view'}
                  layout="2col"
                />
              </Card>

              {caseDetails?.caseGroup === "Change Info" && (
                <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                  <ChangeInfoSection
                    form={form}
                    isSmallMod={true}
                    isEditMode={isEditMode}
                    caseType={caseDetails?.caseType}
                  />
                </Card>
              )}

              {/* Attach File */}
              <Card className="rounded-md border border-gray-300 mb-4 shadow-none">
                <AttachFileSection
                  isSmallMod={true}
                  form={form}
                  files={mockTableData}
                  onUpload={() => console.log("Upload clicked")}
                  onDownload={(file: any) => console.log("Download:", file)}
                  onDelete={(file: any) => console.log("Delete:", file)}
                />
              </Card>

              {/* Email list */}
              <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                <SectionEmail form={form} isSmallMod={true} />
              </Card>

              {/* Send Email */}
              <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                <SectionSendEmail form={form} layout="2col" isSmallMod={true} mode={isEditMode ? 'edit' : 'view'} />
              </Card>
            </div>
          </CardPageWrapper>
        </form>
      </FormProvider>
    </div>
  )
}