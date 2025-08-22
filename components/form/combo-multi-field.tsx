// "use client"

// import { Check, ChevronsUpDown } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command"
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { useState } from "react"
// import { Checkbox } from "../ui/checkbox"

// interface ComboField {
//   loading?: boolean
//   readonly?: boolean
//   items: any[]
//   valueName?: string
//   labelName?: string
//   form: any
//   name: string
//   label: string
//   placeholder?: string
//   forceDisplayValue?: string
//   onChange?: (value: any[]) => void
// }

// export function ComboboxMultiField({
//   onChange,
//   loading = false,
//   readonly = false,
//   items,
//   valueName = "value",
//   labelName = "label",
//   form,
//   name,
//   label,
//   placeholder = "Select...",
//   forceDisplayValue,

// }: ComboField) {
//   const [popoverOpen, setPopoverOpen] = useState(false)

//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => {
//         // Ensure value is always an array
//         const value: string[] = Array.isArray(field.value) ? field.value : []

// const toggleValue = (val: string) => {
//   const exists = value.includes(val)
//   const newValue = exists
//     ? value.filter((v) => v !== val)
//     : [...value, val]
//   form.setValue(name, newValue, { shouldValidate: true });
//   onChange?.(newValue)
// }

//         return (
//           <FormItem className="flex flex-col">
//             <FormLabel>{label}</FormLabel>
//             <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
//               <PopoverTrigger asChild>
//                 <FormControl>
//                   <Button
//                     variant="outline"
//                     role="combobox"
//                     className={cn(
//                       "justify-between w-full",
//                       value.length === 0 && "text-muted-foreground"
//                     )}
//                   >
//                     {!!forceDisplayValue ? forceDisplayValue :
//                       (value.length > 0
//                         ? items
//                           .filter((item) => value.includes(item[valueName]))
//                           .map((item) => item[labelName])
//                           .join(", ")
//                         : placeholder)
//                     }
//                     <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4 shrink-0" />
//                   </Button>
//                 </FormControl>
//               </PopoverTrigger>
//               <PopoverContent className="w-full p-0">
//                 <Command>
//                   <CommandInput placeholder="Search" className="h-9" />
//                   <CommandList>
//                     <CommandEmpty>No item found.</CommandEmpty>
//                     <CommandGroup>
//                       {items.map((item) => (
//                         <CommandItem
//                           key={item[valueName]}
//                           value={String(item[labelName])}
//                           onSelect={() => toggleValue(item[valueName])}
//                         >
//                           <Checkbox
//                             checked={value.includes(item[valueName])}
//                           />
//                           {item[labelName]}
//                         </CommandItem>
//                       ))}
//                     </CommandGroup>
//                   </CommandList>
//                 </Command>
//               </PopoverContent>
//             </Popover>
//             <FormMessage />
//           </FormItem>
//         )
//       }}
//     />
//   )
// }
"use client"

import { Check, ChevronsUpDown } from "lucide-react"
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
  FormControl,
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
import { Checkbox } from "../ui/checkbox"
import { InputDefaultProps, InputFieldWarper, InputFieldWarperChildProps, InputFormDefaultProps, InputSelectProps } from "./input-warper"

interface ComboField {
  loading?: boolean
  readonly?: boolean
  items: any[]
  valueName?: string
  labelName?: string
  form: any
  name: string
  label: string
  placeholder?: string
  forceDisplayValue?: string
  onChange?: (value: any[]) => void
  required: boolean
}

export function ComboboxMultiField({
  onChange,
  loading = false,
  readonly = false,
  items,
  valueName = "value",
  labelName = "label",
  form,
  name,
  label,
  placeholder = "Select...",
  forceDisplayValue,
  required = false,

}: ComboField) {
  return (
    <InputFieldWarper
      loading={loading}
      form={form}
      name={name}
      label={label}
      required={required}
    >
      <ComboboxMultiFieldInput
        placeholder={placeholder}
        readonly={readonly}
        form={form}
        name={name}
        items={items}
        valueName={valueName}
        labelName={labelName}
        onChange={onChange}
      />
    </InputFieldWarper>
  )
}

interface ComboboxMultiFieldInputType extends
  InputFieldWarperChildProps,
  InputSelectProps,
  InputFormDefaultProps,
  InputDefaultProps {
  forceDisplayValue?: string
}
export function ComboboxMultiFieldInput({
  placeholder,
  onChange,
  readonly = false,
  // 
  field,
  form,
  name,
  // 
  items = [],
  valueName = 'id',
  labelName = 'name',
  // costom
  forceDisplayValue,
}: ComboboxMultiFieldInputType) {
  // return (
  //   <FormField
  //     control={form.control}
  //     name={name}
  //     render={({ field }) => {
  //       const toggleValue = (val: string) => {
  //         const exists = value.includes(val)
  //         const newValue = exists
  //           ? value.filter((v) => v !== val)
  //           : [...value, val]
  //         form.setValue(name, newValue, { shouldValidate: true });
  //         onChange?.(newValue)
  //       }
  //       return (
  //         <FormItem className="flex flex-col">
  //           <FormLabel>{label}</FormLabel>
  const [popoverOpen, setPopoverOpen] = useState(false)
  const value: string[] = Array.isArray(field.value) ? field.value : []
  const toggleValue = (val: string) => {
    console.log(`toggleValue.call()`, val)
    const exists = value.includes(val)
    console.log(`exists`, exists)

    const newValue = exists
      ? value.filter((v) => v !== val)
      : [...value, val]
    console.log(`newValue`, newValue)
    console.log(`name`, name)
    form.setValue(name, newValue, { shouldValidate: true });
    onChange?.(newValue)
  }
  return <>
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "justify-between w-full",
              value.length === 0 && "text-muted-foreground"
            )}
          >
            {!!forceDisplayValue ? forceDisplayValue :
              (value.length > 0
                ? items
                  .filter((item) => value.includes(item[valueName]))
                  .map((item) => item[labelName])
                  .join(", ")
                : placeholder)
            }
            <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4 shrink-0" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search" className="h-9" />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item[valueName]}
                  value={String(item[labelName])}
                  onSelect={() => toggleValue(item[valueName])}
                >
                  <Checkbox
                    checked={value.includes(item[valueName])}
                  />
                  {item[labelName]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </>
}