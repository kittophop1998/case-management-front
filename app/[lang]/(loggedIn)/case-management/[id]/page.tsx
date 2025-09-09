'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"
import { Typography } from "@/components/common/typography"
import { TextAreaField } from "@/components/form/textarea-field"
import { format } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Card from "@/components/common/card";
import { useEffect, useState, useMemo } from "react"
import PaperDownloadIcon from '@/public/icons/paper_download_icon.svg'
import DeleteIcon from '@/public/icons/delete_icon.svg'
import RichTextEditor from "@/components/rich-text-editor"
import { File, SectionSendEmail } from "@/components/case/section-email"
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
import { SectionCaseInfo } from "@/components/case/section-case-inquiry-info"


export default function CaseManagementDetailPage() {
  const form = useForm()
  const [post, setPost] = useState("");

  const params = useParams<{ id: string }>()
  const { id } = params
  const { data: caseDetails, error, isLoading } = useGetCaseDetailsQuery({ id });
  const [getQueueList, { currentData: queueListData, isFetching, isError, error: queueListError }] = useLazyGetTableQuery();

  useEffect(() => {
    getQueueList({
      page: 1,
      limit: 99999999,
      sort: null,
      order: null,
    });
  }, [getQueueList]);

  const priority = form.watch('priority')
  const { data: ddData } = useGetDropdownQuery();
  const prioritys = [
    {
      id: 'High',
      name: 'High'
    }, {
      id: 'Normal',
      name: 'Normal'
    }
  ];
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

  const warningText = useMemo(() => {
    const found = ddData?.reasonCodes.find(
      (item) => item.id === form.watch("reasonCode")
    )
    return found?.notice || ""
  }, [form.watch("reasonCode"), ddData?.reasonCodes]);


  useEffect(() => {
    console.log('caseDetails', caseDetails)
    if (caseDetails) {
      form.reset({
        priority: caseDetails?.priority || "",
        reasonCode: caseDetails?.reasonCode || "",
        caseGroup: caseDetails?.caseGroup || "",
        dueDate: caseDetails?.dueDate || "",
        allocateToQueueTeam: caseDetails?.allocateToQueueTeam || "",
        caseDescription: caseDetails?.caseDescription || ""
      })
    }
  }, [caseDetails, form]);



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
  });

  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div>
      <div className="mt-4 flex justify-end gap-2 pr-9">
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
      <CardPageWrapper className="mt-4">
        <div className="space-y-4">
          <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
            <Accordion
              type="single"
              collapsible
              value={openSections.customerInfo ? "item-1" : ""}
              onValueChange={(value) =>
                setOpenSections((prev) => ({ ...prev, customerInfo: value === "item-1" }))
              }
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className='p-0 m-0'>Customer Info</AccordionTrigger>
                <AccordionContent className="mt-2 text-gray-600">
                  <div className="space-y-3 pt-2">
                    <Typography variant="caption">Customer ID/Passport : 12345678</Typography>
                    <Typography variant="caption">Customer Name: Test Name</Typography>
                    <Typography variant="caption">Aeon ID: AC1232123321</Typography>
                    <Typography variant="caption">Mobile No.: 09787878xxx</Typography>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <FormProvider {...form}>
            <form>
              <Card className="rounded-md border border-gray-300 mb-4 shadow-none">
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

                          {priority === "High" && (
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
                                  loading={isFetching}
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
                            readonly={!isEditMode}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>}
                <SectionCaseInfo
                  isSmallMod={true}
                  form={form}
                  caseTypeText={"None Inquiry"}
                  ddData={ddData}
                  layout="2col"
                  mode={isEditMode ? 'edit' : 'view'}
                />
              </Card>

            </form>
          </FormProvider>

          {/* Change Mobile no */}
          {caseDetails?.caseGroup === "Change Info" && (
            <FormProvider {...form}>
              <form>
                <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                  <Accordion
                    type="single"
                    collapsible
                    value={openSections.changeMobile ? "item-1" : ""}
                    onValueChange={(value) =>
                      setOpenSections((prev) => ({ ...prev, changeMobile: value === "item-1" }))
                    }
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="p-0 m-0">
                        {caseDetails?.caseType}
                      </AccordionTrigger>
                      <AccordionContent className="mt-2 text-gray-600">
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-32 whitespace-nowrap">
                              Current info:
                            </Typography>
                            <input
                              placeholder="Enter Current info."
                              type="text"
                              className={`${textFieldVariants({ readonly: true })} border border-gray-300 rounded-md px-2 py-1 w-1/3`}
                              readOnly={!isEditMode}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <Typography variant="caption" className="w-32 whitespace-nowrap">
                              New info<span className="text-red-600">*</span>:
                            </Typography>
                            <input
                              placeholder="Enter New info."
                              type="text"
                              className={`${textFieldVariants({ readonly: !isEditMode })} border border-gray-300 rounded-md px-2 py-1 w-1/3`}
                              readOnly={!isEditMode}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Card>
              </form>
            </FormProvider>
          )}


          {/* Attach File */}
          <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
            <Accordion
              type="single"
              collapsible
              value={openSections.attachFile ? "item-1" : ""}
              onValueChange={(value) =>
                setOpenSections((prev) => ({ ...prev, attachFile: value === "item-1" }))
              }
            >

              <AccordionItem value="item-1">
                <AccordionTrigger className='p-0 m-0'>Attach File</AccordionTrigger>
                <AccordionContent className="mt-2 text-gray-600">
                  <div className="space-y-3 pt-2 overflow-x-auto">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        className="border border-purple-500 text-purple-600 px-4 py-2 rounded-md font-medium"
                      >
                        Upload
                      </button>
                      <Typography variant="caption">
                        Upload a file for your import user. File Format PDF, Photo file (PNG, JPG, JPEG) Max size: 25 MB
                      </Typography>
                    </div>
                    <table className="min-w-full border-t border-b border-gray-200">
                      <thead className="border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">File Name</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Upload By</th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Upload Date</th>
                          <th className="px-4 py-2 text-left text-sm font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {mockTableData.map((row, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 text-sm">{row.queueName}</td>
                            <td className="px-4 py-2 text-sm">{row.queueDescription}</td>
                            <td className="px-4 py-2 text-sm">{format(row.uploadDate, "dd MMM yyyy HH:mm:ss")}</td>
                            <td className="px-4 py-2 text-sm flex gap-2">
                              <button title="Download" className="hover:text-blue-600">
                                <PaperDownloadIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" />
                              </button>
                              <button title="Delete" className="hover:text-red-600">
                                <DeleteIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
          <FormProvider {...form}>
            <form>
              <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
                {true && <Accordion
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
                <SectionSendEmail
                  isSmallMod={true}
                  form={form}
                  layout="2col"
                  mode={isEditMode ? 'edit' : 'view'}
                />
              </Card>
            </form>
          </FormProvider>

        </div>
      </CardPageWrapper>
    </div>
  )
}