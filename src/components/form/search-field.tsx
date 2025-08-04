import { TextFieldInput } from './text-field'
import { Search } from 'lucide-react'

interface SearchFieldInputProps {
  placeholder?: string;
  readonly?: boolean;
  field: any; // Replace 'any' with the correct field type, e.g., UseFormReturn<any> if using react-hook-form
}
export const SearchFieldInput = ({
  placeholder,
  readonly = false,
  field
}: SearchFieldInputProps) => {
  return (
    <TextFieldInput
      prependInnerIcon={<Search size={'1.2rem'} />}
      field={field}
      placeholder={placeholder || 'Search'}
      readonly={readonly}
    />
  )
}
