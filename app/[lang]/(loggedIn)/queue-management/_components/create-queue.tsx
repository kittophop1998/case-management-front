'use client'

import { Button } from "@/components/common/Button";
import { Typography } from "@/components/common/typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { TextField } from "@/components/form/text-field";
import { TextAreaField } from "@/components/form/textarea-field";
import BtnSave from "@/components/button/btn-save";
import { useCreateMutation } from "@/features/queueApiSlice";
import { dialogAlert } from "@/components/common/dialog-alert";
import { getErrorText } from "@/services/api";
import { Modal } from "@/components/common/Modal";
import { CreateQueue } from "@/schemas";
import { fa } from "zod/v4/locales";
import { Pencil } from "lucide-react";


const BtnCreate = ({ onClick }: { onClick: () => void }) => {
    return <Button variant='black' onClick={onClick}>Add Queue</Button>
}
const BtnEdit = ({ onClick }: { onClick: () => void }) => {
    return <Button variant='black' size='icon' onClick={onClick}><Pencil /></Button>
}
export const QueueInfoForm = ({ form, isCreate, afterSubmit }: { form: any, isCreate: boolean, afterSubmit: () => void }) => {
    const [create, { error: errorCreate, isLoading: isLoadingCreate }] = useCreateMutation()
    const onSubmit = async (values: z.infer<typeof CreateQueue>) => {
        try {
            await create(form.getValues()).unwrap()
            dialogAlert(true)
            afterSubmit?.()
            form.reset()
            // router.push('/queue-management')
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
    // 
    // 
    // 
    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <div className="w-[clamp(300px,100%,35rem)]">
                    <div className="flex items-start gap-2">
                        <Typography variant="body2" className="mt-1 w-[6rem]">Queue Name: </Typography>
                        <div className="flex-1">
                            <TextField
                                loading={form.formState.isSubmitting}
                                form={form}
                                name='queueName'
                                placeholder='Enter Queue Name'
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
                                placeholder='Enter Queue Description'
                            />
                        </div>
                    </div>
                </div>
                <BtnSave loading={form.formState.isSubmitting} />
                {/* </div> */}
            </form>
        </Form>
    </>
}


const DialogCreateQueue = ({ open, afterCreate, isCreate, onClose }: { open: boolean, afterCreate: () => void, isCreate: boolean, onClose: () => void }) => {
    const form = useForm<z.infer<typeof CreateQueue>>({
        resolver: zodResolver(CreateQueue),
        defaultValues: {
            queueName: '',
            queueDescription: '',
        }
    })
    return (
        <Modal onClose={onClose} title="Create Queue" isOpen={open} className='w-[clamp(300px,100%,423px)]'>
            <QueueInfoForm form={form} isCreate={isCreate} afterSubmit={afterCreate} />
        </Modal>
    );
};



export const CreateQueueSection = ({ fetchTable, isCreate = false }: { fetchTable: () => void, isCreate?: boolean }) => {
    const [open, setOpen] = useState(false)
    const afterCreate = () => {
        setOpen(false)
        fetchTable()
    }
    const onClose = () => {
        setOpen(false)
    }
    return (
        <>
            {isCreate ? <BtnCreate onClick={() => setOpen(true)} /> :
                <BtnEdit onClick={() => setOpen(true)} />}

            <DialogCreateQueue open={open} afterCreate={afterCreate} isCreate={isCreate} onClose={onClose} />
        </>
    )
}