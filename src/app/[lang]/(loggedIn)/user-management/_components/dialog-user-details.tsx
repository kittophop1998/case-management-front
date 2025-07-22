'use client';
import { Typography } from "@/components/common/typography";
import { FormUserDetails } from "./form-user-details";
import { Modal } from "@/components/common/Modal";
import { useEffect, useState, useTransition } from "react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { UserType } from "@/types/user";
import { UserSchemas } from "@/schemas";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type DialogDetailsRef = {
    setDefaultUser: (user: UserType | null) => void;
};
interface DialogDetailsProps {
    open: boolean;
    onClose: () => void;
}
const emptyUser: z.infer<typeof UserSchemas> = {
    uID: null,
    agentID: '',
    name: '',
    email: '',
    role: 'User',
    team: '',
    center: '',
    status: 'Active',
}
export const DialogDetails = forwardRef<DialogDetailsRef, DialogDetailsProps>((
    {
        open, onClose
    }, ref) => {
    const [mode, setMode] = useState<'create' | 'edit'>('create');
    const [isLoadingForm, startLoadingForm] = useTransition()

    const form = useForm<z.infer<typeof UserSchemas>>({
        resolver: zodResolver(UserSchemas),
        defaultValues: emptyUser
    })
    useImperativeHandle(ref, () => ({
        setDefaultUser: async (user) => {
            if (user) {
                setMode('edit');
                form.reset(emptyUser);
                startLoadingForm(async () => {
                    const userDetails = await getUserDetails(user.id)
                    form.reset(userDetails);

                })
            } else {
                setMode('create');
                form.reset(emptyUser);
            }
        },
    }));
    const getUserDetails = async (uID: number): Promise<z.infer<typeof UserSchemas>> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    uID: uID,
                    agentID: 'agentID123',
                    name: `John Doe ${uID}`,
                    email: "john.doe@example.com",
                    role: "User",
                    team: "Team A",
                    center: "BKK",
                    status: "Active",
                });
            }, 3000);
        });
    };
    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={mode === 'create' ? 'Add Individual User' : 'Select Update'}
        >
            <FormUserDetails
                isLoadingForm={isLoadingForm}
                mode={mode}
                onClose={onClose}
                form={form}
            />
        </Modal>
    );
});
