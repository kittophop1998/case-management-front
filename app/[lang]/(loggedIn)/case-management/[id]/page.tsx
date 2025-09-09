'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import CaseDetailTab from '../[id]/tabs/case-detail-tab'
import NoteTab from '../[id]/tabs/note-tab'
import CaseTrackingTab from '../[id]/tabs/case-tracking-tab'

export default function CaseManagementPage() {
  const [selectedTab, setSelectedTab] = useState('case-detail')

  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'case-detail';

  const handleTabClick = (tabValue: string) => {
    router.push(`?tab=${tabValue}`);
    setSelectedTab(tabValue);
  };

  const tabs = [
    { label: "Case Detail", value: "case-detail" },
    { label: "Note", value: "note" },
    // { label: "Case Tracking", value: "case-tracking" },
  ]

  return (
    <div>
      {/* Tab UI */}
      <div className="flex space-x-4 border-b mb-4 pt-6 px-8 bg-white">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={`pb-2 px-4 border-b-2 text-sm font-medium ${currentTab === tab.value
                ? 'border-indigo-500'
                : 'border-transparent text-gray-500 hover:text-primary'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {currentTab === 'case-detail' && <CaseDetailTab />}
        {currentTab === 'note' && <NoteTab />}
        {/* {currentTab === 'case-tracking' && <CaseTrackingTab />} */}
      </div>
    </div>
  )
}
