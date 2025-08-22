"use client"

import { ChevronsUpDown } from "lucide-react"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { memo, useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { InputDefaultProps, InputFieldWarper, InputFieldWarperChildProps, InputFormDefaultProps, InputSelectProps } from "./input-warper"
import { Typography } from "../common/typography"


interface ComboField extends
  InputFieldWarperChildProps,
  InputSelectProps,
  InputFormDefaultProps,
  InputDefaultProps {
  forceDisplayValue?: string
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
        forceDisplayValue={forceDisplayValue}
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
  // form
  field,
  form,
  name,
  // select
  items = [],
  valueName = 'id',
  labelName = 'name',
  // costom
  forceDisplayValue,
}: ComboboxMultiFieldInputType) {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const value: string[] = Array.isArray(field.value) ? field.value : []

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <SelectItems
          items={items}
          valueName={valueName}
          labelName={labelName}
          onChange={(newValue: any) => {
            form.setValue(name, newValue, { shouldValidate: true });
            onChange?.(newValue)
          }}
          value={value}
          searchABle={true}
        />
      </PopoverContent>
    </Popover>
  )
}

export const SelectItems = ({
  items = [],
  valueName = 'id',
  labelName = 'name',
  onChange,
  value,
  searchABle = false,
  searchPlaceholder = 'Search'
}: InputSelectProps) => {
  const toggleValue = (val: any) => {
    const exists = value.includes(val)
    let newValue
    if (Array.isArray(value)) {
      newValue = exists
        ? value.filter((v) => v !== val)
        : [...value, val]
    } else {
      newValue = val
    }
    onChange(newValue)
  }

  const Items = memo(() => {
    return <>
      {
        items.map((item) => (
          <CommandItem
            key={item[valueName]}
            value={String(item[labelName])}
            onSelect={() => {
              toggleValue(item[valueName])
            }}
          >
            <Checkbox
              checked={value.includes(item[valueName] || value === item[valueName])}
            />
            <Typography variant="body2">
              {item[labelName]}
            </Typography>
          </CommandItem>
        ))
      }
    </>
  }, [items, labelName, valueName, value])
  return (
    <>
      <Command className="bg-transparent">
        {searchABle && <CommandInput placeholder={searchPlaceholder} />}
        <CommandList>
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup>
            <Items />
          </CommandGroup>
        </CommandList>
      </Command >
    </>

  )
}