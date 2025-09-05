'use client'

import { useState } from "react";
import CardPageWrapper from "@/components/common/card-page-warpper";
import { Typography } from "@/components/common/typography";
// import { Suspense } from "react";
import CaseTable from "./_components/case-table";
import InputFilter from "@/components/common/input-filter";

const tabs = [
  { label: "My Case", value: "myCase" },
  { label: "Available Case", value: "availableCase" },
  { label: "Inquiry Log", value: "inquiryLog" },
  { label: "Case History", value: "caseHistory" },
  { label: "All Case", value: "allCase" },
];

const CaseManagementTable = ({ selectedTab }: { selectedTab: string }) => {
  return (
    <>
      <CaseTable tab={selectedTab} />
    </>
  );
};

const CaseManagementPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("myCase");
  const [searchObj, setSearchObj] = useState<{ [key: string]: any }>({
    keyWord: '',
    form: '',
    to: '',
    status: '',
    priority: '',
    receivedFrom: ''
  });

  return (
    <div>
      {/* Tab Selector */}
      <div className="flex space-x-4 border-b mb-4 pt-6 px-8 bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className={`pb-2 px-4 border-b-2 text-sm font-medium ${selectedTab === tab.value
              ? "border-indigo-500"
              : "border-transparent text-gray-500 hover:text-primary"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <CardPageWrapper className="mt-4">
        <div className="flex mb-6">
          <Typography variant="h6" className="mb-3">
            Case List
          </Typography>
          <div className="flex-1"></div>
          <InputFilter />

        </div>

        {/* ตัวอย่าง filter (ยังไม่เปิดใช้งาน) */}
        {/* <BtnFilter onClick={() => {}} /> */}

        <CaseManagementTable selectedTab={selectedTab} />
      </CardPageWrapper>
    </div>
  );
};

export default CaseManagementPage;
