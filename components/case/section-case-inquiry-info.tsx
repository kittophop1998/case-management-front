import { Typography } from "../common/typography"
import { SectionCard } from "./section-card"
import { TextAreaField } from "../form/textarea-field"
import useCaseType from "@/hooks/use-case-type"
import { CaseTypeText } from "@/types/case.type"
import { memo, ReactNode } from "react"
import { SelectField } from "../form/select-field"
import { DatePickerField, DatePickerFieldInput } from "../form/date-picker"
import TelephoneCall from '@/public/icons/TelephoneCall.svg'
import Warning from '@/public/icons/Warning.svg'
import { GetDropdownResponse } from "@/features/systemApiSlice"
import { Info } from "./info"

interface SectionCaseInfoProps {
    isSmallMod: boolean
    form: any
    caseTypeText: CaseTypeText
    ddData: GetDropdownResponse | undefined

}



export const SectionCaseInfo = ({ isSmallMod, form, caseTypeText = 'Inquiry', ddData }: SectionCaseInfoProps) => {
    const caseTypeId = form.watch('caseTypeId')
    const {
        data: { childValue2text },
    } = useCaseType()
    const priority = form.watch('priority')
    // 
    const prioritys = [
        {
            id: 'HEIGHT',
            name: 'HEIGHT'
        }, {
            id: 'LOW',
            name: 'LOW'
        }]
    const reasonCodes = prioritys || []
    const allocateToQueueTeams = prioritys || []
    return (
        <SectionCard title="Case Info" isAccordion={!!isSmallMod}>
            <div className="space-y-3 pt-2">
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
                            priority === 'HEIGHT' && (
                                <>
                                    <Info required title="Reason code" value={<div className="flex-1 max-w-[300px]">
                                        <SelectField
                                            form={form}
                                            name='reasonCode'
                                            valueName='id'
                                            labelName='name'
                                            loading={false}
                                            items={reasonCodes}
                                        /></div>} />
                                    <div className="flex items-center gap-3">
                                        <div><Warning /></div>
                                        <Typography variant="caption" className="text-red-500" >SLA Response time: ภายใน 30 นาที , SLA Solution Time: ภายใน 4 ชั่วโมง, Note: ต้องมีการตรวจสอบธุรกรรมทันที</Typography>
                                    </div>
                                </>
                            )
                        }
                        <Info title="Due Date" required value={<div className="flex-1 max-w-[300px]">
                            <DatePickerField
                                form={form}
                                name='dueDate'
                                loading={false}
                            /></div>} />
                        <Info title="Allocate to Queue Team" value={<div className="flex-1 max-w-[300px]">
                            <SelectField
                                form={form}
                                name='allocateToQueueTeam'
                                valueName='id'
                                labelName='name'
                                loading={false}
                                items={allocateToQueueTeams}
                            /></div>} />
                    </>
                )}
                <TextAreaField
                    name="caseDescription"
                    label="Case Description"
                    placeholder="Enter Case Description"
                    form={form}
                />
            </div>
        </SectionCard>
    )
}