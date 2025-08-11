import { useState } from "react"
import { CheckboxField } from "../form/checkbox"
import { SelectField } from "../form/select-field"
import { Typography } from "../common/typography"
import { ComboboxMultiField } from "../form/combo-multi-field"
import { RadioField } from "../form/radio"
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
    // const handleSubmitSelect = (selected: any[]) => {
    //     setSublist(selected)
    // }
    const itemsChild = form.watch(nameChild)
    const itemsChildSelect = itemsChild.map((value: string) => ({
        value: value,
        label: value,
    }))

    return (
        <>
            <ComboboxMultiField
                form={form}
                name={nameChild}
                label={nameMainLabel}
                items={items}
                valueName="value"
                labelName="label"

            />
            {/* {
                JSON.stringify(itemsChild)
            } */}
            {/* <div></div> */}
            {/* {
                JSON.stringify(form)
            } */}
            <RadioField
                label={nameChildLabel}
                form={form}
                items={itemsChildSelect}
                name={nameMain}
                valueName="value"
                labelName="label"

            />
            {(!itemsChildSelect.length) ? <Typography variant="caption" className="mx-3">-</Typography> : null}
        </>
    )

}