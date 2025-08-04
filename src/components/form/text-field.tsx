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
const TextField = ({
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
    <FormField
      disabled={loading}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { TextField }
