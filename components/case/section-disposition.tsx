import { JsonJoinDetails } from "@/types/user.type"
import { SelectField } from "../form/select-field"
import { InputInquiry } from "./input-inquiry"
import { SectionCard } from "./section-card"
import { FormMessage } from "../ui/form"
import { InputFieldWarper } from "../form/input-warper"

interface SectionEmailProps {
    isSmallMod: boolean
    form: any
    products: JsonJoinDetails[]
}

export const SectionDisposition = ({ isSmallMod, form, products = [] }: SectionEmailProps) => {
    return (
        <SectionCard title="Disposition" isAccordion={!!isSmallMod}>
            <div className="space-y-3 mt-3">
                <InputInquiry
                    form={form}
                    mainIdName='dispositionMainId'
                    subIdName='dispositionSubId'
                    mainListName='dispositionMains'
                    subListName='dispositionSubs'
                />

                <SelectField
                    form={form}
                    name='productId'
                    label='Product'
                    placeholder='All'
                    valueName='id'
                    labelName='name'
                    items={products || []}
                />
                <FormMessage />
            </div>
        </SectionCard>
    )
}

