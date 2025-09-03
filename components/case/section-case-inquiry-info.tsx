import { Typography } from "../common/typography"
import { SectionCard } from "./section-card"
import { TextAreaField } from "../form/textarea-field"
import useCaseType from "@/hooks/use-case-type"

interface SectionCaseInfoProps {
    isSmallMod: boolean
    form: any
    caseTypeText: 'None Inquiry' | 'Inquiry'
}

export const SectionCaseInfo = ({ isSmallMod, form, caseTypeText = 'Inquiry' }: SectionCaseInfoProps) => {
    const caseTypeId = form.watch('caseTypeId')
    const {
        data: { childValue2text },
    } = useCaseType()
    return (
        <SectionCard title="Case Info" isAccordion={!!isSmallMod}>
            <div className="space-y-3 pt-2">
                <Typography variant="caption">Case Type:  {childValue2text?.[caseTypeId] || caseTypeId}</Typography>
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