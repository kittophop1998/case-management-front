'use client'

import { useState } from "react";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
import BtnFilter from "@/components/button/btn-filter";
import { DatePickerFieldInputV2 } from "@/components/form/date-picker";
import BtnConfigColumn from "@/components/button/btn-config-column";
import { useGetDropdownQuery } from "@/features/systemApiSlice";
import { DialogFilterWarper, useFilter } from "@/components/common/dialog-filter-warper";
import ApiLogTable from "./_components/api-log-table";
import { TextFieldInput } from "@/components/form/text-field";

type FilterDialog = {
  requestId: string;
  serviceName: string;
  reqMessage: string;
  respMessage: string;
  statusCode: string;
};

type FilterDateDialog = {
  dateStart: Date | null;
  dateEnd: Date | null;
};

export type FilterAll = FilterDialog & FilterDateDialog;

const InputFilterConfig = ({
  searchObj,
  setSearchObj,
}: {
  searchObj: FilterAll;
  setSearchObj: (value: FilterAll) => void;
}) => {
  const {
    draftFilter,
    setDraftFilter,
    onClear,
    onConfirm,
    open,
    setOpen,
  } = useFilter<FilterAll>({
    value: searchObj,
    setValue: setSearchObj,
    clearValue: {
      requestId: '',
      serviceName: '',
      reqMessage: '',
      respMessage: '',
      statusCode: '',
      dateStart: null,
      dateEnd: null,
    },
  });

  return (
    <>
      <BtnFilter onClick={() => setOpen(true)} />
      <DialogFilterWarper
        title="Filter"
        open={open}
        setOpen={setOpen}
        onClear={onClear}
        onConfirm={onConfirm}
        className="w-[23rem]"
      >
        <div className="space-y-3 pb-4">
          {/* Request ID */}
          <div>
            <Typography variant="caption">Request ID</Typography>
            <div className="px-2 mt-2">
              <input
                type="text"
                value={draftFilter.requestId || ''}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    requestId: e.target.value,
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Service Name */}
          <div>
            <Typography variant="caption">Service Name</Typography>
            <div className="px-2 mt-2">
              <input
                type="text"
                value={draftFilter.serviceName || ''}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    serviceName: e.target.value,
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Req. Message */}
          <div>
            <Typography variant="caption">Req. Message</Typography>
            <div className="px-2 mt-2">
              <input
                type="text"
                value={draftFilter.reqMessage || ''}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    reqMessage: e.target.value,
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Resp. Message */}
          <div>
            <Typography variant="caption">Resp. Message</Typography>
            <div className="px-2 mt-2">
              <input
                type="text"
                value={draftFilter.respMessage || ''}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    respMessage: e.target.value,
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>

          {/* Status Code */}
          <div>
            <Typography variant="caption">Status Code</Typography>
            <div className="px-2 mt-2">
              <input
                type="text"
                value={draftFilter.statusCode || ''}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    statusCode: e.target.value,
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      </DialogFilterWarper>
    </>
  );
};


const InputFilterDate = ({
  searchObj,
  setSearchObj,
}: {
  searchObj: FilterAll;
  setSearchObj: (value: FilterAll) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [dateStart, setDateStart] = useState<Date | null>(searchObj.dateStart);
  const [dateEnd, setDateEnd] = useState<Date | null>(searchObj.dateEnd);

  const onClear = () => {
    setDateStart(null);
    setDateEnd(null);
  };

  const onConfirm = () => {
    setSearchObj({ ...searchObj, dateStart, dateEnd });
    setOpen(false);
  };

  const onOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) {
      setDateStart(searchObj.dateStart);
      setDateEnd(searchObj.dateEnd);
    }
  };

  return (
    <>
      <BtnFilter text="Req. Date" onClick={() => setOpen(true)} />
      <DialogFilterWarper
        title="Filter by Request date"
        open={open}
        setOpen={onOpenChange}
        onClear={onClear}
        onConfirm={onConfirm}
        className="w-[22.375rem]"
      >
        <div className="flex items-center gap-3 mb-3">
          <Typography className="w-[4.5rem]">From :</Typography>
          <div className="flex-1">
            <DatePickerFieldInputV2
              field={{
                value: dateStart,
                onChange: setDateStart,
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Typography className="w-[4.5rem]">To :</Typography>
          <div className="flex-1">
            <DatePickerFieldInputV2
              field={{
                value: dateEnd,
                onChange: setDateEnd,
              }}
            />
          </div>
        </div>
      </DialogFilterWarper>
    </>
  );
};

const ApiLogPage = () => {
  const { data: dataDropdown } = useGetDropdownQuery();

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
      <CardPageWrapper>
        <div className="flex items-center gap-3 mb-4">
          <Typography variant="h6">API Log List</Typography>
          <div className="flex-1" />
          <InputFilterConfig
            searchObj={searchObj}
            setSearchObj={setSearchObj}
          />
          <InputFilterDate
            searchObj={searchObj}
            setSearchObj={setSearchObj}
          />
          <BtnConfigColumn
            onClick={() => {
              setStatusConfigColumn(true);
            }}
          />
        </div>
        <ApiLogTable
          searchObj={searchObj}
          statusConfigColumn={statusConfigColumn}
          setStatusConfigColumn={setStatusConfigColumn}
        />
      </CardPageWrapper>
    </div>
  );
};

export default ApiLogPage;
