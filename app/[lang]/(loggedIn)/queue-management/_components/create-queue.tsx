'use client'
import { Button } from "@/components/common/Button";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/Modal";
import { Pencil } from "lucide-react";
import { QueueInfoForm, useQueueInfoForm } from "@/components/queue/form-info";
import { QueueType } from "@/types/queue.type";
import QueueSvg from '@/public/icons/Queue.svg'
import BtnCreate from "@/components/button/btn-create";


const BtnEdit = ({ onClick }: { onClick: () => void }) => {
    return <Button variant='black' onClick={onClick}>Edit Queue</Button>
}
export const CreateQueueSection = ({ fetchTable, isCreate = false, queue }: { fetchTable: () => void, isCreate?: boolean, queue?: QueueType }) => {
    const [open, setOpen] = useState(false)
    const afterCreate = () => {
        setOpen(false)
        fetchTable()
    }
    const onClose = () => {
        setOpen(false)
    }


    const { form, setForm, resetForm, onSubmit } = useQueueInfoForm({ afterSubmit: afterCreate })
    const loadEditForm = () => {
        console.log(`queue`, queue)
        if (isCreate) {
            resetForm()
        } else {
            if (queue) {
                setForm({
                    id: queue.queueId,
                    queueName: queue.queueName,
                    queueDescription: queue.queueDescription
                })
            }
        }
    }
    useEffect(() => {
        loadEditForm()
    }, [open])
    return (
        <>
            {isCreate ?
                <BtnCreate onClick={() => setOpen(true)} text='Add Queue' />
                :
                <BtnEdit onClick={() => setOpen(true)} />
            }
            <Modal separator title={isCreate ? "Add Queue" : "Edit Queue"} isOpen={open} className='w-[clamp(300px,90vw,48.063rem)]' >
                <QueueInfoForm form={form} onSubmit={onSubmit} onClose={onClose} />
            </Modal>
            {/* onClose={onClose} */}
        </>
    )
}