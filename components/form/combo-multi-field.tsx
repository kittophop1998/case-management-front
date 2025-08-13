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
  form: any
  name: string
  label: string
  placeholder?: string
  forceDisplayValue?: string
}

export function ComboboxMultiField({
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

}: ComboField) {
  const [popoverOpen, setPopoverOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // Ensure value is always an array
        const value: string[] = Array.isArray(field.value) ? field.value : []

        const toggleValue = (val: string) => {
          const exists = value.includes(val)
          const newValue = exists
            ? value.filter((v) => v !== val)
            : [...value, val]
          form.setValue(name, newValue, { shouldValidate: true })
        }

        return (
          <FormItem className="flex flex-col">
            <FormLabel>{label}</FormLabel>
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
                  <CommandInput placeholder="Search..." className="h-9" />
                  <CommandList>
                    <CommandEmpty>No item found.</CommandEmpty>
                    <CommandGroup>
                      {items.map((item) => (
                        <CommandItem
                          key={item[valueName]}
                          value={String(item[labelName])}
                          onSelect={() => toggleValue(item[valueName])}
                        >
                          {item[labelName]}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              value.includes(item[valueName])
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
        )
      }}
    />
  )
}
