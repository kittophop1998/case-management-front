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

interface TextFieldProps {
  form: any // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
  name: string
  label: string
  loading?: boolean
  placeholder?: string
  readonly?: boolean // Optional prop to make the input read-only
  prependInnerIcon?: React.ReactNode // Optional prop for an icon
  appendInnerIcon?: React.ReactNode // Optional prop for an icon
  reqired?: boolean // Optional prop to indicate if the field is required
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
  reqired = false
}: TextFieldProps) => {
  return (
    <TextFieldWarpper
      loading={loading}
      form={form}
      name={name}
      label={label}
      reqired={reqired}
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
  reqired?: boolean // Optional prop to indicate if the field is required
}
export const TextFieldWarpper = ({
  children,
  loading,
  form,
  name,
  label,
  reqired = false
}: TextFieldWarpperProps) => {
  return (
    <FormField
      disabled={loading}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{reqired && (<span className='text-red-500'>*</span>)}</FormLabel>
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
  className = ''
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
      />
    </div>
  )
}
