'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"
import { TextAreaField } from "@/components/form/textarea-field"
import { useState } from "react"

type Note = {
  id: number
  label: string
  value: string
}

export default function CaseManagementNoteTab() {
  // http://localhost:8000/api/v1/cases/:caseid/note POST
  // http://localhost:8000/api/v1/cases/:caseid/note GET
  const form = useForm();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      label: 'Nalan Kacherninin-BKK  23 Aug 25 12:01',
      value: 'บันทึกเคสเกี่ยวกับการที่ลูกค้าต้องการเปลี่ยนแปลงข้อมูล',
    },
    {
      id: 2,
      label: 'John Doe  22 Aug 25 09:15',
      value: 'ลูกค้าติดต่อสอบถามเกี่ยวกับการเปลี่ยนแปลงที่อยู่',
    },
    {
      id: 3,
      label: 'Jane Smith  21 Aug 25 14:30',
      value: 'แจ้งเตือนการชำระเงินล่าช้า',
    },
    {
      id: 4,
      label: 'Nalan Kacherninin-BKK  20 Aug 25 10:45',
      value: 'ลูกค้าต้องการสอบถามข้อมูลเพิ่มเติม',
    },
    {
      id: 5,
      label: 'Nalan Kacherninin-BKK  20 Aug 25 10:45',
      value: 'ลูกค้าต้องการสอบถามข้อมูลเพิ่มเติม',
    },
    {
      id: 6,
      label: 'Nalan Kacherninin-BKK  20 Aug 25 10:45',
      value: 'ลูกค้าต้องการสอบถามข้อมูลเพิ่มเติม',
    }
  ])

  const onSubmit = (data: any) => {
    if (!data.newNote) return;
    const newNote: Note = {
      id: notes.length + 1,
      label: `You - ${new Date().toLocaleString('th-TH')}`,
      value: data.newNote,
    };
    setNotes([newNote, ...notes]);
    form.reset(); // clear input
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardPageWrapper className="mt-4">
          <h1 className="text-xl font-semibold mb-4">Case Note</h1>
          <div className="mb-4" />

          <div className="flex gap-6">
            <div className="w-1/2 max-h-[500px] overflow-y-auto pr-2 border-r">
              <div className="flex flex-col gap-4">
                {notes.map(note => (
                  <div key={note.id}>
                    <TextAreaField
                      name={`caseNote_${note.id}`}
                      label={note.label}
                      placeholder={note.value}
                      form={form}
                      readonly={true}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/2">
              <TextAreaField
                name="newNote"
                label="Add Note"
                placeholder="Enter Case Note"
                form={form}
              />
              <button
                type="submit"
                className="mt-4 px-4 py-2 border border-purple-500 text-purple-600 rounded-md font-medium hover:bg-purple-700"
              >
                Submit
              </button>
            </div>
          </div>
        </CardPageWrapper>
      </form>
    </FormProvider>
  )
}
