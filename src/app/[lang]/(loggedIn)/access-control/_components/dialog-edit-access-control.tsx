'use client';
import { Button } from "@/components/common/Button";
import { checkPassword } from "@/components/common/dialog-check-password";
import { CheckboxField } from "@/components/common/form/checkbox";
import { Modal } from "@/components/common/Modal";
import { Typography } from "@/components/common/typography";
import { useEditTableMutation } from "@/features/permission/permissionApiSlice";
import { SettingAccessControlSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Form, FormProvider, useForm } from "react-hook-form";
import z from "zod";



export type DialogRef = {
    setDefaultForm: (obj: any) => void
}
interface DialogEditAccessControlRef {
    roles: {
        id: string;
        name: string;
    }[];
    isOpen: boolean;
    onClose: () => void;
    accessControlData: any; // Define the type based on your data structure
    afterSubmit: () => void;
}
export const DialogEditAccessControl = forwardRef<DialogRef, DialogEditAccessControlRef>(
    (
        {
            roles = [],
            isOpen = true,
            onClose = () => { },
            accessControlData = {},
            afterSubmit = () => { }
        }, ref
    ) => {
        const [label, setLabel] = useState<string>('')
        const form = useForm<z.infer<typeof SettingAccessControlSchema>>({
            resolver: zodResolver(SettingAccessControlSchema),
            defaultValues: {
                permission: '',
                roles: []
            }
        })

        useImperativeHandle(ref, () => ({
            setDefaultForm: (obj) => {
                console.log('setDefaultForm called with obj:', obj);
                if (obj) {
                    form.reset(obj)
                    setLabel(obj.label || '');
                }

            }
        }))
        const [edit, { error: errorEdit, isLoading: isLoadingEdit }] = useEditTableMutation()

        const onSubmit = async (data: z.infer<typeof SettingAccessControlSchema>) => {
            try {
                const password = await checkPassword()
                if (!password) return // กดยกเลิก หรือกรอกผิด
                console.log('Form submitted with data:', data);
                await edit(data).unwrap()
                onClose();
                afterSubmit();
            } catch (error) {

            }
        };
        // const permission = form.watch('permission');
        const formView = form.watch();
        return (
            <Modal
                isOpen={isOpen} title={'Permission'} onClose={() => onClose()}
                className="max-w-md"
                onClose={() => onClose()}
            >
                <FormProvider {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' method='post'>
                        <Typography className="mb-4">{label}</Typography>
                        <CheckboxField
                            form={form}
                            items={roles}
                            name="roles"
                            label="Select Roles"
                            // valueName="id"
                            valueName="name"
                            labelName="name"
                        />
                        <Button type="submit" className="w-full"
                            loading={form.formState.isSubmitting}
                        >Update</Button>
                    </form>

                </FormProvider>
                {/* {
                    JSON.stringify(formView)
                } */}
            </Modal >
        );
    })