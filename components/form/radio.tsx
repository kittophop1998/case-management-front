import { cva } from "class-variance-authority";
import { InputDefaultProps, InputFieldWarper, InputFieldWarperChildProps, InputFormDefaultProps, InputSelectProps } from "./input-warper";
import { SelectItems } from "./select-field";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { cn } from "@/lib/utils";

interface RadioFieldProps extends
    InputFieldWarperChildProps,
    InputSelectProps,
    InputFormDefaultProps,
    InputDefaultProps {
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
        required = false,
    }: RadioFieldProps) => {
    return (
        <InputFieldWarper
            loading={loading}
            form={form}
            name={name}
            label={label}
            required={required}
        >
            <RadioItems
                className={className}
                items={items}
                valueName={valueName}
                labelName={labelName}
            />
        </InputFieldWarper>
    )
};
const RadioItems = ({ field, items, valueName, labelName, className = '' }) => {
    return (
        <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className={cn('', className)}
        >
            {items.map((el) => (
                <FormItem className="flex items-center gap-3">
                    <FormControl>
                        <RadioGroupItem value={el?.[valueName]} />
                    </FormControl>
                    <FormLabel className="font-normal">{el?.[labelName]}</FormLabel>
                </FormItem>
            ))}

        </RadioGroup>
    );
};

export { RadioField };