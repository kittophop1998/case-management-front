import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface RadioFieldProps {
    onChange?: (value: string) => void; // Optional onChange handler
    loading?: boolean;
    readonly?: boolean;
    items: any[];
    valueName?: string;
    labelName?: string;
    form: any; // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
    name: string;
    label: string;
    className?: string; // Optional className for additional styling

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
        className = ""
    }: RadioFieldProps) => {
    const valueMap = new Map(
        items.map((item: any) => [String(item[valueName]), item[valueName]])
    )
    return (
        <FormField
            control={form.control}
            name={name}
            disabled={loading || readonly}
            render={({ field }) => (
                <FormItem >
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <RadioGroup

                            // onChange={onChange ? onChange : field.onChange}
                            defaultValue={field.value}
                            className={cn(RadioFieldVariants({ readonly }), className)}
                            value={String(field.value)}
                            onValueChange={val => {
                                const actualValue = valueMap.get(val)
                                console.log('RadioField onValueChange', val, actualValue)
                                if (actualValue !== undefined) {
                                    field.onChange(actualValue) // fallback to val if not found
                                } else {
                                    field.onChange(val) // fallback to val if not found
                                }
                            }}
                        >
                            {
                                items.map((item: any) => (
                                    <FormItem className="flex items-center gap-3" key={String(item[valueName])}>
                                        <FormControl>
                                            <RadioGroupItem value={String(item[valueName])} id={String(item[valueName])} />
                                        </FormControl>
                                        <FormLabel className="font-normal">{item[labelName]}</FormLabel>
                                    </FormItem>
                                ))
                            }
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};

export { RadioField }; 