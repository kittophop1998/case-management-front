import { useMemo } from "react"
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

interface SectionEmailProps {
    isSmallMod: boolean
    form: any
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

export const SectionEmail = ({ isSmallMod, form }: SectionEmailProps) => {

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

export const SectionSendEmail = ({ isSmallMod, form }: SectionEmailProps) => {
    return (
        <SectionCard title="Send Email" isAccordion={!!isSmallMod}>
            <div className="space-y-3 pt-2">
                <Info titleClass="min-w-[3.5rem]" title='Form' required value={
                    <div className="flex-1 ">
                        <SelectField
                            form={form}
                            name='form'
                            valueName='id'
                            labelName='name'
                            loading={false}
                            items={[]}
                        />
                    </div>
                } />
                <Info titleClass="min-w-[3.5rem]" title='To' required value={
                    <div className="flex-1 ">
                        <TextField
                            form={form}
                            name='form'
                            loading={false}
                        />
                    </div>
                } />
                <Info titleClass="min-w-[3.5rem]" title='CC' required value={
                    <div className="flex-1 ">
                        <TextField
                            form={form}
                            name='form'
                            loading={false}
                        />
                    </div>
                } />
                <Info titleClass="min-w-[3.5rem]" title='Bcc' required value={
                    <div className="flex-1 ">
                        <TextField
                            form={form}
                            name='form'
                            loading={false}
                        />
                    </div>
                } />
                <Info titleClass="min-w-[3.5rem]" title='Subject' required value={
                    <div className="flex-1 ">
                        <TextField
                            form={form}
                            name='form'
                            loading={false}
                        />
                    </div>
                } />
                <Typography variant="caption">Email Body</Typography>
                <Info titleClass="min-w-[3.5rem]" title='Template' required value={
                    <div className="flex-1 ">
                        <SelectField
                            form={form}
                            name='form'
                            valueName='id'
                            labelName='name'
                            loading={false}
                            items={[]}
                        />
                    </div>
                } />
                <div>
                    {/* EDIT-SECTION */}
                </div>
                <div className="space-y-3">
                    {[1, 2].map(() => <File />)}
                </div>
            </div>
        </SectionCard >
    )
}


const File = () => {
    return <Card className="p-2 gap-3 rounded-sm border shadow-none flex items-center">
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