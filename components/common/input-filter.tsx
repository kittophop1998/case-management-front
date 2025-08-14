import { Search } from 'lucide-react'
import { Input } from '../common/text-input'

const InputFilter = ({
  setValue,
  value,
  placeholder = 'Search',
  readonly = false
}: {
  placeholder?: string
  readonly?: boolean
  setValue: (value: string) => void
  value: string
}) => {
  return (
    <div className='relative flex'>
      <div className='absolute flex items-center justify-center h-full w-[2.5rem]'>
        {/* @ts-expect-error className is valid for lucide icon */}
        <Search size={20} className='cursor-pointer' />
        {/* size-[0.936rem] */}
      </div>
      <Input
        prependInnerIcon
        placeholder={placeholder}
        readOnly={readonly}
        value={value}
        onChange={e => {
          if (setValue) {
            setValue(e.target.value)
          }
        }}
      />
    </div>
  )
}

export default InputFilter
