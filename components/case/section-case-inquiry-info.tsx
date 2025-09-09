import { Typography } from "../common/typography"
import { SectionCard } from "./section-card"
import { TextAreaField } from "../form/textarea-field"
import useCaseType from "@/hooks/use-case-type"
import { CaseTypeText } from "@/types/case.type"
import { memo, ReactNode, use, useEffect, useMemo, useRef } from "react"
import { SelectField } from "../form/select-field"
import { DatePickerField, DatePickerFieldInput } from "../form/date-picker"
import TelephoneCall from '@/public/icons/TelephoneCall.svg'
import Warning from '@/public/icons/Warning.svg'
import { DropdownSystemType, GetDropdownResponse } from "@/features/systemApiSlice"
import { Info } from "./info"
import { useLazyGetQueueInfoQuery, useLazyGetTableQuery } from "@/features/queueApiSlice"
import { cn } from "@/lib/utils"

interface SectionCaseInfoProps {
    isSmallMod: boolean
    form: any
    caseTypeText?: CaseTypeText
    ddData: DropdownSystemType | undefined
    layout?: '1col' | '2col',
    mode?: 'view' | 'edit' | 'create'
}



export const SectionCaseInfo = ({ isSmallMod, form, caseTypeText = 'Inquiry', ddData, layout = '1col', mode = 'view' }: SectionCaseInfoProps) => {
    const caseTypeId = form.watch('caseTypeId')
    const {
        data: { childValue2text },
    } = useCaseType()
    const priority = form.watch('priority')
    const reasonCode = form.watch('reasonCode')

    // High, Normal
    const prioritys = [
        {
            id: 'High',
            name: 'High'
        }, {
            id: 'Normal',
            name: 'Normal'
        }]
    const allocateToQueueTeams = prioritys || []

    const warningText = useMemo(() => {
        const found = ddData?.reasonCodes.find(item => item.id === reasonCode)
        if (found) {
            // return `Warning: ${found.descriptionTh}`
            return found.notice
        }
        return ''
    }, [reasonCode, ddData?.reasonCodes])
    const [getData, { currentData: data, isFetching, isError, error }] = useLazyGetTableQuery();
    let isMounted = useRef(false);
    useEffect(() => {
        if (isMounted.current) return;
        // getData({
        //     page: 1,
        //     limit: 99999999,
        //     sort: null,
        //     order: null,
        // })
        isMounted.current = true;
    }, []);

    return (
        <SectionCard title="Case Info" isAccordion={!!isSmallMod}>
            <div className={cn("pt-2 grid gap-3", {
                'grid-cols-1': layout === '1col',
                'grid-cols-2': layout === '2col',
            })}>
                <div className="space-y-3">
                    <Typography variant="caption">Case Type:  {childValue2text?.[caseTypeId] || caseTypeId}</Typography>
                    {caseTypeText === 'None Inquiry' && (
                        <>
                            <Info title="Verify Status" value="Nalan Kacherninin-BKK" />
                            <Info title="Channel" value={
                                <div className="flex items-center gap-2">
                                    <TelephoneCall />
                                    <Typography variant="caption">IVR</Typography>
                                </div>
                            } />
                            <Info required title="Priority" value={<div className="flex-1 max-w-[300px]">
                                <SelectField
                                    form={form}
                                    name='priority'
                                    valueName='id'
                                    labelName='name'
                                    loading={false}
                                    items={prioritys}
                                /></div>} />

                            {
                                priority === 'High' && (
                                    <>
                                        <Info required title="Reason code" value={<div className="flex-1 max-w-[300px]">
                                            <SelectField
                                                form={form}
                                                name='reasonCode'
                                                valueName='id'//code
                                                labelName='descriptionTh'
                                                loading={false}
                                                items={ddData?.reasonCodes || []}
                                            /></div>} />
                                        {warningText && <div className="flex items-center gap-3">
                                            <div><Warning /></div>
                                            <Typography variant="caption" className="text-red-500" >
                                                {/* SLA Response time: ภายใน 30 นาที , SLA Solution Time: ภายใน 4 ชั่วโมง, Note: ต้องมีการตรวจสอบธุรกรรมทันที */}
                                                {warningText}
                                            </Typography>
                                        </div>}
                                    </>
                                )
                            }
                            <Info title="Due Date" required value={
                                <div className="flex-1 max-w-[300px]">
                                    <DatePickerField
                                        form={form}
                                        name='dueDate'
                                        loading={false}
                                    />
                                </div>} />
                            <Info title="Allocate to Queue Team" value={<div className="flex-1 max-w-[300px]">
                                <SelectField
                                    form={form}
                                    name='allocateToQueueTeam'
                                    valueName='queueId'
                                    labelName='queueName'
                                    loading={false}
                                    items={data?.data || []}
                                /></div>} />
                        </>
                    )}
                </div>
                <div>
                    <TextAreaField
                        name="caseDescription"
                        label="Case Description"
                        placeholder="Enter Case Description"
                        form={form}
                    />
                </div>
            </div>
        </SectionCard>
    )
}