'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Card from "@/components/common/card"
import { Typography } from "@/components/common/typography"
import PaperDownloadIcon from '@/public/icons/paper_download_icon.svg'
import DeleteIcon from '@/public/icons/delete_icon.svg'
import { format } from "date-fns"

type FileData = {
  queueId: number;
  queueName: string;
  queueDescription: string;
  uploadDate: Date;
}

type AttachFileSectionProps = {
  open: boolean;
  onToggle: (open: boolean) => void;
  files: FileData[];
  onUpload?: () => void;
  onDownload?: (file: FileData) => void;
  onDelete?: (file: FileData) => void;
}

export default function AttachFileSection({
  open,
  onToggle,
  files,
  onUpload,
  onDownload,
  onDelete
}: AttachFileSectionProps) {
  return (
    <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
      <Accordion
        type="single"
        collapsible
        value={open ? "item-1" : ""}
        onValueChange={(value) => onToggle(value === "item-1")}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className='p-0 m-0'>Attach File</AccordionTrigger>
          <AccordionContent className="mt-2 text-gray-600">
            <div className="space-y-3 pt-2 overflow-x-auto">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={onUpload}
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
                  {files.map((file) => (
                    <tr key={file.queueId}>
                      <td className="px-4 py-2 text-sm">{file.queueName}</td>
                      <td className="px-4 py-2 text-sm">{file.queueDescription}</td>
                      <td className="px-4 py-2 text-sm">{format(file.uploadDate, "dd MMM yyyy HH:mm:ss")}</td>
                      <td className="px-4 py-2 text-sm flex gap-2">
                        <button
                          title="Download"
                          onClick={() => onDownload?.(file)}
                          className="hover:text-blue-600"
                        >
                          <PaperDownloadIcon className="inline-block w-4 h-4 cursor-pointer hover:opacity-75" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => onDelete?.(file)}
                          className="hover:text-red-600"
                        >
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
  )
}
