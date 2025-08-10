import { useState } from "react"
import { CheckboxField } from "../form/checkbox"
import { SelectField } from "../form/select-field"
import { Typography } from "../common/typography"
interface InputInquirySelectMainProps {
    form: any
    nameChild: string
    nameMain: string
    items: any[]
    nameMainLabel: string,
    nameChildLabel: string,
}
export const InputInquirySelectMain = ({
    form,
    nameChild,
    nameMain,
    items,
    nameMainLabel,
    nameChildLabel,

}: InputInquirySelectMainProps) => {
    const [subLIst, setSublist] = useState<any[]>([])
    const handleSubmitSelect = (selected: any[]) => {
        setSublist(selected)
    }
    return (
        <>
            <SelectField
                form={form}
                name={nameChild}
                label={nameMainLabel}
                items={items}
                valueName="value"
                labelName="label"

            />
            <CheckboxField
                label={nameChildLabel}
                form={form}
                items={subLIst}
                name={nameMain}
                valueName="value"
                labelName="label"

            />
            {(!subLIst.length) ? <Typography variant="caption" className="mx-3">have no items</Typography> : null}

        </>
    )

}