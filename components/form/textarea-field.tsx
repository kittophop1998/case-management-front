import { Input } from '@/components/common/text-input'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { cva } from 'class-variance-authority'
import { Textarea } from "@/components/ui/textarea"
import { cn } from '@/lib/utils'
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
  className?: string // Optional prop for additional classes
  required?: boolean // Optional prop for required fields
}
const textFieldVariants = cva('', {
  variants: {
    readonly: {
      true: 'bg-gray-100 cursor-not-allowed',
      false: 'bg-white cursor-text'
    }
  }
})
const TextAreaField = ({
  loading,
  readonly = false,
  form,
  name,
  label,
  placeholder,
  prependInnerIcon,
  appendInnerIcon,
  className,
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
      <TextAreaFieldInput
        prependInnerIcon={prependInnerIcon}
        placeholder={placeholder}
        readonly={readonly}
        loading={loading}
        className={className}
      />
    </InputFieldWarper>
  )
}
export const TextAreaFieldInput = ({
  prependInnerIcon,
  placeholder,
  readonly = false,
  field,
  loading = false,
  className = '',
  ...props
}) => {
  return (
    <div className='relative'>
      <div className='absolute flex items-center justify-center h-full w-[2rem] pointer-events-none'>
        {prependInnerIcon}
      </div>
      <Textarea
        className={cn(textFieldVariants({ readonly }), className)}
        placeholder={placeholder}
        {...field}
        readOnly={readonly}
      />
    </div>
  )
}
export { TextAreaField }
