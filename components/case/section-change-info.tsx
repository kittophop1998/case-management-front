'use client'
import { Typography } from "../common/typography"
import { SectionCard } from "./section-card"
import { cva } from "class-variance-authority"

const textFieldVariants = cva('', {
  variants: {
    readonly: {
      true: 'bg-gray-100 cursor-not-allowed',
      false: 'bg-white cursor-text'
    }
  }
})

type ChangeInfoSectionProps = {
  isSmallMod: boolean
  form: any
  isEditMode: boolean;
  caseType?: string;
}


export const ChangeInfoSection = ({ isSmallMod, form, isEditMode, caseType = "Change Mobile No." }: ChangeInfoSectionProps) => {
  return (
    <SectionCard title={caseType} isAccordion={!!isSmallMod}>
      <div className="space-y-3 pt-2">
        {/* Current Info */}
        <div className="flex items-center gap-2">
          <Typography variant="caption" className="w-32 whitespace-nowrap">
            Current info:
          </Typography>
          <input
            placeholder="Enter Current info."
            type="text"
            className={`${textFieldVariants({ readonly: true })} border border-gray-300 rounded-md px-2 py-1 w-1/3`}
            readOnly
          />
        </div>

        {/* New Info */}
        <div className="flex items-center gap-2">
          <Typography variant="caption" className="w-32 whitespace-nowrap">
            New info<span className="text-red-600">*</span>:
          </Typography>
          <input
            placeholder="Enter New info."
            type="text"
            className={`${textFieldVariants({ readonly: !isEditMode })} border border-gray-300 rounded-md px-2 py-1 w-1/3`}
            readOnly={!isEditMode}
          />
        </div>
      </div>
    </SectionCard>
  )
}