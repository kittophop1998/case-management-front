'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"
import { Typography } from "@/components/common/typography"
import { TextAreaField } from "@/components/form/textarea-field"
import { format } from "date-fns"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Card from "@/components/common/card";
import { useState } from "react"
import TelIcon from '@/public/icons/tel_icon.svg'
import WarningIcon from '@/public/icons/warning_icon.svg'
import PaperDownloadIcon from '@/public/icons/paper_download_icon.svg'
import PaperIcon from '@/public/icons/paper_icon.svg'
import DeleteIcon from '@/public/icons/delete_icon.svg'
import FileIcon from '@/public/icons/file_icon.svg'
import SendIcon from '@/public/icons/send_icon.svg'


export default function CaseManagementDetailPage() {
  const form = useForm()
  const [isOpen, setIsOpen] = useState(true);
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

  return (
    <CardPageWrapper className="mt-4">
      <div className="space-y-4">
        <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
          <Accordion type="single" collapsible className="item-1" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
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
            <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
              <Accordion type="single" collapsible className="item-1" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
                <AccordionItem value="item-1">
                  <AccordionTrigger className='p-0 m-0'>Case Detail</AccordionTrigger>
                  <AccordionContent className="mt-2 text-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="space-y-3">
                        <Typography variant="caption">Case Type: Change Mobile no.</Typography>
                        <Typography variant="caption">Case ID: Test Name</Typography>
                        <Typography variant="caption">Create by: AC1232123321</Typography>
                        <Typography variant="caption">Create Date: 12 Aug 2025 11:54:02 (2 days ago)</Typography>
                        <Typography variant="caption">
                          Verify Status: <span className="text-green-500">Passed</span>
                        </Typography>
                        <Typography variant="caption">Channel:  <TelIcon className="inline-block mr-1" /> IVR</Typography>

                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Priority<span className="text-red-600">*</span>:
                          </label>
                          <select className="border border-gray-300 rounded-md shadow-sm w-auto px-2 py-1 text-sm">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Reason code<span className="text-red-600">*</span>:
                          </label>
                          <select className="border border-gray-300 rounded-md shadow-sm w-auto px-2 py-1 text-sm">
                            <option value="txn01">TXN01: เงินหาย / ธุรกรรมผิดพลาด</option>
                            <option value="txn02">TXN02: เงินหาย / ธุรกรรมผิดพลาด</option>
                            <option value="txn03">TXN03: เงินหาย / ธุรกรรมผิดพลาด</option>
                          </select>
                        </div>

                        <div className="p-3 rounded-md">
                          <Typography variant="caption" className="text-red-600">
                            <WarningIcon className="inline-block mr-1" /> Category: ปัญหาด้านธุรกรรมและการเงิน, SLA Response time: ภายใน 30 นาที, SLA Solution Time: ภายใน 4 ชั่วโมง, Note: ต้องมีการตรวจสอบธุรกรรมทันที
                          </Typography>
                        </div>

                        {/* Due Date */}
                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Due Date<span className="text-red-600">*</span>:
                          </label>
                          <input
                            type="date"
                            defaultValue="2025-08-25"
                            className="border border-gray-300 rounded-md shadow-sm w-auto px-2 py-1 text-sm"
                          />
                        </div>

                        <Typography variant="caption">Status: Pending</Typography>
                        <Typography variant="caption">Current Queue: JSJ Queue team</Typography>

                        {/* Reallocate */}
                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Reallocate to Queue Team<span className="text-red-600">*</span>:
                          </label>
                          <select className="border border-gray-300 rounded-md shadow-sm w-auto px-2 py-1 text-sm">
                            <option value="edp">EDP Queue</option>
                          </select>
                        </div>
                      </div>

                      {/* Right side - Case Description */}
                      <div>
                        <TextAreaField
                          name="caseDescription"
                          label="Case Description"
                          placeholder="Enter Case Description"
                          form={form}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

          </form>
        </FormProvider>

        {/* Change Mobile no */}
        <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
          <Accordion type="single" collapsible className="item-1" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
            <AccordionItem value="item-1">
              <AccordionTrigger className='p-0 m-0'>Change Mobile no.</AccordionTrigger>
              <AccordionContent className="mt-2 text-gray-600">
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <Typography variant="caption" className="w-32 whitespace-nowrap">
                      Current info:
                    </Typography>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md px-2 py-1 w-1/3"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Typography variant="caption" className="w-32 whitespace-nowrap">
                      New info<span className="text-red-600">*</span>:
                    </Typography>
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md px-2 py-1 w-1/3"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Attach File */}
        <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
          <Accordion type="single" collapsible className="item-1" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
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
          <Accordion type="single" collapsible className="item-1" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
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
                  <table className="min-w-full border-t border-b border-gray-200">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Form</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email subject</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                        <th className="px-4 py-2 text-left text-sm font-medium"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {mockTableData.map((row, idx) => (
                        <tr key={idx}>
                          <td className="px-4 py-2 text-sm">{row.queueName}</td>
                          <td className="px-4 py-2 text-sm">{row.queueDescription}</td>
                          <td className="px-4 py-2 text-sm">{format(row.uploadDate, "dd MMM yyyy HH:mm:ss")}</td>
                          <td className="px-4 py-2 text-sm">
                            <button title="Copy">
                              <PaperIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" />
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

        {/* Send Email */}
        <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
          <Accordion type="single" collapsible className="item-1" value={isOpen ? "item-1" : ""} onValueChange={(value) => setIsOpen(value === "item-1")}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-0 m-0">
                <div className="flex w-full items-center justify-between">
                  <span>Send Email</span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                    >
                      <SendIcon className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                    >
                      <DeleteIcon className="w-4 h-4" />
                    </button>
                  </div>
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
                        <option value="txn01">CMS@aeon.co.th</option>
                        <option value="txn02">CMS2@aeon.co.th</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Typography variant="caption" className="w-24 whitespace-nowrap">
                        To:
                      </Typography>
                      <select className="border border-gray-300 rounded-md shadow-sm w-full px-2 py-1 text-sm">
                        <option value="txn01">unns@gmail.com</option>
                        <option value="txn02">test@gmail.com</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <Typography variant="caption" className="w-24 whitespace-nowrap">
                        Subject:
                      </Typography>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
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
                        type="text"
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Typography variant="caption" className="w-20 whitespace-nowrap">
                        Bcc:
                      </Typography>
                      <input
                        type="text"
                        className="border border-gray-300 rounded-md px-2 py-1 w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 mb-4">
                  <textarea
                    className="border border-gray-300 rounded-md px-2 py-1 w-full h-50 resize-none"
                  />
                </div>

                {/* Attachments Section */}
                <div className="flex flex-col gap-3">
                  <div className="w-1/2 rounded-md border border-gray-300 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-green-100 flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-green-600" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">Example ID card.pdf</p>
                        <p className="text-xs text-gray-500">12 KB</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800">
                        <PaperDownloadIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <DeleteIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" />
                      </button>
                    </div>
                  </div>

                  <div className="w-1/2 rounded-md border border-gray-300 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-green-100 flex items-center justify-center">
                        <FileIcon className="w-5 h-5 text-green-600" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-800">Example ID card.pdf</p>
                        <p className="text-xs text-gray-500">12 KB</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="text-blue-600 hover:text-blue-800"><PaperDownloadIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" /></button>
                      <button className="text-red-600 hover:text-red-800"><DeleteIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" /></button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </CardPageWrapper>
  )
}
