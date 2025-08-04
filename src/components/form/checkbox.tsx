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
                <Typography variant="caption" className="mt-2">
                    {label}
                </Typography>
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
                                            // value={field.value}
                                            onCheckedChange={(checked) => {
                                                // console.log('CheckboxField onCheckedChange', checked, item[valueName])
                                                // console.log('field.value', field.value)
                                                return checked
                                                    ? field.onChange([...field.value, item[valueName]])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                            (value) => value !== item[valueName]
                                                        )
                                                    )
                                            }}

                                        />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                        {item[labelName] || item[valueName]}
                                        {/* <div>
                                            item[valueName]:{item[valueName]}
                                        </div>
                                        <div>
                                            field.value:{JSON.stringify(field.value)}
                                        </div> */}
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