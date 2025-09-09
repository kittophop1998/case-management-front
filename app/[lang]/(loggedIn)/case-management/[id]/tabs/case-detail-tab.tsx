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
import ChangeInfoSection from "@/components/case/section-change-info"
import { CustomerInfo } from "@/components/case/section-customer-info"
import { truncate } from "fs"
import { AttachFileSection } from "@/components/case/section-attach-file"
import { SectionCaseInfo } from "@/components/case/section-case-inquiry-info"

export default function CaseManagementDetailTab() {
  const form = useForm()
  const params = useParams<{ id: string }>()
  const { id } = params

  const { data: caseDetails, isLoading: isCaseLoading, error: caseError } = useGetCaseDetailsQuery({ id });
  const [getQueueList, { currentData: queueListData, isFetching: isQueueLoading, error: queueError }] = useLazyGetTableQuery();
  const { data: ddData, isLoading: isDropdownLoading } = useGetDropdownQuery()

  const [post, setPost] = useState("")
  const [isEditMode, setIsEditMode] = useState(false)
  const priority = form.watch('priority')
  const reasonCode = form.watch('reasonCode')

  const prioritys = [
    { id: 'HIGH', name: 'High' },
    { id: 'Normal', name: 'Normal' }
  ]

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

  const [warningText, setWarningText] = useState("")
  useEffect(() => {
    const found = ddData?.reasonCodes?.find(item => item.id === reasonCode)
    setWarningText(found?.notice || "")
  }, [reasonCode, ddData?.reasonCodes]);

  const textFieldVariants = cva('', {
    variants: {
      readonly: {
        true: 'bg-gray-100 cursor-not-allowed',
        false: 'bg-white cursor-text'
      }
    }
  });

  const EmailList = () => {
    const memoizedData = useMemo(() => [
      {
        form: 'CMS@aeon.co.th',
        emailSubject: '(REF1234567890) Change Passport',
        date: '12 Aug 2025',
      },
      {
        form: 'unns@gamail.com',
        emailSubject: 'RE:(REF1234567890) Change Passport',
        date: '12 Aug 2025',
      }
    ], [])
    const columnHelper = createColumnHelper<any>()
    const columns = useMemo(() => [
      columnHelper.accessor('form', {
        id: 'form',
        header: ({ column }) => <Header column={column} label='Form' />,
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('emailSubject', {
        id: 'emailSubject',
        header: ({ column }) => <Header column={column} label='Email Subject' />,
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('date', {
        id: 'date',
        header: ({ column }) => <Header column={column} label='Date' />,
        cell: info => info.getValue(),
        meta: { headerClass: 'w-[7rem]' },
      }),
    ], [])
    const { table, sort, page, limit, setPage, setLimit } = useTable({
      data: memoizedData,
      columns,
    })
    const dataApi = useMemo(() => [
      {
        total: memoizedData.length,
        totalPages: Math.ceil(memoizedData.length / limit),
      }
    ], [])
    return <DataTable
      table={table}
      page={page}
      limit={limit}
      setPage={setPage}
      setLimit={setLimit}
      total={0}
      totalPages={1}
      renderEmpty={false}
    />
  };

  const onChange = (content: string) => {
    setPost(content);
  };

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

  const [openSections, setOpenSections] = useState<{
    customerInfo: boolean;
    caseDetail: boolean;
    changeMobile: boolean;
    attachFile: boolean;
    emailList: boolean;
    sendEmail: boolean;
  }>({
    customerInfo: true,
    caseDetail: true,
    changeMobile: true,
    attachFile: true,
    emailList: true,
    sendEmail: true,
  })

  if (isCaseLoading || isDropdownLoading || isQueueLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center mt-20">
        <Typography>Loading case details...</Typography>
      </div>
    )
  }

  if (caseError || queueError) {
    return (
      <div className="p-10 text-center text-red-500">
        <p>Error loading data. Please refresh the page or contact support.</p>
      </div>
    )
  }

  return (
    <div>
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

              <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                {false && <Accordion
                  type="single"
                  collapsible
                  value={openSections.caseDetail ? "item-1" : ""}
                  onValueChange={(value) =>
                    setOpenSections((prev) => ({ ...prev, caseDetail: value === "item-1" }))
                  }
                >
                  <AccordionItem value="item-1">
                    <AccordionTrigger className='p-0 m-0'>Case Detail</AccordionTrigger>
                    <AccordionContent className="mt-2 text-gray-600">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <div className="space-y-3">
                          <Typography variant="caption">Case Type: {caseDetails?.caseType}</Typography>
                          <Typography variant="caption">Case ID: AC1029384B</Typography>
                          <Typography variant="caption">Create by: {caseDetails?.createdBy}</Typography>
                          <Typography variant="caption">Create Date: {caseDetails?.createdDate}</Typography>
                          <Typography variant="caption">
                            Verify Status: <span className="text-green-500">{caseDetails?.verifyStatus}</span>
                          </Typography>
                          <Typography variant="caption" className="flex items-center gap-1">
                            Channel: <TelephoneCall className="inline-block w-4 h-4 ml-1" /> {caseDetails?.channel}
                          </Typography>

                          <Info required title="Priority" value={
                            <div className="flex-1 max-w-[300px]">
                              <SelectField
                                form={form}
                                name="priority"
                                valueName="id"
                                labelName="name"
                                loading={false}
                                items={prioritys}
                                readonly={!isEditMode}
                              />
                            </div>
                          } />

                          {priority === "HIGH" && (
                            <>
                              <Info required title="Reason code" value={
                                <div className="flex-1 max-w-[300px]">
                                  <SelectField
                                    form={form}
                                    name="reasonCode"
                                    valueName="id"
                                    labelName="descriptionTh"
                                    loading={false}
                                    items={ddData?.reasonCodes || []}
                                    readonly={!isEditMode}
                                  />
                                </div>
                              } />
                              {warningText && (
                                <div className="flex items-center gap-3">
                                  <Warning />
                                  <Typography variant="caption" className="text-red-500">
                                    {warningText}
                                  </Typography>
                                </div>
                              )}
                            </>
                          )}

                          {/* Due Date */}
                          <Info
                            required
                            title="Due Date"
                            value={
                              <div className="flex-1 max-w-[300px]">
                                <DatePickerFieldInput
                                  value={form.watch("dueDate")}
                                  onChange={(date) => form.setValue("dueDate", date)}
                                  readonly={!isEditMode}
                                />
                              </div>
                            }
                          />

                          <Typography variant="caption">Status: {caseDetails?.status || "N/A"}</Typography>
                          <Typography variant="caption">Current Queue: {caseDetails?.currentQueue || "N/A"}</Typography>

                          <Info
                            title="Allocate to Queue Team"
                            value={
                              <div className="flex-1 max-w-[300px]">
                                <SelectField
                                  form={form}
                                  name='allocateToQueueTeam'
                                  valueName='queueId'
                                  labelName='queueName'
                                  loading={isQueueLoading}
                                  items={queueListData?.data || []}
                                  readonly={!isEditMode}
                                />
                              </div>
                            }
                          />
                        </div>

                        <div>
                          <TextAreaField
                            name="caseDescription"
                            label="Case Description"
                            placeholder="Enter Case Description"
                            form={form}
                            readonly={true}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>}
                <SectionCaseInfo
                  isSmallMod={true}
                  form={form}
                  caseTypeText={'None Inquiry'}
                  ddData={ddData}
                />
              </Card>

              {caseDetails?.caseGroup === "Change Info" && (
                <ChangeInfoSection
                  isEditMode={isEditMode}
                  open={openSections.changeMobile}
                  onToggle={(value) =>
                    setOpenSections((prev) => ({ ...prev, changeMobile: value }))
                  }
                  caseType={caseDetails?.caseType}
                />
              )}

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
                <Accordion
                  type="single"
                  collapsible
                  value={openSections.emailList ? "item-1" : ""}
                  onValueChange={(value) =>
                    setOpenSections((prev) => ({ ...prev, emailList: value === "item-1" }))
                  }
                >

                  <AccordionItem value="item-1">
                    <AccordionTrigger className='p-0 m-0'>Email list</AccordionTrigger>
                    <AccordionContent className="mt-2 text-gray-600">
                      <div className="space-y-3 pt-2 overflow-x-auto">
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md font-medium"
                          >
                            Send Email
                          </button>
                          <Typography variant="caption">
                            Select email for sent
                          </Typography>
                        </div>
                        <Tiptap />
                        <EmailList />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>

              {/* Send Email */}
              <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                {false && <Accordion
                  type="single"
                  collapsible
                  value={openSections.sendEmail ? "item-1" : ""}
                  onValueChange={(value) =>
                    setOpenSections((prev) => ({ ...prev, sendEmail: value === "item-1" }))
                  }
                >

                  <AccordionItem value="item-1">
                    <AccordionTrigger className="p-0 m-0">
                      <div className="flex w-full items-center justify-between">
                        <span>Send Email</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="mt-2 text-gray-600">
                      <div className="space-y-4 pt-2 grid grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-24 whitespace-nowrap">
                              Form:
                            </Typography>
                            <select className="border border-gray-300 rounded-md shadow-sm w-full px-2 py-1 text-sm">
                              <option value="txn01">CMS@aeon1.co.th</option>
                              <option value="txn02">CMS@aeon2.co.th</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-24 whitespace-nowrap">
                              To:
                            </Typography>
                            <input
                              placeholder="Enter Email To."
                              type="text"
                              className={`${textFieldVariants({ readonly: !isEditMode })} border border-gray-300 rounded-md px-2 py-1 w-full`}
                              readOnly={!isEditMode}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-24 whitespace-nowrap">
                              Subject:
                            </Typography>
                            <input
                              placeholder="Enter Email Subject."
                              type="text"
                              className={`${textFieldVariants({ readonly: !isEditMode })} border border-gray-300 rounded-md px-2 py-1 w-full`}
                              readOnly={!isEditMode}
                            />
                          </div>
                          <Typography variant="caption" className="w-24 whitespace-nowrap">
                            Email Body
                          </Typography>

                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-24 whitespace-nowrap">
                              Template:
                            </Typography>
                            <select className="border border-gray-300 rounded-md shadow-sm w-full px-2 py-1 text-sm">
                              <option value="txn01">ขอเปลี่ยนแปลงเบอร์โทรศัพท์</option>
                              <option value="txn02">อื่น ๆ</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-20 whitespace-nowrap">
                              CC:
                            </Typography>
                            <input
                              placeholder="Enter Email CC."
                              type="text"
                              className={`${textFieldVariants({ readonly: !isEditMode })} border border-gray-300 rounded-md px-2 py-1 w-full`}
                              readOnly={!isEditMode}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-20 whitespace-nowrap">
                              Bcc:
                            </Typography>
                            <input
                              placeholder="Enter Email To."
                              type="text"
                              className={`${textFieldVariants({ readonly: !isEditMode })} border border-gray-300 rounded-md px-2 py-1 w-full`}
                              readOnly={!isEditMode}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="p-3 mb-4">
                        <RichTextEditor content={post} onChange={onChange} />
                      </div>
                      <div className="w-1/2">
                        <File />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>}
                <SectionSendEmail form={form} layout="2col" isSmallMod={true} mode={isEditMode ? 'edit' : 'view'} />
              </Card>

            </div>
          </CardPageWrapper>
        </form>
      </FormProvider>

    </div>
  )
}