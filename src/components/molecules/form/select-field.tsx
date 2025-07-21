import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cva } from "class-variance-authority";

interface SelectFieldProps<T> {
    loading?: boolean;
    readonly?: boolean;
    items: T[];
    valueName?: string;
    labelName?: string;
    form: any; // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
    name: string;
    label: string;
    placeholder?: string;
    onChange?: (value: string) => void; // Optional onChange handler
}
const selectFieldVariants = cva(
    'w-full',
    {
        variants: {
            readonly: {
                true: "bg-gray-100 cursor-not-allowed",
                false: "bg-white cursor-text",
            }
        }
    }
)
const SelectField = (
    { onChange, loading = false, readonly = false,
        items, valueName = "value", labelName = "label",
        form, name, label, placeholder
    }: SelectFieldProps) => {

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="w-full" >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {items.map((item: any) => (
                                <SelectItem key={item[valueName]} value={String(item[valueName])}>
                                    {item[labelName]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
};

export { SelectField };