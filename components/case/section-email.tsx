import { SectionCard } from "./section-card"

interface SectionEmailProps {
    isSmallMod: boolean
    form: any
}

export const SectionEmail = ({ isSmallMod, form }: SectionEmailProps) => {
    return (
        <SectionCard title="Email" isAccordion={!!isSmallMod}>
            <div className="space-y-3 pt-2">
                ssssadasdasdasd
            </div>
        </SectionCard>
    )
}

export const SectionSendEmail = ({ isSmallMod, form }: SectionEmailProps) => {
    return (
        <SectionCard title="Send Email" isAccordion={!!isSmallMod}>
            <div className="space-y-3 pt-2">
                ssssadasdasdasd
            </div>
        </SectionCard>
    )
}