
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const DatePicker = ({ loading, readonly = false, form, name, label, placeholder }: TextFieldProps) => {
    return <FormField
        control={form.control}
        name={name}
        disabled={loading || readonly}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input
                        type="date"
                        {...field}
                        value={field.value.toISOString().split("T")[0]}
                        onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
};

export { DatePicker };