import { CreateNoteSchemas } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
// 
import { SelectField } from "@/components/form/select-field";
import { TextField } from "@/components/form/text-field";
import { Button } from "@/components/common/Button";
import { Form } from "@/components/ui/form";
import { useMemo } from "react";

export const ExampeleForm = () => {
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
    }

    const isFormPending = useMemo(() => form.formState.isSubmitting, [form.formState.isSubmitting])
    const isFormDisabled = useMemo(() => !form.formState.isDirty, [form.formState.isDirty])
    return (
        <>
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
                            { id: 'type1', name: 'Type 1' },
                            { id: 'type2', name: 'Type 2' },
                            { id: 'type3', name: 'Type 3' }
                        ]}
                    />
                    <TextField
                        loading={isFormPending}
                        form={form}
                        name='text'
                        label='message'
                        placeholder='message'
                    />
                    <Button type='submit' loading={isFormPending} disabled={isFormDisabled}>submit</Button>
                </form>
            </Form>
        </>
    );
}