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
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

interface RadioFieldProps<T> {
    onChange?: (value: string) => void; // Optional onChange handler
    loading?: boolean;
    readonly?: boolean;
    items: T[];
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
                true: "bg-gray-100 cursor-not-allowed",
                false: "bg-white cursor-text",
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
                            onChange={onChange ? onChange : field.onChange}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={cn(RadioFieldVariants({ readonly }), className)}
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