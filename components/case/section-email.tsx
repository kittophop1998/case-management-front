import { useMemo, useState } from "react"
import { Button } from "../common/Button"
import { Typography } from "../common/typography"
import { SelectField } from "../form/select-field"
import { TextField } from "../form/text-field"
import { Info } from "./info"
import { SectionCard } from "./section-card"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTable, Header } from "../common/table"
import { useTable } from "@/hooks/use-table"
import Card from "../common/card"

import FileSvg from '@/public/icons/File.svg'
import DeleteSvg from '@/public/icons/Delete.svg'
import PaperDownloadSvg from '@/public/icons/PaperDownload.svg'
import Tiptap from "../common/Tiptap"
import RichTextEditor from "../rich-text-editor"
import { cn } from "@/lib/utils"
import { Send, Trash } from "lucide-react"

interface SectionEmailProps {
    isSmallMod: boolean
    form: any,
    layout?: '1col' | '2col',
    mode?: 'view' | 'edit' | 'create'
}

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
        total={dataApi?.total || 0}
        totalPages={dataApi?.totalPages || 1}
        renderEmpty={false}
    />
}

export const SectionEmail = ({ isSmallMod, form, layout = '1col', mode = 'view' }: SectionEmailProps) => {

    return (
        <SectionCard title="Email" isAccordion={!!isSmallMod}>
            <div className="space-y-3 pt-2">
                <div className="flex gap-3 items-center">
                    <Button type="button" variant='outline-primary' className="rounded-sm">Sent Email</Button>
                    <Typography variant="caption">Please select Mail</Typography>
                </div>
                <div>
                    {/* {
                        JSON.stringify(fakeData)
                    } */}
                    <Tiptap />
                    <EmailList />
                </div>
            </div>
        </SectionCard>
    )
}

export const SectionSendEmail = ({ isSmallMod, form, layout = '1col' }: SectionEmailProps) => {
    const [post, setPost] = useState("");

    const onChange = (content: string) => {
        setPost(content);
        console.log(content);
    };

    return (
        <SectionCard title="Send Email" isAccordion={!!isSmallMod} actions={
            <div className="gap-3 flex">
                <button type="button" className="cursor-pointer">
                    <Send color={'#7461CF'} size={16} />
                </button>
                <button type="button" className="cursor-pointer">
                    <Trash color="red" size={16} />
                </button>
            </div>
        }>
            <div className="space-y-3 pt-2">
                <div className={cn("grid gap-3", {
                    'grid-cols-1': layout === '1col',
                    'grid-cols-2': layout === '2col',
                })} >
                    <div className="space-y-3">
                        <Info titleClass="min-w-[3.5rem]" title='Form' required value={
                            <div className="flex-1 ">
                                <SelectField
                                    form={form}
                                    name='form'
                                    valueName='form'
                                    labelName='form'
                                    loading={false}
                                    items={[
                                        {
                                            form: "CMS@aeon.co.th",
                                            emailSubject: "(REF1234567890) Change Passport",
                                            date: "12 Aug 2025",
                                        },
                                        {
                                            form: "unns@gamail.com",
                                            emailSubject: "RE:(REF1234567890) Change Passport",
                                            date: "12 Aug 2025",
                                        },
                                    ]}
                                    placeholder="Select Email"
                                />
                            </div>
                        } />
                        <Info titleClass="min-w-[3.5rem]" title='To' required value={
                            <div className="flex-1 ">
                                <TextField
                                    form={form}
                                    name='to'
                                    loading={false}
                                    placeholder="Enter Email"
                                />
                            </div>
                        } />
                    </div>
                    <div className="space-y-3">
                        <Info titleClass="min-w-[3.5rem]" title='CC' value={
                            <div className="flex-1 ">
                                <TextField
                                    form={form}
                                    name='cc'
                                    loading={false}
                                    placeholder="Enter Email"

                                />
                            </div>
                        } />
                        <Info titleClass="min-w-[3.5rem]" title='Bcc' value={
                            <div className="flex-1 ">
                                <TextField
                                    form={form}
                                    name='bcc'
                                    loading={false}
                                    placeholder="Enter Email"
                                />
                            </div>
                        } />
                    </div>
                </div>
                <div className={cn("", { 'grid grid-cols-2 gap-3': layout === '2col' })}>
                    <div className="space-y-3">
                        <Info titleClass="min-w-[3.5rem]" title='Subject' value={
                            <div className="flex-1 ">
                                <TextField
                                    form={form}
                                    name='subject'
                                    loading={false}
                                    placeholder="Enter Subject"
                                />
                            </div>
                        } />
                        <Typography variant="caption">Email Body</Typography>
                        <Info titleClass="min-w-[3.5rem]" title='Template' required value={
                            <div className="flex-1 ">
                                <SelectField
                                    form={form}
                                    name='template'
                                    valueName='id'
                                    labelName='name'
                                    loading={false}
                                    items={[
                                        {
                                            name: 'ขอเปลี่ยนแปลงเบอร์โทรศัพท์',
                                            id: '1'
                                        }
                                    ]}
                                    placeholder="Select Template"
                                />
                            </div>
                        } />
                    </div>
                </div>
                <div>
                    {/* EDIT-SECTION */}
                    <RichTextEditor content={post} onChange={onChange} />
                </div>
                <div className="space-y-3">
                    {[1, 2].map((key) => <File key={key} />)}
                </div>
            </div>
        </SectionCard >
    )
}


export const File = () => {
    return <Card className="p-2 gap-3 rounded-sm border shadow-none flex items-center max-w-[33.813rem]">
        <div className="w-[2.5rem]">
            <FileSvg className={'w-full h-full'} />
        </div>
        <div className="flex-1">
            <div>
                <Typography className="font-medium">Example ID card.pdf</Typography>
            </div>
            <div>
                <Typography variant="caption">12 KB</Typography>
            </div>
        </div>
        <div className="flex gap-3">
            <div className="w-[0.938rem] h-[1.063rem] cursor-pointer">
                <DeleteSvg className={'w-full h-full'} />
            </div>
            <div className="w-[0.938rem] h-[1.063rem] cursor-pointer">
                <PaperDownloadSvg className={'w-full h-full'} />
            </div>
        </div>
    </Card>
}