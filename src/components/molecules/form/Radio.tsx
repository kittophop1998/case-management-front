import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cva } from "class-variance-authority";

interface RadioFieldProps<T> {
    loading?: boolean;
    readonly?: boolean;
    items: T[];
    valueName?: string;
    labelName?: string;
    form: any; // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
    name: string;
    label: string;
    onChange?: (value: string) => void; // Optional onChange handler
}
const RadioFieldVariants = cva(
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
const RadioField = (
    { onChange, loading = false, readonly = false,
        items, valueName = "value", labelName = "label",
        form, name, label
    }: RadioFieldProps) => {
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
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col"
                        >
                            {
                                items.map((item: any) => (
                                    <FormItem className="flex items-center gap-3">
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