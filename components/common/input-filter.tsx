import { Search } from 'lucide-react'
import { Input } from '../common/text-input'
import { cn } from '@/lib/utils'

const InputFilter = ({
  setValue,
  value,
  placeholder = 'Search',
  readonly = false,
  className
}: {
  placeholder?: string
  readonly?: boolean
  setValue: (value: string) => void
  className?: string
  value: string
}) => {
  return (
    <div className='relative flex items-center'>
      <div className={'absolute flex items-center justify-center h-full w-[2.5rem]'}>
        {/* @ts-expect-error className is valid for lucide icon */}
        <Search size={20} className='cursor-pointer' />
        {/* size-[0.936rem] */}
      </div>
      <Input
        className={cn(className)}
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
