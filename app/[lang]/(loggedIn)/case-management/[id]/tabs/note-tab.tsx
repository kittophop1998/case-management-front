'use client'
import { useForm, FormProvider } from "react-hook-form"
import CardPageWrapper from "@/components/common/card-page-warpper"
import { TextAreaFieldInput } from "@/components/form/textarea-field"
import { useEffect, useState } from "react"
import { useAddCaseNoteMutation, useLazyGetCaseNotesQuery } from "@/features/caseApiSlice"
import { useParams } from "next/navigation"
import { Typography } from "@/components/common/typography"
import { format } from "date-fns"
import { Button } from "@/components/common/Button"

type Note = {
  id: number
  label: string
  value: string
}

export default function CaseManagementNoteTab() {
  const params = useParams<{ id: string }>()
  const { id } = params
  const [getData, { currentData: data, isFetching, error: errGet }] = useLazyGetCaseNotesQuery();
  const [create, { error: errPost, isLoading: isLoadingCreate }] = useAddCaseNoteMutation()
  useEffect(() => {
    getData({ id });
  }, []);
  const [message, setMessage] = useState<string>('');

  const onSubmit = async () => {
    try {
      if (!message.trim()) return;
      await create({ id, message: message.trim() });
      setMessage('');
      getData({ id });
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <CardPageWrapper className="mt-4">
      <Typography variant="h6">Case Note</Typography>
      <div className="mb-4" />
      <div className="flex gap-6">
        <div className="w-1/2 max-h-[500px] overflow-y-auto pr-2 border-r">
          <div className="flex flex-col gap-4 pr-3">
            {/* {JSON.stringify(data)} */}
            {(data || []).map(note => (
              <div key={note.id}>
                <Typography variant="caption">{note.createdBy} {format(note.createdAt, 'dd MMM yyyy HH:mm')}</Typography>
                <TextAreaFieldInput
                  name={`caseNote_${note.id}`}
                  // label={note.label}
                  placeholder={note.content}
                  // form={form}
                  field={{
                    value: note.value,
                    onChange: () => { },
                  }}
                  readonly={true}
                  className="placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-200"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/2">
          <Typography variant="caption">Add Note</Typography>
          <TextAreaFieldInput
            placeholder="Enter case note"
            field={{
              value: message,
              onChange: (e) => setMessage(e.target.value)
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); 
                onSubmit?.();   
              }
            }}
            className="resize-none h-42 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-200"
          />
          <Button
            className="mt-3"
            type="submit"
            variant='outline-primary'
            size='small'
            disabled={!message.trim()}
            // className="mt-4 px-4 py-2 border border-purple-500 text-purple-600 rounded-md font-medium hover:bg-purple-700"
            onClick={onSubmit}
            loading={isLoadingCreate}
          >
            Submit
          </Button>
        </div>
      </div>
    </CardPageWrapper>

  )
}

