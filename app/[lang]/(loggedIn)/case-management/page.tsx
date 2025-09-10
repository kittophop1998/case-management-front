'use client'

import { use, useEffect, useState } from "react";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
// import { Suspense } from "react";
import CaseTable from "./_components/case-table";
import InputFilter from "@/components/common/input-filter";
import BtnFilter from "@/components/button/btn-filter";
import { Modal } from "@/components/common/Modal";
import { DatePickerFieldInputV2 } from "@/components/form/date-picker";
import BtnApply from "@/components/button/btn-apply";
import BtnReset from "@/components/button/btn-reset";
import { SelectFieldInput } from "@/components/form/select-field";
// import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import BtnConfigColumn from "@/components/button/btn-config-column";
import { useLazyGetTableQuery } from "@/features/queueApiSlice";
import { priorityStatusOptions } from "@/const/case";
import { Checkbox } from "@/components/form/checkbox-field";
import { useGetDropdownQuery } from "@/features/systemApiSlice";
import { current } from "@reduxjs/toolkit";
import { JsonJoinDetails } from "@/types/user.type";
import { DialogFilterWarper, useFilter } from "@/components/common/dialog-filter-warper";


type PriorityType = 'Normal' | 'High'
type FilterDialog = {
  statuses: string[];
  priorities: PriorityType[];
  slaDate: string | null;
  queue: string | null;
}
type FilterDateDialog = {
  dateStart: string | null;
  dateEnd: string | null;
}

export type FilterAll = FilterDateDialog & FilterDialog & {
  keyword: string;
  category: string;
}

const tabs = [
  { label: "My Case", value: "myCase" },
  { label: "Available Case", value: "availableCase" },
  { label: "Inquiry Log", value: "inquiryLog" },
  { label: "Case History", value: "caseHistory" },
  { label: "All Case", value: "allCase" },
];
const mockOptions = {
  days: [
    { label: '1 day', value: '1' },
    { label: '7 days', value: '7' },
  ]
}




const InputFilterConfig = ({ searchObj, setSearchObj, caseStatus }: {
  searchObj: FilterAll,
  setSearchObj: (value: FilterAll) => void,
  caseStatus: JsonJoinDetails[]
}) => {
  // const [open, setOpen] = useState(false);
  const [getData, { currentData: queue, isFetching, isError, error }] = useLazyGetTableQuery();
  useEffect(() => {
    getData({
      page: 1,
      limit: 99999999,
      sort: null,
      order: null,
    })
  }, []);
  const save = (v: Partial<FilterAll>) => {
    setSearchObj((current) => ({
      ...current,
      statuses: v.statuses,
      priorities: v.priorities,
      slaDate: v.slaDate,
      queDate: v.queDate,
    }))
  }
  const {
    draftFilter,
    setDraftFilter,
    onClear,
    onConfirm,
    open,
    setOpen
  } = useFilter(
    {
      value: searchObj,
      setValue: save,
      clearValue: { statuses: [], priorities: [], slaDate: null, queDate: null }
    }
  )
  return <>
    <BtnFilter onClick={() => { setOpen(true) }} />
    <DialogFilterWarper
      title="Filter"
      open={open}
      setOpen={setOpen}
      onClear={onClear}
      onConfirm={onConfirm}
      className="w-[23rem]"
    >
      <div className="space-y-3 pb-4">
        <div>
          <Typography variant="caption">Case Status</Typography>
          <div className="grid grid-cols-2 gap-3 w-full mt-2 px-2">
            {
              caseStatus.map((item) => (
                <div key={item.value} className="flex items-center gap-2" >
                  <Checkbox
                    checked={draftFilter.statuses.includes(item.id)}
                    onChange={
                      (isCheck) => {
                        setDraftFilter(
                          (current) => ({
                            ...current,
                            statuses: isCheck
                              ? [...current.statuses, item.id]
                              : [...current.statuses].filter(v => v !== item.id)
                          })
                        )
                      }
                    }
                    label={item.name}
                  />
                  {/* <Typography >{item.label}</Typography> */}
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <Typography variant="caption">Case Priority</Typography>
          <div className="flex gap-3 px-2 mt-2">
            {
              priorityStatusOptions.map((item) => (
                <div key={item.value} className="flex items-center gap-2" >
                  <Checkbox
                    checked={draftFilter.priorities.includes(item.value)}
                    onChange={
                      (isCheck) => {
                        setDraftFilter(
                          (current) => ({
                            ...current,
                            priorities: isCheck
                              ? [...current.priorities, item.value]
                              : [...current.priorities].filter(v => v !== item.value)
                          })
                        )
                      }
                    }
                    label={
                      item.label
                    }
                  />
                  {/* <Typography >{item.label}</Typography> */}
                </div>
              ))
            }
          </div>

        </div>
        <div>
          <Typography variant="caption">SLA Date</Typography>
          <SelectFieldInput
            labelName="label"
            valueName="value"
            items={mockOptions.days}
            field={{
              value: draftFilter.slaDate,
              onChange: (value) => {
                setDraftFilter({ ...draftFilter, slaDate: value })
              }
            }} />
        </div>
        <div>
          <Typography variant="caption">Que Name</Typography>
          <SelectFieldInput
            valueName='queueId'
            labelName='queueName'
            items={queue?.data || []}
            field={{
              value: draftFilter.queDate,
              onChange: (value) => {
                setDraftFilter({ ...draftFilter, queDate: value })
              }
            }} />
        </div>
      </div>
    </DialogFilterWarper>
  </>
}
const InputFilterDate = ({ searchObj, setSearchObj }) => {
  const [open, setOpen] = useState(false);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  useEffect(() => {
    if (open) {
      setDateStart(searchObj.dateStart);
      setDateEnd(searchObj.dateEnd);
    }
  }, [open])
  const onConfirm = () => {
    setSearchObj({ ...searchObj, dateStart, dateEnd });
    setOpen(false);
  }
  const onClear = () => {
    setDateStart(null);
    setDateEnd(null);
  }
  if (!searchObj) return <></>;
  return <>
    <BtnFilter text='Created Date' onClick={() => { setOpen(true) }} />
    <DialogFilterWarper
      title="Filter by Create date"
      open={open}
      setOpen={setOpen}
      onClear={onClear}
      onConfirm={onConfirm}
      className="w-[22.375rem]"
    >
      <>
        <div className="flex items-center gap-3">
          <Typography className="w-[4.5rem]">From :</Typography>
          <div className='flex-1' >
            <DatePickerFieldInputV2 field={
              {
                value: dateStart, onChange: setDateStart
              }
            }
            //  value={dateStart} onChange={setDateStart} 
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Typography className="w-[4.5rem]" >To :</Typography>
          <div className='flex-1' >
            {/* <DatePickerFieldInputV2 value={dateEnd} onChange={setDateEnd} /> */}
            <DatePickerFieldInputV2 field={
              {
                value: dateEnd, onChange: setDateEnd
              }
            }
            //  value={dateStart} onChange={setDateStart} 
            />
          </div>
        </div>
      </>
    </DialogFilterWarper >
  </>
}
const CaseManagementPage = () => {
  const { data: dataDropdown } = useGetDropdownQuery()
  const [searchObj, setSearchObj] = useState<FilterAll>({
    statuses: [],
    priorities: [],
    slaDate: null,
    queue: null,
    dateStart: null,
    dateEnd: null,
    keyword: '',
    category: 'myCase',
  });
  // useEffect(() => {
  //   setSearchObj((current) => {
  //     if (current.statuses.length === 0) {
  //       const statuses = dataDropdown?.caseStatus?.map(v => v.id) || []
  //       return { ...current, statuses }
  //     }
  //     return current;
  //   })
  // }, [dataDropdown?.caseStatus])
  const [statusConfigColumn, setStatusConfigColumn] = useState(false);
  return (
    <div>
      <div className="flex space-x-4 border-b mb-4 pt-6 px-8 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSearchObj((current) => ({ ...current, category: tab.value }))}
            className={`pb-2 px-4 border-b-2 text-sm font-medium ${searchObj.category === tab.value
              ? "border-indigo-500"
              : "border-transparent text-gray-500 hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <CardPageWrapper >
        <div className="flex items-center gap-3 mb-4">
          <Typography variant="h6">
            Case List
          </Typography>
          <div className="flex-1"></div>
          <InputFilter
            setValue={(value) => { setSearchObj({ ...searchObj, keyword: value }) }} value={searchObj.keyword || ''}
          />
          <InputFilterConfig searchObj={searchObj} setSearchObj={setSearchObj} caseStatus={dataDropdown?.caseStatus || []} />
          <BtnConfigColumn onClick={() => { setStatusConfigColumn(true) }} />
          <InputFilterDate searchObj={searchObj} setSearchObj={setSearchObj} />
        </div>
        <CaseTable searchObj={searchObj} statusConfigColumn={statusConfigColumn} setStatusConfigColumn={setStatusConfigColumn} />
      </CardPageWrapper>
    </div>
  );
};

export default CaseManagementPage;
