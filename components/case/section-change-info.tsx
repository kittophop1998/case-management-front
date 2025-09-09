'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Card from "@/components/common/card"
import { Typography } from "@/components/common/typography"
import { cva } from "class-variance-authority"

type ChangeInfoSectionProps = {
  isEditMode: boolean;
  open: boolean;
  onToggle: (open: boolean) => void;
  caseType?: string;
}

const textFieldVariants = cva('', {
  variants: {
    readonly: {
      true: 'bg-gray-100 cursor-not-allowed',
      false: 'bg-white cursor-text'
    }
  }
})

export default function ChangeInfoSection({
  isEditMode,
  open,
  onToggle,
  caseType = "Change Mobile No.",
}: ChangeInfoSectionProps) {
  return (
    <Card className="rounded-md border border-gray-300 p-3 mb-4 shadow-none">
      <Accordion
        type="single"
        collapsible
        value={open ? "item-1" : ""}
        onValueChange={(value) => onToggle(value === "item-1")}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-0 m-0">
            {caseType}
          </AccordionTrigger>
          <AccordionContent className="mt-2 text-gray-600">
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  )
}
