
'use client'

import { use, useEffect, useState } from "react";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import BtnFilter from "@/components/button/btn-filter";
import { DatePickerFieldInputV2 } from "@/components/form/date-picker";
// import { Checkbox } from "@/components/ui/checkbox";
import { FormLabel } from "@/components/ui/form";
import BtnConfigColumn from "@/components/button/btn-config-column";
import { useLazyGetTableQuery } from "@/features/queueApiSlice";
import { useGetDropdownQuery } from "@/features/systemApiSlice";
import { current } from "@reduxjs/toolkit";
import { JsonJoinDetails } from "@/types/user.type";
import { DialogFilterWarper, useFilter } from "@/components/common/dialog-filter-warper";
import ApiLogTable from "./_components/api-log-table";


type FilterDialog = {
  requestId: string | null;
  serviceName: string | null;
  reqMessage: string | null;
  respMessage: string | null;
  statusCode: string | null;
}
type FilterDateDialog = {
  dateStart: string | null;
  dateEnd: string | null;
}

export type FilterAll = FilterDateDialog & FilterDialog;

const InputFilterConfig = ({ searchObj, setSearchObj, caseStatus }: {
  searchObj: FilterAll,
  setSearchObj: (value: FilterAll) => void,
  caseStatus: JsonJoinDetails[]
}) => {
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
    // setSearchObj((current) => ({
    //   ...current,
    //   statuses: v.statuses,
    //   priorities: v.priorities,
    //   slaDate: v.slaDate,
    //   queDate: v.queDate,
    // }))
  };
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
      title="Filter by Request date"
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
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Typography className="w-[4.5rem]" >To :</Typography>
          <div className='flex-1' >
            <DatePickerFieldInputV2 field={
              {
                value: dateEnd, onChange: setDateEnd
              }
            }
            />
          </div>
        </div>
      </>
    </DialogFilterWarper >
  </>
}
const AccessControlPage = () => {
  const { data: dataDropdown } = useGetDropdownQuery()
  const [searchObj, setSearchObj] = useState<FilterAll>({
    requestId: '',
    serviceName: '',
    reqMessage: '',
    respMessage: '',
    statusCode: '',
    dateStart: null,
    dateEnd: null,
  });
  const [statusConfigColumn, setStatusConfigColumn] = useState(false);
  return (
    <div>
      <div className="flex space-x-4 border-b mb-4 pt-6 px-8 bg-white"></div>
      <CardPageWrapper >
        <div className="flex items-center gap-3 mb-4">
          <Typography variant="h6">
            API Log List
          </Typography>
          <div className="flex-1"></div>
          <InputFilterConfig searchObj={searchObj} setSearchObj={setSearchObj} caseStatus={dataDropdown?.caseStatus || []} />
          <BtnConfigColumn onClick={() => { setStatusConfigColumn(true) }} />
          <InputFilterDate searchObj={searchObj} setSearchObj={setSearchObj} />
        </div>
        <ApiLogTable searchObj={searchObj} statusConfigColumn={statusConfigColumn} setStatusConfigColumn={setStatusConfigColumn} />
      </CardPageWrapper>
    </div>
  );
};

export default AccessControlPage;
