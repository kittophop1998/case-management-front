"use client"
import { format } from "date-fns"
import { CalendarIcon, ChevronDownIcon } from "lucide-react"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import React from "react"
import { Label } from "../ui/label"

const FormSchema = z.object({
    dob: z.date({
        required_error: "A date of birth is required.",
    }),
})


export function DatePickerField(
    {
        loading,
        readonly = false,
        form,
        name,
        label,
        placeholder,
        prependInnerIcon,
        appendInnerIcon
    }
) {
    return (
        <FormItem className="flex flex-col">
            <FormLabel>Date of birth</FormLabel>
            <Popover>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                    />
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    )
}

// export const DatePickerFieldInput = ({
//     value,
//     onChange
// }) => {
//     return (
//         <Popover>
//             <PopoverTrigger asChild>
//                 <Button
//                     variant={"outline"}
//                     className={cn(
//                         "w-[240px] pl-3 text-left font-normal",
//                         !value && "text-muted-foreground"
//                     )}
//                 >
//                     {value ? (
//                         format(value, "PPP")
//                     ) : (
//                         <span>Pick a date</span>
//                     )}
//                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                 </Button>

//             </PopoverTrigger>
//             <PopoverContent className="w-auto p-0" align="start">
//                 <Calendar
//                     mode="single"
//                     selected={value}
//                     onSelect={onChange}
//                     disabled={(date) =>
//                         date > new Date() || date < new Date("1900-01-01")
//                     }
//                     captionLayout="dropdown"
//                 />
//             </PopoverContent>
//         </Popover>
//     )
// }
// export const DatePickerFieldInput = ({
//     value,
//     onChange,
//     width = "240px"
// }: {
//     value: string | null,
//     onChange: (date: string | null) => void,
//     width?: string
// }) => {
//     const [statusOpen, setStatusOpen] = useState<boolean>(false);
//     return (
//         <>
//             <Popover open={statusOpen} onOpenChange={setStatusOpen}>
//                 <PopoverTrigger asChild >
//                     <Button
//                         variant={"outline"}
//                         className={cn(
//                             "pl-3 text-left font-normal",
//                             !value && "text-muted-foreground",
//                             width && `w-[${width}] min-w-[${width}] max-w-[${width}] `
//                             // `min-w-[9rem]`
//                         )}
//                     >
//                         <CalendarIcon className="h-4 w-4" />
//                         {value ? (
//                             format(value, "PPP")
//                         ) : (
//                             <span className="">Log Date</span>
//                         )}
//                     </Button>
//                     {/* </FormControl> */}
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                         mode="single"
//                         selected={value || undefined}
//                         onSelect={(date: Date | undefined) => {
//                             console.log('Selected date:', date);
//                             onChange(date || null)
//                             setStatusOpen(false)
//                         }
//                         }
//                         // onSelect={(date) => {
//                         //     if (date) {
//                         //         console.log('Selected date:', format(new Date(`${date}`), 'yyyy-MM-dd'));
//                         //         // onChange(format(new Date(`${date}`), 'yyyy-MM-dd'))
//                         //         onChange(date)
//                         //     } else {
//                         //         console.log('Selected date:', date);
//                         //     }
//                         //     setStatusOpen(false)
//                         // }
//                         // }
//                         disabled={(date) =>
//                             date > new Date() || date < new Date("1900-01-01")
//                         }
//                         captionLayout="dropdown"
//                     />
//                 </PopoverContent>
//             </Popover>


//         </>
//     )
// }
// 

// 
// 
// 
// 

// import * as React from "react"
// import { ChevronDownIcon } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Label } from "@/components/ui/label"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"

export type DateValueType = string | null
export const DatePickerFieldInput = ({
    value,
    onChange
}: {
    // value: Date | undefined
    // onChange: (date: Date | undefined) => void
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
