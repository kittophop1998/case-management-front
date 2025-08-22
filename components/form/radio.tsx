import { cva } from "class-variance-authority";
import { InputDefaultProps, InputFieldWarper, InputFieldWarperChildProps, InputFormDefaultProps, InputSelectProps } from "./input-warper";
import { SelectItems } from "./combo-multi-field";

interface RadioFieldProps extends
    InputFieldWarperChildProps,
    InputSelectProps,
    InputFormDefaultProps,
    InputDefaultProps {
    disableList?: any[]
}
const RadioFieldVariants = cva(
    'w-full',
    {
        variants: {
            readonly: {
                true: "cursor-not-allowed",
                false: "cursor-text",
            }
        }
    }
)
const RadioField = (
    {
        onChange,
        loading = false,
        readonly = false,
        items,
        valueName = "value",
        labelName = "label",
        form,
        name,
        label,
        className = "",
        disableList,
        required = false,
        placeholder
    }: RadioFieldProps) => {
    const value = form.watch(name)
    const onSelect = (val: string) => {
        form.setValue(name, val, { shouldValidate: true });
        onChange?.(val)
    }
    return (
        <InputFieldWarper
            loading={loading}
            form={form}
            name={name}
            label={label}
            required={required}
        >
            <SelectItems
                items={items}
                valueName={valueName}
                labelName={labelName}
                onChange={onSelect}
                value={value}
            />
        </InputFieldWarper>
    )
};

export { RadioField }; 