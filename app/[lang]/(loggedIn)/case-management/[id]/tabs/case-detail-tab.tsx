'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"
import Card from "@/components/common/card";
import { useEffect, useState, useMemo } from "react"
import { File, SectionEmail, SectionSendEmail } from "@/components/case/section-email"
import { useGetCaseDetailsQuery, useUpdateCaseByIDMutation } from "@/features/caseApiSlice"

import { useGetDropdownQuery } from "@/features/systemApiSlice"
import { Button } from "@/components/ui/button";
import { useParams } from 'next/navigation'
import { useLazyGetTableQuery } from "@/features/queueApiSlice"
import { CustomerInfo } from "@/components/case/section-customer-info"
import { AttachFileSection } from "@/components/case/section-attach-file"
import { SectionCaseInfo } from "@/components/case/section-case-inquiry-info"
import { useDebugLogForm } from "@/hooks/use-debug-log-form"
import { ChangeInfoSection } from "@/components/case/section-change-info"
import { UpdateCaseSchema } from "@/schemas";

export default function CaseManagementDetailTab() {
  const form = useForm()
  const params = useParams<{ id: string }>()
  const { id } = params

  const { data: caseDetails, isLoading: isCaseLoading, error: caseError } = useGetCaseDetailsQuery({ id });
  const [getQueueList, { currentData: queueListData, isFetching: isQueueLoading, error: queueError }] = useLazyGetTableQuery();
  const { data: ddData, isLoading: isDropdownLoading } = useGetDropdownQuery();
  const [updateCase, { isLoading: isUpdating }] = useUpdateCaseByIDMutation();


  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (caseDetails && ddData?.reasonCodes && queueListData?.data) {
      form.reset({
        priority: caseDetails?.priority || "",
        reasonCode: caseDetails?.reasonCode || "",
        caseGroup: caseDetails?.caseGroup || "",
        dueDate: caseDetails?.dueDate || "",
        allocateToQueueTeam: caseDetails?.allocateToQueueTeam || "",
        caseDescription: caseDetails?.caseDescription || ""
      });
    }
  }, [caseDetails, ddData?.reasonCodes, queueListData?.data, form]);

  useEffect(() => {
    if (caseDetails) {
      getQueueList({
        page: 1,
        limit: 99999999,
        sort: null,
        order: null,
      });
    }
  }, [caseDetails, getQueueList]);


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

  const onSave = async () => {
    const values = form.getValues();

    try {
      const parsed = UpdateCaseSchema.parse({
        caseTypeId: caseDetails?.caseTypeId ?? "",
        priority: values.priority,
        reasonCodeId: values.reasonCode || null,
        dueDate: values.dueDate,
        allocateToQueueTeam: values.allocateToQueueTeam,
        data: {
          currentInfo: "test", // fix
          newInfo: "demo",     // fix
        },
      });
      console.log("Parsed data to submit:", parsed);

      await updateCase({ id, body: parsed }).unwrap();

      setIsEditMode(false);
      // Optionally: แสดง toast success หรือ refetch ข้อมูลใหม่
    } catch (error: any) {
      console.error("Validation or API error:", error);
      // แสดง error, toast, etc.
    }
  };

  useDebugLogForm({ form })

  const seeVaue = form.watch()
  return (
    <div>
      {/* {JSON.stringify(seeVaue)} */}
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
            onClick={onSave}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save"}
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
                  title="Case Detail"
                  moreInfo={caseDetails || {}}
                  queueAll={queueListData?.data || []}
                  isSmallMod={true}
                  form={form}
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