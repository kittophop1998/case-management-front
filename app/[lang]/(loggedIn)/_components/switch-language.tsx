// 'use client'
// import { useParams } from 'next/navigation'

// export const SwitchLanguage = () => {
//   //   const { lang } = useParams()
//   //   const { setLang } = useLang()

//   //   const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//   //     setLang(e.target.value)
//   //   }
//   const params = useParams()
//   const lang = params.lang || 'en' // Default to 'en' if no language is specified
//   const handleLanguageChange = () => {
//     console.log(`Language changed to: ${lang}`)
//   }
//   return(
//   )
//   return (
//     <select
//       value={lang}
//       onChange={handleLanguageChange}
//       className='bg-white border border-gray-300 rounded p-2'
//     >
//       <option value='en'>EN</option>
//       <option value='th'>TH</option>
//       {/* Add more languages as needed */}
//     </select>
//   )
// }
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Check } from 'react-feather'

export function SwitchLanguage() {
  const lang = 'en' // This would typically come from your app's state or context
  const languages = ['en', 'th'] // List of supported languages
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          className='bg-black hover:bg-black/70 hover:text-white text-white rounded-[3px] w-[1.25rem] h-[1.25rem] text-[0.70rem] font-extrabold tracking-widest text-center flex items-center justify-center p-0 pl-[1px]'
          size='sm'
        >
          <div className=''>
            {lang.toUpperCase()}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='space-y-2'>
          <h4 className='leading-none font-medium'>Select Language</h4>
          <p className='text-muted-foreground text-sm'>
            Choose your preferred language.
          </p>
        </div>
        {languages.map(language => (
          <Button
            key={language}
            variant='ghost'
            disabled={language === lang}
            className='w-full justify-start'
            onClick={() => console.log(`Language changed to: ${language}`)}
          >
            {language.toUpperCase()}
            {language === lang && <Check />}
          </Button>
        ))}
        {/* <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div> */}
      </PopoverContent>
    </Popover>
  )
}
