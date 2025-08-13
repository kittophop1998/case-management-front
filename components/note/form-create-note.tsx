import { CreateNoteSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
// 
import { SelectField } from "@/components/form/select-field";
import { Form } from "@/components/ui/form";
import { ButtonCancel } from "../button/btn-cancle";
import { Button } from "../common/Button";
import { cn } from "@/lib/utils";
import { TextAreaField } from "../form/textarea-field";
import { dialogAlert } from "../common/dialog-alert";

export const FormCreateNote = ({
    isSmallMod = true,
    setStatus = (status: boolean) => { }
}) => {
    const form = useForm<z.infer<typeof CreateNoteSchemas>>({
        resolver: zodResolver(CreateNoteSchemas),
        defaultValues: {
            type: null,
            text: ''
        }
    })
    const onSubmit = (values: z.infer<typeof CreateNoteSchemas>) => {
        console.log('Form submitted with values:', values);
        // Handle form submission logic here
        dialogAlert(true)
        onClose();
    }
    const onClose = () => {
        setStatus(false);
    }
    const formState = form.formState;
    const isFormPending = formState.isSubmitting || formState.isValidating;
    const isFormDisabled = !formState.isDirty
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <SelectField
                    form={form}
                    name='type'
                    label='type'
                    placeholder='All'
                    valueName='id'
                    labelName='name'
                    loading={isFormPending}
                    items={[
                        { id: 'type1', name: 'การติดต่อจากลูกค้า' },
                        { id: 'type2', name: 'Type 2' },
                        { id: 'type3', name: 'Type 3' }
                    ]}
                />
                <TextAreaField
                    loading={isFormPending}
                    form={form}
                    name='text'
                    label='message'
                    placeholder='message'
                />
                <div className="flex gap-3 items-center justify-end">
                    <ButtonCancel onClick={onClose} />
                    <Button loading={isFormPending} disabled={isFormDisabled}>Save</Button>
                </div>
            </form>
        </Form>
    );
}


export const CreateNewNoteTemplate = ({
    isSmallMod = true,
    setStatus = (status: boolean) => { }
}) => {
    return (
        <div className={cn("p-3", isSmallMod ? '' : 'max-w-2xl w-full min-w-[50vw]')}>
            <FormCreateNote
                isSmallMod={isSmallMod}
                setStatus={setStatus}
            />
        </div>
    );
}