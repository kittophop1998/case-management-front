"use client"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"
export type DateValueType = string | null

// interface DatePickerFieldProps {
//     loading?: boolean;
//     readonly?: boolean;
//     form: any; // Adjust type as needed
//     name: string;
//     label?: string;
//     placeholder?: string;
//     prependInnerIcon?: React.ReactNode;
//     appendInnerIcon?: React.ReactNode;
// }
// export function DatePickerField(
//     {
//         loading,
//         readonly = false,
//         form,
//         name,
//         label,
//         placeholder,
//         prependInnerIcon,
//         appendInnerIcon
//     }: DatePickerFieldProps
// ) {
//     return (
//         <FormItem className="flex flex-col">
//             <FormLabel>Date of birth</FormLabel>
//             <Popover>
//                 <PopoverTrigger asChild>
//                     <FormControl>
//                         <Button
//                             variant={"outline"}
//                             className={cn(
//                                 "w-[240px] pl-3 text-left font-normal",
//                                 !field.value && "text-muted-foreground"
//                             )}
//                         >
//                             {field.value ? (
//                                 format(field.value, "PPP")
//                             ) : (
//                                 <span>Pick a date</span>
//                             )}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                         </Button>
//                     </FormControl>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                         mode="single"
//                         selected={field.value}
//                         onSelect={field.onChange}
//                         disabled={(date) =>
//                             date > new Date() || date < new Date("1900-01-01")
//                         }
//                         captionLayout="dropdown"
//                     />
//                 </PopoverContent>
//             </Popover>
//             <FormMessage />
//         </FormItem>
//     )
// }

export const DatePickerFieldInput = ({
    value,
    onChange
}: {
    value: DateValueType
    onChange: (date: DateValueType) => void
}) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                >
                    {value ? format(value, "PPP") : "Select date"}
                    {/* <ChevronDownIcon /> */}
                    {/* @ts-expect-error className is valid for lucide icon */}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />

                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value ? new Date(value) : undefined}
                    captionLayout="dropdown"
                    onSelect={(date: Date | undefined) => {
                        onChange(date ? format(date, 'yyyy-MM-dd') : null)
                        setOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}
