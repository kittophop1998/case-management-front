'use client'

import { useState } from "react";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
// import { Suspense } from "react";
import CaseTable from "./_components/case-table";
import InputFilter from "@/components/common/input-filter";
import BtnFilter from "@/components/button/btn-filter";
import { Modal } from "@/components/common/Modal";

const tabs = [
  { label: "My Case", value: "myCase" },
  { label: "Available Case", value: "availableCase" },
  { label: "Inquiry Log", value: "inquiryLog" },
  { label: "Case History", value: "caseHistory" },
  { label: "All Case", value: "allCase" },
];

// const CaseManagementTable = ({ selectedTab }: { selectedTab: string }) => {
//   return (
//     <>
//       <CaseTable tab={selectedTab} />
//     </>
//   );
// };

const InputFilterConfig = () => {
  const [open, setOpen] = useState(false);
  return <>
    <BtnFilter onClick={() => { setOpen(true) }} />
    <Modal title="Filter" isOpen={open} className="w-[47.125rem]">
      <></>
    </Modal>
  </>
}
const InputFilterDate = () => {
  const [open, setOpen] = useState(false);
  return <>
    <BtnFilter text='Created Date' onClick={() => { setOpen(true) }} />
    <Modal title="Filter" isOpen={open} className="w-[21.375rem]">
      <></>
    </Modal>
  </>
}
const CaseManagementPage = () => {
  const [searchObj, setSearchObj] = useState<{ [key: string]: any }>({
    keyword: '',
    form: '',
    to: '',
    status: '',
    priority: '',
    receivedFrom: '',
    selectedTab: 'myCase'
  });
  return (
    <div>
      <div className="flex space-x-4 border-b mb-4 pt-6 px-8 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSearchObj({ ...searchObj, selectedTab: tab.value })}
            className={`pb-2 px-4 border-b-2 text-sm font-medium ${searchObj.selectedTab === tab.value
              ? "border-indigo-500"
              : "border-transparent text-gray-500 hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <CardPageWrapper className="mt-4">
        <div className="flex items-center gap-3 mb-6">
          <Typography variant="h6" className="mb-3">
            CaseTable
          </Typography>
          <div className="flex-1"></div>
          <InputFilter
            setValue={(value) => { setSearchObj({ ...searchObj, keyword: value }) }} value={searchObj.keyword}
          />
          <InputFilterConfig searchObj={searchObj} setSearchObj={setSearchObj} />
          <InputFilterDate searchObj={searchObj} setSearchObj={setSearchObj} />

        </div>

        {/* ตัวอย่าง filter (ยังไม่เปิดใช้งาน) */}
        {/* <BtnFilter onClick={() => {}} /> */}
        <CaseTable searchObj={searchObj} />
      </CardPageWrapper>
    </div>
  );
};

export default CaseManagementPage;
