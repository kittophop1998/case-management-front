// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select'
// import { cva } from 'class-variance-authority'
// import { useState } from 'react'
// import { SearchFieldInput } from './search-field'

// interface SelectFieldProps {
// loading?: boolean
// readonly?: boolean
// items: any[]
// valueName?: string
// labelName?: string
// form: any // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
// name: string
// label: string
// placeholder?: string
// onChange?: (value: any) => void // Optional onChange handler
// }
// const selectFieldVariants = cva('w-full', {
//   variants: {
//     readonly: {
//       true: 'bg-gray-100 cursor-not-allowed',
//       false: 'bg-white cursor-text'
//     }
//   }
// })

// const SelectField = ({
// onChange,
// loading = false,
// readonly = false,
// items,
// valueName = 'value',
// labelName = 'label',
// form,
// name,
// label,
// placeholder
// }: SelectFieldProps) => {
//   const valueMap = new Map(
//     items.map((item: any) => [String(item[valueName]), item[valueName]])
//   )
//   const [search, setSearch] = useState<string>('')
//   return (
//     <FormField
//       disabled={loading}
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <Select
//             {...field}
//             value={String(field.value)}
//             onOpenChange={(open) => {
//               if (!open) setSearch("");
//             }}
//             onValueChange={val => {
//               const actualValue = valueMap.get(val)
//               if (actualValue !== undefined) {
//                 field.onChange(actualValue) // fallback to val if not found
//               } else {
//                 field.onChange(val) // fallback to val if not found
//               }
//             }}
//           >
//             <FormControl>
//               <SelectTrigger className='w-full overflow-hidden shadow-none base-input-casemm'>
//                 <SelectValue placeholder={placeholder} />
//               </SelectTrigger>
//             </FormControl>
//             <SelectContent
//               // onKeyDownCapture={(e) => {
//               //   // ปิด typeahead และกัน focus กลับ
//               //   if (e.key.length === 1 || e.key === " ") {
//               //     e.stopPropagation();
//               //   }
//               // }}
//               onKeyDownCapture={(e) => {
//                 // ปิด typeahead + ป้องกัน focus jump
//                 if (e.key.length === 1 || e.key === " " || e.key === "ArrowDown" || e.key === "ArrowUp") {
//                   e.stopPropagation();
//                 }
//               }}
//               onPointerMove={(e) => {
//                 // กัน pointer hover แล้ว Radix focus item
//                 if ((e.target as HTMLElement).dataset.radixSelectItem) {
//                   e.preventDefault();
//                 }
//               }}
//             >
//               <div className='m-3'>
//                 <SearchFieldInput

//                   field={
//                     {
//                       value: search,
//                       onChange: (e: {
//                         target: { value: string }
//                       }) => setSearch(e.target.value)
//                     }
//                   } />
//               </div>
//               {/* {items.map((item: any) => {
//                 if (search && !((`${item[labelName]}`.toLowerCase().includes(search.toLowerCase())))) return null
//                 return (
//                   <SelectItem
//                     key={item[valueName]}
//                     value={String(item[valueName])}
//                   >
//                     {item[labelName]}
//                   </SelectItem>
//                 )
//               })} */}
//               {items
//                 .filter((item) =>
//                   `${item[labelName]}`
//                     .toLowerCase()
//                     .includes(search.toLowerCase())
//                 )
//                 .map((item) => (
//                   <SelectItem
//                     key={item[valueName]} value={String(item[valueName])}>
//                     {item[labelName]}
//                   </SelectItem>
//                   // <div className='bg-pink-100 h-[1.3rem]' onClick={() => {
//                   //   field.onChange(item[valueName])
//                   // }}>
//                   //   {item[labelName]}
//                   // </div>
//                 ))}
//             </SelectContent>
//           </Select>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   )
// }

// export { SelectField }

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
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

// const languages = [
//   { label: "English", value: "en" },
//   { label: "French", value: "fr" },
//   { label: "German", value: "de" },
//   { label: "Spanish", value: "es" },
//   { label: "Portuguese", value: "pt" },
//   { label: "Russian", value: "ru" },
//   { label: "Japanese", value: "ja" },
//   { label: "Korean", value: "ko" },
//   { label: "Chinese", value: "zh" },
// ] as const

// const FormSchema = z.object({
//   language: z.string({
//     required_error: "Please select a language.",
//   }),
// })
interface ComboField {
  loading?: boolean
  readonly?: boolean
  items: any[]
  valueName?: string
  labelName?: string
  form: any // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
  name: string
  label: string
  placeholder?: string
  onChange?: (value: any) => void // Optional onChange handler
}
export function ComboboxField({
  onChange,
  loading = false,
  readonly = false,
  items,
  valueName = 'value',
  labelName = 'label',
  form,
  name,
  label,
  placeholder
}: ComboField) {
  const valueMap = new Map(
    items.map((item: any) => [String(item[valueName]), item[valueName]])
  )
  const [popoverOpen, setPopOver] = useState<boolean>(false)
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={popoverOpen} onOpenChange={setPopOver} >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  onClick={() => setPopOver(true)}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between w-full",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? items.find(
                      (item) => item[valueName] === field.value
                    )?.[labelName]
                    : placeholder}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command
                onValueChange={val => {
                  const actualValue = valueMap.get(val)
                  if (actualValue !== undefined) {
                    field.onChange(actualValue) // fallback to val if not found
                  } else {
                    field.onChange(val) // fallback to val if not found
                  }
                }}
              >
                <CommandInput
                  placeholder="Search"
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>No item found.</CommandEmpty>
                  <CommandGroup>
                    {/* {languages.map((language) => ( */}
                    {items.map((item: any) => (
                      <CommandItem
                        key={item[valueName]}
                        value={String(item[labelName])}
                        onSelect={() => {
                          form.setValue(name, item[valueName])
                          setPopOver(false)

                        }}
                      >
                        {item[labelName]}
                        <Check
                          className={cn(
                            "ml-auto",
                            item[valueName] === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
