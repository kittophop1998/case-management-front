'use client'

import { Typography } from "@/components/common/typography";
import z from "zod";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/form/text-field";
import { TextAreaField } from "@/components/form/textarea-field";
import BtnSave from "@/components/button/btn-save";
import { useCreateMutation, useEditMutation } from "@/features/queueApiSlice";
import { dialogAlert } from "@/components/common/dialog-alert";
import { getErrorText } from "@/services/api";
import { CreateQueue } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useMemo } from "react";
import { BtnClose } from "../button/btn-close";
import { ButtonCancel } from "../button/btn-cancle";
import { cn } from "@/lib/utils";
import { Button } from "../common/Button";


export const useQueueInfoForm = ({ afterSubmit }: { afterSubmit: () => void }) => {
    const form = useForm<z.infer<typeof CreateQueue>>({
        resolver: zodResolver(CreateQueue),
        defaultValues: {
            id: null,
            queueName: '',
            queueDescription: '',
        }
    })
    const [create, { error: errorCreate, isLoading: isLoadingCreate }] = useCreateMutation()
    const [edit, { error, isLoading }] = useEditMutation()
    const onSubmit = async (values: z.infer<typeof CreateQueue>) => {
        const value = form.getValues()
        // console.log(`onSubmit-value`, value)
        try {
            if (value.id) {
                await edit(value).unwrap()
            } else {
                await create(value).unwrap()
            }
            dialogAlert(true)
            afterSubmit?.()
            form.reset()
        } catch (error: unknown) {
            dialogAlert(false,
                {
                    title: '',
                    message: getErrorText(error),
                    confirmText: 'Try again',
                    cancelText: 'Try again',
                    onConfirm: () => { },
                    onCancel: () => { }
                }
            )
        }
    }
    const setForm = (data: z.infer<typeof CreateQueue>) => {
        form.reset()
        form.setValue('id', data.id)
        form.setValue('queueName', data.queueName)
        form.setValue('queueDescription', data.queueDescription)
    }
    const resetForm = () => {
        form.reset()
    }
    // const isFormPending = useMemo(() => form.formState.isSubmitting, [form.formState.isSubmitting])
    // const isFormDisabled = useMemo(() => !form.formState.isDirty, [form.formState.isDirty])
    return {
        form,
        setForm,
        resetForm,
        onSubmit
    }
}
// 
export const QueueInfoForm = memo(({ form, onSubmit, onClose, className = '' }) => {
    // const seeData = form.watch()
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className={cn('', className)}>
                <div className="flex items-start gap-2">
                    <Typography variant="body2" className="mt-1 w-[6rem]">Queue Name: </Typography>
                    <div className="flex-1">
                        <TextField
                            loading={form.formState.isSubmitting}
                            form={form}
                            name='queueName'
                        />
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Typography variant="body2" className="mt-1 w-[6rem]">Description: </Typography>
                    <div className="flex-1">
                        <TextAreaField
                            loading={form.formState.isSubmitting}
                            form={form}
                            name='queueDescription'
                        />
                    </div>
                </div>
            </div>
            {/* onClose */}
            <div className="flex justify-end gap-2">
                {onClose && <ButtonCancel className="w-[7.5rem]" onClick={onClose} />}
                <Button className="w-[7.5rem]" loading={form.formState.isSubmitting} disabled={!form.formState.isDirty}>Save</Button>
                {/* <BtnSave loading={form.formState.isSubmitting} disabled={!form.formState.isDirty} /> */}
            </div>
        </form>
    </Form>
})