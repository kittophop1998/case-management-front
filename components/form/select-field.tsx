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
import { TextFieldWarpper } from './text-field'

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
  reqired?: boolean // Optional prop to indicate if the field is required
}
const selectFieldVariants = cva('w-full', {
  variants: {
    readonly: {
      true: 'bg-gray-100 cursor-not-allowed',
      false: 'bg-white cursor-text'
    }
  }
})

const SelectField = ({
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
  reqired = false
}: SelectFieldProps) => {
  return (
    <TextFieldWarpper
      loading={loading}
      form={form}
      name={name}
      label={label}
      reqired={reqired}
    >
      <SelectFieldInput
        placeholder={placeholder}
        readonly={readonly}
        items={items}
        valueName={valueName}
        labelName={labelName}
        onChange={onChange}
      />
    </TextFieldWarpper>
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
      className={className}
      {...field}
      value={String(field.value)}
      onValueChange={val => {
        const actualValue = valueMap.get(val)
        if (actualValue !== undefined) {
          console.log('SelectFieldInput onValueChange', actualValue)
          field?.onChange && field?.onChange(actualValue)
          // onChange && onChange?.(actualValue)
        } else {
          field?.onChange & field?.onChange(val)
        }
      }}
    >
      {/* <FormControl> */}
      <SelectTrigger className='w-full overflow-hidden shadow-none base-input-casemm'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {/* </FormControl> */}
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
export { SelectField }
