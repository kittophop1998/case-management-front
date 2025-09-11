import { Typography } from "../common/typography"
import { SectionCard } from "./section-card"
import { TextAreaField } from "../form/textarea-field"
import useCaseType from "@/hooks/use-case-type"
import { CaseTypeText } from "@/types/case.type"
import { memo, ReactNode, use, useEffect, useMemo, useRef } from "react"
import { SelectField } from "../form/select-field"
import { DatePickerField, DatePickerFieldInput } from "../form/date-picker"
import TelephoneCall from '@/public/icons/TelephoneCall.svg'
import Warning from '@/public/icons/Warning.svg'
import { DropdownSystemType, GetDropdownResponse } from "@/features/systemApiSlice"
import { Info } from "./info"
import { useLazyGetQueueInfoQuery, useLazyGetTableQuery } from "@/features/queueApiSlice"
import { cn } from "@/lib/utils"
import { QueueType } from "@/types/queue.type"

interface SectionCaseInfoProps {
  isSmallMod: boolean
  form: any
  caseTypeText?: CaseTypeText
  ddData: DropdownSystemType | undefined
  layout?: '1col' | '2col',
  mode?: 'view' | 'edit' | 'create'
  queueAll?: QueueType[],
  moreInfo?: Record<string, any>,
  title?: string,
}



export const SectionCaseInfo = ({ isSmallMod, form, caseTypeText = 'Inquiry', ddData, layout = '1col', mode = 'view', queueAll, moreInfo, title }: SectionCaseInfoProps) => {
  const caseTypeId = form.watch('caseTypeId')
  const {
    data: { childValue2text },
  } = useCaseType()
  const priority = form.watch('priority')
  const reasonCode = form.watch('reasonCode')
  // High, Normal
  const prioritys = [
    {
      id: 'High',
      name: 'High'
    }, {
      id: 'Normal',
      name: 'Normal'
    }]
  const allocateToQueueTeams = prioritys || []

  const warningText = useMemo(() => {
    const found = ddData?.reasonCodes.find(item => item.id === reasonCode)
    if (found) {
      // return `Warning: ${found.descriptionTh}`
      return found.notice
    }
    return ''
  }, [reasonCode, ddData?.reasonCodes])
  const [getData, { currentData: data }] = useLazyGetTableQuery();
  const dataQueue = useMemo(() => queueAll || data?.data || [], [data, queueAll])
  useEffect(() => {
    if (!!queueAll) return;
    getData({
      page: 1,
      limit: 99999999,
      sort: null,
      order: null,
    })
  }, []);

  return (
    <SectionCard title={title || 'Case Info'} isAccordion={!!isSmallMod}>
      <div className={cn("pt-2 grid gap-3", {
        'grid-cols-1': layout === '1col',
        'grid-cols-2': layout === '2col',
      })}>
        <div className="space-y-3">
          {!moreInfo && (
            <Typography variant="caption">Case Type:  {childValue2text?.[caseTypeId] || caseTypeId}</Typography>
          )}

          {moreInfo && (
            <>
              <Typography variant="caption">Case Type: {moreInfo.caseType || '-'}</Typography>
              <Typography variant="caption">Case ID: AEID12345</Typography>
              <Typography variant="caption">Create By: {moreInfo.createdBy || '-'}</Typography>
              <Typography variant="caption">Create Date: {moreInfo.createdDate || '-'}</Typography>
            </>
          )}
          <Info title="Verify Status" value={<>
            <Typography variant="caption" className="text-[#52C41A]">Passed</Typography>
          </>} />
          <Info title="Channel" value={
            <div className="flex items-center gap-2">
              <TelephoneCall />
              <Typography variant="caption">IVR</Typography>
            </div>
          } />
          {caseTypeText === 'None Inquiry' && (
            <>

              <Info required title="Priority" value={<div className="flex-1 max-w-[300px]">

                <SelectField
                  form={form}
                  name='priority'
                  valueName='id'
                  labelName='name'
                  loading={false}
                  items={prioritys}
                  readonly={mode === 'view'}
                /></div>} />

              {
                priority === 'High' && (
                  <>
                    <Info required title="Reason code" value={<div className="flex-1 max-w-[300px]">
                      <SelectField
                        form={form}
                        name='reasonCode'
                        valueName='id'//code
                        labelName='descriptionTh'
                        loading={false}
                        items={ddData?.reasonCodes || []}
                        readonly={mode === 'view'}
                      /></div>} />
                    {warningText && <div className="flex items-center gap-3">
                      <div><Warning /></div>
                      <Typography variant="caption" className="text-red-500" >
                        {/* SLA Response time: ภายใน 30 นาที , SLA Solution Time: ภายใน 4 ชั่วโมง, Note: ต้องมีการตรวจสอบธุรกรรมทันที */}
                        {warningText}
                      </Typography>
                    </div>}
                  </>
                )
              }
              <Info title="Due Date" required value={
                <div className="flex-1 max-w-[300px]">
                  <DatePickerField
                    form={form}
                    name='dueDate'
                    loading={false}
                    readonly={mode === 'view'}
                  />
                </div>} />
              <Info title="Allocate to Queue Team" value={<div className="flex-1 max-w-[300px]">
                <SelectField
                  form={form}
                  name='allocateToQueueTeam'
                  valueName='queueId'
                  labelName='queueName'
                  loading={false}
                  items={dataQueue}
                  readonly={mode === 'view'}

                /></div>} />
            </>
          )}
        </div>
        <div>
          <TextAreaField
            readonly={mode === 'view' || mode === 'edit'}
            name="caseDescription"
            label="Case Description"
            placeholder="Enter Case Description"
            form={form}
            required
          />
        </div>
      </div>
    </SectionCard>
  )
}