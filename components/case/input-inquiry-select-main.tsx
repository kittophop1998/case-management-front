import { useState } from "react"
import { CheckboxField } from "../form/checkbox"
import { SelectField } from "../form/select-field"
import { Typography } from "../common/typography"
import { ComboboxMultiField, SelectItems } from "../form/combo-multi-field"
import { RadioField } from "../form/radio"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "../common/Button"

const SelectChildInput = ({
    onSave,
    items,
    valueName,
    labelName,
    value
}) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [draftValue, setDraftValue] = useState<string[]>(value)
    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen} >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                        "justify-between w-full",
                        value.length === 0 && "text-muted-foreground"
                    )}
                >
                    Multiple select
                    <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
                <div className="px-3 pt-3 ">
                    <Typography variant="body2" className="pb-2">Search Disposition code</Typography>
                    <SelectItems
                        searchPlaceholder="Search Disposition code"
                        items={items}
                        valueName={valueName}
                        labelName={labelName}
                        onChange={(newValue: any) => {
                            setDraftValue(newValue)
                        }}
                        value={draftValue}
                        searchABle={true}
                    />
                </div>
                <div className="p-3 flex items-center justify-end gap-2"

                    style={{
                        boxShadow: "1px -1px 4px 0px #00000026"
                    }}
                >
                    <Button onClick={() => {
                        setPopoverOpen(false);
                        setDraftValue(value);

                    }}
                        variant='ghost'
                        className="h-[33px] w-[76px]"

                    >

                        <Typography variant="body2">Cancel</Typography>
                    </Button>
                    <Button onClick={() => {
                        console.log('draftValue', draftValue)
                        onSave(draftValue);
                        setPopoverOpen(false);

                    }}
                        className="h-[33px] w-[76px]"

                    >

                        <Typography variant="body2">Apply</Typography>

                    </Button>

                </div>
            </PopoverContent>
        </Popover>
    )
}
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

    return (
        <>
            <SelectChildInput
                onSave={(newValue) => {
                    form.setValue(nameChild, newValue)
                    onChangeChild(newValue)
                }}
                items={items}
                value={itemsChild}
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