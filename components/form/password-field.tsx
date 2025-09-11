import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
import { Input } from '@/components/common/text-input'
import { cva } from 'class-variance-authority'
import { Eye, EyeOff } from 'react-feather'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface PasswordFieldProps {
  form: any // Replace 'any' with the correct form type, e.g., UseFormReturn<any> if using react-hook-form
  name: string
  label: string
  loading?: boolean
  placeholder?: string
  readonly?: boolean // Optional prop to make the input read-only
  prependInnerIcon?: React.ReactNode // Optional prop for an icon
  appendInnerIcon?: React.ReactNode // Optional prop for an icon
  className?: string
}
const textFieldVariants = cva('', {
  variants: {
    readonly: {
      true: 'bg-gray-100 cursor-not-allowed',
      false: 'bg-white cursor-text'
    }
  }
})
const PasswordField = ({
  loading,
  readonly = false,
  form,
  name,
  label,
  placeholder,
  prependInnerIcon,
  appendInnerIcon,
  className
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <FormField
      disabled={loading}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-xs'>{label}</FormLabel>
          <FormControl>
            <div className='relative flex'>
              <div className='absolute flex items-center justify-center h-full w-[2.5rem] pointer-events-none'>
                {prependInnerIcon}
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                prependInnerIcon={!!prependInnerIcon}
                appendInnerIcon
                className={cn(textFieldVariants({ readonly }), className)}
                placeholder={placeholder}
                {...field}
                readOnly={readonly}
              />
              <div className='right-0  absolute flex items-center justify-center h-full w-[2.5rem]'>
                {showPassword ? (
                  <Eye
                    size={16}
                    className='cursor-pointer'
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOff
                    size={16}
                    className='cursor-pointer'
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { PasswordField }
