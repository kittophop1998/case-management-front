import { CreateNoteSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { SelectField } from "@/components/form/select-field";
import { ButtonCancel } from "../button/btn-cancle";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";
import { TextAreaField } from "../form/textarea-field";
import { dialogAlert } from "../common/dialog-alert";
import { useCreateNoteMutation } from "@/features/note/noteApiSlice";
import { useGetNoteTypeQuery } from "@/features/system/systemApiSlice";
import { getErrorText } from "@/services/api";
import { useEffect, useMemo } from "react";

interface FormCreateNoteProps {
    isSmallMod?: boolean,
    setStatus?: (status: boolean) => void
    customerId: string,
    noteId?: string,
    afterPost?: () => void

}
export const FormCreateNote =
    (
        {
            isSmallMod = true,
            setStatus = (status: boolean) => { },
            customerId,
            noteId,
            afterPost
        }: FormCreateNoteProps
    ) => {

        const { data: noteTypes = [] } = useGetNoteTypeQuery();
        const [createNote, { error, isLoading }] = useCreateNoteMutation();
        const form = useForm<z.infer<typeof CreateNoteSchemas>>({
            resolver: zodResolver(CreateNoteSchemas),
            defaultValues: {
                customerId,
                noteTypeId: '',
                note: ''
            }
        })
        const updateFormById = (noteId: string | null) => {
            if (noteId) {
                // TODO API
                const details = {
                    customerId,
                    noteTypeId: '',
                    note: ''
                }
                form.reset(details)
            } else {
                const details = {
                    customerId,
                    noteTypeId: '',
                    note: ''
                }
                form.reset(details)
            }
        }
        useEffect(() => {
            updateFormById(noteId || null)
        }, [customerId, noteId])
        const onSubmit = async (values: z.infer<typeof CreateNoteSchemas>) => {
            try {
                // TODO:change form.getValues() to values but values noteTypeId and note missing
                await createNote({ body: form.getValues() }).unwrap();
                dialogAlert(true)
                onClose();
                form.reset({
                    customerId,
                    noteTypeId: '',
                    note: ''
                })
                !!afterPost && afterPost()
            } catch (error) {
                dialogAlert(false, {
                    title: 'Error',
                    message: error.message || getErrorText(error),
                    confirmText: 'Try again',
                    cancelText: 'Close',
                    onConfirm: () => { },
                    onCancel: () => { }
                })
            }
        }
        const onClose = () => {
            setStatus(false);
        }
        const isFormPending = useMemo(() => form.formState.isSubmitting || form.formState.isValidating, [form.formState.isSubmitting || form.formState.isValidating])
        const isFormDisabled = useMemo(() => !form.formState.isDirty, [form.formState.isDirty])
        return (
            <div className={cn("p-3", isSmallMod ? '' : 'max-w-2xl w-full min-w-[50vw]')}>
                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <SelectField
                            form={form}
                            name='noteTypeId'
                            label='Note Type'
                            placeholder='Select Note Type'
                            valueName='id'
                            labelName='name'
                            loading={isFormPending}
                            items={
                                noteTypes
                            }
                        />
                        <TextAreaField
                            // loading={isFormPending}
                            form={form}
                            name='note'
                            label='Note'
                            placeholder='Enter Note'
                            className={cn("", isSmallMod ? 'h-[clamp(360px,100vh,242px)]' : 'h-[clamp(360px,100vh,242px)]')}
                        />
                        <input />
                        <div className="flex gap-3 items-center justify-end">
                            <ButtonCancel onClick={onClose} />
                            <Button loading={isFormPending} disabled={isFormDisabled} >Save</Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        );
    }
