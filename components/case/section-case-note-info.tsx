import { Typography } from "../common/typography"
import { SectionCard } from "./section-card"
import { TextAreaField } from "../form/textarea-field"
import useCaseType from "@/hooks/use-case-type"

interface SectionCaseNoteInfoProps {
    isSmallMod: boolean
    form: any
}

export const SectionCaseNoteInfo = ({ isSmallMod, form }: SectionCaseNoteInfoProps) => {
    const seeData = form.watch()
    return (
        <SectionCard title="Case Note" isAccordion={!!isSmallMod}>
            <div className="space-y-3 pt-2">
                {seeData.caseNote.map((field, index) => (
                    <TextAreaField
                        key={`TextAreaField-${index}`}
                        name={`caseNote.${index}`}
                        label={`Add Note`}
                        placeholder="Enter Note"
                        form={form}
                    />
                ))}
            </div>
        </SectionCard>
    )
}