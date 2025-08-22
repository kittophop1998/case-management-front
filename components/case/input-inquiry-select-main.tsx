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
    onChangeMain: (value: any[]) => void,
    onChangeChild: (value: any) => void
}
export const InputInquirySelectMain = ({
    form,
    nameChild,
    nameMain,
    items,
    nameMainLabel,
    nameChildLabel,
    onChangeMain,
    onChangeChild
}: InputInquirySelectMainProps) => {
    const itemsChild = form.watch(nameChild)
    const itemsChildSelect = [...items].filter(e => itemsChild.includes(e.id))
    // (itemsChild ?? []).map((value: string) => ({
    //     id: value,
    //     name: value,
    // }))
    const [draftChild, setDraftChild] = useState([])
    const coseWindownChild = () => {

    }
    const confirmDraftChild = () => {
        form.setValue(nameChild, draftChild)
        coseWindownChild()
    }
    const clearDraftChild = () => {
        setDraftChild([])
        coseWindownChild()
    }
    const openDraftChild = () => {
        setDraftChild(itemsChild)
        coseWindownChild()
    }
    return (
        <>
            <ComboboxMultiField
                onChange={(newV) => {
                    onChangeChild(newV)
                }}
                forceDisplayValue='Multiple select'
                form={form}
                name={nameChild}
                label={nameMainLabel}
                items={items}
                valueName="id"
                labelName="name"

            />
            <RadioField
                onChange={(newV) => {
                    onChangeMain(newV)
                }}
                label={nameChildLabel}
                form={form}
                items={itemsChildSelect}
                name={nameMain}
                valueName="id"
                labelName="name"

            />
            {(!itemsChildSelect.length) ? <Typography variant="caption" className="mx-3">-</Typography> : null}
        </>
    )

}