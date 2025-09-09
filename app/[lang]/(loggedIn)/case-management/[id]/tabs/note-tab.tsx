'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"
import { TextAreaFieldInput } from "@/components/form/textarea-field"
import { useEffect, useState } from "react"
import { useAddCaseNoteMutation, useLazyGetCaseNotesQuery } from "@/features/caseApiSlice"
import { useParams } from "next/navigation"
import { Typography } from "@/components/common/typography"

type Note = {
  id: number
  label: string
  value: string
}

export default function CaseManagementNoteTab() {
  const params = useParams<{ id: string }>()
  const { id } = params
  const [getData, { currentData: data, isFetching, error: errGet }] = useLazyGetCaseNotesQuery();
  const [create, { error: errPost, isLoading }] = useAddCaseNoteMutation()
  useEffect(() => {
    getData({ id });
  }, []);
  const [message, setMessage] = useState<string>('');
  const onSubmit = async (data: any) => {
    try {
      if (!message) return;
      await create({ id, message });
      setMessage('');
      getData({ id });
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <CardPageWrapper className="mt-4">
      <h1 className="text-xl font-semibold mb-4">Case Note</h1>
      <div className="mb-4" />
      <div className="flex gap-6">
        <div className="w-1/2 max-h-[500px] overflow-y-auto pr-2 border-r">
          <div className="flex flex-col gap-4">
            {/* {JSON.stringify(data)} */}
            {(data || []).map(note => (
              <div key={note.id}>
                <Typography variant="caption">{note.label}</Typography>
                <TextAreaFieldInput
                  name={`caseNote_${note.id}`}
                  // label={note.label}
                  placeholder={note.value}
                  // form={form}
                  field={{
                    value: note.value,
                    onChange: () => { },
                  }}
                  readonly={true}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2">
          <TextAreaFieldInput
            field={{
              value: message,
              onChange: (e) => setMessage(e.target.value)
            }}
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 border border-purple-500 text-purple-600 rounded-md font-medium hover:bg-purple-700"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </CardPageWrapper>

  )
}
