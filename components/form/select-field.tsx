"use client"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cva } from 'class-variance-authority'

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
interface SelectFieldProps {
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
  required?: boolean // Optional prop to indicate if the field is required
}
const selectFieldVariants = cva('w-full', {
  variants: {
    readonly: {
      true: 'bg-gray-100 cursor-not-allowed',
      false: 'bg-white cursor-text'
    }
  }
})

export const SelectField = ({
  onChange,
  loading = false,
  readonly = false,
  items,
  valueName = 'value',
  labelName = 'label',
  form,
  name,
  label,
  placeholder,
  required = false
}: SelectFieldProps) => {
  return (
    <InputFieldWarper
      loading={loading}
      form={form}
      name={name}
      label={label}
      required={required}
    >
      <SelectFieldInput
        placeholder={placeholder}
        readonly={readonly}
        items={items}
        valueName={valueName}
        labelName={labelName}
        onChange={onChange}
      />
    </InputFieldWarper>
  )
}

interface SelectFieldInputProps {
  placeholder?: string
  readonly?: boolean
  field?: any // Replace 'any' with the correct field type, e.g., UseFormReturn<any> if using react-hook-form
  clearABle?: boolean
  loading?: boolean,
  className?: string
  items?: any[]
  valueName?: string
  labelName?: string
}
export const SelectFieldInput = ({
  placeholder,
  readonly = false,
  field,
  clearABle = false,
  loading = false,
  className = '',
  items = [],
  valueName = 'value',
  labelName = 'label',
}: SelectFieldInputProps) => {
  const valueMap = new Map(
    items.map((item: any) => [String(item[valueName]), item[valueName]])
  )
  return (
    <Select
      disabled={
        readonly
      }
      className={className}
      {...field}
      value={String(field.value)}
      onValueChange={val => {
        const actualValue = valueMap.get(val)
        if (actualValue !== undefined) {
          console.log('SelectFieldInput onValueChange', actualValue)
          field?.onChange && field?.onChange(actualValue)
        } else {
          field?.onChange & field?.onChange(val)
        }
      }}
    >
      <SelectTrigger className='w-full overflow-hidden shadow-none base-input-casemm'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: any) => (
          <SelectItem
            key={item[valueName]}
            value={String(item[valueName])}
          >
            {item[labelName]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export const SelectItems = ({
  items = [],
  valueName = 'id',
  labelName = 'name',
  onChange,
  value,
  searchABle = false,
  searchPlaceholder = 'Search',
  className
}: InputSelectProps) => {
  // return <>{className}</>
  const toggleValue = (val: any) => {
    // const exists = value.includes(val)
    let newValue
    if (Array.isArray(value)) {
      newValue = val
        ? value.filter((v) => v !== val)
        : [...value, val]
    } else {
      newValue = val
    }
    onChange(newValue)
  }

  const Items = memo(() => {
    return <span className={cn("", className)}>
      {
        items.map((item) => (
          <CommandItem
            key={item[valueName]}
            value={String(item[labelName])}
            onSelect={() => {
              console.log('SelectItems onSelect', item[valueName])
              toggleValue(item[valueName])
            }}
            className='bg-red-300'
          >
            <Checkbox
              className='pointer-events-none'
              checked={((typeof value === 'string' || Array.isArray(value)) && value?.includes(item?.[valueName]) || value === item[valueName])}
            />
            <Typography variant="body2">
              {item[labelName]}
            </Typography>
          </CommandItem>
        ))
      }
    </span>
  }, [items, labelName, valueName, value, className])
  return (
    <>
      {/* {className}asdas */}
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
