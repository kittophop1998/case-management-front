import { Input } from '@/components/common/text-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
// import { Input } from "@/components/ui/input";
import { cva } from 'class-variance-authority'
import { Textarea } from "@/components/ui/textarea"
import { cloneElement } from 'react'

interface TextFieldProps {
  form: any // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
  name: string
  label: string
  loading?: boolean
  placeholder?: string
  readonly?: boolean // Optional prop to make the input read-only
  prependInnerIcon?: React.ReactNode // Optional prop for an icon
  appendInnerIcon?: React.ReactNode // Optional prop for an icon
}
const textFieldVariants = cva('', {
  variants: {
    readonly: {
      true: 'bg-gray-100 cursor-not-allowed',
      false: 'bg-white cursor-text'
    }
  }
})

export const TextField = ({
  loading,
  readonly = false,
  form,
  name,
  label,
  placeholder,
  prependInnerIcon,
  appendInnerIcon
}: TextFieldProps) => {
  return (
    <TextFieldWarpper
      loading={loading}
      form={form}
      name={name}
      label={label}
    >
      <TextFieldInput
        prependInnerIcon={prependInnerIcon}
        appendInnerIcon={appendInnerIcon}
        placeholder={placeholder}
        readonly={readonly}
      />
    </TextFieldWarpper>
  )
}

interface TextFieldWarpperProps {
  children: React.ReactElement<{ field: any }>
  loading?: boolean
  form: any // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
  name: string
  label: string
}
export const TextFieldWarpper = ({
  children,
  loading,
  form,
  name,
  label
}: TextFieldWarpperProps) => {
  return (
    <FormField
      disabled={loading}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          {cloneElement(children, { field })}
          <FormMessage />
        </FormItem>
      )}
    />
  )
  // 
}

interface TextFieldInputProps {
  prependInnerIcon?: React.ReactNode
  appendInnerIcon?: React.ReactNode
  placeholder?: string
  readonly?: boolean
  field?: any // Replace 'any' with the correct field type, e.g., UseFormReturn<any> if using react-hook-form
}
export const TextFieldInput = ({
  prependInnerIcon,
  appendInnerIcon,
  placeholder,
  readonly = false,
  field
}: TextFieldInputProps) => {
  return (
    <div className='relative'>
      <div className='absolute flex items-center justify-center h-full w-[2rem]'>
        {prependInnerIcon}
      </div>
      <Input
        className={textFieldVariants({ readonly })}
        placeholder={placeholder}
        {...field}
        prependInnerIcon={!!prependInnerIcon}
        appendInnerIcon={!!appendInnerIcon}
        readOnly={readonly}
      />
    </div>
  )
}
