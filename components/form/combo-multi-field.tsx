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
export function ComboboxMultiField({
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
