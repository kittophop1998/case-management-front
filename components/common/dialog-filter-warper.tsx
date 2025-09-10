import { useEffect, useState } from "react";
import BtnApply from "../button/btn-apply"
import BtnReset from "../button/btn-reset"
import { Modal } from "./Modal"

interface UserFilterProps {
    value: Record<string, any>;
    setValue: (value: Record<string, any>) => void
    // open: boolean;
    clearValue: Record<string, any>
}
export const useFilter = ({ value, setValue, clearValue }: UserFilterProps) => {
    const [open, setOpen] = useState(false);
    const [draftFilter, setDraftFilter] = useState<Record<string, any>>(clearValue);
    const onClear = () => {
        setDraftFilter(clearValue);
    }
    const onConfirm = () => {
        setValue(draftFilter);
        setOpen(false);
    }
    useEffect(() => {
        if (open) {
            setDraftFilter(value);
        }
    }, [open])
    return {
        draftFilter,
        setDraftFilter,
        onClear,
        onConfirm,
        open,
        setOpen
    }
}


interface DialogFilterWarperProps {
    title?: string
    open: boolean
    setOpen: (open: boolean) => void
    onClear: () => void
    onConfirm: () => void
    children: React.ReactNode
    width?: string | number
    className?: string
}
export const DialogFilterWarper = ({ title = '', open, setOpen, onClear, onConfirm, children, width, className }: DialogFilterWarperProps) => {
    return (
        <Modal title={title} isOpen={open} onClose={() => setOpen(false)} className={className} >
            <div className="space-y-4 mt-4" >
                {children}
                <div className="flex gap-3 mt-6">
                    <BtnReset onClick={onClear} className="flex-1" text="Reset" />
                    <BtnApply onClick={onConfirm} className="flex-1" />
                </div>
            </div>
        </Modal>
    )
}