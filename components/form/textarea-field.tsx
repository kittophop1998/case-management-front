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
  className
}: TextFieldProps) => {
  return (
    <FormField
      disabled={loading}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {/* {field.value} */}

            {label}</FormLabel>
          <FormControl>
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TextAreaField }
