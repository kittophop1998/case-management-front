import { TextFieldInput } from './text-field'
import { Search } from 'lucide-react'

export const SearchFieldInput = ({
  placeholder,
  readonly = false,
  field
}) => {
  return (
    <TextFieldInput
      prependInnerIcon={<Search size={'1.2rem'} />}
      field={field}
      placeholder={placeholder || 'Search'}
      readonly={readonly}
    />
  )
}
