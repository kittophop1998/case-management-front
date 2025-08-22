'use client';
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Typography } from "@/components/common/typography";

interface CheckboxFieldProps {
    isPending?: boolean;
    readonly?: boolean;
    form: any; // Adjust type as needed
    name: string;
    label?: string;
    placeholder?: string;
    items: any[]; // Adjust type as needed
    valueName?: string;
    labelName?: string;
}
export const CheckboxField = ({ isPending, readonly = false, form, items, name, label, placeholder,
    valueName = "value",
    labelName = "label",
}: CheckboxFieldProps) => {
    const valueMap = new Map(
        items.map((item: any) => [String(item[valueName]), item[valueName]])
    )
    return <FormField
        control={form.control}
        name="items"
        render={() => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                {items.map((item) => (
                    <FormField
                        key={item[valueName]}
                        control={form.control}
                        name={name}
                        render={({ field }) => {
                            return (
                                <FormItem
                                    key={item[valueName]}
                                    className="flex flex-row items-center gap-2"
                                >
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item[valueName])}

                                            defaultValue={field.value}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...field.value, item[valueName]])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                            (value: any) => value !== item[valueName]
                                                        )
                                                    )
                                            }}

                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                        {item[labelName] || item[valueName]}
                                    </FormLabel>
                                </FormItem>
                            )
                        }}
                    />
                ))}
                <FormMessage />
            </FormItem>
        )}
    />
};