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

type FilterAll = FilterDateDialog & FilterDialog & {
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
const caseStatusOptions = [
  { label: 'Draft', value: 'Draft' },
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' },
  { label: 'Waiting Info', value: 'Waiting Info' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Canceled', value: 'Canceled' },
  { label: 'Resolved', value: 'Resolved' },
  { label: 'Escalated', value: 'Escalated' },
]

const InputFilterConfig = ({ searchObj, setSearchObj }) => {
  const [open, setOpen] = useState(false);
  const [getData, { currentData: queue, isFetching, isError, error }] = useLazyGetTableQuery();
  useEffect(() => {
    getData({
      page: 1,
      limit: 99999999,
      sort: null,
      order: null,
    })
  }, []);
  // 
  return <>
    <BtnFilter onClick={() => { setOpen(true) }} />
    <Modal title="Filter" isOpen={open} className="w-[47.125rem]" onClose={() => setOpen(false)}>
      <div className="space-y-3 max-w-[20rem]">
        <div>
          <Typography variant="caption">Case Status</Typography>
          <div className="grid grid-cols-2 gap-2 w-full ">
            {
              caseStatusOptions.map((item) => (
                <div key={item.value} className="flex items-center gap-2" >
                  <Checkbox
                    checked={searchObj.statuses.includes(item.value)}
                    onChange={
                      (isCheck) => {
                        setSearchObj(
                          (current) => ({
                            ...current,
                            statuses: isCheck
                              ? [...current.statuses, item.value]
                              : [...current.statuses].filter(v => v !== item.value)
                          })
                        )
                      }
                    }
                    label={item.label}
                  />
                  {/* <Typography >{item.label}</Typography> */}
                </div>
              ))
            }
          </div>

        </div>
        <div>
          <Typography variant="caption">Case Priority</Typography>

          <div className="flex gap-3">
            {
              priorityStatusOptions.map((item) => (
                <div key={item.value} className="flex items-center gap-2" >
                  <Checkbox
                    checked={searchObj.priorities.includes(item.value)}
                    onChange={
                      (isCheck) => {
                        setSearchObj(
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
              value: searchObj.slaDate,
              onChange: (value) => {
                setSearchObj({ ...searchObj, slaDate: value })
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
              value: searchObj.queDate,
              onChange: (value) => {
                setSearchObj({ ...searchObj, queDate: value })
              }
            }} />
        </div>

      </div>
    </Modal>
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
    <Modal title="Filter by Create date" isOpen={open} className="w-[22.375rem]" onClose={() => setOpen(false)}>
      <div className="space-y-4 mt-6">
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
      </div>
      <div className="flex gap-3 mt-6">
        <BtnReset onClick={onClear} className="flex-1" text="Reset" />
        <BtnApply onClick={onConfirm} className="flex-1" />
      </div>
    </Modal>
  </>
}


const CaseManagementPage = () => {
  const [searchObj, setSearchObj] = useState<FilterAll>({
    // form: '',
    // to: '',
    statuses: [],
    priorities: ['High', 'Normal'],
    slaDate: null,
    queue: null,
    dateStart: null,
    dateEnd: null,
    keyword: '',
    category: 'myCase',
  });
  const [statusConfigColumn, setStatusConfigColumn] = useState(false);
  return (
    <div>
      <div className="flex space-x-4 border-b mb-4 pt-6 px-8 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSearchObj({ ...searchObj, category: tab.value })}
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
            setValue={(value) => { setSearchObj({ ...searchObj, keyword: value }) }} value={searchObj.keyword}
          />
          <InputFilterConfig searchObj={searchObj} setSearchObj={setSearchObj} />
          <BtnConfigColumn onClick={() => { setStatusConfigColumn(true) }} />
          <InputFilterDate searchObj={searchObj} setSearchObj={setSearchObj} />
        </div>
        {/* ตัวอย่าง filter (ยังไม่เปิดใช้งาน) */}
        {/* <BtnFilter onClick={() => {}} /> */}
        {/* {JSON.stringify(searchObj)} */}
        <CaseTable searchObj={searchObj} statusConfigColumn={statusConfigColumn} setStatusConfigColumn={setStatusConfigColumn} />
      </CardPageWrapper>
    </div>
  );
};

export default CaseManagementPage;
