import { Input } from '@/components/common/text-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { cloneElement } from 'react'
import { InputFieldWarper } from './input-warper'

interface TextFieldProps {
  form: any // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
  name: string
  label?: string
  loading?: boolean
  placeholder?: string
  readonly?: boolean // Optional prop to make the input read-only
  prependInnerIcon?: React.ReactNode // Optional prop for an icon
  appendInnerIcon?: React.ReactNode // Optional prop for an icon
  required?: boolean // Optional prop to indicate if the field is required
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
  appendInnerIcon,
  required = false
}: TextFieldProps) => {
  return (
    <InputFieldWarper
      loading={loading}
      form={form}
      name={name}
      label={label}
      required={required}
    >
      <TextFieldInput
        loading={loading}
        prependInnerIcon={prependInnerIcon}
        appendInnerIcon={appendInnerIcon}
        placeholder={placeholder}
        readonly={readonly}
        className='mt-0 pt-0'
      />
    </InputFieldWarper>
  )
}



interface TextFieldInputProps {
  prependInnerIcon?: React.ReactNode
  appendInnerIcon?: React.ReactNode
  placeholder?: string
  readonly?: boolean
  field?: any // Replace 'any' with the correct field type, e.g., UseFormReturn<any> if using react-hook-form
  clearABle?: boolean
  loading?: boolean,
  className?: string
}
export const TextFieldInput = ({
  prependInnerIcon,
  appendInnerIcon,
  placeholder,
  readonly = false,
  field,
  clearABle = false,
  loading = false,
  className = '',
  ...props
}: TextFieldInputProps) => {
  return (
    <div className='relative'>
      <div className='absolute flex items-center justify-center h-full w-[2rem]  pointer-events-none'>
        {prependInnerIcon}
      </div>
      <Input
        className={cn(textFieldVariants({ readonly: readonly || loading }), className)}
        placeholder={placeholder}
        {...field}
        prependInnerIcon={!!prependInnerIcon}
        appendInnerIcon={!!appendInnerIcon}
        disabled={readonly || loading}
        {...props}
      />
    </div>
  )
}
